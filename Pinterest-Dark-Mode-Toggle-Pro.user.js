// ==UserScript==
// @name         Pinterest Dark Mode Toggle
// @namespace    https://github.com/thetalhachy/pinterest-amoled-dark-mode
// @version      1.0.0
// @description  A customizable AMOLED dark theme for Pinterest
// @author       Talha Mohammad Chowdhury
// @license      AGPL-3.0-or-later
// @match        https://www.pinterest.com/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
    'use strict';

    const ID = {
        STYLE:  'pdm-style',
        TOAST:  'pdm-toast',
        BTN:    'pdm-btn',
        MENU:   'pdm-menu',
    };

    const KEY = {
        ENABLED:   'pdm_enabled',
        ACCENT:    'pdm_accent',
        CONTRAST:  'pdm_contrast',
    };

    const CLS = 'pdm-dark';

    // Accent colour options: [label, r, g, b]
    const ACCENTS = [
        { label: '🔴', r: 220, g: 50,  b: 50  },
        { label: '🟠', r: 210, g: 100, b: 20  },
        { label: '🟣', r: 130, g: 60,  b: 220 },
        { label: '🔵', r: 40,  g: 120, b: 220 },
        { label: '🟢', r: 40,  g: 180, b: 100 },
        { label: '⚪', r: 180, g: 180, b: 180 },
    ];

    let enabled        = GM_getValue(KEY.ENABLED,  true);
    let accentIndex    = GM_getValue(KEY.ACCENT,   0);       // index into ACCENTS
    let contrastLevel  = GM_getValue(KEY.CONTRAST, 1);       // 0 = soft, 1 = mid, 2 = AMOLED

    function bgFromContrast() {
        // Returns the base background colour for the chosen contrast level
        return ['#1a1a1a', '#0f0f0f', '#000000'][contrastLevel];
    }

    function surfaceFromContrast() {
        return ['#242424', '#161616', '#0d0d0d'][contrastLevel];
    }

    function accentRGB() {
        const a = ACCENTS[accentIndex];
        return `${a.r},${a.g},${a.b}`;
    }

    function buildCSS() {
        const bg      = bgFromContrast();
        const surface = surfaceFromContrast();
        const acc     = accentRGB();

        return `

/* ── BASE ─────────────────────────────────────────────────── */

html.pdm-dark,
html.pdm-dark body,
html.pdm-dark #__PWS_ROOT__ {
    background: ${bg} !important;
    color: #e6e6e6 !important;
}

/* ── BLANKET RESET ──────────────────────────────────────────
   Make all structural elements transparent so the body
   colour shows through. Specific surfaces are set below.
──────────────────────────────────────────────────────────── */

html.pdm-dark div,
html.pdm-dark section,
html.pdm-dark main,
html.pdm-dark article,
html.pdm-dark aside,
html.pdm-dark footer,
html.pdm-dark li,
html.pdm-dark ul,
html.pdm-dark ol,
html.pdm-dark form,
html.pdm-dark label {
    background-color: transparent !important;
    border-color: rgba(255,255,255,0.06) !important;
    color: #e6e6e6 !important;
}

/* ── TYPOGRAPHY ─────────────────────────────────────────────── */

html.pdm-dark span,
html.pdm-dark p,
html.pdm-dark h1,
html.pdm-dark h2,
html.pdm-dark h3,
html.pdm-dark h4,
html.pdm-dark h5,
html.pdm-dark h6,
html.pdm-dark button,
html.pdm-dark a,
html.pdm-dark a:visited {
    color: #e6e6e6 !important;
}

html.pdm-dark a:hover {
    color: rgba(${acc},0.9) !important;
}

html.pdm-dark .tappable,
html.pdm-dark .small,
html.pdm-dark .meta,
html.pdm-dark .description {
    color: rgba(230,230,230,0.6) !important;
}

/* ── HEADER / NAV ───────────────────────────────────────────── */

html.pdm-dark header,
html.pdm-dark header[role="banner"],
html.pdm-dark nav,
html.pdm-dark nav[role="navigation"],
html.pdm-dark [data-test-id="header"],
html.pdm-dark .Header,
html.pdm-dark .topNav,
html.pdm-dark .zCH5,
html.pdm-dark .zI7,
html.pdm-dark .X8m,
html.pdm-dark .CCY,
html.pdm-dark .S9a,
html.pdm-dark .SHI,
html.pdm-dark .ujU {
    background: linear-gradient(180deg, ${surface} 0%, ${bg} 100%) !important;
    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    color: #e6e6e6 !important;
}

/* ── CATEGORY / TAB BAR ─────────────────────────────────────── */

html.pdm-dark [role="tablist"],
html.pdm-dark div[role="navigation"] {
    background: ${surface} !important;
    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
}

/* ── SEARCH ──────────────────────────────────────────────────── */

html.pdm-dark input,
html.pdm-dark textarea,
html.pdm-dark select,
html.pdm-dark input[type="search"],
html.pdm-dark input[placeholder*="Search"],
html.pdm-dark [data-test-id="search-box"],
html.pdm-dark .searchBox,
html.pdm-dark .SearchBox,
html.pdm-dark .XiG,
html.pdm-dark .tBJ,
html.pdm-dark .Jea,
html.pdm-dark .JME {
    background: rgba(28,28,30,0.95) !important;
    color: #e6e6e6 !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
}

html.pdm-dark input::placeholder,
html.pdm-dark textarea::placeholder {
    color: rgba(200,200,200,0.4) !important;
}

html.pdm-dark .SearchResults,
html.pdm-dark [data-test-id="search-results"],
html.pdm-dark .zI7.iyn,
html.pdm-dark .Jea .Jea {
    background: rgba(14,14,16,0.98) !important;
    border: 1px solid rgba(255,255,255,0.08) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
}

/* ── PINS / CARDS ────────────────────────────────────────────── */

html.pdm-dark [data-test-id="pin"],
html.pdm-dark .pin,
html.pdm-dark .pinWrapper {
    background: transparent !important;
}

html.pdm-dark .XtM,
html.pdm-dark .YRc,
html.pdm-dark .KS5,
html.pdm-dark .Pj7 {
    background: ${surface} !important;
    border-color: rgba(255,255,255,0.06) !important;
}

html.pdm-dark .Modal,
html.pdm-dark .modal,
html.pdm-dark [data-test-id="closeup-body"],
html.pdm-dark [data-test-id="pin-closeup-modal"] {
    background: ${surface} !important;
    box-shadow: 0 8px 40px rgba(0,0,0,0.8) !important;
}

/* ── NEVER TOUCH MEDIA ───────────────────────────────────────── */

html.pdm-dark img,
html.pdm-dark video,
html.pdm-dark picture,
html.pdm-dark canvas {
    filter: none !important;
    background: transparent !important;
}

/* ── SVG ICONS ───────────────────────────────────────────────── */

html.pdm-dark svg:not(:root) {
    fill: #e6e6e6 !important;
    stroke: none !important;
    background: transparent !important;
}

/* ── SAVE BUTTON ─────────────────────────────────────────────── */

html.pdm-dark button[aria-label*="Save"],
html.pdm-dark [data-test-id="save-button"],
html.pdm-dark .zI7.iyn.Hsu,
html.pdm-dark .HnA {
    background: rgba(${acc},0.88) !important;
    color: #fff !important;
    font-weight: 600 !important;
    backdrop-filter: blur(4px) !important;
    -webkit-backdrop-filter: blur(4px) !important;
    border: 1px solid rgba(255,255,255,0.2) !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4) !important;
    transition: transform 0.15s ease, box-shadow 0.15s ease !important;
}

html.pdm-dark button[aria-label*="Save"]:hover,
html.pdm-dark [data-test-id="save-button"]:hover,
html.pdm-dark .zI7.iyn.Hsu:hover,
html.pdm-dark .HnA:hover {
    background: rgba(${acc},0.98) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 16px rgba(${acc},0.4) !important;
}

/* ── MENUS / DROPDOWNS / TOOLTIPS / DIALOGS ─────────────────── */

html.pdm-dark [role="dialog"],
html.pdm-dark [role="menu"],
html.pdm-dark [role="listbox"],
html.pdm-dark [role="tooltip"],
html.pdm-dark .Overlay,
html.pdm-dark .Tooltip,
html.pdm-dark .Popover,
html.pdm-dark .Dropdown,
html.pdm-dark .dropdown,
html.pdm-dark .Menu,
html.pdm-dark .menu,
html.pdm-dark .Picker,
html.pdm-dark .picker {
    background: rgba(12,12,14,0.97) !important;
    color: #e6e6e6 !important;
    border: 1px solid rgba(255,255,255,0.09) !important;
    backdrop-filter: blur(22px) !important;
    -webkit-backdrop-filter: blur(22px) !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.55) !important;
}

html.pdm-dark .RCK,
html.pdm-dark .Hsu,
html.pdm-dark .wsz,
html.pdm-dark .QhT,
html.pdm-dark .C9q,
html.pdm-dark [data-test-id="board-dropdown"],
html.pdm-dark [data-test-id="board-picker"],
html.pdm-dark [data-test-id="dropdown"],
html.pdm-dark [data-test-id="menu"],
html.pdm-dark [data-test-id="popover"],
html.pdm-dark [data-test-id="tooltip"] {
    background: rgba(13,13,15,0.98) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    backdrop-filter: blur(22px) !important;
    -webkit-backdrop-filter: blur(22px) !important;
}

html.pdm-dark [role="menuitem"],
html.pdm-dark [role="option"] {
    background: transparent !important;
    color: #e6e6e6 !important;
}

html.pdm-dark [role="menuitem"]:hover,
html.pdm-dark [role="option"]:hover {
    background: rgba(255,255,255,0.07) !important;
}

/* ── PROFILE HEADER ──────────────────────────────────────────── */

html.pdm-dark .ProfilePageHeader,
html.pdm-dark [data-test-id="profile-header"],
html.pdm-dark .qiB,
html.pdm-dark [data-test-id="self-profile-header"] {
    background: ${bg} !important;
}

/* ── NOTIFICATION BADGE ──────────────────────────────────────── */

html.pdm-dark [data-test-id="notifications-count"],
html.pdm-dark .badge,
html.pdm-dark .Badge,
html.pdm-dark .notificationBadge {
    background: rgba(${acc},1) !important;
    color: #fff !important;
    border: 2px solid ${bg} !important;
}

/* ── INLINE STYLE OVERRIDES ──────────────────────────────────── */

html.pdm-dark [style*="background: rgb(255, 255, 255)"],
html.pdm-dark [style*="background: rgb(250, 250, 250)"],
html.pdm-dark [style*="background: rgb(249, 249, 249)"],
html.pdm-dark [style*="background-color: rgb(255, 255, 255)"],
html.pdm-dark [style*="background-color: rgb(250, 250, 250)"],
html.pdm-dark [style*="background-color: rgb(249, 249, 249)"],
html.pdm-dark [style*="background:#fff"],
html.pdm-dark [style*="background: #fff"],
html.pdm-dark [style*="background:#ffffff"],
html.pdm-dark [style*="background: #ffffff"] {
    background-color: ${surface} !important;
}

/* ── SCROLLBARS ──────────────────────────────────────────────── */

html.pdm-dark ::-webkit-scrollbar { width: 8px; height: 8px; }
html.pdm-dark ::-webkit-scrollbar-track  { background: ${bg}; }
html.pdm-dark ::-webkit-scrollbar-thumb  { background: rgba(255,255,255,0.12); border-radius: 8px; }
html.pdm-dark ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
html.pdm-dark * { scrollbar-color: rgba(255,255,255,0.12) ${bg}; }

/* Moon button */
#pdm-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 2147483647;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(18,18,20,0.92);
    color: #e6e6e6;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 18px rgba(0,0,0,0.5);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    transition: transform 0.16s ease, box-shadow 0.16s ease;
    padding: 0;
    line-height: 1;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
#pdm-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 24px rgba(0,0,0,0.65);
}
#pdm-btn.pdm-menu-open {
    background: rgba(38,38,42,0.98);
    border-color: rgba(255,255,255,0.22);
}

/* Settings card */
#pdm-menu {
    position: fixed;
    bottom: 80px;
    right: 24px;
    z-index: 2147483646;
    width: 220px;
    background: rgba(16,16,18,0.97);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 14px 16px 18px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.7);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #e6e6e6;
    /* hide / show */
    opacity: 0;
    transform: translateY(8px) scale(0.97);
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
}
#pdm-menu.pdm-menu-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: all;
}

/* Section label */
.pdm-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(200,200,200,0.45);
    margin: 0 0 8px;
}

/* Divider */
.pdm-divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
    margin: 14px 0;
}

/* THEME row */
.pdm-theme-row {
    display: flex;
    gap: 6px;
}
.pdm-theme-btn {
    flex: 1;
    padding: 7px 0;
    border-radius: 9px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    color: #bbb;
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
    line-height: 1.3;
}
.pdm-theme-btn:hover {
    background: rgba(255,255,255,0.1);
    color: #e6e6e6;
}
.pdm-theme-btn.pdm-active {
    background: rgba(255,255,255,0.14);
    border-color: rgba(255,255,255,0.3);
    color: #fff;
    font-weight: 600;
}

/* ACCENT row */
.pdm-accent-row {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
}
.pdm-accent-dot {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.14s ease, border-color 0.14s ease;
}
.pdm-accent-dot:hover {
    transform: scale(1.18);
}
.pdm-accent-dot.pdm-active {
    border-color: rgba(255,255,255,0.55);
    transform: scale(1.18);
}

/* CONTRAST slider */
.pdm-contrast-row {
    display: flex;
    gap: 5px;
}
.pdm-contrast-btn {
    flex: 1;
    padding: 6px 0;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: #aaa;
    font-size: 11px;
    cursor: pointer;
    text-align: center;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.pdm-contrast-btn:hover {
    background: rgba(255,255,255,0.09);
    color: #e6e6e6;
}
.pdm-contrast-btn.pdm-active {
    background: rgba(255,255,255,0.13);
    border-color: rgba(255,255,255,0.28);
    color: #fff;
    font-weight: 600;
}

/* Close button — pinned to top-right corner of card */
#pdm-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.06);
    color: #aaa;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.14s, color 0.14s;
    padding: 0;
    line-height: 1;
}
#pdm-close:hover {
    background: rgba(255,255,255,0.12);
    color: #fff;
}

/* Toast */
#pdm-toast {
    position: fixed;
    bottom: 80px;
    right: 24px;
    z-index: 2147483645;
    background: rgba(18,18,20,0.95);
    color: #e6e6e6;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 7px 13px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    pointer-events: none;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.2s ease, transform 0.2s ease;
}
#pdm-toast.pdm-show {
    opacity: 1;
    transform: translateY(0);
}

`;
    }  // end buildCSS()

    const StyleManager = {

        inject() {
            this.remove();   // always rebuild from current state
            if (typeof GM_addStyle === 'function') {
                GM_addStyle(buildCSS());
                const styles = document.querySelectorAll('style');
                const el = styles[styles.length - 1];
                if (el) el.id = ID.STYLE;
            } else {
                this._createElement();
            }
        },

        _createElement() {
            const el = document.createElement('style');
            el.id = ID.STYLE;
            el.textContent = buildCSS();
            (document.head || document.documentElement).appendChild(el);
        },

        remove() {
            const el = document.getElementById(ID.STYLE);
            if (el) el.remove();
        },

        apply() {
            const html = document.documentElement;
            if (enabled) {
                html.classList.add(CLS);
                this.inject();
            } else {
                html.classList.remove(CLS);
                this.remove();
            }
        },

        ensureAlive() {
            if (!enabled) return;
            if (!document.getElementById(ID.STYLE)) this._createElement();
            if (!document.documentElement.classList.contains(CLS))
                document.documentElement.classList.add(CLS);
        },

        fixInlineStyles() {
            if (!enabled) return;
            const WHITE = ['rgb(255, 255, 255)', 'rgb(250, 250, 250)', 'rgb(249, 249, 249)'];
            const surface = surfaceFromContrast();
            document.querySelectorAll('*').forEach(el => {
                if (['IMG','VIDEO','CANVAS'].includes(el.tagName)) return;
                const bg = el.style.backgroundColor || el.style.background;
                if (bg && WHITE.some(w => bg.includes(w)))
                    el.style.setProperty('background-color', surface, 'important');
            });
        },

        fixHeader() {
            if (!enabled) return;
            const bg      = bgFromContrast();
            const surface = surfaceFromContrast();
            const sels = [
                'header[role="banner"]', 'nav[role="navigation"]',
                '[data-test-id="header"]',
                '.zCH5','.zI7','.X8m','.CCY','.S9a','.SHI','.ujU',
            ];
            sels.forEach(sel => {
                document.querySelectorAll(sel).forEach(el => {
                    el.style.setProperty('background', `linear-gradient(180deg,${surface},${bg})`, 'important');
                    el.style.setProperty('backdrop-filter', 'blur(20px)', 'important');
                    el.style.setProperty('-webkit-backdrop-filter', 'blur(20px)', 'important');
                });
            });
        },

        fixSearchInputs() {
            if (!enabled) return;
            ['input[type="search"]','input[placeholder*="Search"]','[data-test-id="search-box"]']
                .forEach(sel => {
                    document.querySelectorAll(sel).forEach(el => {
                        el.style.setProperty('background', 'rgba(28,28,30,0.95)', 'important');
                        el.style.setProperty('color', '#e6e6e6', 'important');
                    });
                });
        },
    };

    const Observer = {
        _obs: null, _raf: null,
        start() {
            this._obs = new MutationObserver(() => {
                if (this._raf) return;
                this._raf = requestAnimationFrame(() => {
                    this._raf = null;
                    StyleManager.ensureAlive();
                    StyleManager.fixInlineStyles();
                });
            });
            this._obs.observe(document.documentElement, {
                childList: true, subtree: true,
                attributes: true, attributeFilter: ['style','class'],
            });
        },
        stop() {
            if (this._obs) { this._obs.disconnect(); this._obs = null; }
            if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
        },
    };

    let fixerInterval = null;

    function startFixer() {
        if (fixerInterval) return;
        fixerInterval = setInterval(() => {
            StyleManager.fixHeader();
            StyleManager.fixSearchInputs();
            StyleManager.fixInlineStyles();
        }, 2500);
    }

    function stopFixer() {
        clearInterval(fixerInterval);
        fixerInterval = null;
    }

    function showToast(msg) {
        let t = document.getElementById(ID.TOAST);
        if (!t) {
            t = document.createElement('div');
            t.id = ID.TOAST;
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.classList.add('pdm-show');
        clearTimeout(t._timer);
        t._timer = setTimeout(() => t.classList.remove('pdm-show'), 1800);
    }

    let menuOpen = false;

    function buildMenu() {
        if (document.getElementById(ID.MENU)) return;

        const menu = document.createElement('div');
        menu.id = ID.MENU;

        menu.innerHTML = `

            <!-- CLOSE — absolutely positioned top-right -->
            <button id="pdm-close">✕</button>

            <!-- THEME -->
            <p class="pdm-label">Theme</p>
            <div class="pdm-theme-row">
                <button class="pdm-theme-btn" data-theme="light">☀️<br>Light</button>
                <button class="pdm-theme-btn" data-theme="dark">🌙<br>Dark</button>
            </div>

            <div class="pdm-divider"></div>

            <!-- ACCENT -->
            <p class="pdm-label">Accent colour</p>
            <div class="pdm-accent-row" id="pdm-accent-row"></div>

            <div class="pdm-divider"></div>

            <!-- CONTRAST -->
            <p class="pdm-label">Contrast</p>
            <div class="pdm-contrast-row">
                <button class="pdm-contrast-btn" data-contrast="0">Soft</button>
                <button class="pdm-contrast-btn" data-contrast="1">Mid</button>
                <button class="pdm-contrast-btn" data-contrast="2">AMOLED</button>
            </div>
        `;

        document.body.appendChild(menu);

        // Populate accent dots
        const accentRow = menu.querySelector('#pdm-accent-row');
        ACCENTS.forEach((a, i) => {
            const dot = document.createElement('button');
            dot.className = 'pdm-accent-dot' + (i === accentIndex ? ' pdm-active' : '');
            dot.textContent = a.label;
            dot.title = a.label;
            dot.addEventListener('click', () => setAccent(i));
            accentRow.appendChild(dot);
        });

        // Theme buttons
        menu.querySelectorAll('.pdm-theme-btn').forEach(btn => {
            const t = btn.dataset.theme;
            if ((t === 'dark') === enabled) btn.classList.add('pdm-active');
            btn.addEventListener('click', () => {
                const wantDark = t === 'dark';
                if (enabled !== wantDark) toggleEnabled();
                refreshMenuState();
            });
        });

        // Contrast buttons
        menu.querySelectorAll('.pdm-contrast-btn').forEach(btn => {
            const c = parseInt(btn.dataset.contrast);
            if (c === contrastLevel) btn.classList.add('pdm-active');
            btn.addEventListener('click', () => setContrast(c));
        });

        // Close button
        menu.querySelector('#pdm-close').addEventListener('click', closeMenu);
    }

    function refreshMenuState() {
        const menu = document.getElementById(ID.MENU);
        if (!menu) return;

        // Theme buttons
        menu.querySelectorAll('.pdm-theme-btn').forEach(btn => {
            btn.classList.toggle('pdm-active', (btn.dataset.theme === 'dark') === enabled);
        });

        // Accent dots
        menu.querySelectorAll('.pdm-accent-dot').forEach((dot, i) => {
            dot.classList.toggle('pdm-active', i === accentIndex);
        });

        // Contrast
        menu.querySelectorAll('.pdm-contrast-btn').forEach(btn => {
            btn.classList.toggle('pdm-active', parseInt(btn.dataset.contrast) === contrastLevel);
        });
    }

    function openMenu() {
        buildMenu();
        menuOpen = true;
        document.getElementById(ID.BTN).classList.add('pdm-menu-open');
        requestAnimationFrame(() => {
            document.getElementById(ID.MENU).classList.add('pdm-menu-visible');
        });
    }

    function closeMenu() {
        menuOpen = false;
        const btn  = document.getElementById(ID.BTN);
        const menu = document.getElementById(ID.MENU);
        if (btn)  btn.classList.remove('pdm-menu-open');
        if (menu) menu.classList.remove('pdm-menu-visible');
    }

    function toggleMenu() {
        menuOpen ? closeMenu() : openMenu();
    }

    function toggleEnabled() {
        enabled = !enabled;
        GM_setValue(KEY.ENABLED, enabled);
        StyleManager.apply();
        if (enabled) { startFixer(); Observer.start(); doFixes(); }
        else          { stopFixer(); Observer.stop(); }
        showToast(enabled ? 'Dark mode ON' : 'Dark mode OFF');
    }

    function setAccent(i) {
        accentIndex = i;
        GM_setValue(KEY.ACCENT, i);
        StyleManager.apply();
        refreshMenuState();
    }

    function setContrast(c) {
        contrastLevel = c;
        GM_setValue(KEY.CONTRAST, c);
        StyleManager.apply();
        refreshMenuState();
        if (enabled) doFixes();
    }

    function doFixes() {
        setTimeout(() => {
            StyleManager.fixHeader();
            StyleManager.fixSearchInputs();
            StyleManager.fixInlineStyles();
        }, 120);
    }

    function createButton() {
        if (document.getElementById(ID.BTN)) return;
        const btn = document.createElement('button');
        btn.id = ID.BTN;
        btn.title = 'Pinterest Dark Mode settings';
        btn.textContent = '🌙';
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        document.body.appendChild(btn);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuOpen) return;
        const menu = document.getElementById(ID.MENU);
        const btn  = document.getElementById(ID.BTN);
        if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
            closeMenu();
        }
    });

    window.addEventListener('scroll', () => {
        if (enabled) StyleManager.fixHeader();
    }, { passive: true });

    if (typeof GM_registerMenuCommand === 'function') {
        GM_registerMenuCommand('Pinterest Dark Mode Settings', toggleMenu);
    }

    // Apply CSS immediately before page paint
    StyleManager.apply();

    function onReady() {
        createButton();
        if (enabled) {
            doFixes();
            startFixer();
            Observer.start();
        }
    }

    window.addEventListener('load', () => {
        if (enabled) {
            StyleManager.apply();
            doFixes();
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady, { once: true });
    } else {
        onReady();
    }

})();
