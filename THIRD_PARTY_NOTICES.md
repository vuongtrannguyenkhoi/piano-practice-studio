# Third-party assets

## Salamander Grand Piano V3

Original samples: Alexander Holm, licensed under Creative Commons Attribution 3.0 Unported (CC BY 3.0).

- Original instrument: https://github.com/sfzinstruments/SalamanderGrandPiano
- Original recording archive: https://archive.org/details/SalamanderGrandPianoV3
- License: https://creativecommons.org/licenses/by/3.0/
- MP3 distribution used here: https://github.com/Tonejs/audio/tree/master/salamander

This project embeds 39 stereo MP3 samples: 13 pitches (F#2 through F#5, in minor thirds), each with original velocity layers v5, v9 and v13 mapped to velocities 40, 72 and 104. They were converted from the original repository FLAC files to 44.1 kHz / 160 kbps MP3, peak normalized to -0.8 dBFS individually, limited to ten seconds with a final 0.4-second fade, and base64 embedded for offline `file://` use. Rebuild with `scripts/build-piano-samples.py` and the original FLAC folder. Intermediate notes use playback-rate transposition by at most one semitone for the current 50 lessons. Playback selects a timbre layer independently of chord-volume compensation, then applies gain and articulation envelopes. This is a three-layer adaptation, not the complete 16-layer SFZ instrument. A generated stereo room response is added locally; no pedal, hammer-noise, or sympathetic-resonance layers are included.

`assets/demo-salamander.mp3` is an 8.8-second preview of the first two measures of lesson 1, mixed from the new samples with pitch transposition and playback gain/release envelopes. It is dry, without metronome, room convolution or compressor. Rebuild with `scripts/build-piano-demo.py`.

`assets/salamander-web/` (the web bank, shown as "Accurate-Salamander web") holds 568 MP3 files made by `scripts/build-salamander-web.py` from the Accurate-Salamander Grand Piano 6.2 (see below), itself a remastered and retuned edition of these V3 samples: all 30 recorded pitches (A0 through C8, in minor thirds) with all 16 velocity layers, trimmed to 10/8/5 seconds by register with a 0.4 s fade, and the 88 key-release noises trimmed to 1.5 seconds, all peak-normalised to -0.8 dBFS and encoded at 128 kbps. The app applies each key's tuning from the Accurate-Salamander SFZ on playback.

## VexFlow 4.2.5

Copyright (c) Mohit Muthanna Cheppudira 2010. MIT License.

- Project and documentation: https://github.com/0xfe/vexflow
- Pinned browser bundle: https://cdn.jsdelivr.net/npm/vexflow@4.2.5/build/cjs/vexflow.js
- Complete license: `vendor/VEXFLOW-LICENSE.txt`

The browser bundle is included locally, unchanged, so score rendering requires no network connection.

## Complete Salamander SFZ bank and native sfizz

`assets/salamander-full` contains the unmodified upstream SFZ, Data includes, and all 641 FLAC samples, pinned to sfzinstruments/SalamanderGrandPiano commit `3382bf9496bba2486f5ab0de55a264d1dfc38404`. Alexander Holm's recordings are CC BY 3.0; the retuned version credits Markus Fiedler and the SFZ reconstruction credits kinwie. The original README and complete license are included. `vendor/salamander-manifest.json` records Git blob SHA-1 values for verifying all 667 distributed files. No normalization, trimming, resampling, or lossy encoding is applied to this bank.

Full mode uses sfizz 1.2.3, BSD-2-Clause, from https://github.com/sfztools/sfizz/releases/tag/1.2.3. The complete license, authors, third-party notices, original source archive and C API header accompany the ARM64 library in `vendor/sfizz`. The build removes four redundant `template` disambiguators in the bundled atomic_queue header for modern Clang, and uses the `aarch64` processor identifier to avoid ARM32-only compiler flags. `scripts/build-sfizz-macos.py` reproduces these changes. Browser playback receives an offline rendered 48 kHz stereo float WAV; a final tail fade and overflow protection are applied, while original instrument dynamics remain in the SFZ engine. This integration is not an ARIA/sforzando runtime and does not claim identical behavior for every ARIA extension.

`assets/demo-salamander-full.mp3` is a 12.5-second preview (eight seconds of lesson 1 plus the SFZ release tail), rendered through the native SFZ service and encoded at 192 kbps. It omits browser room convolution and the metronome. Rebuild while the service is running with `python3 tests/full-http-check.py`.

## Accurate-Salamander

Accurate-Salamander Grand Piano 6.2 by the Accurate-Salamander Project (https://www.ir.isas.jaxa.jp/~cyamauch/AccurateSalamander/) is a remastered and retuned edition of the Salamander Grand Piano V3 by Alexander Holm, released under the same Creative Commons Attribution 3.0 license (https://creativecommons.org/licenses/by/3.0/). Retuning by Hiroharu Narikawa. The app's web bank (`assets/salamander-web/`, above) is made from its "Accurate-Salamander" soundbank with `scripts/build-salamander-web.py`; the soundbank itself (`assets/accurate-salamander-full`) is not distributed. The embedded compact bank and the native SFZ engine still use the original Salamander V3.

## Optional Piano in 162

`assets/piano-polyphony-dictionary.json` contains derived, normalized spectral features for an experimental NNLS observer, not audio samples. It is prepared locally from Salamander Grand Piano by Alexander Holm (CC BY 3.0, see the credits above), the user's installed Piano in 162 Close conversion by Simon Dalzell / Ivy Audio, and application-generated harmonic tones. Original sample ownership and terms continue to apply to the derived features. The JSON records its training file hashes; no claim is made that these features model other pianos or acoustic microphone recordings.

Piano in 162 is a Steinway Model B sample library by Simon Dalzell / Ivy Audio: https://www.ivyaudio.com/freebies. This project loads the user's SFZ patches. The user supplied `vendor/PianoIn162-SFZ`, a personal conversion from their Korg bank: stereo FLAC 44.1 kHz / 16-bit, 880 Close pedal-off/on samples and 439 Ambient pedal-off samples. These recordings and patches are left unchanged. They are not described as the original Ivy SFZ release: five velocity bands are reconstructed, with one take per layer and no recovered PCG effects, original release noises or original round robin programming. The source README and conversion manifest accompany the samples. The installer validates referenced samples and records their existing local paths. Ivy Audio's samples retain their original ownership and terms; the Salamander CC BY 3.0 license does not apply to them. Routing tests use generated tones in temporary folders, not substitutes distributed as Piano in 162.

The four SFZ presets in `assets/piano162-presets` are application-authored settings referencing the user's unchanged Piano in 162 Korg-conversion samples by relative path. They adjust velocity crossfades, amplifier velocity tracking, release and microphone mix; they do not restore original Korg PCG settings or add original round robins/release recordings. The five comparison MP3s render the same eight-measure song excerpt with identical notes, velocities and timing. Presets and previews do not change the underlying recordings' ownership or redistribution terms.

`scripts/build-piano162-web.py` can make an MP3 web bank (`assets/piano162-web`, 440 files) from the user's Piano in 162 conversion for the browser engine on the user's own computer. It is excluded from git and from the public build; `scripts/build-static.py --with-piano162` would include it and should only be used once Ivy Audio's terms are confirmed to allow redistribution. Developer mode (`dev-mode.js`, docs/DEV-MODE.md) can read that folder from the developer's own disk into their browser for testing; nothing is uploaded or published.

## VCSL Keys

VCSL Keys by Versilian Studios LLC, SFZ patches by Peter Eastman, is released under CC0-1.0: https://versilian-studios.com/vcsl-keys/ and https://creativecommons.org/publicdomain/zero/1.0/. The official archive is https://versilian-studios.com/Distro/VCSL_Keys.zip. All 1481 archive files are distributed unchanged in `assets/vcsl-keys`; `vendor/vcsl-keys-manifest.json` records archive and file SHA-256 values. The app registers the original `Grand Piano, S Model B 1895.sfz` patch, with 3 velocity layers and 351 sample files, and renders it through native sfizz. `SOURCE.md` and `assets/vcsl-config.json` are project metadata. No MP3 substitutions are presented as the full instrument. The generated VCSL previews use the same lesson/song pitch, timing and velocity grid as the Salamander comparison.
