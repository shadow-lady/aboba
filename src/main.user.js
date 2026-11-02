// ==UserScript==
// @name         L9 Plugins
// @namespace    https://client.work-zilla.com/
// @version      0.104.0
// @description  L9 automation toolkit
// @match        https://client.work-zilla.com/*
// @run-at       document-idle
//
// @updateURL    https://raw.githubusercontent.com/shadow-lady/aboba/main/src/main.user.js
// @downloadURL  https://raw.githubusercontent.com/shadow-lady/aboba/main/src/main.user.js
//
// @require      https://raw.githubusercontent.com/shadow-lady/aboba/main/src/ui.js
// @resource     appCSS https://raw.githubusercontent.com/shadow-lady/aboba/main/src/styles.css
//
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(() => {
    "use strict";

    if (document.getElementById("l9-plugins-root")) {
        return;
    }

    const host = document.createElement("div");
    host.id = "l9-plugins-root";

    Object.assign(host.style, {
        position: "fixed",
        right: "24px",
        bottom: "24px",
        zIndex: "2147483647",
    });

    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = GM_getResourceText("appCSS");

    shadow.appendChild(style);

    try {
        renderMenu(shadow);
        console.log("[L9 Plugins] Initialized");
    } catch (error) {
        host.remove();
        console.error("[L9 Plugins] Initialization failed:", error);
    }
})();
