#ifndef NHIEN_C_H
#define NHIEN_C_H
#ifdef __cplusplus
extern "C" {
#endif
typedef struct nhien_engine nhien_engine;
/* Single audio-thread owner. Load/reset only while audio is stopped.
   Stereo float32 planar output. Events dispatched between process segments. */
nhien_engine* nhien_create(double sample_rate);
void nhien_destroy(nhien_engine*);
int nhien_load(nhien_engine*, const char* manifest);
const char* nhien_error(nhien_engine*);
void nhien_note_on(nhien_engine*, int note, int velocity);
void nhien_note_off(nhien_engine*, int note);
void nhien_cc(nhien_engine*, int controller, int value);
/* 0..1 linear level, clamped; call on audio-thread owner. NaN/Inf ignored. */
void nhien_set_volume(nhien_engine*, float volume);
float nhien_volume(nhien_engine*);
void nhien_process(nhien_engine*, float* left, float* right, unsigned frames);
void nhien_reset(nhien_engine*);
#ifdef __cplusplus
}
#endif
#endif
