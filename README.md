# jeremyloreau.com scripts

Custom scripts for [jeremyloreau.com](https://www.jeremyloreau.com/) (Webflow), maintained by [Bolk Studio](https://bolk.studio/) and served through [jsDelivr](https://www.jsdelivr.com/) from this public repository.

## Scripts

| Script | What it does | Where to load it |
|---|---|---|
| [`wistia-facade.js`](wistia-facade.js) | Replaces Wistia, YouTube and Vimeo videos (Rich Text and Webflow Video elements) with a thumbnail + play button; the player loads on click only (Core Web Vitals). | Site settings > Custom code > **Head code, very top** |

## Usage with jsDelivr

jsDelivr serves any file of this repo, and minifies it on the fly when you request `.min.js`:

```html
<script src="https://cdn.jsdelivr.net/gh/bolkstudio/jeremyloreau-scripts@v1.2.0/wistia-facade.min.js"></script>
```

Rules:
- **Always pin a tag** (`@v1.1.0`), never `@main` or `@latest`: branch URLs are cached for up to 7 days and can change under the live site. New version = new tag + update the URL in Webflow (staging first).
- After pushing a tag, open the URL once in a browser to check it resolves before pasting it in Webflow.
- Need to refresh a cached file anyway: `https://purge.jsdelivr.net/gh/bolkstudio/jeremyloreau-scripts@<tag>/<file>`.

### wistia-facade.js

- Load it as a classic script: no `async`, no `defer`, no `type="module"`. It must run before the Rich Text iframes are parsed, otherwise the videos start loading before it can stop them.
- Targets Embedly, Wistia, YouTube and Vimeo iframes in `figure.w-richtext-figure-type-video` (Rich Text) and in Webflow Video elements (`.w-video`, e.g. `video_bg_video`, `vimeo_iframe`).
- Rich Text: the iframe is removed, a new player iframe is created on click. Video elements: the iframe stays in the DOM with an empty `srcdoc` (so other site scripts can still read its `src`, e.g. the exercise preview script), and `srcdoc` is removed on click.
- Skipped: popups (`[cd-popup-wrap]`, `[cd-popup-root]`, `[data-jl-video-preview]`) and stages built by the site (`[data-media-stage]`).
- YouTube plays from `youtube-nocookie.com`.
- Opt-out on a page or section: `data-jl-wistia-facade="off"` on any ancestor.
- Works alongside the site's `jl-wistia-native-frames` script (same player URL shape, no reload).

## Versions

| Tag | Date | Notes |
|---|---|---|
| v1.2.0 | 2026-11-25 | Also covers Webflow Video elements outside Rich Text (method, testimonials, exercises) and YouTube / Vimeo embeds. Video element iframes are neutralised with `srcdoc` instead of being removed. |
| v1.1.1 | 2026-11-25 | Clicking the thumbnail opened the site's image lightbox instead of the video: thumbnail excluded from the lightbox (`cd-lightbox-exclude`, `pointer-events: none` on the image). |
| v1.1.0 | 2026-11-25 | wistia-facade, first public version (CSS injected by the script, observer stops at DOMContentLoaded). |
