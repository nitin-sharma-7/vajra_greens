# Vajra Greens

An editorial website for Vajra Greens Power & Energy LLP, built with Next.js 16, React, TypeScript, Tailwind CSS 4, GSAP, ScrollTrigger, and Lenis.

## Run locally

```bash
npm ci
npm run dev
```

Open the local URL printed by Next.js. `npm run build` creates the production build; `npm run start` serves it.

## Structure

- `app/page.tsx` assembles the homepage chapters.
- `components/home/` contains the five story groups and their scoped GSAP motion.
- `components/pages/` and the supporting routes use Tailwind utilities for reusable content layouts.
- `app/globals.css` holds design tokens and the custom film, map, and editorial compositions.
- `public/media/` holds the supplied videos, original photo and logo, and lossless full-resolution video posters.

The three source MP4 files and original supplied JPEG/PNG are copied without recompression. Media is served directly rather than through image optimization.

## Scroll image playback

The homepage uses all 240 native-resolution PNG frames from each supplied video. Playback uses the original PNGs without lossy conversion.

- `python scripts/extract_sequences.py` regenerates PNG frames (requires OpenCV).
- `lib/sequence-player.ts` preloads evenly spaced anchor frames plus nearby frames, then blends at fractional GSAP scroll positions. This keeps the displayed position moving while a more detailed frame is loading.
- The decoded cache is capped at 40 native images on desktop and 28 on mobile. Offscreen sequences release decoded images. Reduced motion displays static posters.

Slow connections can still delay a cold buffer. The player retains a valid image and blends between available frames while closer images arrive. Original PNG quality is preserved; blending is a motion effect, not additional captured video frames.

With production running on port 3002, `node scripts/motion-check.mjs` measures continuous scrolling and `node scripts/sequence-check.mjs` checks forward/reverse playback, mobile, reduced motion, and navigation cleanup. Results are written to `.qa/`.

The roadmap values are proposed targets from the supplied company presentation and are labelled accordingly. Contact details come from the supplied registration document.

Set `NEXT_PUBLIC_SITE_URL` to the deployed site origin to enable absolute Open Graph image URLs.

## Visual review

With the site running, set `VAJRA_SITE_URL` to its local URL and run `npm run visual-check`. The script uses a locally installed Chrome browser and writes screenshots to `.qa/`.
