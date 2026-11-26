# jeremyloreau.com scripts

Custom scripts for [jeremyloreau.com](https://www.jeremyloreau.com/) (Webflow), maintained by [Bolk Studio](https://bolk.studio/) and served through [jsDelivr](https://www.jsdelivr.com/) from this public repository.

## Scripts

| Script | What it does | Where to load it |
|---|---|---|
| [`wistia-facade.js`](wistia-facade.js) | Wistia, YouTube, Vimeo and Loom videos (Rich Text and Webflow Video elements) only load when they come near the screen, with the site's original player and rendering. Optional click-to-play thumbnail mode (Core Web Vitals). | Site settings > Custom code > **Head code, very top** |
| [`jl-global.js`](jl-global.js) | Jérémy's global scripts (cookie labels, media focus, nav timing, deferred sliders, `JLDirectVideo`, Wistia native frames), moved out of the first `global-styles` embed unchanged. | Same place, sync: first embed of the `global-styles` component |
| [`jl-ascii.js`](jl-ascii.js) | Jérémy's ASCII system (image previews, media feedback, fade, click text, page loader, silhouette, progressive reveal), moved out of the three ASCII embeds unchanged. Needs `jl-content-boot-v2` (inline, Head). | Same place, sync: first ASCII embed of `global-styles` |
| [`jl-pages.js`](jl-pages.js) | Scripts that wait for DOMContentLoaded (programmes, Hyvor, tables, account form, library focus, summaries, scroll lock, card helpers). Page-specific ones only run where their target exists. | Footer code, `defer` |
| [`jl-footer.js`](jl-footer.js) | Only the Footer code scripts (programmes, cookie link EN, summaries, scroll lock, card helpers), for when the `global-styles` scripts stay inline. Do not load together with `jl-pages.js`. | Footer code, `defer` |

## Usage with jsDelivr

jsDelivr serves any file of this repo, and minifies it on the fly when you request `.min.js`:

```html
<script src="https://cdn.jsdelivr.net/gh/bolkstudio/jeremyloreau-scripts@v1.3.0/wistia-facade.min.js"></script>
```

Rules:
- **Always pin a tag** (`@v1.1.0`), never `@main` or `@latest`: branch URLs are cached for up to 7 days and can change under the live site. New version = new tag + update the URL in Webflow (staging first).
- After pushing a tag, open the URL once in a browser to check it resolves before pasting it in Webflow.
- Need to refresh a cached file anyway: `https://purge.jsdelivr.net/gh/bolkstudio/jeremyloreau-scripts@<tag>/<file>`.

### wistia-facade.js

- Load it as a classic script: no `async`, no `defer`, no `type="module"`. It must run before the Rich Text iframes are parsed, otherwise the videos start loading before it can stop them.
- Targets Embedly, Wistia, YouTube, Vimeo and Loom iframes in `figure.w-richtext-figure-type-video` (Rich Text) and in Webflow Video elements (`.w-video`, e.g. `video_bg_video`, `vimeo_iframe`).
- Default "lazy" mode: the iframe stays in the DOM with an empty `srcdoc` (other site scripts can still read and rewrite its `src`), and `srcdoc` is removed when the video is within 1.5 screen heights of the viewport. The original player loads unchanged: Wistia autoplay loops, animated video thumbnails, controls. Videos in hidden containers (closed accordions) load when shown.
- "click" mode, opt-in with `data-jl-wistia-facade="click"` on an ancestor: thumbnail + play button, the player loads on click only. Rich Text iframes are replaced by a new player iframe on click; Video element iframes keep their `srcdoc` until the click.
- Skipped: popups (`[cd-popup-wrap]`, `[cd-popup-root]`, `[data-jl-video-preview]`) and stages built by the site (`[data-media-stage]`).
- YouTube plays from `youtube-nocookie.com`.
- Opt-out on a page or section: `data-jl-wistia-facade="off"` on any ancestor.
- Works alongside the site's `jl-wistia-native-frames` script (same player URL shape, no reload).

### jl-global.js, jl-ascii.js, jl-pages.js

- Generated from the published inline code (26 November 2026), not edited: each original script is wrapped in its own `try/catch` so one error does not stop the others, as with separate inline scripts.
- Why: inline code is downloaded again with every page; external files are cached after the first page (HTML -67 KB gzip per page, main-thread blocking -0.5 to -0.7 s from the second page in lab tests).
- `jl-global.js` and `jl-ascii.js` must stay synchronous and at the same position (other inline code reads `JLDirectVideo`, `__jlSliders` and the ASCII engine during parsing). Preload both from the Head.
- Kept inline on purpose: `jl-content-boot-v2`, `jl-image-dimensions-v1`, `jl-alternative-sort`, the lightbox scripts (must run before first paint or before page code), the Relkit counters (must run before BolkLab).

## Slater files (`slater/`)

[`slater/jl-global.js`](slater/jl-global.js) and [`slater/jl-pages.js`](slater/jl-pages.js) are pasted into Slater (project Jeremy Loreau), which runs them as ES modules after DOMContentLoaded. They hold the scripts that can run that late without any visible change; the rest stays in Webflow (see the procedure in Bolk's notes). Each original script runs in its own `try/catch`. Two adaptations: the footer year runs immediately, and the Hyvor script also checks once at start. Do not wrap them in a DOMContentLoaded listener.

## Versions

| Tag | Date | Notes |
|---|---|---|
| (commit `dbad517`) | 2026-11-26 | `jl-global.js`, `jl-ascii.js`, `jl-pages.js` v1.0.0 added. |
| v1.3.0 | 2026-11-26 | Default mode is now "lazy": videos load near the viewport with the original player, no visual change (keeps Wistia autoplay and animated thumbnails). The click-to-play thumbnail becomes opt-in (`data-jl-wistia-facade="click"`). Loom embeds covered. |
| v1.2.0 | 2026-11-25 | Also covers Webflow Video elements outside Rich Text (method, testimonials, exercises) and YouTube / Vimeo embeds. Video element iframes are neutralised with `srcdoc` instead of being removed. |
| v1.1.1 | 2026-11-25 | Clicking the thumbnail opened the site's image lightbox instead of the video: thumbnail excluded from the lightbox (`cd-lightbox-exclude`, `pointer-events: none` on the image). |
| v1.1.0 | 2026-11-25 | wistia-facade, first public version (CSS injected by the script, observer stops at DOMContentLoaded). |
