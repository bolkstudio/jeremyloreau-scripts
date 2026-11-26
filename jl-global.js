/*!
 * jl-global.js v1.0.0
 * Bolk Studio, for jeremyloreau.com. Code by Jérémy Loreau, moved out of inline Webflow embeds unchanged
 * so the browser caches it between pages.
 * Sync. Replaces the scripts of the first embed of the global-styles component (same position).
 * Each original script runs in its own try/catch, as separate inline scripts did.
 */

/* ---- #jl-cookie-settings-label ---- */
try {
(function () {
  function removeDecorativeBrackets() {
    const label = document.querySelector('#cookiescript_manage [data-cs-show-title]');
    const match = label?.textContent.match(/^\[(.+)\]$/);
    if (match) label.textContent = match[1];
  }

  removeDecorativeBrackets();
  window.addEventListener('CookieScriptLoaded', removeDecorativeBrackets);
  new MutationObserver(removeDecorativeBrackets).observe(document.body, { childList: true });
})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- anonymous (__jlTextActionKeysBound) ---- */
try {
(function () {
  if (window.__jlTextActionKeysBound) return;
  window.__jlTextActionKeysBound = true;
  document.addEventListener('keydown', function (event) {
    if (!(event.target instanceof Element)) return;
    var action = event.target.closest('[cd-button="see_more"][role="button"]');
    if (!action || event.repeat || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    action.click();
  });
})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-media-focus-js ---- */
try {
(function () {
  'use strict';
  if (window.__jlMediaFocusInstalled) return;
  window.__jlMediaFocusInstalled = true;

  var desktop = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
  var excluded = 'nav,footer,.nav_component,.footer_component,.footer_wrap,.global-styles,.popup_wrap,[role="dialog"],[data-jl-media-focus="off"],.recipes_coll_list,.exercices_coll_list,.testimonials_coll_list,.articles_coll_list';
  var cards = '.articles_card_wrap,.testimonials_card_wrap,.card_wrap';
  var cardVisuals = '.articles_card_image_wrap,.testimonials_card_image_wrap,.card_image_wrap,.card_video_wrap';
  var wrappers = '[class*="_image_wrap"],[class*="_video_wrap"],.image_wrap,.video_wrap,.media_wrap,.w-video,[data-media-stage]';
  var discoverable = cards + ',figure,.jl-thumb,img,video,iframe,' + wrappers;
  var itemAttr = 'data-jl-media-focus-item';
  var targetAttr = 'data-jl-media-focus-target';
  var mutedAttr = 'data-jl-media-focus-muted';
  var cleanup = null;

  function start() {
    if (cleanup || !desktop.matches || !document.body) return;
    var controller = new AbortController();
    var signal = controller.signal;
    var records = new Set();
    var byItem = new WeakMap();
    var byTarget = new WeakMap();
    var groups = new Map();
    var visible = new Set();
    var muted = new Set();
    var hovered = null;
    var focused = null;
    var active = null;
    var lastPoint = null;
    var touch = false;
    var frame = 0;
    var scanTimer = 0;
    var roots = new Set();
    var groupId = 0;
    var stopped = false;

    function element(node) { return node instanceof Element ? node : null; }
    function allowed(node) { return node && !node.closest(excluded); }
    function inView(node) {
      var box = node.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth;
    }
    function playing(record) {
      if (record.engagedFrame) return true;
      return record.videos.some(function (video) { return !video.paused && !video.ended; });
    }
    function apply() {
      var next = !touch && desktop.matches ? hovered || focused : null;
      if (next && (!next.item.isConnected || !inView(next.targets[0]))) next = null;
      if (active !== next) {
        if (active) active.item.removeAttribute('data-jl-media-focus-active');
        active = next;
        if (active) active.item.setAttribute('data-jl-media-focus-active', '');
      }
      var nextMuted = new Set();
      if (active) visible.forEach(function (record) {
        if (!record.item.isConnected || record.group !== active.group || record === active || playing(record)) return;
        if (record.item.contains(active.item) || active.item.contains(record.item)) return;
        record.targets.forEach(function (target) { nextMuted.add(target); });
      });
      muted.forEach(function (target) { if (!nextMuted.has(target)) target.removeAttribute(mutedAttr); });
      nextMuted.forEach(function (target) { if (!muted.has(target)) target.setAttribute(mutedAttr, ''); });
      muted = nextMuted;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var record = byTarget.get(entry.target);
        if (!record) return;
        if (entry.isIntersecting) visible.add(record); else visible.delete(record);
      });
      apply();
    }, { threshold: 0 });

    function groupFor(item, kind) {
      var parent = item.parentElement;
      // Main exercises and their nested alternatives share the same session.
      if (kind === 'thumb') return item.closest('.jl-session,.jl-programme') || item.closest('[data-alt-module]') || parent;
      if (kind === 'figure') return parent.closest('.c-richtext,.w-richtext,.u-rich-text') || parent;
      return parent.closest('[data-jl-media-focus-group],.w-dyn-items,.swiper-wrapper,.c-richtext,.w-richtext,section,.section_wrap,.section_contain') || parent;
    }
    function register(item, targets, kind) {
      if (!allowed(item) || byItem.has(item)) return;
      targets = targets.filter(function (target) {
        if (!target || !allowed(target) || byTarget.has(target)) return false;
        var ancestor = target.parentElement && target.parentElement.closest('[' + targetAttr + ']');
        return !ancestor;
      });
      if (!targets.length) return;
      var group = groupFor(item, kind);
      var record = {item:item, targets:targets, group:group, videos:Array.from(item.querySelectorAll('video')), engagedFrame:false};
      if (item.matches('video')) record.videos.push(item);
      byItem.set(item, record);
      records.add(record);
      if (!groups.has(group)) {
        groups.set(group, new Set());
        group.setAttribute('data-jl-media-focus-group', String(++groupId));
      }
      groups.get(group).add(record);
      item.setAttribute(itemAttr, kind);
      targets.forEach(function (target) {
        byTarget.set(target, record);
        target.setAttribute(targetAttr, '');
        observer.observe(target);
      });
      var frames = Array.from(item.querySelectorAll('iframe'));
      if (item.matches('iframe')) frames.push(item);
      record.engagedFrame = frames.some(function (iframe) { return /[?&](?:autoplay|autoPlay)=1\b/.test(iframe.src); });
    }

    function all(root, selector) {
      var found = Array.from(root.querySelectorAll(selector));
      if (root instanceof Element && root.matches(selector)) found.unshift(root);
      return found;
    }
    function scan(root) {
      if (!root.isConnected && root !== document || !allowed(root instanceof Element ? root : document.body)) return;
      all(root, cards).forEach(function (card) {
        var targets = Array.from(card.querySelectorAll(cardVisuals)).filter(function (target) { return target.closest(cards) === card; });
        register(card, targets, 'card');
      });
      all(root, 'figure').forEach(function (figure) {
        if (!allowed(figure) || figure.closest(cards)) return;
        var target = Array.from(figure.children).find(function (child) { return child.querySelector('img,video,iframe'); });
        if (target) register(figure, [target], 'figure');
      });
      all(root, '.jl-thumb').forEach(function (thumb) {
        if (!thumb.closest(cards) && !thumb.parentElement.closest('[' + targetAttr + ']')) register(thumb, [thumb], 'thumb');
      });
      all(root, wrappers).forEach(function (wrapper) {
        if (!allowed(wrapper) || wrapper.closest(cards + ',figure,.jl-thumb') || !wrapper.querySelector('img,video,iframe')) return;
        register(wrapper, [wrapper], 'media');
      });
      all(root, 'img,video,iframe').forEach(function (media) {
        if (!allowed(media) || media.closest('[' + targetAttr + ']') || media.closest(cards + ',figure,.jl-thumb')) return;
        if (media.tagName === 'IFRAME' && !/wistia|vimeo|youtube|embedly/.test(media.src)) return;
        var box = media.getBoundingClientRect();
        if (box.width < 96 || box.height < 64) return;
        var parent = media.parentElement;
        var plain = Array.from(parent.children).every(function (child) {
          return child === media || child.matches('picture,source,script,style,[aria-hidden="true"],[data-jl-image-reveal-overlay]');
        });
        var target = plain && parent !== document.body && !parent.matches('.page_wrap,section') ? parent : media;
        register(target, [target], 'media');
      });
    }
    function prune() {
      records.forEach(function (record) {
        if (record.item.isConnected) return;
        record.targets.forEach(function (target) { observer.unobserve(target); target.removeAttribute(mutedAttr); muted.delete(target); });
        visible.delete(record);
        records.delete(record);
        if (groups.has(record.group)) groups.get(record.group).delete(record);
      });
    }
    function queueScan(root) {
      roots.add(root);
      if (scanTimer) return;
      scanTimer = setTimeout(function () {
        scanTimer = 0;
        if (stopped) return;
        prune();
        roots.forEach(function (root) { scan(root); });
        roots.clear();
        apply();
      }, 80);
    }

    function recordAt(target) {
      target = element(target);
      if (!allowed(target)) return null;
      var item = target.closest('[' + itemAttr + ']');
      return item ? byItem.get(item) || null : null;
    }
    document.addEventListener('pointerover', function (event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      touch = false;
      lastPoint = {x:event.clientX, y:event.clientY};
      var next = recordAt(event.target);
      if (hovered !== next) { hovered = next; apply(); }
    }, {passive:true, signal:signal});
    document.addEventListener('pointerout', function (event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      var next = recordAt(event.relatedTarget);
      if (hovered !== next) { hovered = next; apply(); }
    }, {passive:true, signal:signal});
    document.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') { touch = true; hovered = focused = null; apply(); }
    }, {passive:true, signal:signal});
    document.addEventListener('focusin', function (event) {
      focused = recordAt(event.target);
      if (event.target instanceof HTMLIFrameElement && focused) focused.engagedFrame = true;
      apply();
    }, {signal:signal});
    document.addEventListener('focusout', function (event) { focused = recordAt(event.relatedTarget); apply(); }, {signal:signal});
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Tab') touch = false;
      if (event.key === 'Escape') { hovered = focused = null; apply(); }
    }, {signal:signal});
    window.addEventListener('blur', function () {
      var focusedFrame = document.activeElement;
      if (focusedFrame instanceof HTMLIFrameElement) {
        var record = recordAt(focusedFrame);
        if (record) record.engagedFrame = true;
      }
      hovered = null;
      apply();
    }, {signal:signal});
    document.addEventListener('scroll', function () {
      if (!hovered || !lastPoint || frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        hovered = recordAt(document.elementFromPoint(lastPoint.x, lastPoint.y));
        apply();
      });
    }, {passive:true, capture:true, signal:signal});
    ['play','pause','ended'].forEach(function (name) {
      document.addEventListener(name, function (event) {
        if (!(event.target instanceof HTMLVideoElement)) return;
        var record = recordAt(event.target);
        if (record && !record.videos.includes(event.target)) record.videos.push(event.target);
        apply();
      }, {capture:true, signal:signal});
    });
    document.addEventListener('load', function (event) {
      if (event.target instanceof Element && event.target.matches('img,video,iframe') && allowed(event.target) && !event.target.closest('[' + itemAttr + ']')) queueScan(event.target.parentElement);
    }, {capture:true, signal:signal});
    window.addEventListener('pagehide', function () { hovered = focused = null; apply(); }, {signal:signal});

    scan(document);
    var mutations = new MutationObserver(function (changes) {
      changes.forEach(function (change) {
        if (!allowed(element(change.target))) return;
        change.addedNodes.forEach(function (node) {
          if (!(node instanceof Element) || !allowed(node)) return;
          if (node.matches(discoverable) || node.querySelector(discoverable)) queueScan(node);
        });
      });
    });
    mutations.observe(document.body, {childList:true, subtree:true});
    document.documentElement.setAttribute('data-jl-media-focus-ready', '1.7');
    cleanup = function () {
      stopped = true;
      controller.abort();
      observer.disconnect();
      mutations.disconnect();
      clearTimeout(scanTimer);
      cancelAnimationFrame(frame);
      hovered = focused = null;
      apply();
      records.forEach(function (record) {
        record.item.removeAttribute(itemAttr);
        record.targets.forEach(function (target) { target.removeAttribute(targetAttr); target.removeAttribute(mutedAttr); });
      });
      groups.forEach(function (_, group) { group.removeAttribute('data-jl-media-focus-group'); });
      document.documentElement.removeAttribute('data-jl-media-focus-ready');
      cleanup = null;
    };
  }

  function sync() { if (desktop.matches) start(); else if (cleanup) cleanup(); }
  desktop.addEventListener('change', sync);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, {once:true});
  else sync();
})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-shared-nav-duration ---- */
try {
(function () {
  var root = document.documentElement;
  var names = ['--nav--menu-open-duration','--nav--menu-close-duration','--nav--dropdown-open-duration','--nav--dropdown-close-duration'];
  function syncDuration() {
    var ms = Number(getComputedStyle(root).getPropertyValue('--transition--duration-ms').trim());
    if (!Number.isFinite(ms) || ms < 0) return;
    names.forEach(function (name) {
      var value = ms + 'ms';
      if (root.style.getPropertyValue(name) !== value) root.style.setProperty(name, value);
    });
  }
  syncDuration();
  document.addEventListener('DOMContentLoaded', syncDuration, { once: true });
  new MutationObserver(syncDuration).observe(root, { attributes: true, attributeFilter: ['style','class'] });
})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-defer-sliders-v1 ---- */
try {
(function(){
  var source='https://cdn.codelius.fr/scripts/jeremy/sliders-with-swiper.min.js';
  var api=window.__jlSliders={readyForArrival:function(){return Promise.resolve(true);}};
  function start(){
    var sliders=Array.from(document.querySelectorAll('[cd-slider]'));
    if(!sliders.length)return;
    var observer,loading;
    function load(){
      if(loading)return loading;
      if(observer)observer.disconnect();
      loading=new Promise(function(resolve){
        var until=performance.now()+800;
        function check(){
          var css=document.querySelector('link[href*="swiper-bundle.min.css"]');
          var ready=sliders.every(function(root){
            var container=root.querySelector('[slider-element="container"]')||root;
            return !root.querySelector('[slider-element="mask"]')||container.swiper?.initialized;
          });
          if(ready&&css?.sheet)return resolve(true);
          if(performance.now()>=until)return resolve(false);
          window.setTimeout(check,16);
        }
        var script=document.querySelector('script[src="'+source+'"]');
        if(!script){
          script=document.createElement('script');
          script.src=source;script.async=true;script.id='jl-deferred-sliders-runtime';
          script.onerror=function(){loading=null;script.remove();resolve(false);};
          document.head.appendChild(script);
        }
        check();
      });
      return loading;
    }
    api.readyForArrival=function(){
      // A slider above the restored viewport can change the page height too.
      return sliders.some(function(root){return root.getBoundingClientRect().top<innerHeight+2500;})?load():Promise.resolve(true);
    };
    function interaction(event){if(event.target.closest&&event.target.closest('[cd-slider],[slider-ctx]'))load();}
    document.addEventListener('pointerover',interaction,{capture:true,passive:true});
    document.addEventListener('focusin',interaction,true);
    if(!('IntersectionObserver' in window)){load();return;}
    observer=new IntersectionObserver(function(entries){if(entries.some(function(entry){return entry.isIntersecting;}))load();},{rootMargin:'2500px 0px'});
    sliders.forEach(function(slider){observer.observe(slider);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-direct-video-v1 ---- */
try {
(()=>{var h=0,o={};function w(n,e){return e()?Promise.resolve():(o[n]||(o[n]=new Promise(function(e,t){var a=document.createElement("script");a.src=n,a.onload=function(){e()},a.onerror=function(){delete o[n],a.remove(),t(new Error("Player SDK unavailable"))},document.head.appendChild(a)})),o[n])}function f(e){try{for(var t=new URL(e,location.href),a=0;a<3&&/(^|\.)embedly\.com$/.test(t.hostname);a++)t=new URL(t.searchParams.get("src"));if("https:"!==t.protocol)return null;if(/^(?:(?:www|m)\.)?(?:youtube\.com|youtube-nocookie\.com|youtu\.be)$/.test(t.hostname)){var n="youtu.be"===t.hostname||"www.youtu.be"===t.hostname?t.pathname.split("/")[1]:"/watch"===t.pathname?t.searchParams.get("v"):(t.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)\/?$/)||[])[1];if(!/^[a-zA-Z0-9_-]{11}$/.test(n||""))return null;var o,i=t.searchParams.get("t")||new URLSearchParams(t.hash.slice(1)).get("t");(t=new URL("https://www."+(t.hostname.includes("youtube-nocookie.com")?"youtube-nocookie.com":"youtube.com")+"/embed/"+n+t.search)).searchParams.delete("v"),t.searchParams.delete("t"),i&&!t.searchParams.has("start")&&(o=i.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/))&&o[0]&&t.searchParams.set("start",String(3600*(+o[1]||0)+60*(+o[2]||0)+(+o[3]||0)))}if(/^(www\.)?vimeo\.com$/.test(t.hostname)){var r=t.pathname.match(/^\/(\d+)(?:\/([a-zA-Z0-9]+))?\/?$/);if(!r)return null;var s=r[2]||t.searchParams.get("h"),t=new URL("https://player.vimeo.com/video/"+r[1]+t.search);s&&t.searchParams.set("h",s)}var c="player.vimeo.com"===(t=/(^|\.)wistia\.(net|com)$/.test(t.hostname)&&/^\/medias\/[a-zA-Z0-9]+\/?$/.test(t.pathname)?new URL("https://fast.wistia.net/embed/iframe/"+t.pathname.split("/")[2]+t.search):t).hostname?"vimeo":/(^|\.)wistia\.(net|com)$/.test(t.hostname)?"wistia":/(^|\.)(youtube\.com|youtube-nocookie\.com)$/.test(t.hostname)?"youtube":"";return c?{url:t,kind:c}:null}catch{return null}}window.JLDirectVideo={resolve:f,mount:function(e,t,a,n){t=f(t);if(!t)return null;var o,i,r=t.url,s=t.kind,c=!1,u=!1,auto=!(n&&n.autoplay===false),m=document.createElement("iframe");function l(e){c||("play"===e&&(u=!0),("pause"!==e||u)&&n&&n[e]&&n[e]())}function d(){if(!c&&o)try{var e="youtube"===s?o.playVideo():o.play();e&&e.catch&&e.catch(function(){})}catch{}}if(m.id="jl-direct-video-"+ ++h,m.title=a||(0===document.documentElement.lang.indexOf("en")?"Video":"Vidéo"),m.allow="autoplay; fullscreen; encrypted-media; picture-in-picture",m.allowFullscreen=!0,m.loading="eager",m.setAttribute("data-jl-direct-video",s),"wistia"!==s&&(r.searchParams.set("autoplay",auto?"1":"0"),r.searchParams.set("playsinline","1"),r.searchParams.set("loop","0")),"wistia"===s&&(m.className="wistia_embed",m.name="wistia_embed"),"youtube"===s&&(r.searchParams.set("enablejsapi","1"),r.searchParams.set("origin",location.origin)),m.src=r.href,e.replaceChildren(m),"vimeo"===s&&w("https://player.vimeo.com/api/player.js",function(){return window.Vimeo&&window.Vimeo.Player}).then(function(){c||(o=new window.Vimeo.Player(m),["play","pause","ended"].forEach(function(e){o.on(e,function(){l(e)})}),o.getPaused().then(function(e){e?auto&&d():l("play")}).catch(function(){}))}).catch(function(){}),"wistia"===s&&(t=m.id,window._wq=window._wq||[],window._wq.push({id:t,onReady:function(t){!c&&m.isConnected&&(o=t,["play","pause","end"].forEach(function(e){t.bind(e,function(){l("end"===e?"ended":e)})}),"playing"===t.state()&&l("play"))}}),w("https://fast.wistia.com/assets/external/E-v1.js",function(){return window.Wistia&&window.Wistia.api}).catch(function(){})),"youtube"===s){let e=function(){!c&&window.YT&&window.YT.Player&&(o=new window.YT.Player(m,{events:{onReady:function(){auto&&d()},onStateChange:function(e){1===e.data&&l("play"),2===e.data&&l("pause"),0===e.data&&l("ended")}}}))};window.YT&&window.YT.Player?e():(i=window.onYouTubeIframeAPIReady,window.onYouTubeIframeAPIReady=function(){i&&i(),e()},w("https://www.youtube.com/iframe_api",function(){return window.YT&&window.YT.Player}).catch(function(){}))}return{frame:m,play:d,destroy:function(){if(c=!0,m.remove(),"vimeo"===s&&o)try{Promise.resolve(o.destroy()).catch(function(){})}catch{}if("youtube"===s&&o)try{o.destroy()}catch{}}}}}})();(()=>{const cache=new Map;window.JLDirectVideo.describe=async function(source){const resolved=this.resolve(source);if(resolved?.kind!=="wistia")throw Error("Wistia source required");const id=resolved.url.pathname.split("/").filter(Boolean).pop();if(!/^[a-z0-9]+$/i.test(id))throw Error("Invalid media ID");if(!cache.has(id)){const request=(async()=>{const controller=new AbortController,timer=setTimeout(()=>controller.abort(),3500);try{const response=await fetch("https://fast.wistia.com/embed/medias/"+id+".json",{credentials:"omit",signal:controller.signal});if(!response.ok)throw Error("Media metadata unavailable");const assets=(await response.json()).media?.assets||[],valid=a=>Number.isFinite(a.width)&&a.width>0&&Number.isFinite(a.height)&&a.height>0,asset=assets.find(a=>a.type==="original"&&valid(a))||assets.filter(a=>/video/.test(a.type)&&valid(a)).sort((a,b)=>b.width*b.height-a.width*a.height)[0];if(!asset)throw Error("Video dimensions unavailable");return{naturalWidth:asset.width,naturalHeight:asset.height,poster:assets.find(a=>a.type==="still_image")?.url||""}}finally{clearTimeout(timer)}})();cache.set(id,request);request.catch(()=>cache.delete(id));if(cache.size>32)cache.delete(cache.keys().next().value)}return cache.get(id)}})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-wistia-native-frames ---- */
try {
(()=>{'use strict';if(window.__jlWistiaFrames)return;window.__jlWistiaFrames=true;
let serial=0;
function resolve(src){try{let u=new URL(src,location.href);for(let i=0;i<3&&/(^|\.)embedly\.com$/.test(u.hostname);i++)u=new URL(u.searchParams.get('src'));if(!/(^|\.)wistia\.(net|com)$/.test(u.hostname)||u.protocol!=='https:')return;const id=(u.pathname.match(/\/(?:iframe|medias)\/([a-z0-9]+)/i)||[])[1];if(!id)return;return{id,url:new URL('https://fast.wistia.com/embed/iframe/'+id+u.search)}}catch{}}
function process(f){if(f.hasAttribute('data-jl-wistia-native'))return;const r=resolve(f.getAttribute('src'));if(!r)return;const p=f.parentElement;if(!p)return;
const rich=!!f.closest('.w-richtext,.u-rich-text'),figure=rich&&p.parentElement;
if(figure&&figure.matches('figure.w-richtext-figure-type-video')){const ratio=figure.style.paddingBottom;if(/^\d+(?:\.\d+)?%$/.test(ratio)&&Number(ratio.slice(0,-1))>0){figure.style.setProperty('--jl-wistia-frame-padding',ratio);figure.setAttribute('data-jl-wistia-frame','')}}
f.setAttribute('data-jl-wistia-native','');p.setAttribute('data-jl-wistia-stage','');f.id=f.id||'jl-wistia-native-'+ ++serial;f.classList.add('wistia_embed');f.name='wistia_embed';f.allow=(f.allow||'')+'; autoplay; fullscreen';
if(f.src!==r.url.href)f.src=r.url.href;
}
function scan(root){if(root.matches?.('iframe'))process(root);root.querySelectorAll?.('iframe').forEach(process)}
function init(){scan(document);new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)scan(n)}))).observe(document.body,{childList:true,subtree:true});document.documentElement.setAttribute('data-jl-wistia-native-ready','1')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();
} catch (e) { setTimeout(function () { throw e; }); }
