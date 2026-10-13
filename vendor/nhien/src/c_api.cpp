#include "nhien_c.h"
#include "nhien.hpp"
#include <exception>
struct nhien_engine { nhien::Engine engine; std::string error; explicit nhien_engine(double sr):engine([sr]{nhien::Config c;c.sampleRate=sr;return c;}()){} };
extern "C" {
nhien_engine* nhien_create(double sr) { try{return new nhien_engine(sr);}catch(...){return nullptr;} }
void nhien_destroy(nhien_engine* e){delete e;}
int nhien_load(nhien_engine* e,const char* path){if(!e||!path)return 0;try{e->engine.loadBank(path);e->error.clear();return 1;}catch(const std::exception& x){e->error=x.what();return 0;}}
const char* nhien_error(nhien_engine* e){return e?e->error.c_str():"Null engine";}
void nhien_note_on(nhien_engine* e,int n,int v){if(e)e->engine.noteOn(n,v);}
void nhien_note_off(nhien_engine* e,int n){if(e)e->engine.noteOff(n);}
void nhien_cc(nhien_engine* e,int n,int v){if(e)e->engine.cc(n,v);}
void nhien_set_volume(nhien_engine* e,float v){if(e)e->engine.setVolume(v);}
float nhien_volume(nhien_engine* e){return e?e->engine.volume():0.f;}
void nhien_process(nhien_engine* e,float* l,float* r,unsigned n){if(e&&l&&r)e->engine.process(l,r,n);}
void nhien_reset(nhien_engine* e){if(e)e->engine.reset();}
}
