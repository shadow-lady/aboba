
function renderMenu(shadow) {
  const panel = document.createElement("div");
  panel.className = "l9-panel";

  panel.innerHTML = `
    <button class="l9-launcher" type="button" aria-label="Open L9 Plugins" hidden>L9</button>
    <div class="l9-window">
    <div class="l9-title">
      <span class="l9-title-text">L9 Plugins</span>
      <button class="l9-collapse" type="button" aria-label="Collapse panel" aria-expanded="true" title="Collapse panel">−</button>
    </div>

    <div class="l9-body" id="panel-body">
      <div class="l9-tabs" role="tablist" aria-label="Panel views">
        <button class="l9-tab l9-tab-active" id="tab-terminal" type="button" role="tab" aria-selected="true" aria-controls="view-terminal">Terminal</button>
        <button class="l9-tab" id="tab-test" type="button" role="tab" aria-selected="false" aria-controls="view-test">Test</button>
      </div>

      <section class="l9-view" id="view-test" role="tabpanel" aria-labelledby="tab-test" hidden>
      <div class="l9-section">Autosex</div>

      <div class="l9-row">
        <input type="checkbox" id="enabled" checked>
        <label for="enabled">Enabled</label>
      </div>

      <div class="l9-section">Horny SMS</div>

      <div class="l9-row">
        <label for="source">Source</label>
        <input type="text" id="source" placeholder="Source ID">
      </div>

      <div class="l9-row">
        <label for="message">Text</label>
        <textarea id="message" placeholder="Message..."></textarea>
      </div>

      <button id="execute">Execute</button>
      <div class="l9-status" id="status">Ready</div>
      </section>

      <section class="l9-view l9-terminal-view" id="view-terminal" role="tabpanel" aria-labelledby="tab-terminal">
        <textarea class="l9-terminal" aria-label="Terminal output" spellcheck="false" readonly>If you read this - you are noob.</textarea>
      </section>
    </div>
    </div>
  `;

  shadow.appendChild(panel);

  const $ = id => panel.querySelector(`#${id}`);

  const tabs = [...panel.querySelectorAll(".l9-tab")];
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.classList.toggle("l9-tab-active", selected);
      item.setAttribute("aria-selected", String(selected));
      panel.querySelector(`#${item.getAttribute("aria-controls")}`).hidden = !selected;
    });
  }));

  const windowPanel = panel.querySelector(".l9-window");
  const launcher = panel.querySelector(".l9-launcher");
  const collapse = panel.querySelector(".l9-collapse");
  const body = $("panel-body");
  const setCollapsed = collapsed => {
    panel.classList.toggle("l9-collapsed", collapsed);
    launcher.hidden = !collapsed;
    windowPanel.hidden = collapsed;
  };

  collapse.addEventListener("click", () => {
    const isExpanded = collapse.getAttribute("aria-expanded") === "true";
    collapse.setAttribute("aria-expanded", String(!isExpanded));
    collapse.setAttribute("aria-label", isExpanded ? "Expand panel" : "Collapse panel");
    collapse.title = isExpanded ? "Expand panel" : "Collapse panel";
    collapse.textContent = isExpanded ? "+" : "−";
    body.hidden = false;
    setCollapsed(isExpanded);
  });

  launcher.addEventListener("click", () => {
    collapse.setAttribute("aria-expanded", "true");
    collapse.setAttribute("aria-label", "Collapse panel");
    collapse.title = "Collapse panel";
    collapse.textContent = "−";
    setCollapsed(false);
  });

  $("execute").addEventListener("click", () => {
    $("status").textContent = "Demo action executed";
  });

  // Draggable title bar
  const title = panel.querySelector(".l9-title");
  let drag = null;
  let moved = false;

  const startDrag = (target, e) => {
    if (e.button !== 0 || (target === title && e.target.closest("button"))) return;

    const rect = panel.getBoundingClientRect();

    drag = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      startX: e.clientX,
      startY: e.clientY,
      pointerId: e.pointerId
    };

    moved = false;
    target.setPointerCapture(e.pointerId);
  };

  const moveDrag = e => {
    if (!drag || drag.pointerId !== e.pointerId) return;
    if (Math.abs(e.clientX - drag.startX) + Math.abs(e.clientY - drag.startY) > 4) moved = true;

    const x = Math.max(0, Math.min(
      e.clientX - drag.x,
      Math.max(0, innerWidth - panel.offsetWidth)
    ));

    const y = Math.max(0, Math.min(
      e.clientY - drag.y,
      Math.max(0, innerHeight - panel.offsetHeight)
    ));

    panel.style.left = `${x}px`;
    panel.style.top = `${y}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
  };

  const endDrag = () => { drag = null; };

  title.addEventListener("pointerdown", e => startDrag(title, e));
  title.addEventListener("pointermove", moveDrag);
  title.addEventListener("pointerup", endDrag);
  title.addEventListener("pointercancel", endDrag);

  launcher.addEventListener("pointerdown", e => startDrag(launcher, e));
  launcher.addEventListener("pointermove", moveDrag);
  launcher.addEventListener("pointerup", endDrag);
  launcher.addEventListener("pointercancel", endDrag);
  launcher.addEventListener("click", e => {
    if (moved) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }, true);
}
