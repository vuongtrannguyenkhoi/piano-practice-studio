// SPDX-License-Identifier: MIT
// Original integration / DSP code provided with Ballad Concert v1.
#pragma once
#include <sfizz.h>
#include <algorithm>
#include <array>
#include <cmath>
#include <stdexcept>
#include <vector>

namespace ballad {
constexpr double pi = 3.14159265358979323846;
struct Biquad {
    double b0=1,b1=0,b2=0,a1=0,a2=0,z1=0,z2=0;
    void set(double B0,double B1,double B2,double A0,double A1,double A2) {
        b0=B0/A0; b1=B1/A0; b2=B2/A0; a1=A1/A0; a2=A2/A0;
        z1=z2=0;
    }
    float tick(float x) {
        const double y=b0*x+z1;
        z1=b1*x-a1*y+z2; z2=b2*x-a2*y;
        return static_cast<float>(y);
    }
    void hp(double sr,double f,double q) {
        double w=2*pi*f/sr,c=std::cos(w),a=std::sin(w)/(2*q);
        set((1+c)/2,-(1+c),(1+c)/2,1+a,-2*c,1-a);
    }
    void bell(double sr,double f,double db,double q) {
        double A=std::pow(10,db/40),w=2*pi*f/sr,c=std::cos(w),a=std::sin(w)/(2*q);
        set(1+a*A,-2*c,1-a*A,1+a/A,-2*c,1-a/A);
    }
    void shelf(double sr,double f,double db) {
        double A=std::pow(10,db/40),w=2*pi*f/sr,c=std::cos(w);
        double a=std::sin(w)/std::sqrt(2.0),t=2*std::sqrt(A)*a;
        set(A*((A+1)+(A-1)*c+t),-2*A*((A-1)+(A+1)*c),
            A*((A+1)+(A-1)*c-t),(A+1)-(A-1)*c+t,
            2*((A-1)-(A+1)*c),(A+1)-(A-1)*c-t);
    }
};
struct Delay {
    std::vector<float> data; size_t pos=0;
    void prepare(size_t n) { data.assign(std::max(size_t(1),n),0); pos=0; }
    float peek() const { return data[pos]; }
    void push(float x) { data[pos]=x; if(++pos==data.size())pos=0; }
    float tick(float x) { float y=peek();push(x);return y; }
};
struct Comb {
    Delay delay; float gain=0,lp=0,alpha=0;
    void prepare(double sr,double ms) {
        size_t n=static_cast<size_t>(std::round(sr*ms/1000)); delay.prepare(n);
        gain=static_cast<float>(std::pow(10,-3.0*n/sr/2.2));
        alpha=static_cast<float>(std::exp(-2*pi*6500/sr)); lp=0;
    }
    float tick(float x) {
        float y=delay.peek(); lp=(1-alpha)*y+alpha*lp;
        delay.push(x+gain*lp); return y;
    }
};
struct Allpass {
    Delay delay;
    float tick(float x) { float d=delay.peek(),y=d-0.5f*x;delay.push(x+0.5f*y);return y; }
};
class BalladDSP {
    float wetMix=0.12f;
    std::array<std::array<Biquad,4>,2> eq;
    std::array<std::array<Comb,4>,2> comb;
    std::array<std::array<Allpass,2>,2> ap;
    std::array<Delay,2> pre;
    static float safety(float x) {
        constexpr float ceiling=0.89125094f,knee=ceiling*0.75f;
        float a=std::abs(x);
        if(a<=knee)return x;
        float y=knee+(ceiling-knee)*std::tanh((a-knee)/(ceiling-knee));
        return std::copysign(y,x);
    }
public:
    void setWet(float wet){wetMix=std::clamp(wet,0.0f,1.0f);}
    void prepare(double sr) {
        if(sr<16000 || sr>192000)throw std::invalid_argument("unsupported sample rate");
        const double delays[2][4]={{29.7,37.1,41.1,43.7},{30.9,38.7,42.3,45.1}};
        for(int c=0;c<2;++c) {
            eq[c][0].hp(sr,25,0.707);eq[c][1].bell(sr,180,1,0.7);
            eq[c][2].bell(sr,350,-1.2,1);eq[c][3].shelf(sr,4500,-1.8);
            pre[c].prepare(static_cast<size_t>(std::round(sr*0.022)));
            for(int i=0;i<4;++i)comb[c][i].prepare(sr,delays[c][i]);
            ap[c][0].delay.prepare(static_cast<size_t>(std::round(sr*(c?0.0057:0.005))));
            ap[c][1].delay.prepare(static_cast<size_t>(std::round(sr*(c?0.0019:0.0017))));
        }
    }
    void process(float* left,float* right,int frames,bool useSafety=true) {
        for(int n=0;n<frames;++n) {
            float dry[2]={left[n],right[n]};
            for(int c=0;c<2;++c)for(auto& f:eq[c])dry[c]=f.tick(dry[c]);
            float wet[2]={0,0};
            for(int c=0;c<2;++c) {
                float input=pre[c].tick(0.85f*dry[c]+0.15f*dry[1-c]);
                for(auto& f:comb[c])wet[c]+=0.25f*f.tick(input);
                for(auto& f:ap[c])wet[c]=f.tick(wet[c]);
            }
            constexpr float outputGain=1.41253754f; // +3 dB; matches preset JSON
            float l=outputGain*((1-wetMix)*dry[0]+wetMix*wet[0]);
            float r=outputGain*((1-wetMix)*dry[1]+wetMix*wet[1]);
            left[n]=useSafety?safety(l):l;right[n]=useSafety?safety(r):r;
        }
    }
};
class PianoEngine {
    sfizz_synth_t* synth=nullptr; BalladDSP dsp; int maxFrames=0,softPedal=0;
public:
    PianoEngine()=default;
    PianoEngine(const PianoEngine&)=delete;
    PianoEngine& operator=(const PianoEngine&)=delete;
    ~PianoEngine(){ if(synth)sfizz_free(synth); }
    // Call with the audio callback stopped; never load files on the audio thread.
    void prepare(const char* sfz,double sr=48000,int block=256,int voices=256) {
        if(sr<16000 || sr>192000 || block<1 || voices<1)
            throw std::invalid_argument("invalid engine configuration");
        if(synth)sfizz_free(synth);
        synth=sfizz_create_synth(); if(!synth)throw std::runtime_error("sfizz allocation failed");
        maxFrames=block; sfizz_set_sample_rate(synth,static_cast<float>(sr));
        sfizz_set_samples_per_block(synth,block); sfizz_set_num_voices(synth,voices);
        sfizz_set_volume(synth,0.0f); // sfizz's factory master default is below 0 dB
        // App offline adapter: finish sample reads before accelerated rendering.
        sfizz_enable_freewheeling(synth);
        if(!sfizz_load_file(synth,sfz))throw std::runtime_error("SFZ load failed");
        if(!sfizz_get_num_preloaded_samples(synth))throw std::runtime_error("No playable samples loaded");
        softPedal=0;
        dsp.prepare(sr);
    }
    void setWet(float wet){dsp.setWet(wet);}
    static int mapVelocity(int v) {
        if(v<=0)return 0;
        v=std::min(v,127);
        return std::max(1,static_cast<int>(std::lround(127*std::pow(v/127.0,1.13))));
    }
    // Route one piano MIDI channel here. Delay is the event offset in the next block.
    // Caller must validate delay in [0, frames-1] and submit events chronologically.
    void noteOn(int delay,int note,int velocity) {
        if(!synth || note<21 || note>108)return;
        if(velocity<=0){ noteOff(delay,note);return; }
        // Approximate una corda using softer attacks; SFZ also darkens via CC67.
        velocity=std::max(1,int(std::lround(velocity*(1.0-0.15*softPedal/127.0))));
        sfizz_send_note_on(synth,delay,note,mapVelocity(velocity));
    }
    void noteOff(int delay,int note) {
        if(synth && note>=21 && note<=108)sfizz_send_note_off(synth,delay,note,0);
    }
    void pedal(int delay,int value) {
        if(synth)sfizz_send_cc(synth,delay,64,value>=64?127:0);
    }
    void control(int delay,int number,int value) {
        value=std::clamp(value,0,127);
        if(number==64){pedal(delay,value);return;}
        if(number==67)softPedal=value;
        if(synth && (number==66 || number==67))sfizz_send_cc(synth,delay,number,value);
    }
    void panic() { if(synth)sfizz_all_sound_off(synth); }
    // Returns false for invalid block sizes. No allocations in normal processing.
    bool process(float* l,float* r,int n,bool applyEffects=true) {
        if(!synth || n<1 || n>maxFrames)return false;
        float* channels[2]={l,r};sfizz_render_block(synth,channels,2,n);
        if(applyEffects)dsp.process(l,r,n); return true;
    }
    int regions() const {return synth?sfizz_get_num_regions(synth):0;}
};
} // namespace ballad
