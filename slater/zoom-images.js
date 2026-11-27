/*****************************************/
/*********** ZOOM IMAGES ***************/
/*****************************************/
/* Ajoute du zoom + déplacement interactif sur les images ouvertes dans les popups Codelius.
   Basé sur GSAP + Draggable + InertiaPlugin (chargés nativement par Webflow, sinon via
   window.siteLoadOnce de BolkLab ou le CDN).

   1. Desktop: molette (ou pinch trackpad) pour zoomer vers le curseur, drag pour se déplacer.
   2. Mobile: pinch-to-zoom vers les doigts, drag à un doigt quand zoomé.
      Sur iPhone / iPad, le pinch passe par les GestureEvent natifs d'iOS (recette Apple).
   3. Boutons: zoom in/out via [data-zoom-in] et [data-zoom-out].
   4. Clavier: + / - / 0 pour zoomer / réinitialiser, flèches pour se déplacer.
   5. Bornes: l'image zoomée peut occuper toute la popup ([cd-popup-wrap]), pas seulement .popup_sizer.
   6. Reset: automatique à l'ouverture et à la fermeture de la popup.

   Max zoom: 5x. Chaque image zoomée a son propre état.

   v1.1 à v1.9 (21/10/2026): fluidité du pinch, zoom natif de Safari bloqué popup ouverte, double-tap retiré,
   branche iOS (GestureEvent), correction du NaN qui figeait le premier pinch sur iPhone.
   v2.0 (21/10/2026): version de production, diagnostic retiré. Comportement identique à la v1.9.
   v2.1 (27/11/2026): Draggable et InertiaPlugin ne sont plus chargés avec la page. Ils arrivent quand le
   navigateur est libre après le chargement, ou dès l'ouverture d'une popup image si elle a lieu avant.
   Comportement identique à la v2.0. */

(() => {
  'use strict';

  const VERSION = 'v2.1';
  console.log(`--- Loading Images zoom ${VERSION}`);

  /* ----------------------------------------------------------------- knobs --- */

  const ZOOM_MAX = 5;
  const ZOOM_STEP = 1.5;
  const WHEEL_SPEED = 0.002;
  const PINCH_WHEEL_SPEED = 0.01;
  const KEY_PAN = 80;
  const DURATION = 0.3;
  const EASE = 'power2.out';

  const GSAP_CDN = 'https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/';

  /* ----------------------------------------------------------------- hooks --- */

  const IMAGES = '.popup_image';
  const POPUP_WRAP = '[cd-popup-wrap]';
  const ZOOM_IN = '[data-zoom-in]';
  const ZOOM_OUT = '[data-zoom-out]';
  const OPEN_CLASS = 'hidden';

  // iPhone / iPad (sur iOS, tous les navigateurs utilisent WebKit): le pinch passe par les GestureEvent d'iOS
  const IS_IOS = 'ongesturechange' in window && (/iP(hone|od|ad)/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  /* ----------------------------------------------------------------- tools --- */

  const loadScript = (src) => {
    if (typeof window.siteLoadOnce === 'function') return window.siteLoadOnce(src);
    if (document.querySelector(`script[src="${src}"]`)) return Promise.resolve(true);
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error(`ZoomImages: failed to load ${src}`));
      document.head.appendChild(script);
    });
  };

  const loadGsap = async () => {
    if (!window.gsap) await loadScript(`${GSAP_CDN}gsap.min.js`);
    await Promise.all([
      window.Draggable || loadScript(`${GSAP_CDN}Draggable.min.js`),
      window.InertiaPlugin || loadScript(`${GSAP_CDN}InertiaPlugin.min.js`)
    ]);
    window.gsap.registerPlugin(window.Draggable, window.InertiaPlugin);
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // GSAP n'écrit aucun transform qui contient NaN: toute valeur invalide est remplacée avant de lui être envoyée
  const finite = (value, fallback) => (Number.isFinite(value) ? value : fallback);

  /* --------------------------------------------------------------- main --- */

  const images = document.querySelectorAll(IMAGES);
  if (!images.length) return;

  // Every page has an image popup, so loading the plugins right away put ~45 KB of JS on every page load.
  // Start once the page is idle after load, or as soon as a popup opens, whichever comes first.
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    loadGsap()
      .then(() => images.forEach(initZoom))
      .catch((error) => console.error(error));
  };

  images.forEach((img) => {
    const wrap = img.closest(POPUP_WRAP);
    if (!wrap) return;
    const observer = new MutationObserver(() => {
      if (wrap.classList.contains(OPEN_CLASS)) return;
      observer.disconnect();
      start();
    });
    observer.observe(wrap, { attributes: true, attributeFilter: ['class'] });
  });

  const startWhenIdle = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 4000 });
    else setTimeout(start, 1500);
  };
  if (document.readyState === 'complete') startWhenIdle();
  else window.addEventListener('load', startWhenIdle, { once: true });

  function initZoom(img) {
    const { gsap, Draggable } = window;

    const popupWrap = img.closest(POPUP_WRAP);
    if (!popupWrap) return;

    // Le cadre de zoom est toute la popup: l'image zoomée n'est plus limitée par .popup_sizer (50% de large sur desktop)
    const frame = popupWrap;
    // Les parents entre l'image et la popup ne doivent plus rogner l'image zoomée
    for (let el = img.parentElement; el && el !== frame; el = el.parentElement) {
      gsap.set(el, { overflow: 'visible' });
    }
    const zoomInBtn = popupWrap.querySelector(ZOOM_IN);
    const zoomOutBtn = popupWrap.querySelector(ZOOM_OUT);

    // État cible du zoom pour cette image (les tweens GSAP convergent vers ces valeurs)
    const state = { scale: 1, x: 0, y: 0 };

    // Le cadre ne doit ni scroller ni laisser le navigateur gérer le pinch
    gsap.set(frame, { overflow: 'hidden', touchAction: 'none' });
    gsap.set(img, {
      transformOrigin: '50% 50%',
      userSelect: 'none',
      webkitUserDrag: 'none',
      touchAction: 'none',
      cursor: 'zoom-in'
    });

    const isOpen = () => !popupWrap.classList.contains(OPEN_CLASS);

    // draggable.disable() remet touch-action: auto et user-select: text sur l'image.
    // Sur iPhone, l'image redevient alors manipulable par Safari (zoom de page, sélection, menu de l'image).
    // On remet ces réglages après chaque disable().
    const lockImgTouch = () => {
      img.style.touchAction = 'none';
      img.style.userSelect = 'none';
      img.style.webkitUserSelect = 'none';
      img.style.webkitTouchCallout = 'none';
    };
    lockImgTouch();

    /* ------------------------------------------------------- geometry --- */

    // Pendant un geste: géométrie mesurée une fois au début, puis réutilisée à chaque mouvement
    // (relire le DOM juste après l'avoir modifié forcerait un recalcul de la mise en page à chaque fois)
    let pinchGeo = null;

    // Centre et taille de l'image à x1 sans translation, déduits de son rect actuel
    const getBase = () => {
      if (pinchGeo) return pinchGeo.base;
      const rect = img.getBoundingClientRect();
      const scale = finite(gsap.getProperty(img, 'scale'), 1) || 1;
      const x = finite(gsap.getProperty(img, 'x'), 0);
      const y = finite(gsap.getProperty(img, 'y'), 0);
      const width = rect.width / scale;
      const height = rect.height / scale;

      // object-fit: contain -> taille réelle de l'image visible dans sa boîte.
      // Image pas encore chargée et boîte sans hauteur (iPhone, à l'ouverture): ratio 1 plutôt qu'Infinity
      const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img
        .naturalHeight :
        width && height ? width / height : 1;
      return {
        cx: rect.left + rect.width / 2 - x,
        cy: rect.top + rect.height / 2 - y,
        width: Math.min(width, height * ratio),
        height: Math.min(height, width / ratio)
      };
    };

    const measureGesture = () => {
      pinchGeo = null;
      pinchGeo = { base: getBase(), box: frame.getBoundingClientRect() };
    };

    // Bornes x/y pour une échelle donnée: l'image couvre le cadre si elle est plus grande, reste dedans sinon
    const getBounds = (scale) => {
      const base = getBase();
      const box = pinchGeo ? pinchGeo.box : frame.getBoundingClientRect();
      const halfW = (base.width * scale) / 2;
      const halfH = (base.height * scale) / 2;

      const xA = box.right - halfW - base.cx;
      const xB = box.left + halfW - base.cx;
      const yA = box.bottom - halfH - base.cy;
      const yB = box.top + halfH - base.cy;

      return {
        minX: Math.min(xA, xB, 0),
        maxX: Math.max(xA, xB, 0),
        minY: Math.min(yA, yB, 0),
        maxY: Math.max(yA, yB, 0)
      };
    };

    /* --------------------------------------------------------- render --- */

    // Pas de Draggable sur iOS: le déplacement y est géré dans la branche iPhone
    const draggable = IS_IOS ? null : Draggable.create(img, {
      type: 'x,y',
      inertia: true,
      edgeResistance: 0.85,
      cursor: 'grab',
      activeCursor: 'grabbing',
      zIndexBoost: false,
      onPress() {
        gsap.killTweensOf(img);
        this.update();
        this.applyBounds(getBounds(state.scale));
      },
      onDrag: syncFromDraggable,
      onThrowUpdate: syncFromDraggable
    })[0];
    if (draggable) draggable.disable();
    lockImgTouch();

    function syncFromDraggable() {
      state.x = draggable.x;
      state.y = draggable.y;
    }

    const render = (animate = true) => {
      const bounds = getBounds(state.scale);
      state.x = finite(clamp(state.x, bounds.minX, bounds.maxX), 0);
      state.y = finite(clamp(state.y, bounds.minY, bounds.maxY), 0);

      const vars = { scale: state.scale, x: state.x, y: state.y, overwrite: true };
      if (animate) gsap.to(img, { ...vars, duration: DURATION, ease: EASE });
      else gsap.set(img, vars);

      // Pendant un geste, Draggable reste désactivé: il est réactivé au relâchement
      if (pinchGeo) return;

      if (state.scale > 1) {
        if (draggable) {
          draggable.enable();
          draggable.applyBounds(bounds);
        }
      } else {
        if (draggable) draggable.disable();
        lockImgTouch();
        gsap.set(img, { cursor: 'zoom-in' });
      }
    };

    // Zoome vers un point écran (clientX/clientY): ce point reste sous le curseur / les doigts
    const zoomTo = (nextScale, pointX, pointY, animate = true) => {
      nextScale = clamp(nextScale, 1, ZOOM_MAX);
      const base = getBase();
      const px = pointX ?? base.cx + state.x;
      const py = pointY ?? base.cy + state.y;
      const ratio = nextScale / state.scale;

      state.x = px - (px - (base.cx + state.x)) * ratio - base.cx;
      state.y = py - (py - (base.cy + state.y)) * ratio - base.cy;
      state.scale = nextScale;
      if (nextScale === 1) state.x = state.y = 0;

      render(animate);
    };

    const reset = () => {
      gsap.killTweensOf(img);
      pinchGeo = null;
      state.scale = 1;
      state.x = state.y = 0;
      render(false);
    };

    /* ----------------------------- reset à l'ouverture / la fermeture --- */

    new MutationObserver(reset).observe(popupWrap, { attributes: true, attributeFilter: [
        'class'] });
    img.addEventListener('load', reset);

    /* ------------------------ ne pas fermer la popup après un drag --- */

    // Le wrap porte [cd-popup-close]: un drag relâché hors de l'image déclencherait un click de fermeture.
    // On compare la position de l'appui et du click: s'ils sont éloignés, c'est un drag, pas un click.
    const press = { x: 0, y: 0 };
    popupWrap.addEventListener('pointerdown', (e) => {
      press.x = e.clientX;
      press.y = e.clientY;
    }, true);
    popupWrap.addEventListener('click', (e) => {
      if (Math.hypot(e.clientX - press.x, e.clientY - press.y) <= 5) return;
      e.preventDefault();
      e.stopImmediatePropagation();
    }, true);

    /* ------------------------------------------------ buttons zoom in/out --- */

    const onButton = (factor) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const box = frame.getBoundingClientRect();
      zoomTo(state.scale * factor, box.left + box.width / 2, box.top + box.height / 2);
    };

    if (zoomInBtn) zoomInBtn.addEventListener('click', onButton(ZOOM_STEP));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', onButton(1 / ZOOM_STEP));

    /* ------------------------------------- desktop: molette / trackpad --- */

    // ctrlKey = pinch trackpad (Mac) ou Ctrl + molette
    popupWrap.addEventListener('wheel', (e) => {
      if (!isOpen()) return;
      e.preventDefault();
      const speed = e.ctrlKey ? PINCH_WHEEL_SPEED : WHEEL_SPEED;
      zoomTo(state.scale * Math.exp(-e.deltaY * speed), e.clientX, e.clientY, false);
    }, { passive: false });

    /* ------------------------------------------------------ mobile: pinch --- */

    if (IS_IOS) {
      // Recette Apple (Safari Web Content Guide, « Handling Events », et Safari Visual Effects Guide,
      // « Adding Interactive Control »): iOS calcule lui-même l'échelle du pinch (e.scale, relative
      // au début du geste). On l'applique à l'image, et preventDefault empêche Safari de zoomer la page.
      const fingers = { midX: 0, midY: 0 };
      // ref: état de l'image et des doigts au premier gesturechange (le centre des doigts y est fiable)
      const gesture = { active: false, ref: null };
      const pan = { active: false, startX: 0, startY: 0, x: 0, y: 0 };

      // Centre des doigts, lu sans rien bloquer (Apple ne documente pas clientX / clientY sur les GestureEvent)
      const readFingers = (e) => {
        if (e.touches.length < 2) return;
        fingers.midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        fingers.midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      };

      frame.addEventListener('gesturestart', (e) => {
        e.preventDefault();
        gsap.killTweensOf(img);
        pan.active = false;
        measureGesture();
        Object.assign(gesture, { active: true, ref: null });
      });

      frame.addEventListener('gesturechange', (e) => {
        e.preventDefault();
        if (!gesture.active) return;

        if (!gesture.ref) {
          gesture.ref = {
            scale: state.scale,
            x: state.x,
            y: state.y,
            midX: fingers.midX,
            midY: fingers.midY,
            e: e.scale || 1
          };
        }
        const { ref } = gesture;
        const { base } = pinchGeo;
        const scale = clamp(ref.scale * e.scale / ref.e, 1, ZOOM_MAX);
        // Le point de l'image pris sous les doigts au début du geste suit le centre des doigts
        const u = (ref.midX - base.cx - ref.x) / ref.scale;
        const v = (ref.midY - base.cy - ref.y) / ref.scale;
        state.scale = scale;
        state.x = scale === 1 ? 0 : fingers.midX - base.cx - u * scale;
        state.y = scale === 1 ? 0 : fingers.midY - base.cy - v * scale;
        render(false);
      });

      frame.addEventListener('gestureend', (e) => {
        e.preventDefault();
        if (!gesture.active) return;
        gesture.active = false;
        pinchGeo = null;
        render(true);
      });

      // Déplacement à un doigt quand l'image est zoomée
      frame.addEventListener('touchstart', (e) => {
        readFingers(e);
        if (e.touches.length === 1 && state.scale > 1 && !gesture.active) {
          gsap.killTweensOf(img);
          measureGesture();
          Object.assign(pan, {
            active: true,
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY,
            x: state.x,
            y: state.y
          });
        } else {
          pan.active = false;
        }
      }, { passive: true });

      frame.addEventListener('touchmove', (e) => {
        readFingers(e);
        if (!pan.active || e.touches.length !== 1) return;
        state.x = pan.x + e.touches[0].clientX - pan.startX;
        state.y = pan.y + e.touches[0].clientY - pan.startY;
        render(false);
      }, { passive: true });

      const endPan = (e) => {
        if (!pan.active || e.touches.length) return;
        pan.active = false;
        if (!gesture.active) pinchGeo = null;
        render(true);
      };
      frame.addEventListener('touchend', endPan, { passive: true });
      frame.addEventListener('touchcancel', endPan, { passive: true });
    } else {
      // Hors iOS: pinch à partir des contacts tactiles, Draggable pour le déplacement
      const pinch = { active: false, distance: 0, scale: 1, midX: 0, midY: 0 };

      const getMid = (t1, t2) => ({
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
        distance: Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
      });

      const endPinch = () => {
        pinch.active = false;
        pinchGeo = null;
        render(true);
      };

      frame.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 2) return;
        e.preventDefault();
        draggable.disable();
        lockImgTouch();
        gsap.killTweensOf(img);
        measureGesture();
        const mid = getMid(e.touches[0], e.touches[1]);
        Object.assign(pinch, {
          active: true,
          distance: mid.distance,
          scale: state.scale,
          midX: mid.x,
          midY: mid.y
        });
      }, { passive: false });

      frame.addEventListener('touchmove', (e) => {
        if (!pinch.active || e.touches.length !== 2) return;
        e.preventDefault();

        const mid = getMid(e.touches[0], e.touches[1]);
        // Pan avec le centre des doigts, puis zoom autour de ce centre
        state.x += mid.x - pinch.midX;
        state.y += mid.y - pinch.midY;
        pinch.midX = mid.x;
        pinch.midY = mid.y;
        zoomTo(pinch.scale * (mid.distance / pinch.distance), mid.x, mid.y, false);
      }, { passive: false });

      frame.addEventListener('touchend', (e) => {
        if (pinch.active && e.touches.length < 2) endPinch();
      });

      // Geste interrompu par le système (appel, notification...): même fin qu'un relâchement
      frame.addEventListener('touchcancel', () => {
        if (pinch.active) endPinch();
      });
    }

    /* ------------------------- iOS: bloquer le zoom natif de Safari --- */

    // Safari ignore user-scalable=no: un pinch dans la popup zoomerait aussi toute la page.
    // On bloque ses événements de geste seulement quand la popup est ouverte
    // (la page article reste zoomable pour l'accessibilité).
    ['gesturestart', 'gesturechange', 'gestureend'].forEach((type) => {
      document.addEventListener(type, (e) => {
        if (isOpen()) e.preventDefault();
      }, { passive: false });
    });

    // Filet de sécurité: tant que la popup est ouverte, aucun mouvement à plusieurs doigts
    // ne doit être traité par le navigateur, où que soient les doigts
    document.addEventListener('touchmove', (e) => {
      if (isOpen() && e.touches.length > 1) e.preventDefault();
    }, { passive: false });

    /* -------------------------------------------------------- clavier --- */

    document.addEventListener('keydown', (e) => {
      if (!isOpen() || e.metaKey || e.ctrlKey || e.altKey) return;

      const step = {
        ArrowLeft: [KEY_PAN, 0],
        ArrowRight: [-KEY_PAN, 0],
        ArrowUp: [0, KEY_PAN],
        ArrowDown: [0, -KEY_PAN]
      } [e.key];

      if (e.key === '+' || e.key === '=') zoomTo(state.scale * ZOOM_STEP);
      else if (e.key === '-') zoomTo(state.scale / ZOOM_STEP);
      else if (e.key === '0') zoomTo(1);
      else if (step && state.scale > 1) {
        state.x += step[0];
        state.y += step[1];
        render(true);
      } else return;

      e.preventDefault();
    });

    /* --------------------------------------------------------- resize --- */

    window.addEventListener('resize', () => {
      if (isOpen()) render(false);
    });
  }
})();


