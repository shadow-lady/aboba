function renderMenu(shadow) {
  const panel = document.createElement("div");
  panel.className = "panel";

  panel.innerHTML = `
    <h3>L9 Plugins</h3>
    <p id="status">Ready</p>

    <button id="test-action">
      Test Action
    </button>
  `;

  shadow.appendChild(panel);

  const status = panel.querySelector("#status");
  const button = panel.querySelector("#test-action");

  button.addEventListener("click", () => {
    status.textContent = "Test action executed!";
    console.log("[L9 Plugins] Test action clicked");
  });
}
