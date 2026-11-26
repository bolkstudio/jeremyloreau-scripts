/*!
 * jl-global.js for Slater v1.0.0, Bolk Studio for jeremyloreau.com
 * Code by Jérémy Loreau, moved out of the Webflow Head/Footer code and embeds (26 November 2026).
 * Slater file loaded on every page. Site-wide interactions: cookie labels, keyboard support, media focus, menu timing, logo and menu text shuffle, page ASCII grid, image lightbox, dropdowns, scroll lock, card prefetch, reviews dates, footer year, subscription links.
 * Slater runs this file after DOMContentLoaded (ES module). Each original script runs in its own try/catch.
 * Do not wrap this file in a DOMContentLoaded listener: it would never fire.
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

/* ---- #jl-click-text-v1 ---- */
try {
(function(){"use strict";const Z="jeremyloreau.webflow.io";function tt(a){return a===Z||a==="127.0.0.1"||/^(www\.)?jeremyloreau\.com$/.test(a)}const Y="abcdefghijklmnopqrstuvwxyz",et=Y.toUpperCase(),G=typeof Intl.Segmenter=="function"?new Intl.Segmenter(void 0,{granularity:"grapheme"}):null,D=(a,p)=>{let o=a+1^p;return o=Math.imul(o^o>>>16,73244475),o=Math.imul(o^o>>>16,73244475),(o^o>>>16)>>>0},nt=650;function U(a){if(G)return[...G.segment(a)].map(o=>({text:o.segment,index:o.index}));let p=0;return Array.from(a).map(o=>{const s={text:o,index:p};return p+=o.length,s})}function ot(a,p){const o=U(a).map(l=>l.text),s=o.map(l=>new RegExp("\\p{L}","u").test(l));return{text:a,chars:o,mutable:s,seed:p,settle:o.map((l,M)=>.28+.66*(D(M,p)/4294967295))}}function J(a,p,o){const s=a.chars[p];if(!a.mutable[p])return s;const l=s===s.toUpperCase()?et:Y;return l[D(p,a.seed^Math.imul(o+1,2654435761))%l.length]}function rt(a,p,o){return p>=1?a.text:a.chars.map((s,l)=>!a.mutable[l]||p>=a.settle[l]?s:J(a,l,o)).join("")}function it(a,p){let o=null,s=1/0;for(const S of a)for(let C=0;C<S.glyphs.length;C++){if(!S.field.mutable[C])continue;const R=S.glyphs[C],j=S.dx||0,q=S.dy||0,_=Math.hypot(p.x-(R.left+R.width/2+j),p.y-(R.top+R.height/2+q));_<=s&&(s=_,o={word:S,index:C})}if(!o)return null;const{word:l,index:M}=o,k=l.glyphs.length-1;return{word:l,indexes:(M===0||M===k?[M]:[M-1,M,M+1]).filter(S=>l.field.mutable[S])}}const st="a.nav_desktop_logo,a.nav_mobile_logo",K='script,style,noscript,svg,textarea,select,[contenteditable="true"],[aria-hidden="true"],.u-sr-only,.sr-only,[hidden],[data-jl-text-native]',B="http://www.w3.org/2000/svg";function at(){const a=document.documentElement,p=matchMedia("(prefers-reduced-motion: reduce)"),o=new Map;let s=null,l=null,M=!1,k=null,S=null,C=0,R=0;const j=document.createElement("canvas").getContext("2d"),q=()=>p.matches||document.hidden||a.hasAttribute("data-curtain-live"),_=t=>{if(!(t instanceof Element))return null;const r=t.closest(st);return r&&!r.matches(':disabled,[aria-disabled="true"]')?r:null},lt=t=>{
  const label=t.querySelector(".nav_links_text")||t;
  if(label.childNodes.length!==1||label.firstChild.nodeType!==Node.TEXT_NODE)return label;
  const text=label.firstChild;
  const suffix=text.data.match(/\s*ツ\s*$/u);
  if(!suffix||!suffix.index)return label;
  const fixed=document.createElement("span");
  fixed.setAttribute("data-jl-text-native","");
  const suffixNode=text.splitText(suffix.index);
  suffixNode.replaceWith(fixed);
  fixed.append(suffixNode);
  return label;
},Q=(t,r)=>{if(!(r.width>0&&r.height>0&&r.right>0&&r.bottom>0&&r.left<innerWidth&&r.top<innerHeight)||t.closest(K))return!1;for(let h=t;h;h=h.parentElement){const E=getComputedStyle(h);if(E.display==="none"||E.visibility==="hidden"||+E.opacity==0)return!1}return!0},ct=()=>{if(k)return;k=document.createElement("div"),k.id="jl-click-text-layer",k.setAttribute("aria-hidden","true"),k.setAttribute("data-nosnippet",""),k.style.cssText="position:fixed;inset:0;z-index:2147482990;pointer-events:none;contain:strict;background:transparent;";const t=k.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=":host{pointer-events:none!important}svg{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none}text{fill:currentColor;white-space:pre;font-kerning:auto;pointer-events:none}",S=document.createElementNS(B,"svg"),S.setAttribute("width","100%"),S.setAttribute("height","100%"),S.setAttribute("focusable","false"),t.append(r,S),document.body.append(k)},P=t=>{const r=o.get(t);if(r){for(const h of r.masks)h.isConnected&&h.replaceWith(...h.childNodes);if(r.input)for(const[h,E]of r.input)E.value?t.style.setProperty(h,E.value,E.priority):t.style.removeProperty(h);r.layer.remove(),t.removeAttribute("data-jl-click-text"),o.delete(t),o.size||(cancelAnimationFrame(C),C=0,k?.remove(),k=null,S=null,a.removeAttribute("data-jl-click-text-active"))}},L=()=>{for(const t of[...o.keys()])P(t);s=null,l=null},H=t=>`${t.fontStyle} ${t.fontWeight} ${t.fontSize} ${t.fontFamily}`;function dt(t,r){const h=lt(t),E=[],i=new Map,g=[],f=crypto.getRandomValues(new Uint32Array(1))[0],y=n=>{if(i.has(n))return i.get(n);const e=getComputedStyle(n),x=n.getBoundingClientRect();j.font=H(e);const u=j.measureText("Hg"),v=u.fontBoundingBoxAscent||parseFloat(e.fontSize)*.8,d=u.fontBoundingBoxDescent||parseFloat(e.fontSize)*.2,w=[],m={left:0,top:0,right:innerWidth,bottom:innerHeight};for(let T=n;T&&T!==document.body;T=T.parentElement){w.push(T);const W=getComputedStyle(T);if(/hidden|clip|scroll|auto/.test(W.overflow+W.overflowX+W.overflowY)){const z=T.getBoundingClientRect();m.left=Math.max(m.left,z.left),m.top=Math.max(m.top,z.top),m.right=Math.min(m.right,z.right),m.bottom=Math.min(m.bottom,z.bottom)}}const F={parent:n,style:e,box:x,chain:w,clip:m,ascent:v/(v+d)};return i.set(n,F),F},c=[],A=(n,e,x,u=null,v=0)=>{if(!Q(x,e))return;const d=y(x),w=d.clip;if(e.right<=w.left||e.bottom<=w.top||e.left>=w.right||e.top>=w.bottom)return;const m=U(n).map(F=>{if(u){const z=document.createRange();z.setStart(u,v+F.index),z.setEnd(u,v+F.index+F.text.length);const $=z.getBoundingClientRect();return{left:$.left,top:$.top,right:$.right,width:$.width,height:$.height}}j.font=H(d.style);const T=j.measureText(n.slice(0,F.index)).width,W=j.measureText(F.text).width;return{left:e.left+T,top:e.top,right:e.left+T+W,width:W,height:e.height}});c.push({text:n,r:e,glyphs:m,group:d,field:ot(n,f^c.length)})};let b=null;if(t.matches('input[type="submit"],input[type="button"],input[type="reset"]')){const n=getComputedStyle(t),e=t.getBoundingClientRect(),x=t.value;if(!x||!Q(t,e))return null;j.font=H(n);const u=j.measureText(x).width+Math.max(0,x.length-1)*(parseFloat(n.letterSpacing)||0),v=parseFloat(n.fontSize)*1.15,d=n.textAlign==="center"?e.left+(e.width-u)/2:n.textAlign==="right"?e.right-u-parseFloat(n.paddingRight):e.left+parseFloat(n.paddingLeft)+parseFloat(n.borderLeftWidth);A(x,{left:d,top:e.top+(e.height-v)/2,width:u,height:v,right:d+u,bottom:e.top+(e.height+v)/2},t),b=["-webkit-text-fill-color","text-shadow"].map(w=>[w,{value:t.style.getPropertyValue(w),priority:t.style.getPropertyPriority(w)}])}else{const n=document.createTreeWalker(h,NodeFilter.SHOW_TEXT);let e;for(;e=n.nextNode();){if(!e.data.trim()||e.parentElement.closest(K))continue;const x=c.length,u=document.createRange();for(const v of e.data.matchAll(/\S+/gu))if(u.setStart(e,v.index),u.setEnd(e,v.index+v[0].length),u.getClientRects().length<=1)A(v[0],u.getBoundingClientRect(),e.parentElement,e,v.index);else{let d=null;for(const w of U(v[0])){u.setStart(e,v.index+w.index),u.setEnd(e,v.index+w.index+w.text.length);const m=u.getBoundingClientRect();!d||Math.abs(d.r.top-m.top)>1?(d&&A(d.text,d.r,e.parentElement,e,d.start),d={text:w.text,start:v.index+w.index,r:{left:m.left,top:m.top,right:m.right,bottom:m.bottom,width:m.width,height:m.height}}):(d.text+=w.text,d.r.right=Math.max(d.r.right,m.right),d.r.width=d.r.right-d.r.left)}d&&A(d.text,d.r,e.parentElement,e,d.start)}c.length>x&&E.push({node:e,text:e.data})}}if(!c.length)return null;ct();const N=document.createElementNS(B,"g");S.append(N);let V=0;for(const n of i.values()){const e=document.createElementNS(B,"clipPath"),x=document.createElementNS(B,"rect"),u="jl-click-clip-"+f+"-"+V++;e.id=u,e.setAttribute("clipPathUnits","userSpaceOnUse"),x.setAttribute("x",n.clip.left),x.setAttribute("y",n.clip.top),x.setAttribute("width",Math.max(0,n.clip.right-n.clip.left)),x.setAttribute("height",Math.max(0,n.clip.bottom-n.clip.top)),e.append(x),N.append(e),n.element=document.createElementNS(B,"g"),n.element.style.color=n.style.color,n.element.setAttribute("clip-path",`url(#${u})`),N.append(n.element)}for(const n of c){const e=document.createElementNS(B,"g"),x=n.group.style;for(const u of["fontFamily","fontSize","fontWeight","fontStyle","fontStretch","fontVariant","fontFeatureSettings","letterSpacing","textTransform"])e.style[u]=x[u];n.element=e,n.group.element.append(e),n.y=n.r.top+n.r.height*n.group.ascent,X(n,[])}for(const n of E){const e=document.createElement("span");e.setAttribute("data-jl-text-native",""),e.style.cssText="-webkit-text-fill-color:transparent!important;text-shadow:none!important;pointer-events:none!important;",n.node.replaceWith(e),e.append(n.node),n.mask=e,g.push(e)}return b&&(t.style.setProperty("-webkit-text-fill-color","transparent","important"),t.style.setProperty("text-shadow","none","important")),{target:t,words:c,groups:i,masks:g,snapshots:E,input:b,layer:N,start:0,point:r}}function X(t,r){const h=r.join(",");if(t.key===h)return;t.key=h,t.runs=[],t.element.replaceChildren();const E=new Set(r),i=t.field.chars.length;for(let g=0;g<i;){const f=g,y=E.has(g);if(g++,!y)for(;g<i&&!E.has(g);)g++;const c=t.glyphs[f],A=t.glyphs[g-1],b=document.createElementNS(B,"text");b.setAttribute("x",c.left),b.setAttribute("y",t.y),b.setAttribute("textLength",Math.max(.01,A.right-c.left)),b.setAttribute("lengthAdjust","spacingAndGlyphs"),b.textContent=t.field.chars.slice(f,g).join(""),t.element.append(b),t.runs.push({element:b,start:f,end:g,random:y})}}function I(t){if(C=0,q()){L();return}if(t-R<36){C=requestAnimationFrame(I);return}R=t;const r=[],h=new Map,E=i=>(h.has(i)||h.set(i,getComputedStyle(i)),h.get(i));for(const i of o.values()){if(!i.target.isConnected||i.snapshots.some(c=>!c.mask.isConnected||c.node.data!==c.text)){r.push({state:i,stop:!0});continue}i.start||(i.start=t);const g=i.point?0:(t-i.start)/nt;if(g>=1){r.push({state:i,stop:!0});continue}const f=[];let y=!1;for(const c of i.groups.values()){const A=c.parent.getBoundingClientRect(),b=E(c.parent);if(A.width===0||A.height===0||b.visibility==="hidden"||b.display==="none"){y=!0;break}let N=1;for(const V of c.chain)N*=+E(V).opacity;f.push({g:c,color:b.color,opacity:N,dx:A.left-c.box.left,dy:A.top-c.box.top})}r.push({state:i,stop:y,progress:g,groups:f})}for(const i of r){if(i.stop){P(i.state.target);continue}for(const{g:f,color:y,opacity:c,dx:A,dy:b}of i.groups)f.dx=A,f.dy=b,f.element.style.color=y,f.element.style.opacity=String(c),f.element.setAttribute("transform",`translate(${A} ${b})`);const g=Math.floor((t-i.state.start)/36);if(i.state.point){for(const y of i.state.words)y.dx=y.group.dx,y.dy=y.group.dy;const f=it(i.state.words,i.state.point);for(const y of i.state.words){X(y,f?.word===y?f.indexes:[]);for(const c of y.runs)c.random&&(c.element.textContent=J(y.field,c.start,g))}}else for(const f of i.state.words)X(f,[]),f.runs[0].element.textContent=rt(f.field,i.progress,g)}o.size&&(C=requestAnimationFrame(I))}const O=(t,r=null)=>{if(!(!t||q())){if(o.has(t)){o.get(t).point=r;return}try{const h=dt(t,r);if(!h)return;o.set(t,h),t.dataset.jlClickText="active",a.dataset.jlClickTextActive=String(o.size),C||(C=requestAnimationFrame(I))}catch{L()}}},ut=t=>{if(t.pointerType==="touch")return;const r=_(t.target);r!==s&&(s&&s!==l&&P(s),s=r,O(r,{x:t.clientX,y:t.clientY}))},pt=t=>{if(t.pointerType==="touch"||!s)return;const r={x:t.clientX,y:t.clientY};o.has(s)?o.get(s).point=r:O(s,r)},ht=t=>{s&&!s.contains(t.relatedTarget)&&(s!==l?P(s):o.has(s)&&(o.get(s).point=null,o.get(s).start=0),s=null)},ft=t=>{if(!M)return;const r=_(t.target);l&&l!==s&&P(l),l=r,O(r)},mt=t=>{l&&!l.contains(t.relatedTarget)&&(l!==s&&P(l),l=null)},gt=t=>{t.key==="Tab"?M=!0:(t.key==="Enter"||t.key===" "||t.key==="Escape")&&L()},yt=()=>{M=!1,L()};return document.addEventListener("pointerover",ut,{passive:!0}),document.addEventListener("pointerout",ht,{passive:!0}),document.addEventListener("pointermove",pt,{passive:!0}),document.addEventListener("focusin",ft),document.addEventListener("focusout",mt),document.addEventListener("keydown",gt,!0),document.addEventListener("pointerdown",yt,{capture:!0,passive:!0}),document.addEventListener("click",L,!0),window.addEventListener("scroll",L,{capture:!0,passive:!0}),window.addEventListener("resize",L,{passive:!0}),window.addEventListener("blur",L),window.addEventListener("curtain:start",L),document.addEventListener("visibilitychange",L),p.addEventListener("change",L),a.dataset.jlClickTextReady="1.2-header-only",window.addEventListener("pagehide",L),{reset:L}}if(tt(location.hostname)&&new URLSearchParams(location.search).get("ascii-effects")!=="off"&&!document.documentElement.dataset.jlClickTextReady){const a=()=>{try{at()}catch{}};if(document.body)a();else{const p=new MutationObserver(()=>{document.body&&(p.disconnect(),a())});p.observe(document.documentElement,{childList:!0})}}})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-ascii-page-v4 ---- */
try {
(function(){const r=window.__jlReviewClock,B=r?.performance||window.performance,P=r?r.raf:window.requestAnimationFrame.bind(window),T=r?r.caf:window.cancelAnimationFrame.bind(window),q=r?r.timeout:window.setTimeout.bind(window),I=r?r.clear:window.clearTimeout.bind(window);(function(){"use strict";if(!window.__jlContentBoot)return;const x=" .:-+=/!?I1234567890AON",C=d=>Math.max(0,Math.min(1,d)),E="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000355431000000000000000000000000000000000000000000000000000000017ceeeddd9320000000000000000000000000000000000000000000000000018efedcdeffffda7300000000000000000000000000000000000000000000005effeeecbcdeeeeffd5220000000000000000000000000000000000000000007ffffeeeddcceeeeffffc8000000000000000000000000000000000000000007fefffffffdbacddeffeefd10000000000000000000000000000000000000004feffffffeeccbbbdeeeedce4000000000000000000000000000000000000000bffffffeeeedddddedcdcd653000000000000000000000000000000000000003ffffffeefffffeeedcedc8222000000000000000000000000000000000000006ffffffffffeeeefedffeb212300000000000000000000000000000000000004bfffffeeeddeefffeffee711121000000000000000000000000000000004addfffffffffeddeeeeefffe932242000000000000000000000000000000004aeeffffffffffffedddefffc852359d40000000000000000000000000000003addefffffffffffeec9efffd6633324d50000000000000000000000000000019eddfffffffffffefdabbffed652259d800000000000000000000000000000059ecdffdefffffffffa59bcdec831127920000000000000000000000000000015deceff58ffffffffea5ac7adc722112311000000000000000000000000000018eeddff59fffffffecc68d68db64321121110000000000000000000000000001bfedcef8afffffffebc957989655433222211000000000000000000000000001deeeddfecfffffffecbd94576434443224683000000000000000000000000002deeeedefefffffffebabec975333333223740000000000000000000000000003adffedfecfffffffdba898b753322322113000000000000000000000000000016bfffeff99efffffdba8329864322221587000000000000000000000000000003beffeff918dfffecba8618a76432222354000000000000000000000000000000beffeff9014cfedb9a8624ba98533332530000000000000000000000000000008fffeffc204aedb85885429baa96322120000000000000000000000000000000afffeffd4274bca64465326bacba973120000000000000000000000000000000cfeeeffe3231ba965335323ab646899840000000000000000000000000000003cafeefed5104b99853233239700000120000000000000000000000000000000696eeefd96007a9a753222228300000000000000000000000000000000000001254feef95501a978743322235000000000000000000000000000000000000000043ddfe45206c7477532111230000000000000000000000000000000000000000128dfc1503ba6588556899740000000000000000000000000000000000000000029eca404aa978978ceecbb94000000000000000000000000000000000000000026c7265a997598beec632125521000000000000000000000000000000000000012c30ac888689cff9433322123453333100000000000000000000000000000000092cfb75789bffa554443323233344333200000000000000000000000000000007affc4468affb655554323443344221123000000000000000000000000000004badfe736aefd875554334444334322111130000000000000000000000000003ba8beee79effa88554444444333333211113200000000000000000000000001aa857edfffffe99767654554333233221111230000000000000000000000004aa9754ceeffffc9878765566433332222211124000000000000000000000006aaaa8549eeffffb975765667743332222221111400000000000000000000005a9aaa9546eeffffa97455567786333322221111131000000000000000000001a99999a554cffffe997355568988433322111111132000000000000000000005b98999a654affffd898445567988753332111111132000000000000000000008a9889996558ffffd89954566688888633322221123200000000000000000001aa9889985556efffd9995456666768a954322222223200000000000000000003a99999974556dfefd9996456655658b984332222223100000000000000000006a99999974555cfefe9996456755556ca85432222224100000000000000000008a99998985566cfffea996566765555cb743322222240000000000000000000099a9988985566cffffba96677666656cb733221222272000000000000000000199a9988997466cfeffc9a7687776668ca7333211232a7000000000000000000099ba888888666cffffe9a9887777769ca7333211123bb1000000000000000000889c988878877dfefffc8b99877778ac97333211123ad4000000000000000000798cb99877988effffff99a9a98889ac97433211122ae8000000000000000000598ac99977a9afeffffffaa99a9999bc884332111229e90000000000000000004978ccaa98a9cfefffffffca89999acc885433211217fa00000000000000000059779ccaa99aefffffffffffc99aabcc996433211215f900000000000000000059766adca99cffffffffffffffeeeefe997443321213f6000000000000000000696657bdc9afffffffffffffffffffffa87554322222d20000000000000000007965659cecdfffffffffffffffffffffa88555432222600000000000000000007865556aceffffffffffffffffffffffc896455432223000000000000000000078655559bdefffffffffffffffffffffe898543332223000000000000000000069655547bddefffffffffffffffffffff999643333223100000000000000000059755556ace7cffffffffffffffffffffc8984333332310000000000000000004a8655559ce53ffffffffffffffffffffe999533233232000000000000000000198755558bd60afffeefffffffffffffffb99643333232000000000000000000089865557bc601effffffeeddddcdeeeeec996433332330000000000000000000697655579c5009fedbcdc9866654699abc997433331330000000000000000000497655569b5002ca988ab997766658aabda97433321240000000000000000000297655668b40007a9989ba9976666799bcb98543321140000000000000000000197655657b30003a9987ab9a86556799bcc98543232132000000000000000000088555657a100008a9879b999754458aabca9554342123000000000000000000078555557a000003b9988ba998644359abbb95434742131000000000000000000696555578000001aa988ba88855432599bba753489412300000000000000000059665457700000299877ba9abbcccbbdccbb85433873131000000000000000003a7774577000003dddcceeffffffefffffeaa5432274222000000000000000002a7665587000007fffffffffeedeeeeefff9ba632144213000000000000000004b875558600000bfffffffffeeeeeeeefffa9a852223213200000000000000005ba76569600004ffffffffffeeeeeeeefffc88873222213300000000000000005a98666980000bffffffffffeeeeeeeeefff98884222212400000000000000005a887678a0006fffffffffeeeeeeeeeeefffc8776322212400000000000000003a887778b202effffffffeeeeeeeeeeeeeffe8765432222410000000000000002a877668b40cfffffffeeeeeeeeeeeeeeefff97743322224200000000000000019877679c58ffffffffeeeeeeeeeeeeeeefffc775333222430000000000000000887768bbcffffffeeeeeeeeeeeeeeeedeefff976333222430000000000000000787779bdfffffeeedeeeeeeeeeeeeeeedefffb7643332234000000000000000069778acffffeeeeeeeeeddedeeeeeeeeeeeffe975333223400000000000000004977aaeffeeeeeeeeddedeedeeeeeeeeeeeeffc86433323410000000000000002978adffeeeeeeeddeeeeeeeeeedeeeeeeeefffa7433333410000000000000000889bffeeedeeeddeddeededeeddeeeeeeeeeffc8634333420000000000000000699efeeeedeeeddddddeeeeeeeeeeeeeeeeefffa84433343000000000000000039bfeeeeedeedeeddddeeeeeeeeeeeeeeeeefffd96343334000000000000000009ffeeeeedeeeeeeedeeeeeeeeedeeeeeeeeeffba844333400000000000000000afeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeff96a63333410000000000000001effeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeedefb0a84333320000000000000007feeeeeeeeeeeeeeeeeedddeeeeedeeeeedeeefd05a533233000000000000000cffeeeeeeefefeeeeeeedeeeeeeeeeeeeeeeedfe10a843234000000000000003fffeeeeeeefefffeeeeeeeeeeeeeeeeeeeeeedef504a53324100000000000006fefeeeeeeffefffeeeeeeeeeeeeeeeeeeeedeedfa00994323300000000000009feffeeeeefffffffeeeeeeeeeeeeeeeeeeedeedee103a642240000000000000bfffffeeeefffffffffeeeeeeeeeeeeeeeeeedeedf6008864141000000000000cfffffffffffffffffffeeeeeeeeeeeeeeeeedeedec004a67242000000000000cffffffffffffffffffffeeeeeeeeeeeeeeeeededdf400a66443000000000000cfffffffffffffffffffffeeeeeeeeeeeeeeeedeedf900984333000000000000bfffffffffffffffffffffeeeeeeeeeeeeeeeeddeded10a832330000000000009ffffffffffffffffffffffeeeeeeeeeeeeeeeededdf50d732241000000000006ffffffffffffffffffffffffeeeeeeeeeeeeeedeedf93e931232000000000002effffffffffffffffffffffffeeeeeeeeeeeeeeeedec5db41223000000000000cfffffffffffffffffffffffffeeeeeeeeeeeeedeede7cd72224100000000000bffffffffffffffffffffffffffeeeeeeeeeeeedeedf8aea3223200000000000afffffffffffffffffffffffffffeeeeeeeeeeddeedfa7fe72233000000000009ffffffffffffffffffffffffffffeeeeeeeeeeeeeded5fd94345200000000008ffffffffeefffffffffffffffffffeeeeeeeeeeeeede8fb86477100000000008fffffeeeeeefffffffffffffffffffeeeeeeeeeeeedeced65464000000000008ffffeeeeeeeeffffffffffffffffffeeeeeeeeeeeededec54442000000000009ffffeeeeeeeeeffffffffffffffffeeeeeeeeeeeeededf95544100000000000afffeeeeeeeeeefffffffffffffffffeeeeeeeeeeeeeee447945000000000000bfffeeeeeeeeeeeffffffffffffffffeeeeeeeeeeeeeee788995000000000000bfffeeeeeeeeeeeffffffffffffffffeeeeeeeeeeeeedecba850000000000000bfffeeeeeeeeeeeefffffcdfffffffffeeeeeeeeeeeededba400000000000000bfffeeeeeeeeeeeefffff67ffffffffeeeeeeeeeeeeedec52000000000000000afffeeeeeeeeeeeefffff31fffffffffeeeeeeeeeeeedea000000000000000009fffeeeeeeeeeeeeffffe109ffffffffeeeeeeeeeeeeeeb000000000000000007fffeeeeeeeeeeeeffffb002fffffffffeeeeeeeeeeedec000000000000000006fffeeeeeeeeeeeeffff80008ffffffffeeeeeeeeeeeeed100000000000000005ffffeeeeeeeeeeeeeff40001efffffffeeeeeeeeeeeeed100000000000000003ffffeeeeeeeeeeeeefe100006ffffffffeeeeeeeeeeedd200000000000000002efffeeeeeeeeeeeeefb000000cfffffffeeeeeeeeeeeee200000000000000000dfffeeeeeeeeeeeeef80000003ffffffffeeeeeeeeeeee200000000000000000cfffeeeeeeeeeeeeef400000009ffffffffeeeeeeeeeee200000000000000000afffeeeeeeeeeeeeed000000001efffffffeeeeeeeeeee2000000000000000008ffffeeeeeeeeeedf90000000006fffffffeeeeeeeeeee2000000000000000006ffffeeeeeeeeeedf40000000000cffffffeeeeeeeeeee3000000000000000005ffffeeeeeeeeeeed000000000004ffffffffeeeeeeeef4000000000000000004ffffeeeeeeeeedf8000000000000bfffffffeeeeeeedf5000000000000000004ffffeeeeeeeeeee30000000000004ffffffeeeeeeeedf8000000000000000005ffffeeeeeeeeeeb00000000000000cffffffeeeeeeedeb000000000000000007feffeeeeeeeedf8000000000000006ffffeeffeeedeedd20000000000000000afeffeeeeeeeeef4000000000000001effffeeeeeeeeede50000000000000000dfeffeeeeeeeefd0000000000000000affffffffeeeeedf70000000";let u=()=>{};function k(d,o){let c=Math.imul(d+1,2654435761)^o;return c=Math.imul(c^c>>>16,2246822507),((c^c>>>13)>>>0)/4294967296}function F(d,o,c,g,n,M,w){const y=new Array(d*o).fill(" "),f=Math.min(o*.78,d*c*.8/(64/144)/g),e=f*g/c*64/144,t=n/650,a=Math.round((d-e)/2+Math.sin(t)*Math.min(2,d*.02)),b=Math.round((o-f)/2);for(let l=Math.max(0,b);l<Math.min(o,b+f);l++)for(let i=Math.max(0,a-2);i<Math.min(d,a+e+2);i++){const h=(l-b)/f,v=Math.round(Math.sin(t+h*2)*Math.sin(h*Math.PI)),s=(i-a-v)/e;if(s<0||s>=1)continue;const A=Math.min(143,Math.floor(h*144))*64+Math.min(63,Math.floor(s*64)),m=parseInt(E[A],16)/15,p=l*d+i;if(m<.055||k(p,w)>M)continue;const j=Math.pow(m,.48),_=Math.round(j*(x.length-1)),L=Math.floor(n/(90+k(p,w^31)*100)),R=k(p,w^L)>.7?1:0;y[p]=x[Math.max(1,Math.min(x.length-1,_+R))]}return y}function S(){if(u(),matchMedia("(prefers-reduced-motion:reduce)").matches)return;const d=B.now(),o=[],c=[],g="http://www.w3.org/2000/svg",n=document.createElementNS(g,"svg");n.setAttribute("aria-hidden","true"),n.setAttribute("data-nosnippet",""),n.id="jl-border-build",n.style.cssText="position:fixed;inset:0;width:100%;height:100%;z-index:2147482999;pointer-events:none;overflow:hidden";for(const f of[...document.querySelectorAll(".page_wrap *")].slice(0,1600)){if(c.length>=100)break;if(f.closest('svg,.nav_component,.jl-image-ascii,[data-text-effect="off"],hyvor-talk-comments,form'))continue;const e=f.getBoundingClientRect();if(e.width<12||e.height<2||e.bottom<0||e.top>innerHeight||e.right<0||e.left>innerWidth)continue;const t=getComputedStyle(f);if(!(t.display==="none"||t.visibility==="hidden"||+t.opacity==0))for(const a of["Top","Right","Bottom","Left"]){const b=parseFloat(t["border"+a+"Width"]),l=t["border"+a+"Color"];if(!b||l==="transparent"||/rgba\([^)]*,\s*0\)$/.test(l))continue;const i=a==="Top"||a==="Bottom",h=a==="Right"?e.right-b/2:e.left+(i?0:b/2),v=a==="Bottom"?e.bottom-b/2:e.top+(i?b/2:0),s=i?e.width:e.height,A=document.createElementNS(g,"line");for(const[p,j]of Object.entries({x1:h,y1:v,x2:i?h+s:h,y2:i?v:v+s,stroke:l,"stroke-width":b,"stroke-dasharray":s,"stroke-dashoffset":s}))A.setAttribute(p,j);const m="border-"+a.toLowerCase()+"-color";o.push([f,m,f.style.getPropertyValue(m),f.style.getPropertyPriority(m)]),f.style.setProperty(m,"transparent","important"),n.append(A),c.push({line:A,length:s,duration:280+k(c.length,713)*320})}}document.body.append(n),document.documentElement.dataset.jlBorderBuild=String(c.length);let M=0;const w=()=>{T(M);for(const[f,e,t,a]of o)t?f.style.setProperty(e,t,a):f.style.removeProperty(e);n.remove(),u=()=>{}};u=w;const y=f=>{let e=!1;for(const t of c){const a=C((f-d)/t.duration);t.line.setAttribute("stroke-dashoffset",t.length*(1-(1-(1-a)**3))),a<1&&(e=!0)}e?M=P(y):w()};M=P(y)}for(const d of["pagehide","resize"])window.addEventListener(d,()=>u(),{passive:!0});for(const d of["pointerdown","keydown","wheel","touchmove"])document.addEventListener(d,o=>{o.target?.id!=="jl-motion-review"&&u()},{capture:!0,passive:!0});window.__jlAsciiPage={figure:F,ink:E,build:S,cancel:()=>u(),version:"4.0-grid"}})()})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-silhouette-v1 ---- */
try {
(function(){
  const review=window.__jlReviewClock;
  const clock=review?.performance||window.performance;
  const raf=review?review.raf:window.requestAnimationFrame.bind(window);
  const caf=review?review.caf:window.cancelAnimationFrame.bind(window);
  // Keep the same compositor layer through the last fully visible frames.
// A subsequent replay takes over the lease before delayed restoration runs.
const layers=new WeakMap();
function retainPageLayer(page){
  let record=layers.get(page);
  if(!record){
    record={value:page.style.getPropertyValue('will-change'),priority:page.style.getPropertyPriority('will-change'),generation:0};
    layers.set(page,record);
    const properties=record.value.split(',').map(v=>v.trim()).filter(v=>v&&v!=='auto');
    if(!properties.includes('opacity'))properties.push('opacity');
    page.style.setProperty('will-change',properties.join(', '),'important');
  }
  clearTimeout(record.timer);
  if(record.idle!==undefined&&typeof cancelIdleCallback==='function')cancelIdleCallback(record.idle);
  const generation=++record.generation;
  return deferred=>{
    const restore=()=>{
      if(record.generation!==generation)return;
      if(record.value)page.style.setProperty('will-change',record.value,record.priority);else page.style.removeProperty('will-change');
      layers.delete(page);
    };
    if(!deferred){restore();return;}
    record.timer=setTimeout(()=>{
      if(typeof requestIdleCallback==='function')record.idle=requestIdleCallback(restore,{timeout:600});else restore();
    },180);
  };
}

  window.__jlSilhouetteFactory=function(loader, options){
    const hash=(a,b,seed)=>{let x=Math.imul(a+1,374761393)^Math.imul(b+1,668265263)^seed;x=Math.imul(x^(x>>>13),1274126177);return((x^(x>>>16))>>>0)/4294967295};

    const {figureFrame,figureTone}=(()=>{
      const FIGURE_WIDTH=64,FIGURE_HEIGHT=144,FIGURE_INK=window.__jlAsciiPage.ink;
      
const ink = Float32Array.from(FIGURE_INK, character => parseInt(character, 16) / 15);
const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};

function figureFrame(width, height) {
  const aspect = FIGURE_WIDTH / FIGURE_HEIGHT;
  const figureHeight = Math.min(height * .98, width * .94 / aspect);
  const figureWidth = figureHeight * aspect;
  return {
    left: (width - figureWidth) / 2,
    top: height - figureHeight,
    width: figureWidth,
    height: figureHeight,
  };
}

function sample(u, v) {
  if (u < 0 || u >= 1 || v < 0 || v >= 1) return 0;
  const x = u * (FIGURE_WIDTH - 1), y = v * (FIGURE_HEIGHT - 1);
  const left = Math.floor(x), top = Math.floor(y);
  const right = Math.min(left + 1, FIGURE_WIDTH - 1);
  const bottom = Math.min(top + 1, FIGURE_HEIGHT - 1);
  const dx = x - left, dy = y - top;
  const a = ink[top * FIGURE_WIDTH + left] * (1 - dx) + ink[top * FIGURE_WIDTH + right] * dx;
  const b = ink[bottom * FIGURE_WIDTH + left] * (1 - dx) + ink[bottom * FIGURE_WIDTH + right] * dx;
  return a * (1 - dy) + b * dy;
}

// A small articulated pose sequence keeps the approved drawing. Interpolation
// has continuous tangents, so the weight transfer does not pause at each pose.
const poses = [
  {time:0,hip:0,body:0,head:0,arm:0,lift:0},
  {time:.34,hip:-.009,body:-.020,head:.018,arm:-.025,lift:-.002},
  {time:.72,hip:.008,body:.022,head:-.032,arm:.090,lift:.001},
  {time:1.05,hip:.012,body:.012,head:-.014,arm:.045,lift:0},
];
let cachedTime = -1, cachedPose;

function articulatedPose(milliseconds) {
  if (milliseconds===cachedTime) return cachedPose;
  const time = Math.max(0,Math.min(1.05,milliseconds/1000));
  let segment = 0;
  while (segment<poses.length-2 && time>poses[segment+1].time) segment++;
  const a=poses[segment],b=poses[segment+1],before=poses[Math.max(0,segment-1)],after=poses[Math.min(poses.length-1,segment+2)];
  const duration=b.time-a.time,p=(time-a.time)/duration,p2=p*p,p3=p2*p;
  const pose={};
  for (const key of ['hip','body','head','arm','lift']) {
    const startSlope=segment===0?0:(b[key]-before[key])/(b.time-before.time);
    const endSlope=segment===poses.length-2?0:(after[key]-a[key])/(after.time-a.time);
    pose[key]=(2*p3-3*p2+1)*a[key]+(p3-2*p2+p)*duration*startSlope+(-2*p3+3*p2)*b[key]+(p3-p2)*duration*endSlope;
  }
  for (const key of ['body','head','arm']) {
    pose[key+'Cos']=Math.cos(pose[key]);pose[key+'Sin']=Math.sin(pose[key]);
  }
  cachedTime=milliseconds;
  return cachedPose=pose;
}

function articulatedTone(u,v,milliseconds) {
  const pose=articulatedPose(milliseconds);
  const upper=1-smooth((v-.53)/.30);
  const hip=smooth((v-.40)/.18)*(1-smooth((v-.83)/.16));
  let x=u-pose.hip*(hip+upper*.45),y=v-pose.lift*upper;
  const rotate=(cx,cy,key,weight)=>{
    const dx=x-cx,dy=y-cy;
    const rx=cx+dx*pose[key+'Cos']+dy*pose[key+'Sin'];
    const ry=cy-dx*pose[key+'Sin']+dy*pose[key+'Cos'];
    x+=(rx-x)*weight;y+=(ry-y)*weight;
  };
  rotate(.51,.68,'body',upper);
  rotate(.51,.17,'head',1-smooth((v-.20)/.09));
  const forearm=smooth((u-.59)/.13)*smooth((v-.42)/.11)*(1-smooth((v-.79)/.11));
  rotate(.73,.55,'arm',forearm);
  const value=sample(x,y);
  return value<.055?0:Math.pow(value,.52);
}

// Move the upper body about the hips, then articulate the neck and forearm.
// Only the source sampling moves. Every displayed character stays on its grid.
function figureTone(u, v, milliseconds, motion) {
  if (motion==='organic') return articulatedTone(u,v,milliseconds);
  const time = milliseconds / 1000;
  const gesture = Math.sin(Math.min(1, time / 1.35) * Math.PI / 2);
  const upperBody = 1 - smooth((v - .58) / .35);
  const sway = gesture * .026 * upperBody;
  let x = u - sway * (v - .78) * 1.8;
  let y = v + sway * (u - .5) * .32;

  const head = 1 - smooth((v - .19) / .12);
  const headTurn = gesture * .045 * head;
  x -= headTurn * (v - .28) * 2.1;
  y += headTurn * (u - .52) * .35;

  const forearm = smooth((u - .61) / .13) * smooth((v - .52) / .12);
  const armAngle = gesture * .105 * forearm;
  x -= armAngle * (v - .57) * 1.8;
  y += armAngle * (u - .73) * .42;

  const chest = smooth((v - .27) / .10) * (1 - smooth((v - .53) / .12));
  x = .5 + (x - .5) / (1 + Math.sin(time * 2.4) * .012 * chest);
  const value = sample(x, y);
  return value < .055 ? 0 : Math.pow(value, .52);
}

      return {figureFrame,figureTone};
    })();
    
const alphabet = '.:-+*/!?<>I1234567890AON';
const figureAlphabet = ' .:-=+*X#8AON';
const clamp = value => Math.max(0, Math.min(1, value));
const organicTimeline = Object.freeze({figure:1050, disintegration:1500, coverStart:.32, reveal:720, clearing:1250});

// Exact displacement under gravity and linear drag; rendering still snaps to
// the shared character grid. Velocities remain positive for a downward fall.
function fallingDistance(time, velocity, gravity, drag) {
  const decay = -Math.expm1(-drag * time);
  return velocity * decay / drag + gravity * (time - decay / drag) / drag;
}

class TransitionSequence {
  constructor(loader, {speed = 1, disintegration = 'scatter', coverage = 'scatter', organic = false} = {}) {
    this.loader = loader;
    this.host = loader.host;
    this.seed = loader.seed;
    this.speed = speed;
    this.disintegration = disintegration;
    this.coverage = coverage;
    this.organic = organic;
    this.timeline = organic ? organicTimeline : {figure:1100, disintegration:760, reveal:320, clearing:1020};
    this.cancelled = false;
    this.rowNodes = [];
    this.glyphs = [];
    this.metrics = {paints: 0, paintMax: 0, paintTotal: 0, frameCount: 0, frameTotal: 0, frameMax: 0, slowFrames: 0, stalls: []};
    this.lastFrame = 0;
    this.lastPhase = null;
    this.frameId = 0;
    this.resolvePhase = null;
  }

  async prepare() {
    const dpr = devicePixelRatio || 1;
    let cellWidth = Math.ceil(7 * dpr) / dpr;
    let cellHeight = Math.ceil(12 * dpr) / dpr;
    const scale = Math.max(1, Math.sqrt(innerWidth * innerHeight / (cellWidth * cellHeight * 22000)));
    cellWidth = Math.ceil(cellWidth * scale * dpr) / dpr;
    cellHeight = Math.ceil(cellHeight * scale * dpr) / dpr;
    this.width = innerWidth;
    this.height = innerHeight;
    this.columns = Math.ceil(innerWidth / cellWidth);
    this.rows = Math.ceil(innerHeight / cellHeight);
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.bounds = figureFrame(innerWidth, innerHeight);
    const grid = document.createElement('div');
    grid.className = 'grid';
    grid.setAttribute('aria-hidden', 'true');
    grid.style.width = this.columns * cellWidth + 'px';
    grid.style.height = this.rows * cellHeight + 'px';
    grid.style.setProperty('--cell-width', cellWidth + 'px');
    grid.style.setProperty('--cell-height', cellHeight + 'px');
    const measure = document.createElement('canvas').getContext('2d');
    measure.font = '400 10px "ABC Favorit Mono Ultra",ui-monospace,monospace';
    const advance = measure.measureText('M').width;
    grid.style.setProperty('--character-spacing', cellWidth - advance + 'px');
    grid.style.setProperty('--character-inset', (cellWidth - advance) / 2 + 'px');
    this.grid = grid;
    this.loader.root.insertBefore(grid, this.loader.label);
    const fragment = document.createDocumentFragment();
    for (let row = 0; row < this.rows; row++) {
      const span = document.createElement('span');
      span.className = 'row';
      span.style.top = row * cellHeight + 'px';
      this.rowNodes.push(span);
      fragment.append(span);
    }
    grid.append(fragment);
    const count = this.columns * this.rows;
    this.count = count;
    this.glyphs = new Array(count).fill(' ');
    this.dirty = new Uint8Array(this.rows);
    this.born = new Float32Array(count);
    this.coverAt = new Float32Array(count);
    this.clearAt = new Float32Array(count);
    this.clearStart = new Float32Array(count);
    this.cadence = new Float32Array(count);
    if (this.organic) {
      this.exitVelocity = new Float32Array(count);
      this.exitGravity = new Float32Array(count);
      this.exitDrag = new Float32Array(count);
    }
    for (let i = 0; i < count; i++) {
      this.born[i] = hash(i, 11, this.seed) * .46;
      this.coverAt[i] = hash(i, 31, this.seed);
      this.clearStart[i] = hash(i, 43, this.seed) * .60;
      this.clearAt[i] = this.clearStart[i] + .13 + hash(i, 47, this.seed) * .27;
      this.cadence[i] = 50 + hash(i, 53, this.seed) * 110;
      if (this.organic) {
        this.exitVelocity[i] = .012 + hash(i, 163, this.seed) * .038;
        this.exitGravity[i] = 2.3 + hash(i, 167, this.seed) * .9;
        this.exitDrag[i] = .25 + hash(i, 173, this.seed) * .45;
      }
    }
    if (this.coverage === 'descending') this.prepareDescendingCover();
    this.host.dataset.cells = String(count);
    this.host.dataset.renderer = 'html';
    return true;
  }

  prepareDescendingCover() {
    let latest = 0;
    for (let column = 0; column < this.columns; column++) {
      // A delayed top entry guarantees the upper cells are covered. Additional
      // starts can appear at any height, and all propagation goes downward.
      const starts = [{row: 0, delay: .22 + hash(column, 137, this.seed) * .22}];
      for (let source = 0; source < 3; source++) {
        starts.push({
          row: Math.floor(hash(column, 139 + source * 2, this.seed) * this.rows),
          delay: .015 + hash(column, 140 + source * 2, this.seed) * .28,
        });
      }
      const travel = .56 + hash(column, 151, this.seed) * .35;
      for (let row = 0; row < this.rows; row++) {
        let arrival = Infinity;
        for (const start of starts) {
          if (row >= start.row) arrival = Math.min(arrival, start.delay + (row - start.row) / this.rows * travel);
        }
        const index = row * this.columns + column;
        // Individual timing softens each leading edge; no rectangular patches
        // or shared bands, and an appearing character never fades or moves.
        arrival += hash(index, 157, this.seed) * .065;
        this.coverAt[index] = arrival;
        latest = Math.max(latest, this.coverAt[index]);
      }
    }
    for (let index = 0; index < this.count; index++) {
      this.coverAt[index] /= latest;
    }
    if (this.organic) {
      // Keep the exact downward order while spreading the density across the
      // whole allotted time, rather than rushing through a crowded middle.
      const order = Array.from({length:this.count}, (_, index) => index);
      order.sort((a,b) => this.coverAt[a] - this.coverAt[b] || a-b);
      for (let rank=0; rank<order.length; rank++) this.coverAt[order[rank]] = (rank+1)/order.length;
    }
  }

  setCell(index, glyph) {
    if (this.glyphs[index] !== glyph) {
      this.glyphs[index] = glyph;
      this.dirty[Math.floor(index / this.columns)] = 1;
    }
  }

  flush() {
    for (let row = 0; row < this.rows; row++) {
      const node = this.rowNodes[row], offset = row * this.columns;
      if (this.dirty[row]) {
        node.textContent = this.glyphs.slice(offset, offset + this.columns).join('');
        this.dirty[row] = 0;
      }
    }
  }

  paintFigure(progress, elapsed) {
    const bounds = this.bounds;
    for (let row = 0; row < this.rows; row++) {
      const v = ((row + .5) * this.cellHeight - bounds.top) / bounds.height;
      for (let column = 0; column < this.columns; column++) {
        const index = row * this.columns + column;
        let glyph = ' ';
        const u = ((column + .5) * this.cellWidth - bounds.left) / bounds.width;
        if (progress >= this.born[index] && u > -.08 && u < 1.08 && v >= 0 && v < 1) {
          const tone = figureTone(u, v, elapsed, this.organic ? 'organic' : undefined);
          if (tone) glyph = figureAlphabet[Math.max(1, Math.round(tone * (figureAlphabet.length - 1)))];
        }
        this.setCell(index, glyph);
      }
    }
  }

  prepareDisintegration() {
    this.fragments = [];
    this.fragmentFrame = new Array(this.count).fill(' ');
    const travel = Math.min(this.bounds.width * .20, this.width * .13);
    for (let i = 0; i < this.count; i++) {
      if (this.figureGlyphs[i] === ' ') continue;
      if (this.disintegration === 'collapse') {
        const column = i % this.columns, row = Math.floor(i / this.columns);
        // Every glyph has its own release and trajectory, including immediate
        // neighbours. No shared regions that could tear off as rectangles.
        this.fragments.push({
          glyph: this.figureGlyphs[i], column, row,
          start: .015 + hash(i, 113, this.seed) * .36,
          duration: .38 + hash(i, 127, this.seed) * .22,
          acceleration: 1.7 + hash(i, 131, this.seed) * .8,
          dy: this.rows - row + 2,
          ...(this.organic ? {
            start:.02 + hash(i, 113, this.seed) * .24,
            velocity:(.03 + hash(i, 179, this.seed) * .07) * this.height / this.cellHeight,
            gravity:(2.25 + hash(i, 181, this.seed) * .95) * this.height / this.cellHeight,
            drag:.25 + hash(i, 191, this.seed) * .70,
          } : {}),
        });
        continue;
      }
      const angle = hash(i, 79, this.seed) * Math.PI * 2;
      const distance = travel * (.35 + hash(i, 83, this.seed) * .65);
      this.fragments.push({
        glyph: this.figureGlyphs[i],
        column: i % this.columns,
        row: Math.floor(i / this.columns),
        start: .02 + hash(i, 89, this.seed) * .38,
        duration: .38 + hash(i, 97, this.seed) * .20,
        dx: Math.cos(angle) * distance / this.cellWidth,
        dy: Math.sin(angle) * distance / this.cellHeight,
      });
    }
    if (this.disintegration === 'collapse') {
      this.fragments.sort((a, b) => a.column - b.column || b.row - a.row);
    }
  }

  paintDisintegration(progress) {
    const frame = this.fragmentFrame;
    frame.fill(' ');
    // Destinations share the original grid: one opaque glyph per cell.
    for (const fragment of this.fragments) {
      const local = clamp((progress - fragment.start) / fragment.duration);
      if (this.disintegration === 'collapse') {
        // Each character accelerates downward independently. Cell occlusion keeps
        // the falling field light rather than accumulating a solid mound.
        const elapsed = Math.max(0, progress-fragment.start) * (this.organic ? this.timeline.disintegration/1000 : 0);
        const displacement = this.organic
          ? fallingDistance(elapsed,fragment.velocity,fragment.gravity,fragment.drag)
          : fragment.dy * local ** fragment.acceleration;
        const row = Math.round(fragment.row + displacement);
        if (row >= this.rows) continue;
        const index = row * this.columns + fragment.column;
        if (frame[index] === ' ') frame[index] = fragment.glyph;
        continue;
      }
      if (local === 1) continue;
      const drift = local * local;
      const column = Math.round(fragment.column + fragment.dx * drift);
      const row = Math.round(fragment.row + fragment.dy * drift);
      if (column >= 0 && column < this.columns && row >= 0 && row < this.rows) {
        frame[row * this.columns + column] = fragment.glyph;
      }
    }
    // Let the silhouette break apart before completing the existing cover.
    const coverStart = this.organic ? this.timeline.coverStart : this.coverage === 'descending' ? .44 : this.disintegration === 'collapse' ? .64 : .48;
    const cover = clamp((progress - coverStart) / (1 - coverStart));
    for (let i = 0; i < this.count; i++) {
      const glyph = frame[i] !== ' ' ? frame[i]
        : cover > 0 && cover >= this.coverAt[i]
          ? alphabet[Math.floor(hash(i, 61, this.seed) * alphabet.length)] : ' ';
      this.setCell(i, glyph);
    }
  }

  paintClear(progress, elapsed) {
    if (this.organic) {
      const frame = this.fragmentFrame;
      frame.fill(' ');
      const seconds = this.timeline.clearing / 1000;
      for (let i=0;i<this.count;i++) {
        const time = Math.max(0,progress-this.clearStart[i]*.25) * seconds;
        const shift = fallingDistance(time,this.exitVelocity[i],this.exitGravity[i],this.exitDrag[i]) * this.rows;
        const row = Math.floor(i/this.columns) + Math.round(shift);
        if (row>=this.rows) continue;
        const target = row*this.columns+i%this.columns;
        if (frame[target]===' ') frame[target] = this.coverGlyphs[i];
      }
      for (let i=0;i<this.count;i++) this.setCell(i,frame[i]);
      return;
    }
    for (let i = 0; i < this.count; i++) {
      let glyph = this.coverGlyphs[i];
      if (progress >= this.clearAt[i]) glyph = ' ';
      else if (progress >= this.clearStart[i]) {
        const tick = Math.floor(elapsed / this.cadence[i]);
        glyph = alphabet[Math.floor(hash(i, tick ^ 71, this.seed) * alphabet.length)];
      }
      this.setCell(i, glyph);
    }
  }

  phase(name, duration, draw) {
    this.host.dataset.state = name;
    const total = duration * this.speed;
    let start = null;
    return new Promise((resolve, reject) => {
      this.resolvePhase = resolve;
      const frame = now => {
        if (this.cancelled) { resolve(false); return; }
        start ??= now;
        const elapsed = now - start;
        const progress = clamp(elapsed / total);
        if (this.lastFrame) {
          const gap = now - this.lastFrame;
          this.metrics.frameCount++;
          this.metrics.frameTotal += gap;
          this.metrics.frameMax = Math.max(this.metrics.frameMax, gap);
          if (gap > 32) {
            this.metrics.slowFrames++;
            this.metrics.stalls.push({ms: +gap.toFixed(2), from: this.lastPhase, to: name, progress: +progress.toFixed(3)});
          }
        }
        this.lastFrame = now;
        this.lastPhase = name;
        const began = clock.now();
        try {
          draw(progress, elapsed / this.speed);
          this.flush();
        } catch (error) {
          this.resolvePhase = null;
          reject(error);
          return;
        }
        const cost = clock.now() - began;
        this.metrics.paints++;
        this.metrics.paintTotal += cost;
        this.metrics.paintMax = Math.max(this.metrics.paintMax, cost);
        this.host.dataset.progress = progress.toFixed(3);
        if (progress < 1) this.frameId = raf(frame);
        else { this.resolvePhase = null; resolve(true); }
      };
      this.frameId = raf(frame);
    });
  }

  async play(onReveal = () => {}) {
    this.loader.stopMessages();
    this.host.setAttribute('aria-label', document.documentElement.lang.startsWith('en') ? 'Opening the page' : 'Ouverture de la page');
    if (!await this.phase('figure', this.timeline.figure, (progress, elapsed) => this.paintFigure(progress, elapsed))) return false;
    this.figureGlyphs = this.glyphs.slice();
    this.prepareDisintegration();
    if (!await this.phase('disintegrating', this.timeline.disintegration, progress => this.paintDisintegration(progress))) return false;
    this.host.dataset.state = 'covered';
    this.coverGlyphs = this.glyphs.slice();
    // Soften the continuous backdrop without lengthening the approved timeline.
    // Glyphs keep their own opaque clearing, overlapping the end of this fade.
    let revealed = false;
    if (!await this.phase('clearing', this.timeline.clearing, (clearingProgress, elapsed) => {
      const progress = clamp(elapsed / this.timeline.reveal);
      const eased = progress * progress * (3 - 2 * progress);
      this.loader.backdrop.style.opacity = String(1 - eased);
      this.paintClear(this.organic ? clearingProgress : clamp((elapsed - 140) / 880), Math.max(0, elapsed - 140));
      if (!revealed && progress === 1) {
        revealed = true;
        onReveal();
      }
    })) return false;
    return true;
  }

  dispose() {
    this.cancelled = true;
    caf(this.frameId);
    this.resolvePhase?.(false);
    this.resolvePhase = null;
    this.loader.remove();
  }
}

    const s=new TransitionSequence(loader,{...options,disintegration:'collapse',coverage:'descending',organic:true});
    const page=document.querySelector('.page_wrap');
    const originalInert=page?.inert;
    let release=null,complete=false;
    return {
      async prepare(){
        if(page){release=retainPageLayer(page);page.inert=true;}
        await s.prepare();
        document.documentElement.dataset.jlSilhouetteVersion='1.1';
        return true;
      },
      async cover(){
        loader.stopMessages();
        if(!await s.phase('figure',s.timeline.figure,(p,t)=>s.paintFigure(p,t)))return false;
        s.figureGlyphs=s.glyphs.slice();s.prepareDisintegration();
        if(!await s.phase('disintegrating',s.timeline.disintegration,p=>s.paintDisintegration(p)))return false;
        s.coverGlyphs=s.glyphs.slice();loader.host.dataset.state='covered';
        return true;
      },
      async hide(onReveal=()=>{}){
        let revealed=false;
        complete=await s.phase('clearing',s.timeline.clearing,(progress,t)=>{
          const p=clamp(t/s.timeline.reveal),e=p*p*(3-2*p);
          loader.backdrop.style.opacity=String(1-e);
          s.paintClear(progress,t);
          if(!revealed&&p===1){revealed=true;if(page)page.inert=originalInert;loader.host.style.pointerEvents='none';onReveal();}
        });
        return complete;
      },
      remove(){
        document.documentElement.dataset.jlGridMetrics=JSON.stringify({version:'silhouette-1.1',organic:true,timeline:s.timeline,cells:s.count,paints:s.metrics.paints,maxPaint:s.metrics.paintMax,meanFrame:s.metrics.frameTotal/Math.max(1,s.metrics.frameCount),maxFrame:s.metrics.frameMax});
        s.dispose();if(page)page.inert=originalInert;release?.(complete);
      }
    };
  };
})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-subscription-ascii-v1 ---- */
try {
(function(){const t=window.__jlReviewClock,m=t?.performance||window.performance,u=t?t.raf:window.requestAnimationFrame.bind(window),f=t?t.caf:window.cancelAnimationFrame.bind(window),g=t?t.timeout:window.setTimeout.bind(window),j=t?t.clear:window.clearTimeout.bind(window);(function(){"use strict";if(!["www.jeremyloreau.com","jeremyloreau.com","jeremyloreau.webflow.io","127.0.0.1","localhost"].includes(location.hostname)||new URLSearchParams(location.search).get("ascii-effects")==="off")return;const l=function(){const o=window.jQuery;if(!o||typeof window.__jlContentBoot?.navigate!="function")return;const e=o('[cd-jc-button="continue"]');e.off("click").on("click.jlAsciiSubscription",function(d){const i=this,r=i.getAttribute("cd-jc-price-id"),a=i.getAttribute("cd-jc-stripe-instance");let n;try{r&&(localStorage.setItem("cd-jc-price-id",r),localStorage.setItem("cd-jc-redirect-url",new URL(location.pathname,location.origin).href)),a&&localStorage.setItem("cd-jc-stripe-instance",a),n=new URL(location.href),n.pathname=localStorage.getItem("cd-jc-email")?"/login":"/signup"}catch{return}d.preventDefault();const s=window.__jlContentBoot?.navigate;if(!s||matchMedia("(prefers-reduced-motion: reduce)").matches||i.closest("[data-jl-no-transition]")){location.assign(n.href);return}try{sessionStorage.setItem("jl-content-storage-test","1"),sessionStorage.removeItem("jl-content-storage-test")}catch{location.assign(n.href);return}s(n)}),e.attr("data-jl-subscription-transition","1")},c=()=>{(window.Webflow=window.Webflow||[]).push(l)};c(),document.addEventListener("load",o=>{const e=o.target;e?.tagName==="SCRIPT"&&/\/scripts\/jeremy\/jl-connect(?:\.min)?\.js(?:[?#]|$)/.test(e.src)&&c()},!0)})()})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-theme-menu-preserve ---- */
try {
(function(){function n(){document.querySelectorAll('.nav_component [cd-theme-button="switch"]').forEach(function(t){t.addEventListener("mouseup",function(e){e.stopPropagation()}),t.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation()})})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:!0}):n()})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-lightbox-image-background ---- */
try {
document.addEventListener('click', event => {
  const source = event.target.closest?.('img[src]');
  if (!source || source.closest('nav, footer, [cd-popup-wrap], [cd-popup-root], [cd-popup-open], [cd-lightbox-exclude]')) return;

  const link = source.closest('a[href]');
  if (link && link.getAttribute('href') !== '#') return;

  const url = source.getAttribute('src');
  if (!url || url.startsWith('data:')) return;

  const width = source.naturalWidth || source.width;
  const height = source.naturalHeight || source.height;
  if (width > 0 && width < 100 && height > 0 && height < 100) return;

  const enlarged = document.querySelector('[cd-popup-wrap="auto"] img.popup_image');
  if (enlarged) enlarged.toggleAttribute('data-jl-richtext-image', Boolean(source.closest('.c-richtext')));
}, { capture: true });
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- anonymous (initializeRichTextImageCursors) ---- */
try {
  document.addEventListener("click", function (e) {
    var img = e.target.closest("img");    
    if (!img) return;
                                                                                                                                                                                                         
    if (img.closest("nav, footer, [cd-popup-wrap], [cd-popup-root], [cd-popup-open], [cd-lightbox-exclude]")) return;
    var src = img.getAttribute("src") || "";                                                                                                                                                             
    if (!src || src.startsWith("data:")) return;                                                                                                                                 
    var w = img.naturalWidth || img.width || 0;
    var h = img.naturalHeight || img.height || 0;                                                                                                                                                        
    if (w > 0 && w < 100 && h > 0 && h < 100) return;                                                                                                                                                  
                                                                                                                                                                                                         
    var link = img.closest("a[href]");    
    if (link && link.getAttribute("href") !== "#") return;                                                                                                                                               
                                                                                                                                                                                                         
    e.preventDefault();
    e.stopPropagation();                                                                                                                                                                                 
                                                                                                                                                                                                       
    var popupImg = document.querySelector('[cd-popup-wrap="auto"] img');
    if (popupImg) {
      popupImg.setAttribute("src", src);                                                                                                                                                                 
      var alt = img.getAttribute("alt");
      if (alt) popupImg.setAttribute("alt", alt);                                                                                                                                                        
    }                                                                                                                                                                                                  
                                          
    if (window.popups && window.popups["auto"]) {
      window.popups["auto"].open();                                                                                                                                                                      
    }
  });                                                                                                                                                                                                    
                                                                                                                                                                                                       
  function initializeRichTextImageCursors() {
    document.querySelectorAll(".w-richtext img").forEach(function (img) {
    if (img.closest("nav, footer, [cd-popup-wrap], [cd-popup-root], [cd-popup-open], [cd-lightbox-exclude]")) return;
    var src = img.getAttribute("src") || "";
    if (!src || src.startsWith("data:")) return;                                                                                                                                 
    var w = img.naturalWidth || img.width || 0;
    var h = img.naturalHeight || img.height || 0;                                                                                                                                                        
    if (w > 0 && w < 100 && h > 0 && h < 100) return;                                                                                                                                                  
    var link = img.closest("a[href]");                                                                                                                                                                   
    if (link && link.getAttribute("href") !== "#") return;
    img.style.cursor = "zoom-in";                                                                                                                                                                        
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeRichTextImageCursors, { once: true });
  } else {
    initializeRichTextImageCursors();
  }
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- anonymous (cd-wf-dropdown="close") ---- */
try {
  var Webflow=Webflow||[];Webflow.push(()=>{$('[cd-wf-dropdown="close"]').on("click",o=>{$(o.currentTarget).closest(".w-dropdown").trigger("w-close")})});
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-overlay-scroll-lock-v1 ---- */
try {
(()=>{"use strict";if(window.__jlOverlayScrollLock||document.documentElement.classList.contains("wf-design-mode"))return;const e=document.createElement("style");e.id="jl-overlay-scroll-lock-css",e.textContent="html[data-jl-scroll-locked]{overflow:hidden !important;overscroll-behavior:none;scrollbar-gutter:stable}html[data-jl-scroll-locked]>body{overflow:visible !important}[data-jl-scroll-surface]{overscroll-behavior:contain}",document.head.append(e);const t=document.documentElement,n="data-jl-scroll-locked",o="data-jl-scroll-surface",r='.nav_component .w-nav-button,.nav_component .nav_dropdown_component > .w-dropdown-toggle,.summary_dropdown > .summary_toggle,[cd-popup-wrap],.popup_wrap,dialog,[role="dialog"][aria-modal="true"],.w-lightbox-backdrop,hyvor-talk-comments';let a=[],l=new Set,i=[],c=0,s=0,d=null;function u(e){if(!e||!e.isConnected||e.closest('[hidden],.hidden,.w-condition-invisible,[inert],[data-jl-summary-motion="hidden"]'))return!1;const t=getComputedStyle(e);return"none"!==t.display&&"hidden"!==t.visibility&&"collapse"!==t.visibility&&Array.from(e.getClientRects()).some(e=>e.width>0&&e.height>0)}function m(){a=Array.from(document.querySelectorAll(r)),l=new Set([t,document.body]),a.forEach(e=>{for(let t=e;t;t=t.parentElement)l.add(t);e.matches(".w-dropdown-toggle")&&e.nextElementSibling&&l.add(e.nextElementSibling)})}function h(){i.forEach(e=>e.removeAttribute(o)),i=[],t.removeAttribute(n),clearInterval(s),s=0}function p(){c=0;try{const e=function(){const e=new Set;return a.forEach(t=>{if(u(t))if(t.matches(".w-nav-button")){if("true"===t.getAttribute("aria-expanded")||t.classList.contains("w--open")){const n=t.closest(".w-nav")?.querySelector(".w-nav-menu");u(n)&&e.add(n)}}else if(t.matches(".w-dropdown-toggle")){const n=t.parentElement.querySelector(":scope > .w-dropdown-list");u(n)&&("true"===t.getAttribute("aria-expanded")||n.classList.contains("w--open"))&&e.add(n)}else t.matches("dialog")?t.open&&e.add(t):t.matches("hyvor-talk-comments")?document.body.classList.contains("ht-popup-open")&&e.add(t):e.add(t)}),Array.from(e)}();i.forEach(t=>{e.includes(t)||t.removeAttribute(o)}),e.forEach(e=>{e.hasAttribute(o)||e.setAttribute(o,"")}),i=e,t.hasAttribute(n)!==!!i.length&&t.toggleAttribute(n,!!i.length),i.length&&!s&&(s=setInterval(p,500)),!i.length&&s&&(clearInterval(s),s=0)}catch(e){h()}}function f(){c||(c=requestAnimationFrame(p))}function v(e,t,n,o){if(p(),!i.length||!e.cancelable||e.ctrlKey)return;const r=function(e){const t=e.composedPath();let n=t.findIndex(e=>i.includes(e));if(n<0)return[];if(t[n].matches('.w-dropdown-list'))for(let e=n+1;e<t.length;e++){if(!i.includes(t[e]))continue;n=e;if(!t[e].matches('.w-dropdown-list'))break}return t.slice(0,n+1).filter(e=>e instanceof Element)}(e),a=Math.abs(t)>Math.abs(n);if(o&&a&&r.length)return;const l=a?t:n;l&&!function(e,t,n){return e.some(e=>{const o=getComputedStyle(e);if(!/^(auto|scroll|overlay)$/.test(n?o.overflowX:o.overflowY))return!1;const r=n?e.scrollWidth-e.clientWidth:e.scrollHeight-e.clientHeight,a=n?e.scrollLeft:e.scrollTop;return r>1&&(t<0?a>0:a<r-1)})}(r,l,a)&&e.preventDefault()}const g=new MutationObserver(e=>{let t=!1,n=!1;for(const o of e)if("attributes"===o.type)l.has(o.target)&&(t=!0);else for(const e of[...o.addedNodes,...o.removedNodes])if(e instanceof Element&&(e.matches(r)||e.querySelector(r))){t=n=!0;break}n&&m(),t&&f()});function w(){m(),g.observe(t,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["class","style","hidden","open","inert","aria-expanded","aria-hidden","aria-modal","data-jl-summary-motion"]}),p()}document.addEventListener("wheel",e=>v(e,e.deltaX,e.deltaY,!1),{passive:!1,capture:!0}),document.addEventListener("touchstart",e=>{d=1===e.touches.length?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null},{passive:!0,capture:!0}),document.addEventListener("touchmove",e=>{if(!d||1!==e.touches.length)return;const t=e.touches[0],n=d.x-t.clientX,o=d.y-t.clientY;d={x:t.clientX,y:t.clientY},v(e,n,o,!0)},{passive:!1,capture:!0});for(const e of["resize","orientationchange","pageshow"])window.addEventListener(e,f,{passive:!0});for(const e of["transitionend","animationend","toggle","close"])document.addEventListener(e,f,!0);document.addEventListener("visibilitychange",f),window.addEventListener("pagehide",()=>{cancelAnimationFrame(c),c=0,h()}),window.__jlOverlayScrollLock=!0,"loading"===document.readyState?document.addEventListener("DOMContentLoaded",w,{once:!0}):w()})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-card-nav-intent ---- */
try {
(() => {
  const selector = ':is(.recipes_coll_list,.exercices_coll_list,.testimonials_coll_list) a.clickable_link[href]';
  const detailPath = /^\/(?:recette|exercice|temoignage)\/[^/]+\/?$/;
  const supportsPrefetch = HTMLScriptElement.supports?.('speculationrules');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  const prefetched = new Set();
  let candidate, intentTimer, rule, pending, pendingTimer;

  function cardLink(target) {
    const link = target.closest?.(selector);
    if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;
    const url = new URL(link.href);
    if (url.origin === location.origin && detailPath.test(url.pathname) && !url.search && !url.hash
        && url.pathname !== location.pathname) return link;
  }
  function allowPrefetch() {
    const connection = navigator.connection;
    return supportsPrefetch && mouse.matches && document.readyState === 'complete' && !document.hidden
      && !connection?.saveData && !/2g/.test(connection?.effectiveType || '');
  }
  function cancelIntent() {
    clearTimeout(intentTimer);
    candidate = undefined;
  }
  function prefetch(link) {
    if (!allowPrefetch() || prefetched.has(link.href) || prefetched.size >= 3 || !link.isConnected) return;
    const next = document.createElement('script');
    next.type = 'speculationrules';
    next.id = 'jl-card-prefetch-rule';
    next.textContent = JSON.stringify({prefetch:[{urls:[link.href], eagerness:'immediate'}]});
    rule?.remove();
    document.head.append(next);
    rule = next;
    prefetched.add(link.href);
  }
  document.addEventListener('pointerover', event => {
    if (event.pointerType !== 'mouse' || !allowPrefetch()) return;
    const link = cardLink(event.target);
    if (!link || candidate === link) return;
    cancelIntent();
    candidate = link;
    intentTimer = setTimeout(() => { cancelIntent(); prefetch(link); }, 200);
  }, {passive:true});
  document.addEventListener('pointerout', event => {
    if (candidate?.contains(event.target) && !candidate.contains(event.relatedTarget)) cancelIntent();
  }, {passive:true});

  function clearPending() {
    clearTimeout(pendingTimer);
    pending?.removeAttribute('data-jl-opening-card');
    pending = undefined;
  }
  window.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = cardLink(event.target);
    if (!link) return;
    clearPending();
    pending = link;
    pending.setAttribute('data-jl-opening-card', '');
    pendingTimer = setTimeout(clearPending, 4000);
  });
  window.addEventListener('pageshow', clearPending);
})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- anonymous (cookiescript_readmore) ---- */
try {
(function(){var r={en:{text:"Read my privacy policy",href:"/en/legal/privacy"}},a=(document.documentElement.lang||"").slice(0,2).toLowerCase(),e=r[a];if(!e)return;function n(){var t=document.getElementById("cookiescript_readmore");!t||t.textContent===e.text||(t.textContent=e.text,t.setAttribute("href",e.href),t.setAttribute("aria-label",e.text+", opens a new window"))}n(),new MutationObserver(n).observe(document.body,{childList:!0})})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- anonymous (testimonials_google_card_date) ---- */
try {
(function () {
  if (!/^fr(?:-|$)/i.test(document.documentElement.lang)) return;
  const selector = '.testimonials_google_card_date .u-text-style-card-tag';
  const months = {jan:'janv.', feb:'févr.', mar:'mars', apr:'avr.', may:'mai', jun:'juin', jul:'juil.', aug:'août', sep:'sept.', oct:'oct.', nov:'nov.', dec:'déc.'};
  function formatDate(element) {
    const match = element.textContent.trim().match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
    if (!match) return;
    const month = months[match[2].toLowerCase()];
    if (month) element.textContent = match[1] + ' ' + month + ' ' + match[3];
  }
  function formatWithin(root) {
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    if (root.matches && root.matches(selector)) formatDate(root);
    root.querySelectorAll(selector).forEach(formatDate);
    root.querySelectorAll('template').forEach(template => formatWithin(template.content));
  }
  document.querySelectorAll('[cd-slider="google"]').forEach(container => {
    if (container.hasAttribute('data-review-dates-localized')) return;
    container.setAttribute('data-review-dates-localized', 'fr');
    formatWithin(container);
    new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(formatWithin));
    }).observe(container, {childList: true, subtree: true});
  });
})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- anonymous ([cd-slider="google"]) (only where [cd-slider="google"]) ---- */
if (document.querySelector("[cd-slider=\"google\"]")) {
try {
  const container = document.querySelector('[cd-slider="google"]');

  container.addEventListener('click', (e) => {
    const button = e.target.closest('[cd-button="see_more"]');
    if (!button) return;
  
    const sibling = button.parentElement.querySelector('.testimonials_avis_line-clamp');
    if (sibling) {
      sibling.classList.remove('is-clamped');
      button.classList.add('hidden');
  
      sliders.google.autoplay = 0;
      sliders.google.swiper.autoplay.stop();
    }
  });
} catch (e) { setTimeout(function () { throw e; }); }
}

/* ---- anonymous (data-dynamic-year) [adapted: runs immediately] ---- */
try {
(function () {
  document.querySelectorAll("[data-dynamic-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
} catch (e) { setTimeout(function () { throw e; }); }
