#pragma once
#include <array>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>
namespace nhien {
struct Config {
    double sampleRate = 48000;
    float velocityGamma = 1.12f, gain = 0.55f, release = 0.22f;
    float resonance = 0.09f, room = 0.16f, reverb = 0.12f;
    bool dry = false;
};
struct LayerMix { int lo, hi; float a, b, mapped; };
LayerMix velocityMix(int velocity, float gamma);
class Engine {
public:
    explicit Engine(Config config = {});
    ~Engine();
    Engine(const Engine&) = delete;
    Engine& operator=(const Engine&) = delete;
    // Call on loader/control thread BEFORE playback. notes empty = full bank.
    void loadBank(const std::string& manifest, const std::vector<int>& notes = {});
    // All event and process calls belong to one audio thread; no internal locks.
    void noteOn(int note, int velocity);
    void noteOff(int note);
    void cc(int controller, int value);
    // 0..1 linear output level; smoothed over ~20ms before the limiter.
    void setVolume(float volume);
    float volume() const;
    void process(float* left, float* right, unsigned frames);
    void reset(); // Clears voices AND effect tails.
    unsigned activeVoices() const;
    uint64_t loadedBytes() const;
private:
    struct Impl;
    std::unique_ptr<Impl> p;
};
}
