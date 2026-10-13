#include "nhien.hpp"
#include <algorithm>
#include <cmath>
#include <fstream>
#include <limits>
#include <map>
#include <sstream>
#include <stdexcept>
#include <filesystem>
namespace nhien {
constexpr double pi = 3.14159265358979323846;
LayerMix velocityMix(int v, float gamma) {
    v = std::clamp(v,1,127);
    float mapped = 1 + 126 * std::pow((v-1)/126.f, gamma);
    // Centers of ORIGINAL V3 velocity zones (not uniformly spaced).
    constexpr float centers[16]={13.5f,30.5f,35.5f,40.f,45.f,48.5f,53.5f,60.5f,68.5f,76.5f,84.5f,92.5f,100.5f,108.5f,116.5f,124.f};
    if(mapped<=centers[0]) return {1,1,1,0,mapped};
    if(mapped>=centers[15]) return {16,16,1,0,mapped};
    int lo=0; while(lo<14 && mapped>centers[lo+1]) lo++;
    float t=(mapped-centers[lo])/(centers[lo+1]-centers[lo]);
    // Linear amplitude avoids equal-power +3dB boosts for correlated recordings.
    return {lo+1,lo+2,1-t,t,mapped};
}
struct Sample { std::vector<float> l,r; unsigned rate=48000; };
static uint32_t u32(const unsigned char* b) { return b[0]|uint32_t(b[1])<<8|uint32_t(b[2])<<16|uint32_t(b[3])<<24; }
static Sample readWav(const std::string& path) {
    std::ifstream f(path,std::ios::binary);
    if(!f) throw std::runtime_error("Missing WAV: "+path);
    unsigned char head[12]; f.read((char*)head,12);
    if(!f || std::string((char*)head,4)!="RIFF" || std::string((char*)head+8,4)!="WAVE") throw std::runtime_error("Invalid RIFF: "+path);
    unsigned format=0,channels=0,bits=0,rate=0; std::vector<unsigned char> bytes;
    while(f) {
        unsigned char h[8]; f.read((char*)h,8); if(!f) break;
        uint32_t n=u32(h+4); std::string tag((char*)h,4);
        if(n>500000000) throw std::runtime_error("Oversize WAV chunk");
        if(tag=="fmt ") {
            if(n<16) throw std::runtime_error("Short WAV fmt");
            std::vector<unsigned char> fmt(n); f.read((char*)fmt.data(),n);
            format=fmt[0]|fmt[1]<<8; channels=fmt[2]|fmt[3]<<8; rate=u32(fmt.data()+4); bits=fmt[14]|fmt[15]<<8;
        } else if(tag=="data") { bytes.resize(n); f.read((char*)bytes.data(),n); }
        else f.seekg(n,std::ios::cur);
        if(!f) throw std::runtime_error("Truncated WAV: "+path);
        if(n&1) f.seekg(1,std::ios::cur);
    }
    if(format!=1 || (channels!=1 && channels!=2) || (bits!=16 && bits!=24) || rate<8000 || rate>192000 || bytes.empty()) throw std::runtime_error("Expected mono/stereo PCM16/24: "+path);
    unsigned stride=channels*bits/8; if(bytes.size()%stride) throw std::runtime_error("Partial WAV frame");
    Sample s; s.rate=rate; size_t frames=bytes.size()/stride; s.l.resize(frames); s.r.resize(frames);
    auto decode=[bits](const unsigned char* b) {
        if(bits==16) return float(int16_t(b[0]|b[1]<<8))/32768.f;
        int32_t x=b[0]|b[1]<<8|b[2]<<16; if(x&0x800000) x-=0x1000000;
        return x/8388608.f;
    };
    for(size_t i=0;i<frames;i++) { s.l[i]=decode(bytes.data()+i*stride); s.r[i]=channels==2?decode(bytes.data()+i*stride+bits/8):s.l[i]; }
    return s;
}
struct Biquad {
    double b0=1,b1=0,b2=0,a1=0,a2=0,z1=0,z2=0;
    float tick(float x) { double y=b0*x+z1; z1=b1*x-a1*y+z2; z2=b2*x-a2*y; return float(y); }
    void peak(double sr,double hz,double q,double db) {
        double A=std::pow(10.,db/40),w=2*pi*hz/sr,alpha=std::sin(w)/(2*q),a0=1+alpha/A;
        b0=(1+alpha*A)/a0; b1=-2*std::cos(w)/a0; b2=(1-alpha*A)/a0; a1=b1; a2=(1-alpha/A)/a0;
    }
    void highpass(double sr,double hz) {
        double w=2*pi*hz/sr,c=std::cos(w),alpha=std::sin(w)/1.41421356237,a0=1+alpha;
        b0=(1+c)/2/a0; b1=-(1+c)/a0; b2=b0; a1=-2*c/a0; a2=(1-alpha)/a0;
    }
};
struct Delay {
    std::vector<float> data; size_t pos=0; float feedback=0,low=0;
    Delay()=default;
    Delay(unsigned n,float fb):data(n,0),feedback(fb){}
    float tick(float x) { float y=data[pos]; low=0.32f*y+0.68f*low; data[pos]=x+feedback*low; pos=(pos+1)%data.size(); return y; }
};
struct Mode { double y1=0,y2=0,r=0,c=0; };
struct Voice {
    const Sample *s1=nullptr,*s2=nullptr;
    double pos=0,step=1; float g1=0,g2=0,env=1,decay=1;
    int note=0,velocity=0; uint64_t id=0;
    bool active=false,held=false,released=false,main=false,damperSound=false,sostenuto=false;
    float softAlpha=0,softL=0,softR=0;
};
struct Engine::Impl {
    Config cfg; std::map<std::pair<int,int>,Sample> mainSamples;
    std::map<int,Sample> releases; std::map<std::pair<int,int>,Sample> harmonics; std::map<int,Sample> pedals;
    std::array<int,128> roots{}; std::array<Voice,256> voices{};
    std::array<unsigned,128> keys{}; uint64_t serial=0; float pedal=0,limitGain=1,limiterRelease=1;
    float volumeTarget=1,volumeCurrent=1,volumeSmoothing=1,softPedal=0;
    bool sostenutoDown=false;
    std::array<Mode,88> modes{}; std::array<std::array<Biquad,3>,2> eq{};
    std::array<std::array<Delay,4>,2> comb;
    std::array<std::vector<float>,2> early; size_t earlyPos=0;
    std::array<unsigned,2> pedalCycle{}; uint64_t bytes=0;
    explicit Impl(Config c):cfg(c) {
        if(!std::isfinite(c.sampleRate) || c.sampleRate<22050 || c.sampleRate>96000 || !std::isfinite(c.velocityGamma) || c.velocityGamma<=0 || !std::isfinite(c.release) || c.release<=0 || !std::isfinite(c.gain) || c.gain<0 || !std::isfinite(c.resonance) || !std::isfinite(c.room) || !std::isfinite(c.reverb)) throw std::runtime_error("Invalid engine configuration");
        roots.fill(-1); volumeSmoothing=float(std::exp(-1/(cfg.sampleRate*.020))); limiterRelease=float(std::exp(-1/(cfg.sampleRate*.08)));
        for(int i=0;i<88;i++) { double freq=440*std::pow(2.,(i+21-69)/12.); modes[i].r=std::exp(-1/(cfg.sampleRate*(1.7-0.012*i))); modes[i].c=2*modes[i].r*std::cos(2*pi*freq/cfg.sampleRate); }
        for(int ch=0;ch<2;ch++) {
            eq[ch][0].highpass(cfg.sampleRate,28); eq[ch][1].peak(cfg.sampleRate,330,.75,-1.8); eq[ch][2].peak(cfg.sampleRate,2800,.7,1.1);
            const double times[4]={.0371,.0413,.0437,.0479};
            for(int k=0;k<4;k++) { double time=times[k]+ch*.0017; comb[ch][k]=Delay(unsigned(time*cfg.sampleRate),float(std::pow(.001,time/1.6))); }
            early[ch].resize(unsigned(.12*cfg.sampleRate)+1,0);
        }
    }
    Voice& alloc() {
        for(auto& v:voices) if(!v.active) { v=Voice{}; v.active=true; v.id=++serial; return v; }
        auto it=std::min_element(voices.begin(),voices.end(),[](const Voice& a,const Voice& b) {
            float sa=a.env*(std::abs(a.g1)+std::abs(a.g2))+(a.held?10:0);
            float sb=b.env*(std::abs(b.g1)+std::abs(b.g2))+(b.held?10:0);
            return sa==sb?a.id<b.id:sa<sb;
        });
        // Prototype hard voice steal; production needs a short fade buffer.
        *it=Voice{}; it->active=true; it->id=++serial; return *it;
    }
    void shot(const Sample* s,int note,float gain) {
        if(!s) return; auto& v=alloc(); v.s1=s; v.note=note; v.g1=gain; v.step=s->rate/cfg.sampleRate;
    }
    void damping(Voice& v) {
        if(v.note>=89) { v.decay=float(std::exp(-6.907755/(3*cfg.sampleRate))); }
        else {
            float x=std::min(pedal*127/63,1.f); double t=cfg.release+(1.8-cfg.release)*x*x;
            v.decay=float(std::exp(-6.907755/(t*cfg.sampleRate)));
        }
        v.released=true;
        if(!v.damperSound) {
            v.damperSound=true;
            if(!cfg.dry) {
                int root=roots[v.note],kind=v.velocity<45?1:v.velocity<90?2:3;
                auto h=harmonics.find({root,kind});
                if(h!=harmonics.end()) {
                    // Pitch the resonance release by same offset as main voice.
                    const Sample* s=&h->second; int note=v.note; float gain=.10f*std::pow(v.velocity/127.f,.6f)*v.env;
                    auto& tail=alloc(); tail.s1=s; tail.note=note; tail.g1=gain;
                    tail.step=s->rate/cfg.sampleRate*std::pow(2.,(note-root)/12.);
                }
            }
        }
    }
};
Engine::Engine(Config c):p(std::make_unique<Impl>(c)){}
Engine::~Engine()=default;
void Engine::loadBank(const std::string& manifest,const std::vector<int>& notes) {
    // Transactional replacement: failed load leaves existing engine untouched.
    auto next=std::make_unique<Impl>(p->cfg); auto& e=*next;
    std::ifstream f(manifest); if(!f) throw std::runtime_error("Missing manifest: "+manifest);
    struct Row { char kind; int root,layer; std::string file; }; std::vector<Row> rows;
    std::string line; std::vector<int> roots;
    while(std::getline(f,line)) {
        if(line.empty() || line[0]=='#') continue;
        Row r; std::istringstream in(line); if(!(in>>r.kind>>r.root>>r.layer>>r.file)) throw std::runtime_error("Bad manifest row");
        if(r.root<0 || r.root>127 || r.layer<0 || r.layer>16) throw std::runtime_error("Invalid manifest index");
        if(r.kind!='M' && r.kind!='R' && r.kind!='H' && r.kind!='P') throw std::runtime_error("Unknown manifest type");
        rows.push_back(r); if(r.kind=='M') roots.push_back(r.root);
    }
    if(roots.empty()) throw std::runtime_error("Empty main bank");
    std::sort(roots.begin(),roots.end()); roots.erase(std::unique(roots.begin(),roots.end()),roots.end());
    for(int n=21;n<=108;n++) e.roots[n]=*std::min_element(roots.begin(),roots.end(),[n](int a,int b){return std::abs(a-n)<std::abs(b-n);});
    auto wanted=[&](int root) { if(notes.empty()) return true; for(int n:notes) if(n>=21 && n<=108 && e.roots[n]==root) return true; return false; };
    auto base=std::filesystem::path(manifest).parent_path();
    for(auto& row:rows) {
        if((row.kind=='M'||row.kind=='H')&&!wanted(row.root)) continue;
        if(row.kind=='R'&&!notes.empty()&&std::find(notes.begin(),notes.end(),row.root)==notes.end()) continue;
        Sample s=readWav((base/row.file).string()); e.bytes+=s.l.size()*sizeof(float)*2;
        if(row.kind=='M') { if(row.layer<1) throw std::runtime_error("Invalid main layer"); e.mainSamples[{row.root,row.layer}]=std::move(s); }
        else if(row.kind=='R') e.releases[row.root]=std::move(s);
        else if(row.kind=='H') e.harmonics[{row.root,row.layer}]=std::move(s);
        else e.pedals[row.layer]=std::move(s);
    }
    for(int root:roots) if(wanted(root)) for(int v=1;v<=16;v++) if(!e.mainSamples.count({root,v})) throw std::runtime_error("Missing one of 16 velocity layers");
    if(e.mainSamples.empty()) throw std::runtime_error("No piano samples for requested notes");
    unsigned sourceRate=e.mainSamples.begin()->second.rate;
    for(const auto& entry:e.mainSamples) if(entry.second.rate!=sourceRate) throw std::runtime_error("Mixed main-sample rates are unsupported");
    e.volumeTarget=p->volumeTarget; e.volumeCurrent=e.volumeTarget;
    p=std::move(next);
}
void Engine::noteOn(int n,int velocity) {
    if(n<21 || n>108 || velocity<0 || velocity>127) return;
    if(!velocity) { noteOff(n); return; } auto& e=*p; int root=e.roots[n];
    // App extension: approximate una corda at attack, without separate samples.
    velocity=std::max(1,int(std::lround(velocity*(1-.15f*e.softPedal))));
    auto mix=velocityMix(velocity,e.cfg.dry?1.f:e.cfg.velocityGamma);
    if(e.cfg.dry) { int layer=mix.a>=mix.b?mix.lo:mix.hi; mix={layer,layer,1,0,float(velocity)}; }
    auto a=e.mainSamples.find({root,mix.lo}), b=e.mainSamples.find({root,mix.hi}); if(a==e.mainSamples.end()||b==e.mainSamples.end()) return;
    e.keys[n]++; auto& v=e.alloc(); v.main=true; v.held=true; v.note=n; v.velocity=velocity;
    if(e.softPedal>0) v.softAlpha=float(std::exp(-2*pi*(20000-14000*e.softPedal)/e.cfg.sampleRate));
    v.s1=&a->second; v.s2=&b->second; v.step=v.s1->rate/e.cfg.sampleRate*std::pow(2.,(n-root)/12.);
    float gain=.70f*std::pow(mix.mapped/127.f,.5f); v.g1=mix.a*gain; v.g2=mix.b*gain;
}
void Engine::noteOff(int n) {
    if(n<21 || n>108) return; auto& e=*p;
    if(e.keys[n]) e.keys[n]--;
    Voice* found=nullptr;
    for(auto& v:e.voices) if(v.active&&v.main&&v.held&&v.note==n&&(!found||v.id<found->id)) found=&v;
    if(!found) return; found->held=false; int velocity=found->velocity;
    if(e.pedal*127<64 && !found->sostenuto) e.damping(*found);
    if(!e.cfg.dry) { auto s=e.releases.find(n); if(s!=e.releases.end()) e.shot(&s->second,n,.12f*std::pow(velocity/127.f,.5f)); }
}
void Engine::cc(int controller,int value) {
    auto& e=*p; value=std::clamp(value,0,127);
    if(controller==7) { setVolume(value/127.f); return; }
    if(controller==120) { reset(); return; }
    if(controller==123) { for(int n=21;n<=108;n++) while(e.keys[n]) noteOff(n); return; }
    if(controller==121) { cc(66,0); cc(67,0); cc(64,0); return; }
    if(controller==67) { e.softPedal=value/127.f; return; }
    if(controller==66) {
        bool down=value>=64;
        if(down==e.sostenutoDown) return;
        e.sostenutoDown=down;
        // Capture individual voices held at the pedal's rising edge only.
        for(auto& v:e.voices) if(v.active && v.main) {
            if(down) v.sostenuto=v.held;
            else if(v.sostenuto) {
                v.sostenuto=false;
                if(!v.held && e.pedal*127<64) e.damping(v);
            }
        }
        return;
    }
    if(controller!=64) return; bool old=e.pedal*127>=64; e.pedal=value/127.f; bool down=value>=64;
    if(old!=down && !e.cfg.dry) {
        int index=(down?1:3)+(e.pedalCycle[down?0:1]++%2); auto it=e.pedals.find(index);
        if(it!=e.pedals.end()) e.shot(&it->second,0,.08f);
    }
    for(auto& v:e.voices) if(v.active&&v.main&&!v.held) {
        if(down && v.env>.025f) { v.released=false; v.damperSound=false; }
        else if(!down && !v.sostenuto) e.damping(v);
    }
}
void Engine::setVolume(float volume) {
    if(std::isfinite(volume)) p->volumeTarget=std::clamp(volume,0.f,1.f);
}
float Engine::volume() const { return p->volumeTarget; }
void Engine::process(float* left,float* right,unsigned frames) {
    auto& e=*p;
    for(unsigned i=0;i<frames;i++) {
        float l=0,r=0;
        for(auto& v:e.voices) if(v.active) {
            size_t at=size_t(v.pos); if(at+1>=v.s1->l.size() || (v.s2 && at+1>=v.s2->l.size())) {v.active=false;continue;}
            float frac=float(v.pos-at); auto interp=[at,frac](const std::vector<float>& x){return x[at]+frac*(x[at+1]-x[at]);};
            float attack=v.main?std::min(1.f,float(v.pos/(v.s1->rate*.0007))):1.f;
            float vl=v.g1*interp(v.s1->l)+(v.s2?v.g2*interp(v.s2->l):0);
            float vr=v.g1*interp(v.s1->r)+(v.s2?v.g2*interp(v.s2->r):0);
            if(v.softAlpha>0) {
                v.softL=(1-v.softAlpha)*vl+v.softAlpha*v.softL;
                v.softR=(1-v.softAlpha)*vr+v.softAlpha*v.softR;
                vl=v.softL; vr=v.softR;
            }
            l+=v.env*attack*vl;
            r+=v.env*attack*vr;
            v.pos+=v.step; if(v.released) v.env*=v.decay; if(v.env<.00003f) v.active=false;
        }
        if(!e.cfg.dry) {
            double resonance=0; float input=(l+r)*.5f;
            for(int k=0;k<88;k++) {
                auto& m=e.modes[k]; double openness=e.keys[k+21]?1:e.pedal;
                double y=m.c*m.y1-m.r*m.r*m.y2+(1-m.r)*input*openness;
                m.y2=m.y1; m.y1=std::abs(y)<1e-20?0:y; resonance+=y*openness;
            }
            l+=float(resonance)*e.cfg.resonance; r+=float(resonance)*e.cfg.resonance;
            float vals[2]={l,r};
            for(int ch=0;ch<2;ch++) {
                float x=vals[ch]; for(auto& eq:e.eq[ch]) x=eq.tick(x);
                auto& ring=e.early[ch]; ring[e.earlyPos]=x;
                float reflections=0;
                const double times[3]={.018,.033,.061}; const float gains[3]={.40f,.30f,.20f};
                for(int t=0;t<3;t++) { size_t delay=size_t((times[t]+ch*.0023)*e.cfg.sampleRate); reflections+=gains[t]*ring[(e.earlyPos+ring.size()-delay)%ring.size()]; }
                float wet=0; for(auto& d:e.comb[ch]) wet+=d.tick(x*.25f);
                vals[ch]=x+e.cfg.room*reflections+e.cfg.reverb*wet;
            }
            e.earlyPos=(e.earlyPos+1)%e.early[0].size(); l=vals[0]; r=vals[1];
        }
        e.volumeCurrent=e.volumeTarget+(e.volumeCurrent-e.volumeTarget)*e.volumeSmoothing;
        if(std::abs(e.volumeCurrent-e.volumeTarget)<1e-6f) e.volumeCurrent=e.volumeTarget;
        float outputGain=e.cfg.gain*e.volumeCurrent;
        l*=outputGain; r*=outputGain;
        float peak=std::max(std::abs(l),std::abs(r)); float target=peak>.94f?.94f/peak:1;
        if(target<e.limitGain) e.limitGain=target;
        else e.limitGain=target+(e.limitGain-target)*e.limiterRelease;
        left[i]=l*e.limitGain; right[i]=r*e.limitGain;
    }
}
void Engine::reset() {
    auto& e=*p; e.voices={}; e.keys={}; e.pedal=0; e.softPedal=0; e.sostenutoDown=false; e.limitGain=1; e.volumeCurrent=e.volumeTarget;
    for(auto& m:e.modes) m.y1=m.y2=0;
    for(auto& channel:e.eq) for(auto& b:channel) b.z1=b.z2=0;
    for(auto& channel:e.comb) for(auto& d:channel) {std::fill(d.data.begin(),d.data.end(),0);d.low=0;d.pos=0;}
    for(auto& ring:e.early) std::fill(ring.begin(),ring.end(),0); e.earlyPos=0;
}
unsigned Engine::activeVoices() const {unsigned n=0;for(auto& v:p->voices) n+=v.active;return n;}
uint64_t Engine::loadedBytes() const {return p->bytes;}
}
