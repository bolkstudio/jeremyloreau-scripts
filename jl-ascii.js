/*!
 * jl-ascii.js v1.0.0
 * Bolk Studio, for jeremyloreau.com. Code by Jérémy Loreau, moved out of inline Webflow embeds unchanged
 * so the browser caches it between pages.
 * Sync. Replaces the scripts of the three ASCII embeds of the global-styles component, in their original order.
 * Each original script runs in its own try/catch, as separate inline scripts did.
 */

/* ---- #jl-image-previews-v2 ---- */
try {
(function () {
  'use strict';
  if (!['www.jeremyloreau.com','jeremyloreau.com','jeremyloreau.webflow.io','localhost','127.0.0.1'].includes(location.hostname)) return;
  const boot=window.__jlContentBoot;
  if (!boot || typeof boot.mediaPixels!=='function') return;
  const manifests=[{"url":"https://cdn.prod.website-files.com/6900cabdf71e14f345a9ebf6/6ae957f57882f951c5e93502_jl-ascii-portraits-v2.json","keys":"69f09f50f7cc1fcef2dece1b,69f09f7dadbceaea6387b5a8,69f09f88468799aa60b8f4dc,69fc3e2f529e16818d1826ee,69fc3e30529e16818d1826f7,69fc3e30529e16818d182709,69fc3e30529e16818d182710,69fc3e30529e16818d182713,69fc3e3f9481e9f6430d1e9f,69fc3e3f9481e9f6430d1ea2,69fc3e3f9481e9f6430d1ea5,69fc3e409481e9f6430d1eb0,69fc3e409481e9f6430d1eba,69fc3e47e4db26e62efe1238,69fc3e5d878e95f7681ebae6,69fc3e6250429235d37de67b,69fc3e6250429235d37de685,69fc3e653d02f19146fbe3d9,69fc3e7ee232500845bb9779,69fc3eb848da64e076594b1d,69fc3eb848da64e076594b26,69fc3ebeda08ce11993faa93,69fc3ee09ec4a370e9c8a12d,69fc3ee61bbf96806d077f29,69fc40a5f21540a80b995289,69fc4403e707b59847c3cf85,69fc44052aa32faaac7d839c,69fc440d02f69af52bc8fd2a,69fc44162aa32faaac7d85eb,69fc441a6b1fcd20c9515dfb,69fc44232d508b2679b2a835,69fc442648da64e0765a54bd,69fc4438808f93b83883a63d,69fc444728f6fd75fb8ea6a5,69fc444cefe1d3130f204010,69fc444e11d660c7d76d5791,69fc445c18b2d72c10a2fa00,69fc445edc552955eb547518,69fc4470821183049dfc7865,69fc44a44009522085443618,69fc44b3c4c5617c3858f6dc,69fc44c0da08ce119940a981,69fcc7d562a17d65d8d39481,6a0af3c467988af10e083d4d,6a27ff906f95c671759f93fd,6a27ff93f4c8aab3a6f1c9a3,6a27ff96f9d72c14de8052c6,6a27ff9e282da076ac118793,6a27ffa628ba6a7e81bf120a,6a27ffa7f9d72c14de806043,6a27ffa9e4b52c1604a15eb6"},{"url":"https://cdn.prod.website-files.com/6900cabdf71e14f345a9ebf6/6ae957f652e35673019cddda_jl-ascii-recipes-v2.json","keys":"69fc570489cda18137c170d6,69fc5702c769e5b59c771890,69fc4dbbdd26aa97a5a0476f,69fc56663612f478149bb2ff,69fc565f654b63b451efe52c,69fc55843aafad8471952283,69fc54d28d380ccc9f6f14e6,69fc54cb3b2cb14d61a452f1,69fc549b201e79d5aae81db5,69fc4c4c83c5fc5a28df8d48,69fc4c4b2aa32faaac7f23d4,69fc4b5c529e16818d1aaa1d,69fc4b247fc8445d50c9fb9f,69fc558928f6fd75fb926e8d,6a2b7e6e8235360ef3a82229,69fc546c359115ee004701c6,69fc4c527e6aa02c179ba963,69fc4c3e1bc5a7a93c0d62e6,69fc4b4c90512eae5e70fc6d,69fc4aa397afdf5e793e7be1,69fc546f3f6a58a46b687731,69fc54844011b3eb887be571,69fc5417c6f4541bc44e8d87,69fc4c9b13b0754e86eb8de2,69fc4c01cfc49bb4d04a96f4"},{"url":"https://cdn.prod.website-files.com/6900cabdf71e14f345a9ebf6/6ae957f7b37e7fb3d3adb025_jl-ascii-exercises-v2.json","keys":"6ae730c2813e1e16ff9eea74,6ae730c2813e1e16ff9eea6f,6ae730c2813e1e16ff9eea6c,6ae707c2e40d2f1f1cfc6828,6aa6a923b82afbfbe77043ec,6aa647c2d2239e4e49923a67,6aa647c2d2239e4e49923a72,6aa647c2d2239e4e49923a6f,6aa647c2d2239e4e49923a6c,6aa647c2d2239e4e49923a75,6aa647c2d2239e4e49923a78,6aa647c3d2239e4e49923a8c,6aa6a926b82afbfbe770442a,6aa6a926b82afbfbe7704426,6aa6a926b82afbfbe770443b,6aa6a926b82afbfbe7704438,6aa6a926b82afbfbe7704440,6aa6a926b82afbfbe7704450,6aa6a926b82afbfbe7704449,6aa6a926b82afbfbe770444d,6aa6a926b82afbfbe7704454,6aa6a926b82afbfbe770445b,6aa6a926b82afbfbe7704470,6aa6a927b82afbfbe7704474,6aa6a926b82afbfbe770446b"}]
;
  const routes=new Map(),records=new Map(),samples=new Map(),loads=new Map(),reads=new Map(),queued=new Set();
  for(const group of manifests) for(const key of group.keys.split(',')) routes.set(key,group.url);
  const MAX=128,AGE=30*86400000;
  let opening;
  // Reuse the same preview for the seven equivalent AVIF covers.
  const optimizedCoverKeys = {
    '6a27ff986f95c671759f992b': '69fc3ee09ec4a370e9c8a12d',
    '6aed88cd4e19093d74d8c103': '69fc3e6250429235d37de685',
    '6a27ff986f95c671759f9926': '69fc3eb848da64e076594b1d',
    '6aed88d65bb64f287e3851b4': '69fc3e5d878e95f7681ebae6',
    '69fcc35573c6cf8cde41350e': '69fc3e30529e16818d182709',
    '6a27ff9e282da076ac118790': '69fc3eb848da64e076594b26',
    '6a0af5a3406df0db2fb07c2c': '69f09f50f7cc1fcef2dece1b'
  };
  function keyOf(source) {
    try {
      const url=new URL(source,location.href);
      if(url.hostname!=='cdn.prod.website-files.com'||!/^\/(6900cabdf71e14f345a9ebf6|69031afe4c7353d5c9a85e19)\//.test(url.pathname)||/\.svg(?:$|[?#])/i.test(url.pathname))return null;
      const key=url.pathname.match(/\/([0-9a-f]{24})_[^/]+$/)?.[1];
      return key ? (optimizedCoverKeys[key] || key) : null;
    } catch {return null;}
  }
  function valid(entry) {
    return Array.isArray(entry)&&entry.length===3&&Number.isFinite(entry[0])&&entry[0]>0&&Number.isFinite(entry[1])&&entry[1]>0&&typeof entry[2]==='string'&&/^[A-Za-z0-9+/]{480}$/.test(entry[2]);
  }
  function remember(key,entry) {
    if(!valid(entry))return false;
    records.delete(key);records.set(key,entry);
    if(records.size>MAX)records.delete(records.keys().next().value);
    return true;
  }
  function sample(source,size=96) {
    const key=keyOf(source),entry=key&&records.get(key);
    if(!entry||!Number.isInteger(size)||size<1||size>256)return null;
    const cacheKey=key+'|'+size;
    if(samples.has(cacheKey))return samples.get(cacheKey);
    const bytes=atob(entry[2]),pixels=new Uint8ClampedArray(size*size*4);
    const tone=(x,y)=>{const i=y*36+x,b=bytes.charCodeAt(i>>>1);return(i&1?b&15:b>>>4)*17};
    for(let y=0;y<size;y++) {
      const sy=Math.max(0,Math.min(19,(y+.5)*20/size-.5)),y0=Math.floor(sy),y1=Math.min(19,y0+1),fy=sy-y0;
      for(let x=0;x<size;x++) {
        const sx=Math.max(0,Math.min(35,(x+.5)*36/size-.5)),x0=Math.floor(sx),x1=Math.min(35,x0+1),fx=sx-x0;
        const a=tone(x0,y0)*(1-fx)+tone(x1,y0)*fx,b=tone(x0,y1)*(1-fx)+tone(x1,y1)*fx;
        const value=Math.round(a*(1-fy)+b*fy),i=(y*size+x)*4;
        pixels[i]=pixels[i+1]=pixels[i+2]=value;pixels[i+3]=255;
      }
    }
    const result={pixels,iw:entry[0],ih:entry[1],preview:true};
    samples.set(cacheKey,result);if(samples.size>24)samples.delete(samples.keys().next().value);
    return result;
  }
  function database() {
    if(opening)return opening;
    opening=new Promise(resolve=>{
      try {
        const request=indexedDB.open('jl-image-previews-v2',1);
        let finished=false;
        const finish=value=>{if(finished){value?.close();return}finished=true;clearTimeout(timer);resolve(value)};
        const timer=setTimeout(()=>finish(null),500);
        request.onupgradeneeded=()=>{const store=request.result.createObjectStore('previews',{keyPath:'key'});store.createIndex('savedAt','savedAt')};
        request.onsuccess=()=>{request.result.onversionchange=()=>request.result.close();finish(request.result)};
        request.onerror=request.onblocked=()=>finish(null);
      } catch {resolve(null);}
    });
    return opening;
  }
  async function read(key) {
    if(reads.has(key))return reads.get(key);
    const promise=(async()=>{
      const db=await database();if(!db)return null;
      return new Promise(resolve=>{
        try {
          const request=db.transaction('previews').objectStore('previews').get(key);
          request.onsuccess=()=>{const record=request.result;resolve(record&&Date.now()-record.savedAt<AGE&&valid(record.entry)?record.entry:null)};
          request.onerror=()=>resolve(null);
        }catch{resolve(null)}
      });
    })();
    reads.set(key,promise);if(reads.size>MAX)reads.delete(reads.keys().next().value);
    return promise;
  }
  async function persist(key,entry) {
    const db=await database();if(!db)return;
    try {
      const transaction=db.transaction('previews','readwrite'),store=transaction.objectStore('previews');
      store.put({key,entry,savedAt:Date.now()});
      const count=store.count();
      count.onsuccess=()=>{let excess=count.result-MAX;if(excess<=0)return;const cursor=store.index('savedAt').openCursor();cursor.onsuccess=()=>{const item=cursor.result;if(item&&excess-->0){item.delete();item.continue()}}};
      transaction.onerror=()=>{};
    }catch{}
  }
  function capture(source,data,size) {
    const key=keyOf(source);
    if(!key||records.has(key)||queued.has(key)||!data?.pixels||!data.iw||!data.ih||!Number.isInteger(size)||data.pixels.length!==size*size*4)return;
    queued.add(key);if(queued.size>256)queued.delete(queued.keys().next().value);
    const pixels=data.pixels;
    const run=()=>{
      try {
        const tones=new Uint8Array(720);let alpha=0;
        for(let y=0;y<20;y++)for(let x=0;x<36;x++) {
          const sx=Math.min(size-1,Math.floor((x+.5)*size/36)),sy=Math.min(size-1,Math.floor((y+.5)*size/20)),i=(sy*size+sx)*4;
          alpha+=pixels[i+3];tones[y*36+x]=Math.round((pixels[i]*.2126+pixels[i+1]*.7152+pixels[i+2]*.0722)/255*15);
        }
        if(alpha<720*250)return;
        let encoded='';for(let i=0;i<720;i+=2)encoded+=String.fromCharCode((tones[i]<<4)|tones[i+1]);
        const entry=[data.iw,data.ih,btoa(encoded)];
        remember(key,entry);reads.delete(key);persist(key,entry);
      }catch{}
    };
    if(typeof requestIdleCallback==='function')requestIdleCallback(run,{timeout:1500});else setTimeout(run,32);
  }
  function load(url) {
    if(loads.has(url))return loads.get(url);
    const promise=(async()=>{
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),1800);
      try {
        const response=await fetch(url,{credentials:'omit',cache:'force-cache',priority:'low',signal:controller.signal});
        if(!response.ok||Number(response.headers.get('content-length'))>40000)return;
        const text=await response.text();if(text.length>40000)return;
        const data=JSON.parse(text);
        for(const[key,entry]of Object.entries(data))if(routes.get(key)===url)remember(key,entry);
      }catch{}finally{clearTimeout(timer)}
    })();loads.set(url,promise);return promise;
  }
  async function prepare(image,size=96) {
    const source=image.currentSrc||image.src,key=keyOf(source);
    if(!key)return null;
    let data=sample(source,size);if(data)return data;
    const entry=await read(key);if(entry)remember(key,entry);
    if(!records.has(key)&&routes.has(key))await load(routes.get(key));
    data=sample(source,size);
    return data;
  }
  const nativeSample=boot.mediaPixels.jlNativeSample||boot.mediaPixels;
  const guardedSample=(image,size=96,createCanvas)=>{
    if(image.tagName==='IMG') {
      if(!image.complete||!image.naturalWidth||!image.naturalHeight)throw Error('image-not-ready');
    }
    if(image.tagName==='VIDEO'&&image.readyState<2)throw Error('video-not-ready');
    const data=nativeSample(image,size,createCanvas);
    if(image.tagName==='IMG')capture(image.currentSrc||image.src,data,size);
    return data;
  };
  guardedSample.jlPreviewGuard=true;guardedSample.jlNativeSample=nativeSample;
  boot.mediaPixels=guardedSample;
  boot.isStillImage=image=>image.tagName==='IMG'&&!/\.gif(?:[?#]|$)/i.test(image.currentSrc||image.src||'');
  const learn=image=>{try{return guardedSample(image)}catch{return null}};
  // Every lightbox opening reuses cached pixels and starts a fresh reveal.
  window.__jlImagePreviews={version:'2.1',count:routes.size,prepare,sample,learn};
})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-media-feedback-v1 ---- */
try {
(function(){
  'use strict';
  const boot=window.__jlContentBoot;
  if(!boot||!['www.jeremyloreau.com','jeremyloreau.com','jeremyloreau.webflow.io','localhost','127.0.0.1'].includes(location.hostname))return;
  const describe=boot.describeVideo;
  boot.VIDEO_SELECTOR+=',svg';
  boot.describeVideo=element=>element.tagName.toLowerCase()==='svg'?{provider:'svg',key:'svg',poster:'svg'}:describe(element);
  const style=document.createElement('style');
  style.textContent='[data-media-stage]:has(img[data-media-gif][data-jl-image-reveal="armed"]) [data-media-play]{opacity:0!important;visibility:hidden!important}[data-media-stage]:has(img[data-media-gif][data-jl-image-reveal="animating"]) [data-media-play]{opacity:var(--jl-media-control-reveal,0)!important;visibility:var(--jl-media-control-visibility,hidden)!important;transition:none!important}.popup_wrap.is-image .jl-image-ascii{margin:0!important;padding:0!important;border:0!important;transform:none!important;transition:none!important}';
  document.head.append(style);
  function controls(image,progress){
    if(!image.matches('img[data-media-gif]'))return;
    const stage=image.closest('[data-media-stage]');
    if(stage){stage.style.setProperty('--jl-media-control-reveal',progress);stage.style.setProperty('--jl-media-control-visibility',progress>.02?'visible':'hidden');}
  }
  function rect(image){
    const box=image.getBoundingClientRect();
    if(!image.matches('.popup_wrap.is-image img')||!image.naturalWidth)return box;
    const css=getComputedStyle(image),sx=box.width/(image.offsetWidth||box.width||1),sy=box.height/(image.offsetHeight||box.height||1);
    const left=(parseFloat(css.borderLeftWidth)+parseFloat(css.paddingLeft))*sx,top=(parseFloat(css.borderTopWidth)+parseFloat(css.paddingTop))*sy;
    const width=box.width-left-(parseFloat(css.borderRightWidth)+parseFloat(css.paddingRight))*sx,height=box.height-top-(parseFloat(css.borderBottomWidth)+parseFloat(css.paddingBottom))*sy;
    if(!['contain','scale-down','none'].includes(css.objectFit))return box;
    let scale=css.objectFit==='none'?1:Math.min(width/(image.naturalWidth*sx),height/(image.naturalHeight*sy));
    if(css.objectFit==='scale-down')scale=Math.min(1,scale);
    const w=image.naturalWidth*sx*scale,h=image.naturalHeight*sy*scale,pos=css.objectPosition.split(' ');
    const fraction=value=>value==='left'||value==='top'?0:value==='right'||value==='bottom'?1:(parseFloat(value)||50)/100;
    const x=box.left+left+(width-w)*fraction(pos[0]),y=box.top+top+(height-h)*fraction(pos[1]||pos[0]);
    return{left:x,top:y,right:x+w,bottom:y+h,width:w,height:h};
  }
  async function svgPixels(element,size){
    // The exercise fills its muscles in Webflow's ready callback. Sample that final SVG.
    if(element.matches('svg[cd-dummy]')&&element.closest('.man_contain')?.querySelector('.man_legend')?.getAttribute('data-cd-legend-ready')!=='true')await new Promise(resolve=>{
      let done=false;const finish=()=>{if(done)return;done=true;clearTimeout(timer);resolve();};
      const timer=setTimeout(finish,2200);(window.Webflow=window.Webflow||[]).push(finish);
    });
    await new Promise(resolve=>requestAnimationFrame(resolve));
    const source=boot.svgSnapshot(element,getComputedStyle(element).color);
    const xml=new DOMParser().parseFromString(decodeURIComponent(source.slice(source.indexOf(',')+1)),'image/svg+xml');
    xml.documentElement.style.opacity='1';xml.documentElement.style.visibility='visible';
    const sample=new Image();sample.decoding='async';
    await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('svg-timeout')),2500);sample.onload=()=>{clearTimeout(timer);resolve();};sample.onerror=()=>{clearTimeout(timer);reject(Error('svg-sample'));};sample.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(xml.documentElement));});
    element.dataset.jlSvgSample='computed-style';
    return boot.mediaPixels(sample,size);
  }
  // Reserve the intrinsic ratio before the viewer's own image finishes loading.
  function primePopupGeometry(image){
    if(!image.matches('.popup_wrap.is-image img'))return;
    const source=image.getAttribute('src');
    if(!source)return;
    const original=Array.from(document.images).find(other=>other!==image&&!other.closest('.popup_wrap')&&other.naturalWidth&&
      (other.getAttribute('src')===source||other.currentSrc===image.src||other.src===image.src));
    if(original){image.width=original.naturalWidth;image.height=original.naturalHeight;}
  }

  window.__jlMediaFeedback={controls,rect,svgPixels,primePopupGeometry};
})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-ascii-fade-v1 ---- */
try {
(function(){const f=window.__jlReviewClock,w=f?.performance||window.performance,G=f?f.raf:window.requestAnimationFrame.bind(window),L=f?f.caf:window.cancelAnimationFrame.bind(window),P=f?f.timeout:window.setTimeout.bind(window),M=f?f.clear:window.clearTimeout.bind(window);(function(){"use strict";const x=window.__jlMediaFeedback;if(!x)return;const A=t=>Math.max(0,Math.min(1,t)),v="http://www.w3.org/2000/svg",p=" .\xB7-:+=/!?<>I1234567890AON",U=new URLSearchParams(location.search).get("ascii-image-speed")==="slow"?120:70,g=new Map;let N=0;function b(t,e){let i=Math.imul(t+1,2654435761)^e;return i=Math.imul(i^i>>>16,2246822507),i=Math.imul(i^i>>>13,3266489909),((i^i>>>16)>>>0)/4294967296}function O(t){const e=getComputedStyle(t),i=[e.fontStyle,e.fontWeight,"32px",e.fontFamily].join(" ");if(g.has(i))return g.get(i);const o=document.createElement("canvas");o.width=64,o.height=64;const n=o.getContext("2d",{willReadFrequently:!0}),a=[];if(!n)throw Error("fade-measure");n.font=i,n.textBaseline="top",n.fillStyle="#fff";for(const l of p){n.clearRect(0,0,64,64),n.fillText(l,8,8);const s=n.getImageData(0,0,64,64).data;let d=0;for(let m=3;m<s.length;m+=4)d+=s[m];a.push(Math.max(1,d))}return o.width=o.height=1,g.size>12&&g.clear(),g.set(i,a),a}function y(t){const e=t.asciiFade;if(e){e.disposed=!0,M(e.timer);for(const i of e.images)i.onload=i.onerror=null,i.removeAttribute("href");for(const[i,o,n]of e.styles)o?e.text.style.setProperty(i,o,n):e.text.style.removeProperty(i);e.svg.remove(),e.mask.width=e.mask.height=1,t.asciiFade=null}}function S(t,e,i){e.disposed||t.asciiFade!==e||(t.fadeFailedField=t.field,t.image.dataset.jlFadeError=String(i.message||i).slice(0,80),e.text.textContent=t.lastText||e.field.glyphs.join(""),y(t))}function I(t){
  // The SVG mask uses the text's layout height, before the vertical transform.
  const e=w.now(),i=t.field,o=t.width,n=t.text.offsetHeight||t.height,a=document.createElement("canvas");a.width=i.columns,a.height=i.rows;const l=a.getContext("2d");if(!l)throw Error("fade-mask");const s=l.createImageData(i.columns,i.rows);s.data.fill(255);const d=new Float64Array(i.count),m=new Float64Array(i.count),k=new Uint8Array(i.count),h=new Uint8Array(i.count),C=new Float64Array(i.count),E=O(t.text);for(let r=0;r<i.count;r++){const F=A((i.birth[r]-.02)/.4);d[r]=.72+.1*(F*.6+b(r,i.seed^1540483477)*.4),m[r]=.085+.075*b(r,i.seed^668265263),k[r]=i.glyphs[r]&&i.glyphs[r]!==" "?1:0,h[r]=Math.max(1,p.indexOf(i.glyphs[r])),C[r]=E[h[r]]}const u=document.createElementNS(v,"svg"),j=document.createElementNS(v,"defs"),c=document.createElementNS(v,"mask");u.setAttribute("width","0"),u.setAttribute("height","0"),u.style.cssText="position:absolute;pointer-events:none",u.setAttribute("aria-hidden","true"),c.id="jl-character-mask-"+ ++N;for(const[r,F]of Object.entries({maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse",x:0,y:0,width:o,height:n}))c.setAttribute(r,F);c.style.maskType="alpha";const _=[0,1].map(()=>{const r=document.createElementNS(v,"image");return r.setAttribute("width",o),r.setAttribute("height",n),r.setAttribute("preserveAspectRatio","none"),r.style.imageRendering="pixelated",r.style.opacity="0",c.append(r),r});j.append(c),u.append(j),t.text.parentNode.append(u);const q=["mask-image","-webkit-mask-image","mask-repeat","-webkit-mask-repeat"].map(r=>[r,t.text.style.getPropertyValue(r),t.text.style.getPropertyPriority(r)]),R={field:i,host:t.host,text:t.text,mask:a,maskContext:l,pixels:s,starts:d,durations:m,visible:k,baseGlyphs:h,budgets:C,masses:E,svg:u,resource:c,images:_,styles:q,glyphs:i.glyphs.slice(),lastTick:-1,shuffles:0,changedCells:0,paintMax:0,ready:!1,loading:!1,front:-1,revision:0,committed:0,source:"",pendingText:"",disposed:!1};return t.asciiFade=R,t.host.dataset.fadeRenderer="native-characters",t.host.dataset.fadePrepareMs=(w.now()-e).toFixed(2),R}function D(t,e){const i=t.field;let o=0;for(let a=0;a<i.count;a++){let l=" ";if(t.visible[a]){const s=1+(t.durations[a]-.085)/.075,d=(t.starts[a]-.72)/.1,m=Math.floor((e+d)/s),k=Math.floor(b(a,i.seed^Math.imul(m+1,2654435761))*5)-2,h=Math.max(1,Math.min(p.length-1,t.baseGlyphs[a]+k));l=p[h],t.budgets[a]=Math.min(t.budgets[a],t.masses[h])}l!==t.glyphs[a]&&o++,t.glyphs[a]=l}const n=[];for(let a=0;a<i.rows;a++)n.push(t.glyphs.slice(a*i.columns,(a+1)*i.columns).join(""));t.pendingText=n.join(`
`),t.lastTick=e,t.shuffles++,t.changedCells+=o}function T(t,e){if(e.loading||e.disposed)return;e.maskContext.putImageData(e.pixels,0,0);const i=e.mask.toDataURL("image/png"),o=e.pendingText,n=e.revision;if(i===e.source&&e.ready){e.text.textContent=o,e.committed=n;return}e.loading=!0;const a=e.front===0?1:0,l=e.images[a],s=()=>{if(!(e.disposed||t.asciiFade!==e)){if(M(e.timer),l.onload=l.onerror=null,e.front>=0&&(e.images[e.front].style.opacity="0"),l.style.opacity="1",e.front=a,e.source=i,e.text.textContent=o,e.text.dataset.glyphFrame=e.shuffles,!e.ready){const d="url(#"+e.resource.id+")";e.text.style.maskImage=d,e.text.style.webkitMaskImage=d,e.text.style.maskRepeat="no-repeat",e.ready=!0,e.host.style.opacity=String(t.nativeOpacity*(t.imageTiming?.maskOpacity??1))}e.committed=n,e.loading=!1,e.revision>n&&T(t,e)}};l.onload=s,l.onerror=()=>S(t,e,Error("fade-mask-load")),e.timer=P(()=>S(t,e,Error("fade-mask-timeout")),500),l.setAttribute("href",i)}function chooseFade(state, states, photoEnd) {
  const min = 400;
  const max = Math.min(700, photoEnd - 430);
  const reserved = [];
  for (const other of states.values()) {
    if (other === state || !other.image.isConnected || !(other.visible || other.near) || !other.imageTiming) continue;
    // Both the fade and the time before it should differ among nearby photos.
    reserved.push(other.imageTiming.fade, photoEnd - other.imageTiming.appearance);
  }
  reserved.sort((a, b) => a - b);
  const random = crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
  for (const spacing of [60, 20, 1]) {
    let start = min;
    const intervals = [];
    for (const used of reserved) {
      const end = Math.min(max, Math.floor(used - spacing));
      if (end >= start) intervals.push([start, end]);
      start = Math.max(start, Math.ceil(used + spacing));
      if (start > max) break;
    }
    if (start <= max) intervals.push([start, max]);
    const count = intervals.reduce((sum, [left, right]) => sum + right - left + 1, 0);
    if (!count) continue;
    let pick = Math.floor(random * count);
    for (const [left, right] of intervals) {
      if (pick <= right - left) return left + pick;
      pick -= right - left + 1;
    }
  }
  // If a very dense screen uses every integer slot, select an unused fractional one.
  const edges = [min, ...reserved.filter(value => value > min && value < max), max];
  let left = min, width = 0;
  for (let index = 1; index < edges.length; index++) {
    const gap = edges[index] - edges[index - 1];
    if (gap > width) { left = edges[index - 1]; width = gap; }
  }
  return left + width / 2;
}
const smooth = value => value * value * (3 - 2 * value);
const earlyPhotoPilot = location.hostname === 'jeremyloreau.webflow.io'
  && location.pathname === '/temoignage/perte-de-poids-apres-menopause-solution'
  && new URLSearchParams(location.search).get('ascii-photo') === 'early'
  && matchMedia('(max-width: 767px)').matches;
x.phase = (state, progress, states) => {
  const total = state.imageRevealMs;
  if (total === undefined || state.waiting || state.reverse) {
    state.imageTiming = undefined;
    return;
  }
  if (state.imageTiming?.host !== state.host) {
    const random = crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
    const photoEnd = Math.min(1730, total - 95) - Math.floor(random * 101);
    const fade = chooseFade(state, states, photoEnd);
    const appearance = photoEnd - fade;
    const scale = state.duration / total;
    const earlyPhoto = earlyPhotoPilot && !!state.arrivalRect
      && /(?:^|[\/_])69fc3e6250429235d37de685_/.test(state.image.getAttribute('src') || '');
    state.imageTiming = {host:state.host, appearance, fade, photoEnd, scale, earlyPhoto, started:w.now(), readyAt:null, maskOpacity:1};
    if (earlyPhoto) state.image.dataset.jlEarlyPhotoPilot = 'active';
    state.image.dataset.jlRevealAppearanceDuration = String(appearance * scale);
    state.image.dataset.jlRevealFadeDuration = String(fade * scale);
    state.image.dataset.jlRevealPhotoEnd = String(photoEnd * scale);
  }
  const timing = state.imageTiming;
  const elapsed = w.now() - timing.started;
  const appearance = timing.appearance * timing.scale;
  const asciiEnd = state.duration - 36 * timing.scale;
  if (timing.readyAt === null && state.image.complete && state.image.naturalWidth > 0) timing.readyAt = elapsed;
  if (timing.readyAt === null) {
    return {phase:.72 * A(elapsed / appearance), photo:0, ascii:1};
  }
  const fadeStart = Math.max(timing.earlyPhoto ? Math.min(appearance, 160 * timing.scale) : appearance, timing.readyAt);
  const revealStartsEarly = timing.earlyPhoto && fadeStart < appearance;
  // Prioritize a clear image by the deadline if it is available in time.
  const photoDeadline = Math.min(1730 * timing.scale, asciiEnd);
  const latest = timing.readyAt <= photoDeadline - 50 * timing.scale ? photoDeadline : asciiEnd;
  const photoEnd = revealStartsEarly
    ? fadeStart + timing.fade * timing.scale
    : Math.max(timing.photoEnd * timing.scale, Math.min(latest, timing.readyAt + 240 * timing.scale));
  const photo = smooth(A((elapsed - fadeStart) / Math.max(1, photoEnd - fadeStart)));
  const asciiProgress = A((elapsed - fadeStart) / Math.max(1, asciiEnd - fadeStart));
  const ink = 1 - .82 * photo;
  timing.maskOpacity = ink * smooth(A((1 - asciiProgress) / .18));
  return {
    phase: elapsed < appearance ? .72 * A(elapsed / appearance)
      : .72 + .28 * (revealStartsEarly ? A((elapsed - appearance) / Math.max(1, asciiEnd - appearance)) : asciiProgress),
    photo,
    ascii:ink * (1 - smooth(asciiProgress)),
  };
};
x.finish=t=>{y(t),t.fadeFailedField=null,x.controls(t.image,1)},x.fade=(t,e,i)=>{try{if(e<=.72||t.reverse||t.waiting||!t.text||!t.field)return y(t),i;if(t.fadeFailedField===t.field)return i;let o=t.asciiFade;o&&(o.field!==t.field||o.host!==t.host)&&(y(t),o=null),o||(o=I(t));const n=w.now(),a=t.imageTiming ? Math.floor(4 * A((e-.72)/.28)) : Math.floor(t.elapsed/U);a!==o.lastTick&&D(o,a);const l=o.pixels.data;for(let s=0;s<o.field.count;s++){const d=A((e-o.starts[s])/o.durations[s]),m=o.masses[Math.max(1,p.indexOf(o.glyphs[s]))];l[s*4+3]=o.visible[s]?Math.floor(255*(1-d*d*(3-2*d))*o.budgets[s]/m):0}return o.revision++,T(t,o),o.paintMax=Math.max(o.paintMax,w.now()-n),o.ready?(t.imageTiming?.maskOpacity??1):i}catch(o){return t.fadeFailedField=t.field,t.image.dataset.jlFadeError=String(o.message||o).slice(0,80),y(t),i}}})()})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- #jl-subscription-ascii-v1 ---- */
try {
(function(){const t=window.__jlReviewClock,m=t?.performance||window.performance,u=t?t.raf:window.requestAnimationFrame.bind(window),f=t?t.caf:window.cancelAnimationFrame.bind(window),g=t?t.timeout:window.setTimeout.bind(window),j=t?t.clear:window.clearTimeout.bind(window);(function(){"use strict";if(!["www.jeremyloreau.com","jeremyloreau.com","jeremyloreau.webflow.io","127.0.0.1","localhost"].includes(location.hostname)||new URLSearchParams(location.search).get("ascii-effects")==="off")return;const l=function(){const o=window.jQuery;if(!o||typeof window.__jlContentBoot?.navigate!="function")return;const e=o('[cd-jc-button="continue"]');e.off("click").on("click.jlAsciiSubscription",function(d){const i=this,r=i.getAttribute("cd-jc-price-id"),a=i.getAttribute("cd-jc-stripe-instance");let n;try{r&&(localStorage.setItem("cd-jc-price-id",r),localStorage.setItem("cd-jc-redirect-url",new URL(location.pathname,location.origin).href)),a&&localStorage.setItem("cd-jc-stripe-instance",a),n=new URL(location.href),n.pathname=localStorage.getItem("cd-jc-email")?"/login":"/signup"}catch{return}d.preventDefault();const s=window.__jlContentBoot?.navigate;if(!s||matchMedia("(prefers-reduced-motion: reduce)").matches||i.closest("[data-jl-no-transition]")){location.assign(n.href);return}try{sessionStorage.setItem("jl-content-storage-test","1"),sessionStorage.removeItem("jl-content-storage-test")}catch{location.assign(n.href);return}s(n)}),e.attr("data-jl-subscription-transition","1")},c=()=>{(window.Webflow=window.Webflow||[]).push(l)};c(),document.addEventListener("load",o=>{const e=o.target;e?.tagName==="SCRIPT"&&/\/scripts\/jeremy\/jl-connect(?:\.min)?\.js(?:[?#]|$)/.test(e.src)&&c()},!0)})()})();
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

/* ---- #jl-progressive-ascii-v2 ---- */
try {
(function(){const G=window.__jlReviewClock,le=G?.performance||window.performance,ue=G?G.raf:window.requestAnimationFrame.bind(window),ot=G?G.caf:window.cancelAnimationFrame.bind(window),q=G?G.timeout:window.setTimeout.bind(window),T=G?G.clear:window.clearTimeout.bind(window);(function(){"use strict";var Le,Mt;const fe=(i,o,r)=>i+(o-i)*r,xe=i=>i*i*i*(i*(i*6-15)+10),Z=(i,o,r)=>{let d=Math.imul(i+1,374761393)^Math.imul(o+1,668265263)^r;return d=Math.imul(d^d>>>13,1274126177),((d^d>>>16)>>>0)/4294967295};function de(i,o,r){const d=Math.floor(i),f=Math.floor(o),v=xe(i-d),h=xe(o-f);return fe(fe(Z(d,f,r),Z(d+1,f,r),v),fe(Z(d,f+1,r),Z(d+1,f+1,r),v),h)}function rt(i,o,r,d,f){const v=i*o,h=new Float32Array(v),m=new Float32Array(v),w=y=>Z(y,117,f^237496),L=Math.min(i*r,o*d)/(3.7+w(1)*2.1),O=w(2)*Math.PI*2,I=Math.cos(O),g=Math.sin(O),u=.8+w(3)*.5,B=w(4)*200,_=w(5)*200,b=.9+w(6)*1.1,p=.02+w(7)*.02;for(let y=0;y<o;y++)for(let x=0;x<i;x++){const V=x*r/L,R=y*d/L,j=(V*I-R*g)*u+B,z=(V*g+R*I)/u+_,C=(de(j*.65+7,z*.65-3,f^335034)-.5)*b,U=(de(j*.65-4,z*.65+8,f^518803)-.5)*b;h[y*i+x]=de(j+C,z+U,f)*(.675-p)+de(j*2.1+C,z*2.1+U,f^29099)*.25+de(j*4.2,z*4.2,f^1831565813)*.075+Z(x,y,f^1327217884)*p}const P=Array.from({length:v},(y,x)=>x).sort((y,x)=>h[y]-h[x]);for(let y=0;y<v;y++)m[P[y]]=y/Math.max(1,v-1);return m}const ee=" .\xB7-:+=/!?<>I1234567890AON";const compactMediaGrid=()=>matchMedia("(max-width: 479px)").matches;function st(i,o,r=3600){const icon=i<=64&&o<=64,small=compactMediaGrid();let d=Math.max(1,Math.ceil(i/(icon?4:small?5.15:6.4))),f=Math.max(1,Math.ceil(o/(icon?6.5:small?9.2:11.6)));const v=Math.max(1,Math.sqrt(d*f/r));return d=Math.max(1,Math.floor(d/v)),f=Math.max(1,Math.floor(f/v)),{columns:d,rows:f,count:d*f}}function Ae(i,o){return i!=null&&i.endsWith("%")?o*parseFloat(i)/100:i!=null&&i.endsWith("px")?parseFloat(i):o*(i==="left"||i==="top"?0:i==="right"||i==="bottom"?1:.5)}function lt(i,o,r,d,f="cover",v="50% 50%"){let h=r,m=d;if(f!=="fill"){const O=f==="none"?1:f==="cover"?Math.max(r/i,d/o):Math.min(r/i,d/o,f==="scale-down"?1:1/0);h=i*O,m=o*O}const[w="50%",L="50%"]=v.split(/\s+/);return{x:Ae(w,r-h),y:Ae(L,d-m),width:h,height:m}}function dt(i,o,r,d,f,v,h,m,w,L,O=1,I=3600,inverted=false){const g=st(v,h,I),u=lt(d,f,v,h,m,w),B=new Uint8Array(g.count),_=new Array(g.count),b=ee,p=rt(g.columns,g.rows,v/g.columns,h/g.rows,O),P=new Float32Array(g.count),y=new Float32Array(g.count),x=new Float32Array(g.count);for(let R=0;R<g.rows;R++)for(let j=0;j<g.columns;j++){const z=R*g.columns+j,C=((j+.5)*v/g.columns-u.x)/u.width,U=((R+.5)*h/g.rows-u.y)/u.height;let N=0;if(C>=0&&C<1&&U>=0&&U<1){const Y=(Math.min(r-1,Math.floor(U*r))*o+Math.min(o-1,Math.floor(C*o)))*4,te=i[Y+3]/255,luminance=(i[Y]*.2126+i[Y+1]*.7152+i[Y+2]*.0722)/255,D=(inverted?1-luminance:luminance)*te+(L?0:1)*(1-te);N=L?D:1-D}B[z]=Math.round(N*255),_[z]=b[Math.min(b.length-1,Math.round(N*(b.length-1)))],P[z]=p[z]*.6+Z(j,R,O^1908648263)*.4}const V=Array.from({length:g.count},(R,j)=>j).sort((R,j)=>P[R]-P[j]);for(let R=0;R<V.length;R++){const j=V[R];y[j]=.02+.16*R/Math.max(1,V.length-1),x[j]=.34+.2*p[j]}return{...g,tones:B,glyphs:_,birth:y,settle:x,seed:O}}const ke=i=>Math.min(1,Math.max(0,i));function ct(i,o,r,d){if(r<i.birth[o])return" ";if(r>=i.settle[o])return i.glyphs[o];const f=ke((r-i.birth[o])/(i.settle[o]-i.birth[o])),v=i.tones[o]/255*(ee.length-1),h=(Z(o,d,i.seed)-.5)*6*f*(1-f),m=Math.max(0,Math.min(ee.length-1,Math.round(v*(1-(1-f)**3)+h)));return ee[m]}function St(i){const o=ke((i-.66)/.3),r=o*o*(3-2*o);return{photo:r,ascii:1-r}}const Lt=.18,mt='hyvor-talk-comments,.ht_wrap,iframe[src*="talk.hyvor.com"]';function Re(i){return!!i.closest(mt)||i.matches(".w-embed")&&!!i.querySelector('hyvor-talk-comments,iframe[src*="talk.hyvor.com"]')}function isIcon(image){if(image.tagName.toLowerCase()!=="svg")return false;const box=image.getBoundingClientRect();return box.width<=64&&box.height<=64}function ut(i){if(isIcon(i)||(i.closest(menuSelector)&&i.tagName!=="IMG")||Re(i)||i.closest("svg")!==i&&!!i.closest("svg"))return!0;const o=i.matches(".jl-programme .jl-thumb img,[data-jl-video-preview] img[data-media-gif]");for(let r=i;r;r=r.parentElement)if(r.getAttribute("data-ascii-images")==="off"&&!(o&&r.matches(".jl-programme,[data-jl-video-preview]")))return!0;return!1}const gt="jeremyloreau.webflow.io";function Pe(i){return i===gt||i==="127.0.0.1"||i==="localhost"||/^(www\.)?jeremyloreau\.com$/.test(i)}if(Pe(location.hostname) && window.__jlContentBoot) {
  document.documentElement.dataset.jlContentReady = '5.0-arrival-only';
  document.documentElement.dataset.jlAsciiReady = '5.0-arrival-only';
  document.documentElement.dataset.jlContentResult = 'native-navigation';
  window.__jlContentBoot.navigate = target => location.assign(target.href || target);
}
const menuSelector='.nav_component [data-nav="dropdown"],.nav_component .nav_mobile_menu_wrap';const K=".popup_wrap.is-image,.popup_wrap.is-video,.w-lightbox-backdrop,dialog,"+menuSelector;function Te(element, styles = new Map()) {
  if (!element.isConnected) return false;
  for (let current = element; current; current = current.parentElement) {
    if (!styles.has(current)) styles.set(current, getComputedStyle(current));
    const style = styles.get(current);
    if (style.display === 'none' || style.visibility === 'hidden' || +style.opacity === 0) return false;
  }
  return element.getClientRects().length > 0;
}
function ft(onChange) {
  const roots = new Map(), observed = new WeakSet();
  let frame = 0;
  const refresh = () => { if (!frame) frame = ue(update); };
  function update() {
    frame = 0;
    const changed = [], styles = new Map();
    for (const [root, previous] of roots) {
      const visible = Te(root, styles);
      if (visible !== previous) changed.push([root, visible]);
    }
    for (const [root, visible] of changed) {
      roots.set(root, visible);
      onChange(root, visible);
    }
  }
  const observer = new MutationObserver(refresh);
  document.addEventListener('transitionend', refresh, true);
  return {
    track(element) {
      const root = element.closest(K);
      if (!root || roots.has(root)) return;
      roots.set(root, false);
      for (let current = root; current && current !== document.body; current = current.parentElement) {
        if (observed.has(current)) continue;
        observed.add(current);
        observer.observe(current, {attributes:true, attributeFilter:['class','style','hidden','aria-hidden','open']});
      }
      refresh();
    },
    refresh,
    dispose() {
      ot(frame); observer.disconnect(); roots.clear();
      document.removeEventListener('transitionend', refresh, true);
    },
  };
}
const vt='[data-jl-image-reveal="armed"]{opacity:0!important}[data-jl-image-reveal="animating"]{opacity:var(--jl-image-reveal-opacity,0)!important}.jl-image-ascii{position:absolute;pointer-events:none!important;overflow:hidden;contain:strict;user-select:none;color:var(--_theme---text);-webkit-text-fill-color:currentColor!important;font:400 12px "ABC Favorit Mono Ultra",ui-monospace,monospace;letter-spacing:0;line-height:1}.popup_wrap[data-jl-video-preview] [data-media-poster]{background-image:none!important}.popup_wrap[data-jl-video-preview] [data-media-player]{opacity:var(--jl-player-reveal,1)!important}.popup_wrap[data-jl-video-preview] [data-media-state="playing"] [data-media-poster]{opacity:var(--jl-poster-reveal,0)!important}@media(prefers-reduced-motion:reduce){[data-jl-image-reveal="armed"],[data-jl-image-reveal="animating"]{opacity:revert!important}.jl-image-ascii{display:none!important}}',ht=":host{display:block;background:transparent}pre{-webkit-text-fill-color:currentColor!important;margin:0;padding:0;border:0;white-space:pre;background:transparent;color:inherit;font:inherit;font-kerning:none;line-height:var(--row);letter-spacing:var(--tracking);transform-origin:top left;transform:scaleY(var(--row-scale,1));overflow:hidden}",J=192,Oe=24;function wt(){var i;const o=document.documentElement,r=matchMedia("(prefers-reduced-motion: reduce)"),{startMediaMotion:d,mediaProgress:f,mediaBlend:v,mediaQuota:h,mediaPixels:m,embedPixels:w,createPreviewUI:L,isPreviewUIAsset:O,preserveHistory:I,isStillImage:g,VIDEO_SELECTOR:u,describeVideo:B,hasIndependentPoster:_,posterURL:b}=window.__jlContentBoot||{};if(!f||!L)return o.removeAttribute("data-jl-images-boot"),{dispose(){}};const p=new Map,P=new Set,y=[],x=new Map,V=[],R=new Map,j=L({reduce:{matches:!0},palette:ee,mediaRects:e=>[...p.values()].filter(a=>a.host&&a.image.closest(K)===e).map(a=>a.rect),invalidate:e=>{for(const a of P)a.image.closest(K)===e&&(a.dirty=!0)},progressFor:e=>{const a=[...p.values()].filter(t=>t.visible&&t.image.closest(K)===e);return a.length?Math.min(...a.map(t=>t.done?1:t.progress||0)):null}}),z=new URLSearchParams(location.search).get("ascii-image-speed")==="slow";let C,U,N,Y,te,D,Q=0,ae=0,W=!1,c=0,S=0;const A=()=>o.removeAttribute("data-jl-images-boot"),$=()=>o.dataset.curtainPhase==="initial",ne=()=>o.hasAttribute("data-curtain-live")&&!$(),ie=document.createElement("canvas").getContext("2d");ie.font='12px "ABC Favorit Mono Ultra",ui-monospace,monospace';let ce=ie.measureText("M").width;(i=document.fonts)==null||i.ready.then(()=>{ce=ie.measureText("M").width;for(const e of P)e.dirty=!0;H()});const ze=e=>{const a=e.getBoundingClientRect();if(!(a.width>0&&a.height>0&&a.bottom>0&&a.right>0&&a.top<innerHeight&&a.left<innerWidth))return!1;const t=e.closest("[data-media-stage]"),n=t?.dataset.mediaState==="playing"?t:e;for(let s=n.parentElement;s;s=s.parentElement){if(s.classList.contains("page_wrap"))continue;const l=getComputedStyle(s);if(l.display==="none"||l.visibility==="hidden"||+l.opacity==0)return!1}return!0},Ue=e=>!!e.arrivalRect||e.visible&&ze(e.image),me=e=>{var a;return e.image.tagName==="IMG"?e.image.complete&&e.image.naturalWidth>0:e.image.tagName==="IFRAME"?e.loaded:(a=e.media)!=null&&a.frame?e.image.readyState>=2:!0},F=(e,a="done")=>{var t,n,s,l;if(!e)return;if(!isOverlay(e.image)){arrivalImages.delete(e.image);arrivalStates.delete(e);if(arrivalSelected&&!arrivalStates.size)resolveArrival();}if(a==="done"&&photoVisibility?.noteSeen&&Ue(e))photoVisibility.noteSeen(e.image);if(window.__jlMediaFeedback.finish(e),T(e.safety),T(e.videoTimer),e.safety=0,(t=e.stopMotion)==null||t.call(e),e.stopMotion=null,(n=e.host)==null||n.remove(),e.host=null,e.text=null,e.field=null,e.done=!0,e.opacitySaved){const M=e.opacitySaved;M.value?e.image.style.setProperty("--jl-image-reveal-opacity",M.value,M.priority):e.image.style.removeProperty("--jl-image-reveal-opacity"),e.opacitySaved=null}(s=e.playerStage)==null||s.style.removeProperty("--jl-player-reveal"),(l=e.playerStage)==null||l.style.removeProperty("--jl-poster-reveal"),e.playerStage=null,P.delete(e);const E=y.indexOf(e);E>=0&&y.splice(E,1),e.status=a,e.image.dataset.jlImageReveal=a,a!=="done"&&(e.image.dataset.jlImageReason=a)},Be=()=>{j.dispose();for(const e of p.values())F(e,"fallback");A()};if(r.matches||!("IntersectionObserver"in window)||!("ResizeObserver"in window))return A(),{dispose:()=>{}};const ve=document.createElement("style");ve.id="jl-image-ascii-style",ve.textContent=vt,document.head.append(ve);const photoVisibility=window.__jlImagePreviews;
const overlaySelector = K;
const isMenu = image => !!image.closest(menuSelector);

function isDarkDocument(image,data){
  if(image.tagName!=='IMG')return false;
  const popup=image.matches('.popup_wrap.is-image img');
  if(popup&&/\.svg(?:[?#]|$)/i.test(image.currentSrc||image.src||''))return true;
  if(data.transparent===undefined){data.transparent=false;for(let i=3;i<data.pixels.length;i+=4)if(data.pixels[i]<250){data.transparent=true;break;}}
  if(!data.transparent)return false;
  if(popup)return true;
  const color=getComputedStyle(image).backgroundColor.match(/[\d.]+/g)||[];
  return color.length>=3&&(color.length<4||+color[3]>0)&&+color[0]+ +color[1]+ +color[2]<384;
}
const arrivalImages = new WeakSet();
const arrivalStates=new Set();
let resolveArrival;
const arrivalDone=new Promise(resolve=>resolveArrival=resolve);
let arrivalSelected = false, arrivalClosed = false, arrivalTimer = 0;
let arrivalPumpFrame = 0, arrivalPumpUntil = 0;
const scheduleArrivalPump = () => {
  if (arrivalPumpFrame || W) return;
  arrivalPumpFrame = ue(() => {
    arrivalPumpFrame = 0;
    arrivalPumpUntil = performance.now() + 10;
    H();
  });
};
const isOverlay = image => !!image.closest(overlaySelector);
const motion = window.__jlContentBoot.motion;
const canAnimate = image => isOverlay(image) || (!arrivalClosed && arrivalImages.has(image));
const finishArrival = () => {
  if (arrivalClosed) return;
  arrivalClosed = true;
  T(arrivalTimer);
  arrivalTimer = 0;
  document.removeEventListener('click',cancelArrival,true);
  window.__jlContentBoot.releaseArrivalMotion?.();
  for (const state of p.values()) {
    if (!state.done && !isOverlay(state.image)) F(state, 'native');
  }
  A();
};
const cancelArrival = event => {
  if (event.target?.id === 'jl-motion-review') return;
  finishArrival();
};
const selectArrival = () => {
  if (arrivalSelected || W) return;
  arrivalSelected = true;
  const boot = window.__jlContentBoot;
  const enabled = !arrivalClosed && boot?.initial && !r.matches && !document.hidden
    && o.hasAttribute('data-jl-images-boot') && le.now() < boot.arrivalDeadline;
  const candidates = [...p.values()].filter(state => !isOverlay(state.image));
  const selected = new Set(enabled ? candidates.filter(state =>
    ze(state.image) && qe(state.image, state.image.getBoundingClientRect())) : []);
  for(const state of selected)arrivalStates.add(state);
  const rects = new Map([...selected].map(state => [state, state.image.getBoundingClientRect()]));
  const totalArea = [...rects.values()].reduce((sum, rect) => sum + rect.width * rect.height, 0);
  const preparationEnds = le.now() + motion.prepareMs;
  for (const state of candidates) if (!selected.has(state)) {
    F(state, 'native');
    C.unobserve(state.image); U.unobserve(state.image); N.unobserve(state.image);
  }
  A();
  for (const state of selected) {
    const style = getComputedStyle(state.image);
    state.arrivalRect = rects.get(state);
    state.arrivalPrepareEnds = preparationEnds;
    state.arrivalQuota = Math.min(16000, Math.max(96, Math.round(
      state.arrivalRect.width * state.arrivalRect.height / Math.max(1, totalArea) * 26000)));
    state.arrivalStyle = {opacity: style.opacity, borderRadius: style.borderRadius,
      objectFit: style.objectFit, objectPosition: style.objectPosition, color: style.color};
  }
  for (const state of candidates) {
    if (selected.has(state)) {
      if (state.image.tagName === 'IMG') {
        state.image.loading = 'eager';
        const rect = rects.get(state);
        if (!state.image.complete && rect.width * rect.height > 60000) state.image.fetchPriority = 'high';
      }
      arrivalImages.add(state.image);
      state.visible = true;
      state.near = true;
      state.eligible = true;
      state.status = 'armed';
      state.image.dataset.jlImageReveal = 'armed';
      y.push(state);
      we(state);
    }
  }
  H();
  if(!arrivalStates.size)resolveArrival();
  // Preparation and playback have separate clocks. The safety limit is never the animation duration.
  if (!arrivalClosed) arrivalTimer = q(finishArrival, motion.prepareMs + motion.imageMaxMs + 1800);
  arrivalDone.then(finishArrival);
  o.dataset.jlArrivalSelection = String([...p.values()].filter(state => arrivalImages.has(state.image)).length);
};
const scheduleArrival = () => Promise.resolve(window.__jlContentBoot.arrivalReady).then(()=>ue(selectArrival));
const qe=(e,a)=>{var t,n;return a.width>=(isIcon(e)?8:40)&&a.height>=(isIcon(e)?8:((t=p.get(e))!=null&&t.media?16:40))&&!ut(e)&&!!(e.currentSrc||e.src||(n=p.get(e))!=null&&n.media)},oe=e=>{if(e.done||e.status!=="watch")return;
if(!isOverlay(e.image) && !arrivalSelected)return;
if(!canAnimate(e.image))return F(e,"native");
if(isMenu(e.image)&&!ut(e.image)){e.eligible=true;e.status='armed';e.image.dataset.jlImageReveal='armed';return;}
if(isOverlay(e.image)&&!isMenu(e.image)&&photoVisibility?.skipViewer?.(e.image))return F(e,"photo-seen");
qe(e.image,e.image.getBoundingClientRect())&&(e.eligible=!0,e.status="armed",e.image.dataset.jlImageReveal="armed")},he=e=>e.dataset.asciiPoster||e.matches("img[data-media-gif]")&&R.get(e.src)||"",Ne=e=>e.media?e.media.key:(e.image.getAttribute("src")||"")+"|"+he(e.image);function firstPixels(tasks) {
  return new Promise((resolve,reject) => {
    let remaining=tasks.length;
    for(const task of tasks)Promise.resolve(task).then(data=>{
      if(data)resolve(data);else if(!--remaining)reject(Error('pixels-unavailable'));
    },()=>{if(!--remaining)reject(Error('pixels-unavailable'));});
  });
}
async function yt(state) {
  const image=state.image;
  if(image.tagName.toLowerCase()==='svg')return window.__jlMediaFeedback.svgPixels(image,J);
  if(!state.media){
    const cached=window.__jlImagePreviews?.sample?.(image.currentSrc||image.src,J);
    if(cached)state.preview=cached;
    if(image.complete&&image.naturalWidth)try{return m(image,J);}catch{}
  }
  const preview=!state.media?window.__jlImagePreviews?.prepare(image,J):null;
  const source=he(image)||(state.media?state.media.poster||state.media.oembed||image.currentSrc||image.src:image.currentSrc||image.src);
  if(state.media?.fallback)return w(image,J);
  let pixels=x.get(source);
  if(!pixels){
    pixels=new Promise((resolve,reject)=>{V.push({image,source,media:state.media,poster:!!he(image),resolve,reject});De();});
    x.set(source,pixels);if(x.size>32)x.delete(x.keys().next().value);
    pixels.catch(()=>x.delete(source));
  }
  // The tiny persisted preview is a fallback; it must not win over decoded pixels.
  const fallback=Promise.resolve(state.preview||preview).catch(()=>null);
  image.dataset.jlMediaSampling='source';
  return pixels.catch(async error=>{const data=await fallback;if(!data)throw error;image.dataset.jlMediaSampling='preview';return data;});
}
function De(){for(var e;!W&&c<((e=navigator.connection)!=null&&e.saveData?2:4)&&V.length;){const a=V.shift();c++,(async()=>{var t,n;if((!a.media||a.media.frame)&&!a.poster)try{return m(a.image,J)}catch{}if((t=a.media)!=null&&t.frame)throw Error("video-frame-unavailable");let s=a.source;if((n=a.media)!=null&&n.oembed){const E=new AbortController,M=q(()=>E.abort(),1500);try{const k=await fetch(a.media.oembed,{credentials:"omit",signal:E.signal});if(!k.ok)throw Error("poster-metadata");if(s=b((await k.json()).thumbnail_url,location.href),!s)throw Error("poster-missing")}finally{T(M)}}a.media&&(a.image.dataset.jlMediaPoster=s);const l=new Image;return l.crossOrigin="anonymous",l.decoding="async",await new Promise((E,M)=>{const k=q(()=>M(Error("cors-timeout")),3500);l.onload=()=>{window.__jlImagePreviews?.learn(l),T(k),E()},l.onerror=()=>{T(k),M(Error("cors"))},l.src=s}),l.decode&&await l.decode().catch(()=>{}),m(l,J)})().then(a.resolve,a.reject).finally(()=>{c--,De()})}}const we=e=>{var a;if(!canAnimate(e.image)||e.done||e.sampleReady||e.preparing||(a=e.media)!=null&&a.frame&&e.image.readyState<2||!e.eligible&&!qe(e.image,e.image.getBoundingClientRect()))return;e.preparing=!0;const t=e.generation;yt(e).then(n=>{t!==e.generation||W||e.done||(e.image.dataset.jlImageSampling=n.preview?'preview':'source',e.data=n,e.sampleReady=!0,e.preparing=!1,e.dirty=!0,re(e))}).catch(n=>{t!==e.generation||W||e.done||(e.image.dataset.jlImageError=String(n?.message||n).slice(0,100),e.data=w(e.image,J),e.sampleReady=!0,e.preparing=!1,e.dirty=!0,e.image.dataset.jlMediaSampling="block",isOverlay(e.image)?re(e):F(e,"sample-unavailable"))})};function readRevealLayout(state) {
  const rect = window.__jlMediaFeedback.rect(state.image);
  const parent = state.host.offsetParent || document.documentElement;
  const box = parent.getBoundingClientRect();
  const sx = box.width / (parent.offsetWidth || box.width || 1) || 1;
  const sy = box.height / (parent.offsetHeight || box.height || 1) || 1;
  return {rect, style:{left:(rect.left-box.left)/sx+parent.scrollLeft-parent.clientLeft,
    top:(rect.top-box.top)/sy+parent.scrollTop-parent.clientTop,
    width:rect.width/sx,height:rect.height/sy}};
}
function We(state, measured) {
  const layout = measured || readRevealLayout(state);
  state.rect = layout.rect;
  for (const key in layout.style) {
    const value = layout.style[key] + 'px';
    if (state.host.style[key] !== value) state.host.style[key] = value;
  }
  return {width:layout.style.width,height:layout.style.height};
}
function applyAsciiGridStyle(text,width,height,grid){
  const cell=width/grid.columns, row=height/grid.rows;
  // Avoid WebKit rounding each fractional line height down before laying out the text.
  const rowHeight=Math.max(1,Math.round(row));
  const fontSize=Math.max(2,Math.min(12,cell/.66,row*.83));
  const glyphWidth=ce*fontSize/12;
  text.style.cssText="font-size:"+fontSize+"px;--row:"+rowHeight+"px;--row-scale:"+(row/rowHeight)+";--tracking:"+(cell-glyphWidth)+"px;padding-left:"+Math.max(0,(cell-glyphWidth)/2)+"px;";
}
window.__jlContentBoot.renderWaitingAscii = (image,text,width,height,seed,preview) => {
  if (width < 1 || height < 1) return;
  const style = getComputedStyle(image);
  const color = getComputedStyle(text).color.match(/[\d.]+/g) || [0,0,0];
  const lightInk = +color[0] + +color[1] + +color[2] > 384;
  const grid = preview
    ? dt(preview.pixels,J,J,preview.iw,preview.ih,width,height,style.objectFit,style.objectPosition,lightInk,seed)
    : st(width,height);
  let rows = '';
  for (let y=0; y<grid.rows; y++) {
    if (y) rows += '\n';
    for (let x=0; x<grid.columns; x++) {
      const index = y*grid.columns+x;
      const tone = Z(index,0,seed);
      rows += preview ? grid.glyphs[index] : ee[tone < .46 ? 0 : 1 + Math.floor((tone-.46)*8)];
    }
  }
  applyAsciiGridStyle(text,width,height,grid);
  text.textContent = rows;
};
function He(e,a,t){const n=e.data||w(e.image,J),s=e.arrivalStyle||getComputedStyle(e.image),l=(e.arrivalStyle?.color||getComputedStyle(e.host).color).match(/[\d.]+/g)||[0,0,0];
const pressInverted=e.image.matches(".u-theme-light .review_slider_image");
e.dark=isDarkDocument(e.image,n)||+l[0]+ +l[1]+ +l[2]>384;if(isDarkDocument(e.image,n)){e.host.style.color='var(--swatch--white)';e.host.style.backgroundColor='var(--swatch--black)';} e.field=dt(n.pixels,J,J,n.iw,n.ih,a,t,n.fallback||e.image.closest(".popup_wrap.is-image")?"fill":e.media?.provider==="youtube"?"cover":e.media&&e.image.tagName!=="VIDEO"?"contain":s.objectFit,s.objectPosition,e.dark,e.seed,(isOverlay(e.image)?Math.min(24000,Math.max(96,Math.ceil(a/(compactMediaGrid()?5.15:6.4))*Math.ceil(t/(compactMediaGrid()?9.2:11.6)))):e.arrivalQuota||h(a,t,innerWidth,innerHeight)),pressInverted);for(let k=0;k<e.field.count;k++)e.field.birth[k]=.02+(e.field.birth[k]-.02)*2.5,e.field.settle[k]=.032+e.field.settle[k]*1.2;j.compose(e.field,e.rect,e.image.closest(K)),e.width=a,e.height=t,e.dirty=!1,e.host.dataset.cells=e.field.count;applyAsciiGridStyle(e.text,a,t,e.field);}function chooseImageDuration(state, minimum, maximum) {
  const nearby = [];
  for (const other of p.values()) {
    if (other !== state && other.image.isConnected && (other.visible || other.near)
        && other.imageRevealMs !== undefined) {
      nearby.push(other.imageRevealMs);
    }
  }

  const slots = [];
  for (let duration = minimum; duration <= maximum; duration += 100) {
    if (nearby.every(other => Math.abs(other - duration) >= 100)) slots.push(duration);
  }
  if (slots.length) return slots[Math.floor(state.seed / 4294967296 * slots.length)];

  // A dense group can exhaust the 100 ms slots. Split its widest gap.
  const edges = [minimum, ...nearby.filter(ms => ms > minimum && ms < maximum), maximum];
  edges.sort((a, b) => a - b);
  let left = minimum;
  let gap = 0;
  for (let index = 1; index < edges.length; index++) {
    const width = edges[index] - edges[index - 1];
    if (width > gap) {
      left = edges[index - 1];
      gap = width;
    }
  }
  return left + (gap >= 2 ? Math.floor(gap / 2) : gap / 2);
}
function Ke(e){if(!canAnimate(e.image))return F(e,"native");const a=e.image;a.dataset.jlImageReveal="building";const t=e.arrivalStyle||getComputedStyle(a),n=document.createElement("span");e.nativeOpacity=+t.opacity,e.opacitySaved={value:a.style.getPropertyValue("--jl-image-reveal-opacity"),priority:a.style.getPropertyPriority("--jl-image-reveal-opacity")},a.style.setProperty("--jl-image-reveal-opacity","0"),n.className="jl-image-ascii",n.setAttribute("aria-hidden","true"),n.setAttribute("data-nosnippet",""),n.dataset.media=e.media?"embed":"image",n.style.borderRadius=t.borderRadius;const s=a.matches("img[data-media-gif]")&&a.closest("[data-media-stage]");s?(s.append(n),n.style.zIndex="2"):a.insertAdjacentElement("afterend",n),e.host=n;const l=n.attachShadow({mode:"open"}),E=document.createElement("style");E.textContent=ht,e.text=document.createElement("pre"),l.append(E,e.text),e.seed=crypto.getRandomValues(new Uint32Array(1))[0];const M=We(e);
const isImageReveal = a.tagName === "IMG" && !isIcon(a) && !e.reverse && !e.waiting;
const imageRevealLimitMs = motion.imageMaxMs;
const baseDuration = motion.imageMinMs;
e.imageRevealMs = isImageReveal ? chooseImageDuration(e, baseDuration, imageRevealLimitMs) : undefined;
const duration = isIcon(a)?motion.textMs:e.imageRevealMs ?? (baseDuration + e.seed / 4294967296 * (imageRevealLimitMs - baseDuration));
He(e,M.width,M.height),e.duration=duration * (z ? 3 : 1),e.delay=0,e.image.dataset.jlRevealDelay=0,e.image.dataset.jlRevealDuration=Math.round(e.duration),e.started=0,e.elapsed=0,e.previous=0,e.readyAt=null,e.lastTick=-1,e.lastText="",e.motionStarted=!1,T(e.safety),e.safety=q(()=>{
  if (isImageReveal && !z) {
    F(e,"done");
    H();
    return;
  }
  (e.data?.preview||g?.(e.image))&&!me(e)||(F(e,"timeout-fallback"),H());
},isImageReveal && !z ? duration + 1800 : (z ? 15000 : 8500)),e.status="animating",a.dataset.jlImageReveal="animating",P.add(e),ye(e,e.reverse?1:0,0)}function ye(e,a,t){const timing=window.__jlMediaFeedback.phase?.(e,a,p),phase=timing?.phase??a,n=timing??v(a),s=e.field;let l="";if(t!==e.lastTick||e.dirtyPaint){const E=(e.waiting||/\.gif(?:[?#]|$)/i.test(e.image.src||"")||e.media)&&phase<.73;for(let M=0;M<s.rows;M++){for(let k=0;k<s.columns;k++){const se=M*s.columns+k;let X=ct(s,se,phase,t);if(E&&phase>.6&&X!==" "&&((Math.imul(se+1,73244475)^t*2654435761)>>>0)%37===0){const Et=ee.indexOf(X);X=ee[Math.max(1,Math.min(ee.length-1,Et+(t%2?1:-1)))]}l+=X}M<s.rows-1&&(l+=`
`)}l!==e.lastText&&(e.text.textContent=l),e.lastText=l,e.lastTick=t,e.dirtyPaint=!1}n.photo>0&&e.nativeOpacity>0&&photoVisibility?.noteSeen?.(e.image),window.__jlMediaFeedback.controls(e.image,n.photo),e.image.style.setProperty("--jl-image-reveal-opacity",String(n.photo*e.nativeOpacity)),e.host.style.opacity=String(window.__jlMediaFeedback.fade(e,phase,n.ascii)*e.nativeOpacity),e.playerStage&&e.playerStage.style.setProperty("--jl-player-reveal",String(e.waiting?0:n.photo)),e.progress=a,e.host.dataset.progress=a.toFixed(2)}function re(e){if(!canAnimate(e.image)){if(arrivalSelected&&!isOverlay(e.image))F(e,"native");return;}W||r.matches||e.done||!e.visible||(oe(e),e.status!=="watch"&&(e.status!=="animating"&&!y.includes(e)&&y.push(e),we(e),H()))}function H(){if(!(W||r.matches||document.hidden||ne())){for(const e of[...y]){if(P.size>=96||(!isIcon(e.image)&&[...P].filter(state=>!isIcon(state.image)).length>=Oe))break;
if(!isOverlay(e.image)&&performance.now()>=arrivalPumpUntil){scheduleArrivalPump();break;}
if(!Ue(e))continue;
if(!e.sampleReady){
  e.arrivalPrepareEnds ??= le.now() + motion.prepareMs;
  if(!isOverlay(e.image)&&le.now()>=e.arrivalPrepareEnds)F(e,'sample-timeout');
  continue;
}
if(Ue(e)){y.splice(y.indexOf(e),1);try{Ke(e)}catch{F(e,"render-fallback")}}}y.some(e=>e.visible)&&!ae&&(ae=q(()=>{ae=0,H()},80)),P.size&&!Q&&[...P].some(e=>e.dirty||!(e.data?.preview||g?.(e.image))||e.progress<.68||me(e))&&(Q=ue(Ve))}}function Ve(e){if(Q=0,W)return;const layouts=new Map;for(const state of P)if(state.host&&state.image.isConnected)layouts.set(state,readRevealLayout(state));const a=e-S>=40;a&&(S=e);for(const t of[...P]){if(!t.image.isConnected||!canAnimate(t.image)||!Ue(t)){F(t,"done");continue}try{t.started||(t.started=e,t.previous=e),t.elapsed+=Math.min(80,Math.max(0,e-t.previous)),t.previous=e;const n=Math.max(0,t.elapsed-t.delay),s=We(t,layouts.get(t));(t.dirty||Math.abs(s.width-t.width)>1||Math.abs(s.height-t.height)>1)&&(He(t,s.width,s.height),t.dirtyPaint=!0),!t.waiting&&t.sampleReady&&me(t)&&t.readyAt===null&&(t.readyAt=n);const l=t.reverse?1-.32*Math.min(1,n/160):f(n,t.duration,t.readyAt),E=Math.floor(n/(z?120:70));!t.motionStarted&&t.sampleReady&&me(t)&&l<.7&&(t.motionStarted=!0,t.stopMotion=d(t.image,M=>{t.done||(t.data=M,t.dirty=!0,t.image.dataset.jlMediaMotion="frames",t.image.dataset.jlMediaMotionFrames=String((t.motionFrames||0)+1),t.motionFrames=(t.motionFrames||0)+1)})),(a||l===1)&&ye(t,l,E),l===1&&!t.reverse&&F(t,"done")}catch{F(t,"render-fallback")}}H()}const be=(e,a="reset",t=!1)=>{F(e,a),e.generation++,e.preparing=!1,e.done=!1,e.reverse=!1,e.waiting=!1,e.readyAt=null,t||(e.data=null,e.sampleReady=!1),e.status=e.eligible&&(isMenu(e.image)||!photoVisibility?.skipViewer?.(e.image))?"armed":"watch",e.image.dataset.jlImageReveal=e.status,delete e.image.dataset.jlImageReason},ge=e=>{var a;const t=(a=e.closest)==null?void 0:a.call(e,K);if(!t||!O(e))return!1;const n=p.get(e),s=e.hasAttribute("data-jl-image-reveal");return n&&(F(n),p.delete(e),C.unobserve(e),U.unobserve(e),N.unobserve(e)),s&&(delete e.dataset.jlImageReveal,delete e.dataset.jlImageReason,e.style.removeProperty("--jl-image-reveal-opacity"),j.refresh(t,!0)),!0},je=(e,a=!1)=>{var t;window.__jlMediaFeedback.primePopupGeometry(e);if(Re(e)||ge(e)||p.has(e))return;
if(arrivalSelected&&!isOverlay(e)){e.dataset.jlImageReveal="native";return;}D.track(e);for(let l=e.parentElement;l;l=l.parentElement){const E=p.get(l);if((t=E?.media)!=null&&t.container){if(B(l))return;F(E,"delegated"),C.unobserve(l),U.unobserve(l),N.unobserve(l),p.delete(l);for(const M of["jlImageReveal","jlImageReason","jlMediaKind","jlMediaSampling"])delete l.dataset[M]}}const n=e instanceof HTMLImageElement?null:B(e);if(!(e instanceof HTMLImageElement)&&(!n||_(e)))return;const s={image:e,media:n,loaded:e.tagName!=="IFRAME"||e.dataset.jlMediaLoaded==="yes"||a&&document.readyState==="complete",status:"watch",done:!1,generation:0,visible:!1,near:!1,data:null,preparing:!1,sampleReady:!1};s.source=Ne(s),p.set(e,s),n&&(e.dataset.jlMediaKind=n.provider==="embed"?"embed":"video"),oe(s),C.observe(e),U.observe(e),N.observe(e)},bt=e=>{var a;if(e.nodeType!==1)return;
if(e.classList.contains('jl-image-ascii')){if(!e.shadowRoot)e.remove();return;}
for(const clone of e.querySelectorAll('.jl-image-ascii'))if(!clone.shadowRoot)clone.remove();const t=e.closest(K);t&&j.refresh(t),e.matches(K)&&D.track(e);for(const n of e.querySelectorAll(K))D.track(n);e.matches("img,"+u)&&je(e);for(const n of e.querySelectorAll("img,"+u))je(n)},$e=e=>{if(ge(e.target))return;const a=p.get(e.target);a&&(a.loaded=!0,oe(a),(a.near||a.visible)&&we(a),a.visible&&re(a))},Ye=e=>{const a=p.get(e.target);a&&F(a,"load-fallback")},Ge=e=>{for(const a of e.detail||[]){const t=p.get(a);if(!t||t.done||t.status==="animating")continue;if(photoVisibility?.skipViewer?.(a)||me(t)){F(t);continue}if(t.visible=ze(a),!t.visible||P.size>=Oe)continue;const n=y.indexOf(t);n>=0&&y.splice(n,1);try{Ke(t),t.elapsed=t.duration*.68,t.delay=0,ye(t,.68,0)}catch{F(t,"render-fallback")}}P.size&&!Q&&(Q=ue(Ve))},Ee=()=>{if($()){H();return}for(const e of[...P])F(e,"done");for(const e of y)T(e.safety),e.safety=0},Je=()=>{r.matches&&Be()},Qe=()=>{document.hidden?Ee():H()},Xe=()=>q(H,80),Ze=e=>{var a,t;const n=p.get((t=(a=e.target).closest)==null?void 0:t.call(a,u));n!=null&&n.media&&!n.done&&F(n,"playback")},et=e=>{const a=p.get(e.target);a!=null&&a.media&&!a.done&&!a.image.autoplay&&F(a,"playback")},tt=()=>{const e=p.get(document.activeElement);e!=null&&e.media&&!e.done&&F(e,"playback")},Me=e=>{var a,t;if(!isOverlay(e.target))return;const n=p.get(e.target);!n||r.matches||(be(n,"video-wait",!0),n.reverse=!0,n.waiting=!0,n.visible=!0,n.playerStage=n.image.closest("[data-media-stage]"),(a=n.playerStage)==null||a.style.setProperty("--jl-player-reveal","0"),(t=n.playerStage)==null||t.style.setProperty("--jl-poster-reveal","1"),re(n))},pe=e=>{var a;const t=p.get(e.target);!t||!t.waiting||(t.reverse=!1,t.waiting=!1,(a=t.playerStage)==null||a.style.removeProperty("--jl-poster-reveal"),t.elapsed=t.duration*.68,t.delay=0,t.readyAt=t.elapsed)},at=e=>{const a=p.get(e.target);(a!=null&&a.waiting||a!=null&&a.playerStage)&&F(a,"done")},nt=e=>{var a,t,n,s,l;const E=(t=(a=e.target).closest)==null?void 0:t.call(a,".jl-programme .jl-thumb[data-gif]");if(E){const k=E.querySelector("img");k&&R.set(new URL(E.dataset.gif,location.href).href,k.currentSrc||k.src),R.size>32&&R.delete(R.keys().next().value)}const M=(s=(n=e.target).closest)==null?void 0:s.call(n,"[data-jl-video-preview] button[data-media-play]");if(M&&!M.disabled){const k=(l=M.closest("[data-media-stage]"))==null?void 0:l.querySelector("img[data-media-gif]");k&&Me({target:k})}},it=e=>{for(const a of P){if(!a.waiting||!a.playerStage)continue;const t=a.playerStage.querySelector("[data-media-player] iframe");if(!t||e.source!==t.contentWindow)continue;let n;try{n=new URL(t.src,location.href).origin}catch{continue}if(e.origin!==n)continue;let s=e.data;try{typeof s=="string"&&(s=JSON.parse(s))}catch{continue}if(!s||!["play","playing","timeupdate"].includes(s.event))continue;T(a.videoTimer);const l=a.generation;a.videoTimer=q(()=>{a.generation===l&&a.waiting&&pe({target:a.image})},s.event==="timeupdate"?0:250)}},jt=()=>{for(const e of P)if(e.playerStage){const a=e.playerStage.querySelector("[data-media-player] iframe");if(a&&e.waiting&&!e.videoTimer){const t=e.generation;e.videoTimer=q(()=>{e.generation===t&&e.waiting&&pe({target:e.image})},5500)}else!a&&e.playerStage.dataset.mediaState==="preview"&&!e.waiting&&F(e,"done")}},Se=()=>{T(arrivalTimer);ot(arrivalPumpFrame);document.removeEventListener('DOMContentLoaded',scheduleArrival);
document.removeEventListener('click',cancelArrival,true);
W=!0,ot(Q),T(ae),C?.disconnect(),U?.disconnect(),N?.disconnect(),Y?.disconnect(),te?.disconnect(),D?.dispose(),Be(),p.clear(),x.clear();for(const e of V.splice(0))e.reject(Error("cancelled"));for(const e of["load","loadeddata"])document.removeEventListener(e,$e,!0);document.removeEventListener("error",Ye,!0),document.removeEventListener("play",et,!0);for(const e of["pointerdown","keydown","focusin"])document.removeEventListener(e,Ze,!0);for(const[e,a]of[["jl:preview-wait",Me],["jl:preview-ready",pe],["jl:preview-cancel",at]])document.removeEventListener(e,a);document.removeEventListener("click",nt,!0),window.removeEventListener("message",it),window.removeEventListener("blur",tt),document.removeEventListener("click",Xe),document.removeEventListener("visibilitychange",Qe),window.removeEventListener("curtain:start",Ee),window.removeEventListener("curtain:media-captured",Ge),window.removeEventListener("curtain:metrics",H),r.removeEventListener("change",Je)};try{C=new IntersectionObserver(e=>{for(const a of e){const t=p.get(a.target);t&&(t.visible=a.isIntersecting&&a.intersectionRect.width>0&&a.intersectionRect.height>0,t.visible?re(t):t.status==="animating"&&!t.arrivalRect?F(t,"done") : void 0)}}),U=new IntersectionObserver(e=>{for(const a of e){const t=p.get(a.target);t&&(t.near=a.isIntersecting,t.near&&(oe(t),we(t)))}},{rootMargin:"480px 0px"}),N=new ResizeObserver(e=>{for(const a of e){const t=p.get(a.target);if(!(!t||t.done||ge(t.image))){if(t.status==="animating"){t.dirty=!0,H();continue}oe(t),C.unobserve(t.image),C.observe(t.image)}}}),te=new MutationObserver(()=>{ne()||H()}),te.observe(o,{attributes:!0,attributeFilter:["data-curtain-live","data-curtain-phase"]}),D=ft((e,a)=>{ for(const t of p.values())t.eligible&&t.image.closest(K)===e&&(be(t,"preview-reset",!0),t.visible=!1,C.unobserve(t.image),C.observe(t.image),U.unobserve(t.image),U.observe(t.image))}),Y=new MutationObserver(e=>{for(const a of e)if(a.type==="attributes"){if(a.attributeName==="src")window.__jlMediaFeedback.primePopupGeometry(a.target);if(ge(a.target))continue;const t=p.get(a.target);if(!t)continue;const n=t.media?B(t.image):null;t.media&&(t.media=n);const s=Ne(t);if(s!==t.source){const l=t.image.closest(K);l&&j.refresh(l),be(t),t.source=s,t.loaded=t.image.tagName!=="IFRAME",oe(t),t.visible&&re(t)}}else for(const t of a.addedNodes)bt(t);jt()});for(const e of["load","loadeddata"])document.addEventListener(e,$e,!0);document.addEventListener("error",Ye,!0),document.addEventListener("play",et,!0);for(const e of["pointerdown","keydown","focusin"])document.addEventListener(e,Ze,{capture:!0,passive:!0});window.addEventListener("blur",tt);for(const[e,a]of[["jl:preview-wait",Me],["jl:preview-ready",pe],["jl:preview-cancel",at]])document.addEventListener(e,a);document.addEventListener("click",nt,!0),window.addEventListener("message",it),Y.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-jl-image-reveal","src","srcset","sizes","poster","data-ascii-poster","data-content-poster","media-id","data-media-state"]});for(const e of document.querySelectorAll(K))D.track(e);for(const e of document.querySelectorAll("img,"+u))je(e,!0);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scheduleArrival,{once:true});else scheduleArrival();
document.addEventListener('click',cancelArrival,{capture:true,passive:true});
return o.dataset.jlAsciiImagesReady="3.3-source-detail",window.addEventListener("curtain:start",Ee),window.addEventListener("curtain:media-captured",Ge),window.addEventListener("curtain:metrics",H),document.addEventListener("visibilitychange",Qe),r.addEventListener("change",Je),I(Se,()=>{if(!W){for(const e of p.values())C.unobserve(e.image),C.observe(e.image);H()}}),document.addEventListener("click",Xe,{passive:!0}),{dispose:Se}}catch{return Se(),{dispose:()=>{}}}}if(Pe(location.hostname)&&new URLSearchParams(location.search).get("ascii-effects")!=="off"&&!document.documentElement.dataset.jlAsciiImagesReady){const i=()=>{try{wt()}catch{document.documentElement.removeAttribute("data-jl-images-boot")}};document.body?i():document.addEventListener("DOMContentLoaded",i,{once:!0})}})()})();
} catch (e) { setTimeout(function () { throw e; }); }
