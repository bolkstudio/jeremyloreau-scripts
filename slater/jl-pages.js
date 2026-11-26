/*!
 * jl-pages.js for Slater v1.0.0, Bolk Studio for jeremyloreau.com
 * Code by Jérémy Loreau, moved out of the Webflow Head/Footer code and embeds (26 November 2026).
 * Slater file loaded on every page. Page-specific scripts: each one only runs on pages that have its target.
 * Slater runs this file after DOMContentLoaded (ES module). Each original script runs in its own try/catch.
 * Do not wrap this file in a DOMContentLoaded listener: it would never fire.
 */

/* ---- anonymous (alignProgrammeAlternatives) (only where .jl-programme) ---- */
if (document.querySelector(".jl-programme")) {
try {
(function () {
  function alignProgrammeAlternatives() {
    const cells = document.querySelectorAll('.jl-programme .jl-row:has([data-expand-alternatives]) .jl-reps');
    if (!cells.length || typeof ResizeObserver !== 'function') return;

    // The table cell grows with the row. Measure only the text inside it.
    const observer = new ResizeObserver(entries => {
      for (const {target, contentRect} of entries) {
        target.closest('.jl-row')?.style.setProperty('--jl-reps-height', contentRect.height + 'px');
      }
    });
    for (const cell of cells) {
      const content = document.createElement('div');
      content.append(...cell.childNodes);
      cell.append(content);
      observer.observe(content);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', alignProgrammeAlternatives, {once: true});
  } else {
    alignProgrammeAlternatives();
  }
})();
} catch (e) { setTimeout(function () { throw e; }); }
}

/* ---- #jl-programme-alternative-headings (only where .jl-programme) ---- */
if (document.querySelector(".jl-programme")) {
try {
(function () {
  'use strict';
  function updateAlternativeHeadings() {
    var english = document.documentElement.lang.indexOf('en') === 0;
    document.querySelectorAll('.jl-programme [data-alt-module]').forEach(function (module) {
      var count = module.querySelectorAll('[data-alt-item]').length;
      var label = (count > 1 ? 'Alternatives' : 'Alternative') + (english ? ':' : ' :');
      module.querySelectorAll('[data-alt-heading]').forEach(function (heading) {
        heading.textContent = label;
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAlternativeHeadings, { once: true });
  } else {
    updateAlternativeHeadings();
  }
})();
} catch (e) { setTimeout(function () { throw e; }); }
}

/* ---- #jl-programmes-articles-v2-js ---- */
try {
(()=>{function e(){var d,c,s,u,m,p,f,y,v,h,b,g,A,E,a,n,S,w,q;function x(){w++,q&&q.removeAttribute("aria-busy"),q=null}async function j(e){var t=new Image;t.src=e;try{await t.decode()}catch(e){if(!t.complete||!t.naturalWidth)throw e}return t}function L(){n++;var e=a;a=null,e&&e.destroy(),y.replaceChildren(),m.hidden=false,y.before(m),c.setAttribute("data-ascii-images","off"),u.removeAttribute("data-media-native"),u.style.removeProperty("aspect-ratio"),u.setAttribute("data-media-state","preview"),m.removeAttribute("aria-hidden"),m.inert=!1}function openNative(meta){m.remove();c.removeAttribute("data-ascii-images");p.removeAttribute("src");u.style.aspectRatio=meta.naturalWidth+"/"+meta.naturalHeight;u.setAttribute("data-media-native",window.JLDirectVideo.resolve(S).kind);u.setAttribute("data-media-state","ready");a=window.JLDirectVideo.mount(y,S,v.textContent,{autoplay:false});if(a&&(meta.poster||meta.src))a.frame.dataset.asciiPoster=meta.poster||meta.src}function k(){x(),E&&(E=!1,L(),c.hidden=!0,c.classList.add("hidden"),s&&A&&s.classList.add("hidden"),document.body.style.overflow=g,b)&&b.isConnected&&b.focus({preventScroll:!0})}function r(e,t){e.setAttribute("aria-expanded",t);var a=document.getElementById(e.getAttribute("aria-controls")),n=1===a.querySelectorAll("[data-alt-item]").length;a.hidden=!t,(e.querySelector(".nav_links_text")||e).textContent=t?d?n?"Hide alternative":"Hide alternatives":n?"Masquer l’alternative":"Masquer les alternatives":e.dataset.jlAltLabel}"2"!==document.documentElement.dataset.jlProgrammeViewer&&(document.documentElement.dataset.jlProgrammeViewer="2",d=0===document.documentElement.lang.indexOf("en"),E=!1,S="",w=n=0,document.addEventListener("keydown",function(e){var t,a;"Escape"===e.key&&(E||q)?(e.preventDefault(),k()):E&&"Tab"===e.key&&(t=(a=Array.from(c.querySelectorAll('a[href],button,iframe,[tabindex="0"]')).filter(function(e){return!e.disabled&&!e.closest('[data-media-state="playing"] [data-media-poster]')&&0<e.getBoundingClientRect().width}))[0],a=a[a.length-1],e.shiftKey&&document.activeElement===t?(e.preventDefault(),a.focus()):e.shiftKey||document.activeElement!==a||(e.preventDefault(),t.focus()))}),document.addEventListener("click",async function(t){var e=t.target.closest(".jl-thumb[data-gif]");if(!(!e||t.ctrlKey||t.metaKey||t.shiftKey||t.altKey||0!==t.button)){t.preventDefault(),t.stopPropagation(),x(),(q=e).setAttribute("aria-busy","true");var a,n,r,i,t=w,l=window.JLDirectVideo&&window.JLDirectVideo.resolve(e.dataset.video||""),nativeWistia=!!l&&l.kind==="wistia",l=l?l.url.href:"",o=e.querySelector("img");if(nativeWistia)try{a=await window.JLDirectVideo.describe(l)}catch(error){nativeWistia=false}if(!nativeWistia)try{a=await j(e.dataset.gif)}catch(e){try{a=await j(o.currentSrc||o.src)}catch(e){return void(t===w&&x())}}t===w&&e.isConnected&&(e.removeAttribute("aria-busy"),q=null,c||(t=document.querySelector(".popup_wrap.is-image:not([data-jl-video-preview])"),(s=document.createElement("div")).className="page_popups u-position-fixed u-flex-horizontal-nowrap u-align-items-center hidden",s.setAttribute("data-jl-preview-portal",""),document.body.append(s),[c=(t||document.getElementById("jl-native-image-popup").content.firstElementChild).cloneNode(!0)].concat(Array.from(c.querySelectorAll("*"))).forEach(function(t){Array.from(t.attributes).forEach(function(e){0!==e.name.indexOf("cd-")&&"id"!==e.name&&"style"!==e.name||t.removeAttribute(e.name)})}),c.classList.add("hidden"),c.hidden=!0,c.setAttribute("data-ascii-images","off"),s.append(c),c.setAttribute("data-jl-video-preview",""),c.setAttribute("cd-lightbox-exclude",""),c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),c.setAttribute("aria-labelledby","jl-video-title"),c.querySelector(".popup_image").hidden=!0,(u=document.createElement("div")).setAttribute("data-media-stage",""),(m=document.createElement("div")).setAttribute("data-media-poster",""),(p=document.createElement("img")).setAttribute("data-media-gif",""),p.addEventListener("load",function(){m.style.backgroundImage="none"}),m.append(p),(y=document.createElement("div")).setAttribute("data-media-player",""),u.append(m,y),c.querySelector(".popup_zoomable").append(u),(t=document.createElement("div")).className="u-padding-4 u-flex-vertical-nowrap u-gap-4",t.setAttribute("data-jl-video-caption",""),(v=document.createElement("h2")).id="jl-video-title",(h=document.createElement("a")).target="_blank",h.rel="noopener noreferrer",h.textContent=d?"Learn more about this exercise":"En savoir plus sur cet exercice",h.className="nav_links_text",h.setAttribute("aria-label",h.textContent+(d?" (opens in a new tab)":" (nouvel onglet)")),h.title=h.textContent,t.append(v,h),c.querySelector(".popup_content").append(t),(t=c.querySelector(".popup_close")).setAttribute("role","button"),t.tabIndex=0,t.addEventListener("click",k),t.addEventListener("keydown",function(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),k())}),c.addEventListener("click",function(e){e.target!==c&&!e.target.classList.contains("popup_sizer")||k()})),E||(g=document.body.style.overflow,A=s.classList.contains("hidden")),L(),S=l,b=e,v.textContent=(i=(t=e).closest(".jl-row"))?(r=((n=t.closest("[data-alt-item]"))||i).querySelector(".jl-selected-name"),n=(n||i).querySelector(".jl-set"),i=i.querySelector(".jl-reps"),r=r?r.textContent.trim():t.dataset.title,i=i?i.textContent.trim():"",/^\d+(?:\s*[-–]\s*\d+)?(?:\s*RM)?$/i.test(i)&&(i=i.replace(/\s*RM$/i,"")+" reps max"),(n?n.textContent.trim()+" ":"")+r+(i?" @"+i:"")):t.dataset.title,l?openNative(a):(m.style.backgroundImage="url("+JSON.stringify(o.currentSrc||o.src)+")",p.width=a.naturalWidth,p.height=a.naturalHeight,p.src=a.src,p.alt="Démonstration : "+e.dataset.title),h.hidden=!/^\/(?:exercice|en\/exercise)\//.test(new URL(e.href,location.href).pathname),h.hidden||(h.href=e.href),document.body.style.overflow="hidden",c.hidden=!1,c.classList.remove("hidden"),s&&s.classList.remove("hidden"),E=!0,c.querySelector(".popup_close").focus())}},!0),document.querySelectorAll(".jl-programme [data-alt-module] .other-list_list").forEach(function(t){var e=t.closest(".jl-row"),e=e&&e.querySelector(".jl-name-link");window.JLAltSort(Array.from(t.children).filter(function(e){return e.matches("[data-alt-item]")}),e&&e.dataset.altFamily||"").forEach(function(e){t.append(e)})}),document.querySelectorAll("[data-jl-programme]").forEach(function(a){a.setAttribute("data-jl-no-transition",""),a.querySelectorAll(".jl-options-row").forEach(function(e){var t,a,n=e.querySelector("[data-alt-module]"),r=e.closest(".jl-row")?.querySelector(".jl-label");n&&r&&(n.id=e.id,n.hidden=e.hidden,n.querySelectorAll("[data-close-alternatives]").forEach(function(e){e.hidden=!0}),t=n.querySelector("[data-alt-header]"),a=n.querySelector("[data-alt-more-wrap]"),t&&a&&a.querySelector("[data-close-alternatives]")&&t.append(a),r.append(n),e.remove())}),a.querySelectorAll("[data-expand-alternatives]").forEach(function(e){var t,a=document.getElementById(e.getAttribute("aria-controls"));a&&(a=a.querySelectorAll("[data-alt-item]").length,(t=e.querySelector(".nav_links_text")||e).textContent=(d?"See ":"Voir ")+a+(1===a?" alternative":" alternatives"),e.dataset.jlAltLabel=t.textContent)});var t=new WeakMap;function n(a){a&&(a.parentElement.querySelectorAll("[data-select]").forEach(function(e){var t=e===a;e.setAttribute("aria-pressed",String(t)),document.getElementById(e.dataset.select).hidden=!t}),(t.get(a.parentElement)||[]).forEach(function(e){e.panel.id===a.dataset.select?(e.heading.setAttribute("data-jl-session-label",""),a.parentElement.before(e.heading)):(e.heading.removeAttribute("data-jl-session-label"),e.panel.prepend(e.heading))}))}a.querySelectorAll(".jl-controls").forEach(function(e){t.set(e,Array.from(e.querySelectorAll("[data-select]")).map(function(e){var e=document.getElementById(e.dataset.select),t=e.querySelector(".jl-session-title");return t||((t=document.createElement("h4")).className="jl-session-title",t.textContent="Séance d’entraînement",e.prepend(t)),t.dataset.jlSessionId=e.id,{panel:e,heading:t}})),e.hidden=!1,n(e.querySelector("[data-select]"))}),a.classList.add("jl-ready"),a.addEventListener("click",function(e){var t=e.target.closest("[data-select]");t?n(t):(t=e.target.closest("[data-expand-alternatives]"))?r(t,"true"!==t.getAttribute("aria-expanded")):(t=e.target.closest("[data-close-alternatives]"))&&(r(e=a.querySelector('[aria-controls="'+t.dataset.closeAlternatives+'"]'),!1),e.focus({preventScroll:!0}))})}))}e(),"loading"===document.readyState&&document.addEventListener("DOMContentLoaded",e,{once:!0})})();
} catch (e) { setTimeout(function () { throw e; }); }

/* ---- anonymous (waitForHyvor) (only where hyvor-talk-comments,.ht_wrap,script[src*="talk.hyvor.com"]) [adapted: also checks once at start] ---- */
if (document.querySelector("hyvor-talk-comments,.ht_wrap,script[src*=\"talk.hyvor.com\"]")) {
try {
  let hyvorCheck;
  const waitForHyvor = new MutationObserver(hyvorCheck = () => {
    const host = document.querySelector('hyvor-talk-comments');
    if (!host || !host.shadowRoot) return;

    waitForHyvor.disconnect();

    const commentLanguage = host.getAttribute('page-language') || document.documentElement.lang;
    if (commentLanguage.toLowerCase().startsWith('fr')) {
      host.setAttribute('t-comment-box-text', 'Écrire un commentaire ou poser une question à Jérémy...');
    }

    const isFrench = commentLanguage.toLowerCase().startsWith('fr');
    if (isFrench) {
      host.setAttribute('t-reply-button-text', 'Répondre');
      host.setAttribute('t-reply-box-text', 'Écrire une réponse...');
    }

    const updateCommentPrompt = () => {
      const setPrompt = (editor, prompt) => {
        if (!editor || !prompt) return;
        ['aria-placeholder', 'aria-label'].forEach(attribute => {
          if (editor.getAttribute(attribute) !== prompt) editor.setAttribute(attribute, prompt);
        });
        const placeholder = editor.querySelector('.data-placeholder');
        if (placeholder && placeholder.textContent !== prompt) placeholder.textContent = prompt;
      };
      setPrompt(host.shadowRoot.querySelector('.main-box .ProseMirror'), host.getAttribute('t-comment-box-text'));
      if (!isFrench) return;
      // Hyvor currently hardcodes "to" in named reply prompts.
      // Update only the prompt and its accessible labels, never the draft.
      host.shadowRoot.querySelectorAll('.comment-reply-editor .ProseMirror').forEach(editor => {
        const comment = editor.closest('.comment');
        const name = comment?.querySelector(':scope > .comment-inside > .comment-main > .comment-meta .user-name')?.textContent.trim();
        setPrompt(editor, name ? 'Répondre à ' + name + '...' : 'Écrire une réponse...');
      });
    };
    host.addEventListener('loaded', updateCommentPrompt);
    updateCommentPrompt();

    const applyFieldStyles = () => {
      const root = host.shadowRoot;
      if (!root || root.querySelector('#jl-comment-field-style')) return;
      const style = document.createElement('style');
      style.id = 'jl-comment-field-style';
      style.textContent = `

        /* Requested comment controls: remove their occupied space as well. */
        #app .comments-top,
        #app .comment-side,
        #app .comment-actions .votes {
          display: none !important;
        }
        #app .comment .comment-main { margin-inline-start: 0; }

        /* Match the site's table headings. */
        #app .comment-meta .user-name {
          font-family: var(--_typography---font--primary-family);
          font-size: var(--_typography---font-size--text-small);
          font-weight: var(--_typography---font--primary-bold);
          line-height: var(--_typography---line-height--large);
          letter-spacing: var(--_typography---letter-spacing--normal);
          text-transform: uppercase;
        }

        /* Match menu/footer text links, including hover and keyboard focus. */
        #app .comment-actions .reply {
          margin-inline-start: 0;
        }
        #app .comment-actions .reply > button {
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: var(--swatch--faded);
          font-family: var(--_typography---font--primary-family);
          font-size: var(--_typography---font-size--text-main);
          font-weight: var(--_typography---font--primary-regular);
          line-height: var(--_typography---line-height--large);
          letter-spacing: var(--_typography---letter-spacing--normal);
          text-transform: none;
          text-decoration: none;
          cursor: pointer;
          transition: color calc(var(--transition--duration-ms) * 1ms) ease;
        }
        #app .comment-actions .reply > button:is(:hover, :focus-visible, [aria-expanded="true"]) {
          color: var(--_theme---text);
          text-decoration: underline;
        }
        #app .comment-actions .reply > button:focus-visible {
          outline: var(--focus--width) solid var(--_theme---text);
          outline-offset: var(--focus--offset-outer);
        }

        #app .main-box { margin: 0; }
        #app #comments {
          padding-inline: var(--_spacing---space--4);
          padding-bottom: calc(var(--_spacing---space--4) + var(--_spacing---space--4));
        }
        /* Let the container supply the site's equal side padding. */
        #app #comments .comments-list.parent { margin-inline: 0; }
        #app #comments .comment .comment-inside { padding-inline: 0; }

        /* Same hierarchy spacing and vertical rule as the table of contents. */
        #app #comments .comment:not(.depth-exceeded) > .comment-replies {
          position: relative;
          margin-inline-start: var(--_spacing---space--5);
        }
        #app #comments .comment:not(.depth-exceeded) > .comment-replies:has(> .comments-list > .comment)::before {
          content: "";
          position: absolute;
          inset-block: var(--_spacing---space--4);
          inset-inline-start: calc(-1 * var(--_spacing---space--5));
          width: 0;
          border-inline-start: var(--border-width--main) solid var(--_theme---border);
          pointer-events: none;
        }

        #app .editor-wrap {
          box-sizing: border-box;
          border: var(--border-width--main) solid var(--_theme---border);
          border-radius: var(--radius--xsmall);
          min-height: var(--_button-style---height);
        }
        #app .rich-editor,
        #app .comment-writer,
        #app .ProseMirror { border-radius: inherit; }
        #app .rich-editor .ProseMirror {
          box-sizing: border-box;
          min-height: calc(var(--_button-style---height) - 2 * var(--border-width--main));
          padding-block: calc((var(--_button-style---height) - 2 * var(--border-width--main) - 1lh) / 2);
          padding-inline: var(--_spacing---space--4);
          font-family: var(--_typography---font--primary-family);
          font-size: var(--_typography---font-size--text-main);
          font-weight: var(--_typography---font--primary-regular);
          line-height: var(--_typography---line-height--large);
        }
        #app .rich-editor .ProseMirror .data-placeholder {
          top: calc((var(--_button-style---height) - 2 * var(--border-width--main) - 1lh) / 2);
          left: var(--_spacing---space--4);
          right: var(--_spacing---space--4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: inherit;
        }
        #app .rich-editor .ProseMirror > p {
          margin: 0;
          line-height: inherit;
        }
        #app .rich-editor .guest-form {
          gap: var(--_spacing---space--4);
          padding: var(--_spacing---space--3) var(--_spacing---space--4);
        }
        #app .rich-editor .guest-form input {
          box-sizing: border-box;
          width: 100%;
          height: var(--_button-style---height);
          min-height: var(--_button-style---height);
          padding: var(--_spacing---space--3) var(--_spacing---space--4);
          border: var(--border-width--main) solid var(--_theme---border) !important;
          border-radius: var(--radius--xsmall) !important;
          background-color: transparent;
          color: var(--_theme---text);
          font-family: var(--_typography---font--primary-family);
          font-size: var(--_typography---font-size--text-main);
          font-weight: var(--_typography---font--primary-regular);
          line-height: var(--_typography---line-height--large);
        }
        #app .rich-editor .comment-buttons {
          align-items: center;
          gap: var(--_spacing---space--4);
          padding: var(--_spacing---space--4);
          padding-bottom: calc(var(--_spacing---space--4) + var(--_spacing---space--4));
        }
        #app .rich-editor .comment-buttons .writer-buttons,
        #app .rich-editor .comment-buttons .action-buttons {
          padding: 0;
        }
        #app .rich-editor .comment-buttons .action-buttons {
          display: flex;
          justify-content: flex-end;
        }
        /* Keep edge-to-edge toolbar SVG artwork visible without changing icon size. */
        #app .rich-editor .comment-buttons .writer-buttons .icon,
        #app .rich-editor .comment-buttons .writer-buttons .icon svg {
          flex-shrink: 0;
          overflow: visible;
        }
        /* Hide Hyvor's native mobile toolbar separator. */
        #app .rich-editor .comment-buttons .action-buttons::before {
          content: none;
          display: none;
        }
        #app .rich-editor .comment-buttons .button-accent {
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          width: auto;
          height: var(--_button-style---height);
          min-height: var(--_button-style---height);
          padding: 2px var(--_spacing---space--5) 0;
          border: var(--border-width--main) solid var(--_button-style---border);
          border-radius: var(--radius--xsmall);
          background: var(--_theme---button-primary--background);
          color: var(--_theme---button-primary--text);
          font-family: var(--_typography---font--primary-family);
          font-size: var(--_typography---font-size--text-small);
          font-weight: var(--_typography---font--primary-bold);
          line-height: var(--_typography---line-height--small);
          text-transform: uppercase;
          text-align: center;
          transition: border-color calc(var(--transition--duration-ms) * 1ms), color calc(var(--transition--duration-ms) * 1ms), background-color calc(var(--transition--duration-ms) * 1ms);
        }
        #app .rich-editor .comment-buttons .button-accent:hover {
          background: var(--_theme---button-primary--background-hover);
          color: var(--_theme---button-primary--text-hover);
          border-color: var(--_theme---button-primary--border-hover);
        }
        #app .rich-editor .comment-buttons .button-accent:focus-visible {
          outline: var(--border-width--main) solid var(--_theme---text);
          outline-offset: var(--_spacing---space--2);
        }
        #app .rich-editor:not([data-jl-can-comment="true"]) .comment-buttons .button-accent,
        #app .rich-editor .comment-buttons .button-accent:disabled,
        #app .rich-editor .comment-buttons .button-accent[aria-disabled="true"] {
          display: none !important;
        }
        @media (max-width: 479px) {
          #app .rich-editor .guest-form { flex-direction: column; }
          #app .rich-editor .guest-form .guest-input { width: 100%; min-width: 0; }
          #app .rich-editor .comment-buttons { flex-wrap: wrap; }
          #app .rich-editor .comment-buttons .writer-buttons { flex-wrap: wrap; }
          #app .rich-editor .comment-buttons .action-buttons { margin-inline-start: auto; }
        }
      `;
      root.append(style);
    };
    host.addEventListener('loaded', applyFieldStyles);
    applyFieldStyles();



    // Mirror local form readiness without submitting or bypassing Hyvor validation.
    const emailCheck = document.createElement('input');
    emailCheck.type = 'email';
    emailCheck.required = true;
    const updateCommentReadiness = () => {
      host.shadowRoot.querySelectorAll('.rich-editor').forEach(editor => {
        const content = editor.querySelector('.ProseMirror');
        const button = editor.querySelector('.comment-buttons .button-accent');
        if (!content || !button) return;
        const draft = content.cloneNode(true);
        draft.querySelectorAll('.data-placeholder').forEach(node => node.remove());
        const text = (draft.textContent || '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
        const hasContent = text.length > 0 || !!content.querySelector('img, video, iframe, .embed');
        const fields = Array.from(editor.querySelectorAll('.guest-form input'));
        const name = fields[0];
        const email = fields[1];
        emailCheck.value = email ? email.value.trim() : '';
        const validName = !name || (name.value.trim().length > 0 && name.value.length <= name.maxLength);
        const validEmail = !email || (emailCheck.checkValidity() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCheck.value) && email.value.length <= email.maxLength);
        const ready = hasContent && text.length <= 50000 && validName && validEmail &&
          !button.disabled && button.getAttribute('aria-disabled') !== 'true' &&
          !editor.querySelector('[aria-busy="true"]');
        const value = String(ready);
        if (editor.getAttribute('data-jl-can-comment') !== value) {
          editor.setAttribute('data-jl-can-comment', value);
        }
      });
    };
    host.shadowRoot.addEventListener('input', updateCommentReadiness);
    host.shadowRoot.addEventListener('change', updateCommentReadiness);
    host.addEventListener('loaded', updateCommentReadiness);
    updateCommentReadiness();

    const observer = new MutationObserver(() => {
      updateCommentPrompt();
      updateCommentReadiness();
      const popup = host.shadowRoot.querySelector('.user-profile-popup-wrap');
      document.body.classList.toggle('ht-popup-open', !!popup);
    });

    observer.observe(host.shadowRoot, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ['class', 'disabled', 'aria-disabled', 'aria-busy']
    });
  });

  waitForHyvor.observe(document.body, { childList: true, subtree: true });
  hyvorCheck(); // Slater runs after DOMContentLoaded: Hyvor may already be rendered
} catch (e) { setTimeout(function () { throw e; }); }
}

/* ---- anonymous (__jlNativeTableSeparators) (only where .c-table) ---- */
if (document.querySelector(".c-table")) {
try {
(function () {
  'use strict';
  const key = '__jlNativeTableSeparators';
  if (window[key]) { window[key](); return; }
  const selector = '.c-table > .slot';
  const marker = 'data-table-separator';
  let frame = 0;
  const observed = new Set();
  const resizeObserver = typeof ResizeObserver === 'function'
    ? new ResizeObserver(schedule) : null;

  function isDisplayed(element) {
    if (element.matches('script, style, template, link, .w-embed')) return false;
    const style = getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse') return false;
    if (style.display === 'contents') return Array.from(element.children).some(isDisplayed);
    return Array.from(element.getClientRects()).some(rect => rect.width > 0 && rect.height > 0);
  }

  function refresh() {
    frame = 0;
    const groups = Array.from(document.querySelectorAll(selector));
    const targets = new Set();
    const changes = [];
    groups.forEach(group => {
      targets.add(group);
      const children = Array.from(group.children);
      const visible = children.filter(isDisplayed);
      const last = visible[visible.length - 1];
      children.forEach(child => {
        targets.add(child);
        if (child.matches('.c-table-row')) {
          changes.push([child, child !== last && visible.includes(child)]);
        }
      });
    });
    // Read every layout first, then write only changed separator markers.
    changes.forEach(([row, show]) => {
      if (row.hasAttribute(marker) !== show) row.toggleAttribute(marker, show);
    });
    if (resizeObserver) {
      observed.forEach(element => {
        if (!targets.has(element)) { resizeObserver.unobserve(element); observed.delete(element); }
      });
      targets.forEach(element => {
        if (!observed.has(element)) { resizeObserver.observe(element); observed.add(element); }
      });
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(refresh);
  }
  window[key] = schedule;
  // Attribute changes cover Webflow conditions, custom classes, inline styles,
  // collapsed sections and responsive visibility. No dependency on field names.
  function affectsTables(record) {
    const element = record.target.nodeType === 1 ? record.target : record.target.parentElement;
    if (!element) return false;
    if (element.closest('.jl-image-ascii,.jl-scramble-word,.jl-scramble-node,.jl-scramble-visual')) return false;
    if (record.type === 'attributes' && record.attributeName === 'style'
        && element.matches('[data-jl-image-reveal]')) return false;
    if (element.closest(selector) || element.querySelector(selector)) return true;
    return [...record.addedNodes, ...record.removedNodes].some(node => node.nodeType === 1
      && (node.matches('.c-table') || node.querySelector(selector)));
  }
  new MutationObserver(records => {
    if (records.some(affectsTables)) schedule();
  }).observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['class', 'style', 'hidden', 'open']
  });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  document.addEventListener('load', schedule, true);
  document.addEventListener('transitionend', schedule, true);
  document.addEventListener('animationend', schedule, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refresh, { once: true });
  else refresh();
})();
} catch (e) { setTimeout(function () { throw e; }); }
}

/* ---- #jl-native-account-error-association (only where [cd-jc-form]) ---- */
if (document.querySelector("[cd-jc-form]")) {
try {
(function () {
  'use strict';
  function init() {
    document.querySelectorAll('[cd-jc-form]').forEach(function (form, formIndex) {
      var fields = Array.from(form.querySelectorAll('.procoach_form_label'));
      function sync() {
        fields.forEach(function (field, fieldIndex) {
          var input = field.querySelector('.procoach_form_input');
          var error = field.querySelector('[cd-jc-text="error"]');
          if (!input || !error) return;
          if (!error.id) error.id = 'jl-account-error-' + formIndex + '-' + fieldIndex;
          var invalid = !error.classList.contains('hidden');
          if (input.getAttribute('aria-invalid') !== String(invalid)) input.setAttribute('aria-invalid', String(invalid));
          var described = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean).filter(function(id) {return id !== error.id;});
          if (invalid) described.push(error.id);
          var value = described.join(' ');
          if (value) {if (input.getAttribute('aria-describedby') !== value) input.setAttribute('aria-describedby', value);}
          else input.removeAttribute('aria-describedby');
          error.setAttribute('role', 'alert');
        });
      }
      sync();
      new MutationObserver(sync).observe(form, {subtree: true, attributes: true, attributeFilter: ['class']});
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
} catch (e) { setTimeout(function () { throw e; }); }
}

/* ---- #jl-library-focus-js (only where .recipes_coll_list,.exercices_coll_list,.testimonials_coll_list,.articles_coll_list) ---- */
if (document.querySelector(".recipes_coll_list,.exercices_coll_list,.testimonials_coll_list,.articles_coll_list")) {
try {
(function () {
  'use strict';
  if (window.__jlLibraryFocusInstalled || !('IntersectionObserver' in window) || document.documentElement.classList.contains('wf-design-mode')) return;
  window.__jlLibraryFocusInstalled = true;

  var roots = '.recipes_coll_list,.exercices_coll_list,.testimonials_coll_list,.articles_coll_list';
  var cards = '.card_wrap,.testimonials_card_wrap,.articles_card_wrap';
  var excluded = 'nav,footer,.nav_component,.footer_component,.footer_wrap,.global-styles,.popup_wrap,[role="dialog"],[data-jl-media-focus="off"]';
  var media = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var states = new Map(), profiles = new Map(), anonymousProfiles = new WeakMap();
  var active = null, candidate = null, point = null, anchor = null;
  var enterTimer = 0, exitTimer = 0, scrollTimer = 0, frame = 0;
  var controller = null, mutations = null, visibility = null, keyboard = false;
  var cardOwners = new Map();
  var hoverDelay = 1500, exitDelay = 750, scrollDelay = 150, switchScale = 0.5, scrollScale = 1.5, tolerance = 4;
  var motion = {min:300, max:420, lag:80, scrollMin:220, scrollMax:300, scrollLag:20};
  var gray = '--jl-library-gray', alpha = '--jl-library-alpha';

  function clearProps(node) { node.style.removeProperty(gray); node.style.removeProperty(alpha); }
  function paint(node, value, inactive) {
    value = Math.max(0, Math.min(1, value));
    node.style.setProperty(gray, String(Math.round(value * 100000) / 100000));
    node.style.setProperty(alpha, String(Math.round((1 - (1 - inactive) * value) * 100000) / 100000));
  }
  function profileFor(item) {
    var link = item.querySelector('a[href]');
    var key = link && link.getAttribute('href');
    var cache = key ? profiles : anonymousProfiles, id = key || item;
    if (!cache.has(id)) cache.set(id, {speed:Math.random(), lag:Math.random()});
    return cache.get(id);
  }
  function timing(state, item) {
    var profile = profileFor(item), scrolling = state.scrolling;
    var min = scrolling ? motion.scrollMin : motion.min;
    var max = scrolling ? motion.scrollMax : motion.max;
    return {duration:(min + (max - min) * profile.speed) * state.scale, lag:profile.lag * (scrolling ? motion.scrollLag : motion.lag) * state.scale};
  }
  function valueAt(record, now) {
    var t = reduced.matches || !record.duration ? 1 : Math.max(0, Math.min(1, (now - record.start - record.lag) / record.duration));
    return {value:record.from + (record.to - record.from) * t * t, moving:t < 1 && record.from !== record.to};
  }
  function schedule(record, to, now, duration, lag) {
    record.from = record.value;
    record.to = to;
    record.start = now;
    record.duration = reduced.matches ? 0 : duration;
    record.lag = reduced.matches ? 0 : lag;
    record.moving = record.from !== to;
  }
  function getCard(state, item, now) {
    var card = state.cards.get(item);
    if (card) return card;
    card = {value:state.from, painted:null};
    var times = timing(state, item);
    schedule(card, item === state.target ? 0 : state.to, state.start, times.duration, times.lag);
    card.value = valueAt(card, now).value;
    state.cards.set(item, card);
    return card;
  }
  function dropCard(state, item) {
    if (!state.cards.delete(item)) return;
    clearProps(item);
    item.removeAttribute('data-jl-library-near');
  }
  function track(item) {
    var state = states.get(item.closest(roots));
    var previous = cardOwners.get(item);
    if (previous === state) return;
    if (previous) {
      visibility.unobserve(item);
      dropCard(previous, item);
      cardOwners.delete(item);
    }
    if (state && !item.closest(excluded)) {
      cardOwners.set(item, state);
      visibility.observe(item);
    }
  }
  function forCards(node, visit) {
    if (!(node instanceof Element)) return;
    if (node.matches(cards)) visit(node);
    node.querySelectorAll(cards).forEach(visit);
  }
  function onVisibility(entries) {
    var now = Date.now();
    entries.forEach(function (entry) {
      var item = entry.target, state = cardOwners.get(item);
      if (!state) return;
      if (!entry.isIntersecting) {
        dropCard(state, item);
      } else {
        getCard(state, item, now);
        if (state.root.hasAttribute('data-jl-library-focus')) {
          state.moving = true;
          if (!frame) frame = requestAnimationFrame(tick);
        }
      }
    });
  }
  function getState(root) {
    if (states.has(root)) return states.get(root);
    var raw = getComputedStyle(root).getPropertyValue('--opacity--media-inactive').trim();
    var inactive = parseFloat(raw);
    if (raw.indexOf('%') !== -1) inactive /= 100;
    if (!Number.isFinite(inactive)) inactive = 0.25;
    var ms = parseFloat(getComputedStyle(root).getPropertyValue('--transition--duration-ms'));
    var state = {root:root, dim:0, from:0, to:0, target:null, start:0, duration:0, lag:0, moving:false, cards:new Map(), inactive:inactive, scale:Number.isFinite(ms) ? ms / 200 : 1, scrolling:false};
    states.set(root, state);
    forCards(root, track);
    return state;
  }
  function sample(state, now) {
    if (!state.moving) return;
    var base = valueAt(state, now), moving = base.moving;
    state.dim = base.value;
    state.cards.forEach(function (card, item) {
      var result = valueAt(card, now);
      card.value = result.value;
      card.moving = result.moving;
      if (card.painted === null) item.setAttribute('data-jl-library-near', '');
      if (card.painted !== card.value) { paint(item, card.value, state.inactive); card.painted = card.value; }
      if (card.moving) moving = true;
    });
    state.moving = moving;
    if (!moving && !state.target) {
      state.root.removeAttribute('data-jl-library-focus');
      state.cards.forEach(function (card, item) {
        clearProps(item);
        item.removeAttribute('data-jl-library-near');
        card.painted = null;
      });
    }
  }
  function tick() {
    frame = 0;
    var moving = false, now = Date.now();
    states.forEach(function (state) { sample(state, now); if (state.moving) moving = true; });
    if (moving) frame = requestAnimationFrame(tick);
  }
  function animate(state, item, durationScale) {
    var now = Date.now();
    sample(state, now);
    var to = item ? 1 : 0;
    if (state.target === item && state.to === to) return;
    if (item) getCard(state, item, now);
    var previous = state.target, transfer = !!previous && !!item && state.cards.has(previous);
    if (previous) previous.removeAttribute('data-jl-library-active');
    state.root.setAttribute('data-jl-library-focus', '');
    if (!transfer) {
      state.scrolling = durationScale === scrollScale;
      state.from = state.dim;
      state.to = to;
      state.start = now;
      state.duration = reduced.matches ? 0 : ((state.scrolling ? motion.scrollMax + motion.scrollLag : motion.max + motion.lag) * state.scale);
      state.cards.forEach(function (card, node) {
        var times = timing(state, node);
        schedule(card, node === item ? 0 : to, now, node === item ? 100 * state.scale : times.duration, node === item ? 0 : times.lag);
      });
    } else {
      schedule(state.cards.get(previous), 1, now, 100 * state.scale, 0);
      schedule(state.cards.get(item), 0, now, 100 * state.scale, 0);
    }
    state.target = item;
    if (item) item.setAttribute('data-jl-library-active', '');
    state.moving = true;
    sample(state, now);
    if (state.moving && !frame) frame = requestAnimationFrame(tick);
  }
  function fromNode(node) {
    if (!(node instanceof Element) || node.closest(excluded)) return null;
    var item = node.closest(cards);
    var root = item && item.closest(roots);
    if (!root) return null;
    return {item:item, state:getState(root)};
  }
  function atPoint() { return point ? fromNode(document.elementFromPoint(point.x, point.y)) : null; }
  function same(a, b) { return !!a && !!b && a.item === b.item && a.state === b.state; }
  function clearEnter() { clearTimeout(enterTimer); enterTimer = 0; candidate = anchor = null; }
  function clearExit() { clearTimeout(exitTimer); exitTimer = 0; }
  function clearScroll() { clearTimeout(scrollTimer); scrollTimer = 0; }
  function deactivate(durationScale) {
    if (active) animate(active.state, null, durationScale);
    active = null;
  }
  function activate(hit, durationScale) {
    clearEnter(); clearExit(); clearScroll();
    if (active && active.state !== hit.state) animate(active.state, null);
    active = hit;
    animate(hit.state, hit.item, durationScale);
  }
  function scheduleExit(wait, durationScale) {
    if (!active || exitTimer) return;
    exitTimer = setTimeout(function () { exitTimer = 0; deactivate(durationScale); }, wait == null ? exitDelay : wait);
  }
  function inspect(hit, moved) {
    if (moved) clearScroll();
    if (same(active, hit) && !scrollTimer) { clearEnter(); clearExit(); return; }
    if (active && hit && active.state === hit.state && !scrollTimer) { activate(hit, switchScale); return; }
    scheduleExit();
    if (!hit || scrollTimer) { clearEnter(); return; }
    if (same(candidate, hit) && anchor && enterTimer) {
      var dx = point.x - anchor.x, dy = point.y - anchor.y;
      if (dx * dx + dy * dy <= tolerance * tolerance) return;
    }
    clearEnter();
    candidate = hit;
    anchor = {x:point.x, y:point.y};
    enterTimer = setTimeout(function () {
      var expected = candidate, current = atPoint();
      enterTimer = 0;
      if (current && same(expected, current) && !document.hidden) activate(current);
      else clearEnter();
    }, hoverDelay);
  }
  function onScroll() {
    if (keyboard) { clearEnter(); clearScroll(); return; }
    clearEnter();
    if (!scrollTimer) clearExit();
    scheduleExit(scrollDelay, scrollScale); clearScroll();
    if (!point || document.hidden) return;
    scrollTimer = setTimeout(function () {
      scrollTimer = 0;
      var hit = atPoint();
      if (hit && !document.hidden) activate(hit);
    }, scrollDelay);
  }
  function reset() {
    clearEnter(); clearExit(); clearScroll();
    cancelAnimationFrame(frame); frame = 0;
    active = null;
    states.forEach(function (state) {
      if (state.target) state.target.removeAttribute('data-jl-library-active');
      state.cards.forEach(function (card, item) {
        clearProps(item);
        item.removeAttribute('data-jl-library-near');
        Object.assign(card, {value:0, from:0, to:0, duration:0, moving:false, painted:null});
      });
      state.dim = state.from = state.to = 0;
      state.target = null;
      state.moving = false;
      state.root.removeAttribute('data-jl-library-focus');
    });
  }
  function start() {
    if (controller || !media.matches || !document.body) return;
    controller = new AbortController();
    visibility = new IntersectionObserver(onVisibility, {rootMargin:'320px 0px'});
    var signal = controller.signal;
    document.addEventListener('pointerover', function (event) {
      if (event.pointerType && event.pointerType !== 'mouse' || keyboard) return;
      point = {x:event.clientX, y:event.clientY};
      inspect(fromNode(event.target), false);
    }, {passive:true, signal:signal});
    document.addEventListener('pointermove', function (event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      keyboard = false;
      point = {x:event.clientX, y:event.clientY};
      inspect(fromNode(event.target), true);
    }, {passive:true, signal:signal});
    document.addEventListener('pointerout', function (event) {
      if (event.pointerType && event.pointerType !== 'mouse' || keyboard) return;
      point = {x:event.clientX, y:event.clientY};
      inspect(fromNode(event.relatedTarget), false);
    }, {passive:true, signal:signal});
    document.addEventListener('pointerdown', function (event) {
      keyboard = false;
      if (event.pointerType && event.pointerType !== 'mouse') reset();
    }, {passive:true, signal:signal});
    document.addEventListener('wheel', onScroll, {passive:true, capture:true, signal:signal});
    document.addEventListener('scroll', onScroll, {passive:true, capture:true, signal:signal});
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Tab') { keyboard = true; clearEnter(); clearScroll(); }
      if (event.key === 'Escape') { clearEnter(); clearExit(); clearScroll(); deactivate(); }
    }, {signal:signal});
    document.addEventListener('focusin', function (event) {
      var hit = fromNode(event.target);
      if (keyboard && hit) activate(hit);
      else if (!hit) {
        if (event.target instanceof Element && event.target.matches('input,textarea,select,[contenteditable="true"]')) keyboard = true;
        clearEnter(); clearScroll(); scheduleExit();
      }
    }, {signal:signal});
    document.addEventListener('focusout', function (event) {
      if (!keyboard) return;
      var hit = fromNode(event.relatedTarget);
      if (hit) activate(hit); else scheduleExit();
    }, {signal:signal});
    document.addEventListener('input', function (event) {
      if (event.target instanceof Element && event.target.matches('.search_form_field')) {
        keyboard = true;
        clearEnter(); clearScroll(); scheduleExit();
      }
    }, {signal:signal});
    ['play','pause','ended'].forEach(function (name) {
      document.addEventListener(name, function (event) {
        if (!(event.target instanceof HTMLVideoElement)) return;
        var item = event.target.closest(cards);
        if (item && item.closest(roots)) item.toggleAttribute('data-jl-library-playing', !event.target.paused && !event.target.ended);
      }, {capture:true, signal:signal});
    });
    window.addEventListener('blur', reset, {signal:signal});
    window.addEventListener('pagehide', reset, {signal:signal});
    document.addEventListener('visibilitychange', function () { if (document.hidden) reset(); }, {signal:signal});
    mutations = new MutationObserver(function (records) {
      if (active && !active.item.isConnected) { clearEnter(); clearExit(); clearScroll(); deactivate(); }
      states.forEach(function (state, root) {
        if (!root.isConnected) states.delete(root);
      });
      records.forEach(function (record) {
        record.removedNodes.forEach(function (node) { forCards(node, track); });
        record.addedNodes.forEach(function (node) { forCards(node, track); });
      });
    });
    mutations.observe(document.body, {childList:true, subtree:true});
    document.documentElement.setAttribute('data-jl-library-ready', '2.8');
  }
  function stop() {
    if (!controller) return;
    controller.abort(); controller = null;
    if (mutations) mutations.disconnect();
    reset();
    visibility.disconnect();
    cardOwners.clear();
    states.clear();
    point = null; keyboard = false;
    document.documentElement.removeAttribute('data-jl-library-ready');
  }
  function sync() { if (media.matches) start(); else stop(); }
  media.addEventListener('change', sync);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, {once:true});
  else sync();
})();
} catch (e) { setTimeout(function () { throw e; }); }
}

/* ---- anonymous (groupMuscleLibrary) (only where [cd-popup-wrap="muscle-groups"]) ---- */
if (document.querySelector("[cd-popup-wrap=\"muscle-groups\"]")) {
try {
/* Reuse the CMS zone groups and existing heading styles from the filter menu. */
(function () {
  function groupMuscleLibrary() {
    var list = document.querySelector('[cd-popup-wrap="muscle-groups"] .w-dyn-items');
    var lowerHeading = document.querySelector('[cd-popup-wrap="filters"] [data-filter-body-heading="lower"]');
    var upperHeading = document.querySelector('[cd-popup-wrap="filters"] [data-filter-body-heading="upper"]');
    if (!list || !lowerHeading || !upperHeading || list.hasAttribute("data-muscle-library-grouped")) return;

    var lowerNames = new Set(Array.from(lowerHeading.nextElementSibling.querySelectorAll(".w-dyn-item"))
      .map(function (item) { return item.getAttribute("rk-filter-value-search-for"); }));
    var items = Array.from(list.children).filter(function (item) { return item.matches(".w-dyn-item"); });
    if (!items.length || !lowerNames.size) return;

    var groups = [
      { heading: lowerHeading, items: items.filter(function (item) { return lowerNames.has(item.getAttribute("rk-filter-value-search-for")); }) },
      { heading: upperHeading, items: items.filter(function (item) { return !lowerNames.has(item.getAttribute("rk-filter-value-search-for")); }) }
    ].filter(function (group) { return group.items.length > 0; });

    list.setAttribute("data-muscle-library-grouped", "true");
    list.setAttribute("role", "presentation");
    groups.forEach(function (group, index) {
      var heading = group.heading.cloneNode(false);
      heading.removeAttribute("id");
      heading.removeAttribute("data-filter-body-heading");
      heading.setAttribute("data-muscle-body-heading", index === 0 ? "first" : "next");
      heading.textContent = group.heading.textContent;
      if (index === 0) heading.classList.remove("u-margin-top-6");

      var groupList = document.createElement("div");
      groupList.className = "u-display-contents";
      groupList.setAttribute("role", "list");
      groupList.setAttribute("aria-label", heading.textContent);
      list.appendChild(heading);
      list.appendChild(groupList);
      group.items.forEach(function (item) { groupList.appendChild(item); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", groupMuscleLibrary, { once: true });
  } else {
    groupMuscleLibrary();
  }
})();
} catch (e) { setTimeout(function () { throw e; }); }
}

/* ---- #jl-card-ascii-wait-script (only where .recipes_coll_list,.exercices_coll_list) ---- */
if (document.querySelector(".recipes_coll_list,.exercices_coll_list")) {
try {
(() => {
  if (!('IntersectionObserver' in window) || !('ResizeObserver' in window)) return;
  const selector = ':is(.recipes_coll_list,.exercices_coll_list) .card_image_wrap > img.card_image';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const overlays = new Map();
  const render = window.__jlContentBoot?.renderWaitingAscii;
  if (!render) return;
  const previews = window.__jlImagePreviews;
  const grids = new WeakMap();

  function remove(image) {
    const overlay = overlays.get(image);
    if (!overlay) return;
    overlay.remove();
    overlays.delete(image);
    sizing.unobserve(image);
  }
  function position(image, overlay) {
    Object.assign(overlay.style, {
      left: image.offsetLeft + 'px', top: image.offsetTop + 'px',
      width: image.offsetWidth + 'px', height: image.offsetHeight + 'px',
      borderRadius: getComputedStyle(image).borderRadius
    });
    const grid = grids.get(overlay);
    const width = image.offsetWidth, height = image.offsetHeight;
    if (grid.width === width && grid.height === height && grid.drawnPreview === grid.preview) return;
    render(image, overlay.firstElementChild, width, height, grid.seed, grid.preview);
    Object.assign(grid, {width, height, drawnPreview:grid.preview});
  }
  const sizing = new ResizeObserver(entries => {
    for (const {target} of entries) {
      const overlay = overlays.get(target);
      if (overlay) position(target, overlay);
    }
  });
  const visibility = new IntersectionObserver(entries => {
    for (const {target: image, isIntersecting} of entries) {
      if (!isIntersecting) {
        remove(image);
        continue;
      }
      if (image.complete || motion.matches || overlays.has(image)) continue;
      const overlay = document.createElement('span');
      overlay.className = 'jl-card-ascii-wait';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('data-nosnippet', '');
      const glyphs = document.createElement('pre');
      overlay.append(glyphs);
      const source = image.currentSrc || image.src;
      const grid = {seed:crypto.getRandomValues(new Uint32Array(1))[0], preview:previews?.sample(source,192)};
      grids.set(overlay, grid);
      image.after(overlay);
      overlays.set(image, overlay);
      position(image, overlay);
      sizing.observe(image);
      if (!grid.preview) previews?.prepare(image,192).then(preview => {
        if (!preview || image.complete || overlays.get(image) !== overlay || (image.currentSrc || image.src) !== source) return;
        grid.preview = preview;
        position(image,overlay);
      }).catch(() => {});
    }
  });

  async function finish(event) {
    const image = event.target;
    if (!image.matches?.(selector)) return;
    visibility.unobserve(image);
    const overlay = overlays.get(image);
    if (!overlay) return;
    if (event.type === 'error' || motion.matches) {
      remove(image);
      return;
    }
    await image.decode?.().catch(() => {});
    if (overlays.get(image) !== overlay) return;
    // Reveal the photo first, then let the last of the ASCII ink fade away.
    const photoFade = 550;
    const asciiFade = 850;
    const smooth = 'cubic-bezier(.333333, 0, .666667, 1)';
    overlay.animate(
      [{backgroundColor:getComputedStyle(overlay).backgroundColor}, {backgroundColor:'transparent'}],
      {duration:photoFade, easing:smooth, fill:'forwards'}
    );
    const fade = overlay.firstElementChild.animate([
      {opacity:1, offset:0, easing:smooth},
      {opacity:.18, offset:photoFade / asciiFade},
      {opacity:.18, offset:.82, easing:smooth},
      {opacity:0, offset:1}
    ], {duration:asciiFade, fill:'forwards'});
    await fade.finished.catch(() => {});
    if (overlays.get(image) === overlay) remove(image);
  }
  document.addEventListener('load', finish, true);
  document.addEventListener('error', finish, true);

  function forCards(node, callback) {
    if (node.nodeType !== 1) return;
    if (node.matches(selector)) callback(node);
    for (const image of node.querySelectorAll(selector)) callback(image);
  }
  const observe = image => {
    if (!image.complete) visibility.observe(image);
  };
  forCards(document.body, observe);
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') {
        if (record.target.matches(selector)) observe(record.target);
        continue;
      }
      for (const node of record.removedNodes) {
        if (node.nodeType !== 1 || node.isConnected) continue;
        for (const image of (node.matches('img.card_image') ? [node] : node.querySelectorAll('img.card_image'))) {
          visibility.unobserve(image);
          remove(image);
        }
      }
      for (const node of record.addedNodes) forCards(node, observe);
    }
  }).observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:['src','srcset']});
})();
} catch (e) { setTimeout(function () { throw e; }); }
}
