# Piano Practice Studio

A browser-based piano learning app with interactive sheet music, independent-hand exercises, daily sight-reading rotation, a skill graph, microphone-assisted note practice, and sampled piano playback.

## Features

- Separate right-hand, left-hand, and two-hand practice.
- Sheet music with a smooth timeline, adjustable tempo, passage loops, and a focused view.
- Daily reading rotation: 252 exercise families and 1,008 variations.
- A skill graph connecting lessons and learning goals.
- Local microphone analysis for supported note practice, with experimental chord features.
- Salamander piano samples; audio processing and practice progress stay on the device.

## Run locally

Requires Python 3. From this directory:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080/. Serve the files over HTTP instead of opening index.html directly. Microphone access requires HTTPS or localhost. Native SFZ engines require the development project's local server and are unavailable in this static distribution.

## Publish on GitHub Pages

Create an empty repository named `piano-practice-studio` (or your preferred name), then upload the CONTENTS of this directory to its root, including `.nojekyll`.

For a fresh public repository, extract `piano-practice-studio-public.zip` into a NEW empty directory. The ZIP excludes existing Git history. Run the following there, replacing YOUR_USERNAME:

```sh
git init -b main
git add .
git commit -m "Publish Piano Practice Studio"
git remote add origin https://github.com/YOUR_USERNAME/piano-practice-studio.git
git push -u origin main
```

In GitHub: Settings → Pages → Deploy from a branch → main → /(root).
The site URL will be https://YOUR_USERNAME.github.io/piano-practice-studio/.

This is a static distribution, not the development repository. No npm install or build step is required. Rebuild it from the original project with `npm run build:static`, then commit and push the updated files here. The builder preserves this directory's `.git` folder.

## Assets and attribution

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for third-party credits and terms. VexFlow is MIT-licensed; Salamander recordings and their adaptations use CC BY 3.0. Those licenses do not automatically cover the application or book-derived lesson content. This distribution does not grant a new open-source license.

Original book PDFs, imported XML/MIDI sources, the hidden song, native engines, development tools, and local user recordings are excluded. Lesson data remains included. Microphone recognition is experimental; self-assessment is used where reliable automatic evaluation is unavailable.
