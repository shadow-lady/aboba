
function renderMenu(shadow) {
  const panel = document.createElement("div");
  panel.className = "l9-panel";

  panel.innerHTML = `
    <div class="l9-title">
      <span class="l9-title-text">L9 Plugins</span>
      <button class="l9-collapse" type="button" aria-label="Collapse panel" aria-expanded="true" title="Collapse panel">−</button>
    </div>

    <div class="l9-body" id="panel-body">
      <div class="l9-section">Automation</div>

      <div class="l9-row">
        <input type="checkbox" id="enabled" checked>
        <label for="enabled">Enabled</label>
      </div>

      <div class="l9-row">
        <input type="checkbox" id="duplicates" checked>
        <label for="duplicates">Prevent duplicates</label>
      </div>

      <div class="l9-section">Message</div>

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
    </div>
  `;

  shadow.appendChild(panel);

  const $ = id => panel.querySelector(`#${id}`);

  const collapse = panel.querySelector(".l9-collapse");
  const body = $("panel-body");
  collapse.addEventListener("click", () => {
    const isExpanded = collapse.getAttribute("aria-expanded") === "true";
    collapse.setAttribute("aria-expanded", String(!isExpanded));
    collapse.setAttribute("aria-label", isExpanded ? "Expand panel" : "Collapse panel");
    collapse.title = isExpanded ? "Expand panel" : "Collapse panel";
    collapse.textContent = isExpanded ? "+" : "−";
    body.hidden = isExpanded;
    panel.classList.toggle("l9-collapsed", isExpanded);
  });

  $("execute").addEventListener("click", () => {
    $("status").textContent = "Demo action executed";
  });

  // Draggable title bar
  const title = panel.querySelector(".l9-title");
  let drag = null;

  title.addEventListener("pointerdown", e => {
    if (e.button !== 0 || e.target.closest("button")) return;

    const rect = panel.getBoundingClientRect();

    drag = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    title.setPointerCapture(e.pointerId);
  });

  title.addEventListener("pointermove", e => {
    if (!drag) return;

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
  });

  title.addEventListener("pointerup", () => drag = null);
  title.addEventListener("pointercancel", () => drag = null);
}
