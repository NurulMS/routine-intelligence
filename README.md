# Routine Intelligence

A mobile-first personal routine app spanning care, training and study.

## Core flow

**Red + NIR → Workout → Shower / Reset → Morning Skincare**

The V1 interface is designed as a chronological “what do I do next?” experience rather than a collection of disconnected trackers.

## GitHub Pages

This version is deliberately static: plain HTML, CSS and JavaScript, with browser `localStorage` for check-ins. No Vercel, backend, account, API key or database is required.

To publish: upload these files to the repository root, then open **Settings → Pages → Build and deployment → Deploy from a branch**, choose `main` and `/ (root)`, then Save.

## Data

Training is seeded from the owner's supplied MuscleWiki workout exports. Missing sets, reps and loads remain unconfigured rather than being invented.

See `DATA_PROVENANCE.md`.
