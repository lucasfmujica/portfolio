# Case-study capture

Stills and clips of live client sites for `src/data/projects.ts`. Headless
Chrome over the DevTools Protocol, so GSAP/ScrollTrigger animations actually run.
Needs Chrome, Node, and Xcode's `swiftc` (for the encoder). No ffmpeg.

## Stills

    node scripts/capture/shoot.mjs <url> out.png 1600 900 0                    # hero, 16:9
    node scripts/capture/shoot.mjs <url> out.png 1400 900 '<section selector>'
    SHOOT_DSF=3 node scripts/capture/shoot.mjs <url> m.png 430 932 0           # mobile, sharp

It walks the whole page first so every reveal finishes, and hides the
`.webflow.io` badge. Hide anything else (promo modals) with
`SHOOT_HIDE='.modal1_component'`.

Then convert with sharp, e.g.
`node -e "require('sharp')('out.png').webp({quality:70}).toFile('public/assets/x-hero.webp')"`.
**Heroes must be 16:9** (the hero frame is 16:9 and crops anything else). For
gallery shots add the real pixel size to `SHOT_ASPECT` in `CaseStudyGallery.tsx`.

## Clips

    SHOOT_TARGET='<section selector>' node scripts/capture/film.mjs <url> /tmp/frames 1280 720 5
    node scripts/capture/film-load.mjs <url> /tmp/frames 1280 720 6       # a preloader
    node scripts/capture/film-drag.mjs <url> /tmp/frames 1280 720 '.ba-viewport' '.ba-handle' 6
    node scripts/capture/clip.mjs /tmp/frames public/assets/x-shot1.mp4   # 5s, 24fps, 960px

Then set `video` on the shot; its `image` becomes the poster and the
reduced-motion fallback (`VideoFill`).

Things that went wrong once and are now handled or worth remembering:

- **Never warm up before filming.** Reveals are `once: true`; pre-scrolling burns them.
- **Keep the window tight.** In a loop, the share of the clip that shows the
  subject is the share of time a viewer sees it. Tune with `SHOOT_LEAD` / `SHOOT_TRAIL`.
- **Check the caption against the clip.** Measure what actually moves before
  writing "tied to the scroll": sample an element's position at several scroll
  offsets with waits in between. If it doesn't change, it isn't scroll-tied.
- `film-load` captures the blank tab first; `clip.mjs --skip N` drops those frames.
- One clip per case study: each is ~600–800 KB.
