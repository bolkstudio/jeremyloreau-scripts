/*!
 * wistia-facade v1.2.0
 * Bolk Studio, for jeremyloreau.com
 *
 * Wistia, YouTube and Vimeo videos embedded through Webflow (Embedly iframes in Rich Text
 * and in native Video elements, `.w-video`) are replaced by a thumbnail + play button while
 * the page loads. The real player is only loaded on click, then autoplays. Cuts the player
 * JS and video buffering that otherwise run on every page load (Core Web Vitals).
 *
 * - Rich Text videos: the iframe is removed and a new player iframe is created on click.
 * - Video elements outside Rich Text: the iframe stays in place (other site scripts read it),
 *   but an empty `srcdoc` keeps it from loading its `src` until the click.
 *
 * Install: classic synchronous <script> at the very top of the <head>
 * (no async, no defer, no type="module"), so it runs before the iframes are parsed.
 * Opt-out: data-jl-wistia-facade="off" on any ancestor of the video.
 */
(function () {
  'use strict';
  if (window.__jlWistiaFacade) return;
  window.__jlWistiaFacade = true;
  var doc = document;
  var ALLOW = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
  // Containers managed by other site scripts (popups, exercise previews already built by the site)
  var SKIP = '[data-jl-wistia-facade="off"],[cd-popup-wrap],[cd-popup-root],[data-jl-video-preview],[data-media-stage]';

  var CSS =
    '.jl-wistia-facade{position:absolute;inset:0;z-index:1;width:100%;height:100%;padding:0;margin:0;border:0;background:#000;cursor:pointer;overflow:hidden;display:block}' +
    '.jl-wistia-facade img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none}' +
    '.jl-wistia-facade__play{position:absolute;left:50%;top:50%;width:4.5rem;height:4.5rem;margin:-2.25rem 0 0 -2.25rem;border-radius:50%;background:rgba(0,0,0,.6);transition:transform .2s ease,background-color .2s ease}' +
    '.jl-wistia-facade__play::after{content:"";position:absolute;left:52%;top:50%;transform:translate(-50%,-50%);border-style:solid;border-width:.8rem 0 .8rem 1.35rem;border-color:transparent transparent transparent #fff}' +
    '.jl-wistia-facade:hover .jl-wistia-facade__play{transform:scale(1.08);background:rgba(0,0,0,.8)}' +
    '.jl-wistia-facade:focus-visible{outline:2px solid currentColor;outline-offset:2px}';

  function injectStyle() {
    if (doc.getElementById('jl-wistia-facade-css')) return;
    var style = doc.createElement('style');
    style.id = 'jl-wistia-facade-css';
    style.textContent = CSS;
    (doc.head || doc.documentElement).appendChild(style);
  }

  // Resolve an Embedly, Wistia, YouTube or Vimeo iframe URL to { kind, id, image, player }
  function resolve(src) {
    try {
      var u = new URL(src, location.href), image = null, host, id, m, q;
      for (var i = 0; i < 3 && /(^|\.)embedly\.com$/.test(u.hostname); i++) {
        image = image || u.searchParams.get('image');
        u = new URL(u.searchParams.get('src'));
      }
      host = u.hostname;
      if (/(^|\.)wistia\.(net|com)$/.test(host)) {
        id = (u.pathname.match(/\/(?:iframe|medias)\/([a-z0-9]+)/i) || [])[1];
        // Same URL shape as the site's jl-wistia-native-frames script, so it does not reload it
        return id ? { kind: 'wistia', id: id, image: image, player: 'https://fast.wistia.com/embed/iframe/' + id + '?autoPlay=true' } : null;
      }
      if (/(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be)$/.test(host)) {
        id = /youtu\.be$/.test(host) ? u.pathname.split('/')[1]
          : u.pathname === '/watch' ? u.searchParams.get('v')
          : (u.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/) || [])[1];
        if (!/^[\w-]{11}$/.test(id || '')) return null;
        q = new URLSearchParams(u.search);
        q.delete('v'); q.delete('feature');
        q.set('autoplay', '1'); q.set('playsinline', '1');
        return { kind: 'youtube', id: id, image: image || 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg', player: 'https://www.youtube-nocookie.com/embed/' + id + '?' + q };
      }
      if (/(^|\.)vimeo\.com$/.test(host)) {
        m = u.pathname.match(/^\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?\/?$/);
        if (!m) return null;
        q = new URLSearchParams(u.search);
        if (m[2] && !q.has('h')) q.set('h', m[2]);
        q.set('autoplay', '1'); q.set('playsinline', '1');
        return { kind: 'vimeo', id: m[1], image: image, player: 'https://player.vimeo.com/video/' + m[1] + '?' + q };
      }
    } catch (e) {}
    return null;
  }

  // Thumbnail <img>: Wistia in WebP at several widths, other providers as given by Embedly
  function thumbnail(info) {
    var wistia = info.kind === 'wistia' && info.image && info.image.match(/^https:\/\/embed-ssl\.wistia\.com\/deliveries\/([a-f0-9]+)/);
    if (!wistia && !info.image) return null;
    var img = doc.createElement('img');
    if (wistia) {
      var base = 'https://embed-ssl.wistia.com/deliveries/' + wistia[1] + '.webp?image_resize=';
      img.src = base + 960;
      img.srcset = [480, 960, 1440].map(function (w) { return base + w + ' ' + w + 'w'; }).join(', ');
      img.sizes = '(max-width: 767px) 100vw, 960px';
    } else {
      img.src = info.image;
    }
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    return img;
  }

  function facade(frame) {
    if (frame.__jlFacade) return;
    var stage = frame.parentElement;
    if (!stage || frame.closest(SKIP)) return;
    var rich = !!frame.closest('figure.w-richtext-figure-type-video');
    if (!rich && !stage.classList.contains('w-video')) return;
    var info = resolve(frame.getAttribute('src') || '');
    if (!info) return;
    frame.__jlFacade = true;
    injectStyle();

    var english = (doc.documentElement.lang || '').indexOf('en') === 0;
    var title = frame.getAttribute('title');
    if (!title || /^(Wistia|YouTube|Vimeo)/i.test(title)) title = english ? 'Video' : 'Vidéo';

    // Stop the iframe before it loads the player and buffers the video
    if (rich) {
      frame.removeAttribute('src');
      frame.remove();
    } else {
      frame.setAttribute('srcdoc', ''); // srcdoc wins over src: nothing is loaded, src stays readable
      frame.setAttribute('tabindex', '-1');
      frame.setAttribute('aria-hidden', 'true');
    }

    var button = doc.createElement('button');
    button.type = 'button';
    button.className = 'jl-wistia-facade';
    button.setAttribute('data-ascii-images', 'off');
    button.setAttribute('cd-lightbox-exclude', ''); // keep the site's image lightbox off the thumbnail
    button.setAttribute('aria-label', (english ? 'Play video: ' : 'Lire la vidéo : ') + title);
    var img = thumbnail(info);
    if (img) button.appendChild(img);
    var play = doc.createElement('span');
    play.className = 'jl-wistia-facade__play';
    play.setAttribute('aria-hidden', 'true');
    button.appendChild(play);
    stage.appendChild(button);

    button.addEventListener('click', function () {
      if (rich) {
        var player = doc.createElement('iframe');
        player.__jlFacade = true; // the observer must not turn the real player back into a facade
        player.src = info.player;
        player.title = title;
        player.allow = ALLOW;
        player.allowFullscreen = true;
        player.setAttribute('frameborder', '0');
        player.setAttribute('scrolling', 'no');
        ['width', 'height'].forEach(function (a) { if (frame.getAttribute(a)) player.setAttribute(a, frame.getAttribute(a)); });
        stage.replaceChild(player, button);
      } else {
        frame.allow = ALLOW;
        frame.allowFullscreen = true;
        frame.src = info.player;
        frame.removeAttribute('tabindex');
        frame.removeAttribute('aria-hidden');
        frame.removeAttribute('srcdoc'); // the iframe now loads its src
        button.remove();
      }
    }, { once: true });
  }

  function scan(node) {
    if (node.nodeType !== 1) return;
    if (node.tagName === 'IFRAME') facade(node);
    else if (node.getElementsByTagName) Array.prototype.forEach.call(node.getElementsByTagName('iframe'), facade);
  }

  // Catch iframes as the parser inserts them, then a final pass and stop at DOMContentLoaded
  // (the videos are in the HTML; no need to watch later DOM churn)
  var observer = new MutationObserver(function (records) {
    records.forEach(function (r) { r.addedNodes.forEach(scan); });
  });
  observer.observe(doc.documentElement, { childList: true, subtree: true });
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', function () { observer.disconnect(); scan(doc.documentElement); }, { once: true });
  } else {
    // Loaded too late (async/defer): still convert what is there, but the videos may already have started loading
    observer.disconnect();
    scan(doc.documentElement);
  }
})();
