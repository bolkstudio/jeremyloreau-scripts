/*!
 * wistia-facade v1.1.1
 * Bolk Studio, for jeremyloreau.com
 *
 * Wistia videos embedded in Webflow Rich Text (Embedly or Wistia iframes) are replaced
 * by a thumbnail + play button while the page loads. The real Wistia player is only
 * created on click, then autoplays. Cuts the Wistia player JS and video buffering
 * that otherwise run on every page load (Core Web Vitals).
 *
 * Install: classic synchronous <script> at the very top of the <head>
 * (no async, no defer, no type="module"), so it runs before the Rich Text iframes are parsed.
 * Opt-out: data-jl-wistia-facade="off" on any ancestor of the video.
 */
(function () {
  'use strict';
  if (window.__jlWistiaFacade) return;
  window.__jlWistiaFacade = true;
  var doc = document;

  var CSS =
    '.jl-wistia-facade{position:absolute;inset:0;width:100%;height:100%;padding:0;margin:0;border:0;background:#000;cursor:pointer;overflow:hidden;display:block}' +
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

  // Resolve an Embedly or Wistia iframe URL to { id, image }
  function resolve(src) {
    try {
      var u = new URL(src, location.href), image = null;
      for (var i = 0; i < 3 && /(^|\.)embedly\.com$/.test(u.hostname); i++) {
        image = image || u.searchParams.get('image');
        u = new URL(u.searchParams.get('src'));
      }
      if (!/(^|\.)wistia\.(net|com)$/.test(u.hostname)) return null;
      var id = (u.pathname.match(/\/(?:iframe|medias)\/([a-z0-9]+)/i) || [])[1];
      return id ? { id: id, image: image } : null;
    } catch (e) { return null; }
  }

  // Wistia thumbnail at a given width, in WebP
  function thumb(image, width) {
    var m = image && image.match(/^https:\/\/embed-ssl\.wistia\.com\/deliveries\/([a-f0-9]+)/);
    return m ? 'https://embed-ssl.wistia.com/deliveries/' + m[1] + '.webp?image_resize=' + width : null;
  }

  function facade(frame) {
    if (frame.__jlFacade) return;
    var figure = frame.closest('figure.w-richtext-figure-type-video');
    if (!figure || figure.closest('[data-jl-wistia-facade="off"]')) return;
    var info = resolve(frame.getAttribute('src') || '');
    if (!info) return;
    frame.__jlFacade = true;
    injectStyle();

    var stage = frame.parentElement;
    var english = (doc.documentElement.lang || '').indexOf('en') === 0;
    var title = frame.getAttribute('title');
    if (!title || /^Wistia/.test(title)) title = english ? 'Video' : 'Vidéo';
    var width = frame.getAttribute('width'), height = frame.getAttribute('height');

    // Stop the iframe before it loads the player and buffers the video
    frame.removeAttribute('src');
    frame.remove();

    var button = doc.createElement('button');
    button.type = 'button';
    button.className = 'jl-wistia-facade';
    button.setAttribute('data-ascii-images', 'off');
    button.setAttribute('cd-lightbox-exclude', ''); // keep the site's image lightbox off the thumbnail
    button.setAttribute('aria-label', (english ? 'Play video: ' : 'Lire la vidéo : ') + title);
    var src = thumb(info.image, 960);
    if (src) {
      var img = doc.createElement('img');
      img.src = src;
      img.srcset = [480, 960, 1440].map(function (w) { return thumb(info.image, w) + ' ' + w + 'w'; }).join(', ');
      img.sizes = '(max-width: 767px) 100vw, 960px';
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      button.appendChild(img);
    }
    var play = doc.createElement('span');
    play.className = 'jl-wistia-facade__play';
    play.setAttribute('aria-hidden', 'true');
    button.appendChild(play);
    stage.appendChild(button);

    button.addEventListener('click', function () {
      var player = doc.createElement('iframe');
      player.__jlFacade = true; // the observer must not turn the real player back into a facade
      // Same URL shape as the site's jl-wistia-native-frames script, so it does not reload it
      player.src = 'https://fast.wistia.com/embed/iframe/' + info.id + '?autoPlay=true';
      player.title = title;
      player.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
      player.allowFullscreen = true;
      player.setAttribute('frameborder', '0');
      player.setAttribute('scrolling', 'no');
      if (width) player.setAttribute('width', width);
      if (height) player.setAttribute('height', height);
      stage.replaceChild(player, button);
    }, { once: true });
  }

  function scan(node) {
    if (node.nodeType !== 1) return;
    if (node.tagName === 'IFRAME') facade(node);
    else if (node.getElementsByTagName) Array.prototype.forEach.call(node.getElementsByTagName('iframe'), facade);
  }

  // Catch iframes as the parser inserts them, then a final pass and stop at DOMContentLoaded
  // (Rich Text videos are in the HTML; no need to watch later DOM churn)
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
