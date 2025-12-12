// src/plugins/rulerPlugin.js
import gjsRulers from "grapesjs-rulers";
import "grapesjs-rulers/dist/grapesjs-rulers.min.css";
import rulerConfig from "../utils/rulers/rulerConfig";

const rulerPlugin = (editor, opts = {}) => {
  const options = { ...rulerConfig, ...opts };
  let rulersInstance = null;

  editor.on("canvas:frame:load", () => {
    const frameEl = editor.Canvas.getFrameEl();

    if (!frameEl) {
      console.error("Canvas frame not found");
      return;
    }

    // Attach rulers after frame exists
    rulersInstance = gjsRulers(editor, {
      ...options,
      container: frameEl.parentNode, 
    });

    // Save API for toggle
    editor.getRulerState = () => rulersInstance?.isVisible() ?? false;
    editor.setRulerState = (v) => rulersInstance?.setVisible(v);
  });

  editor.Commands.add("ruler-visibility", {
    run(ed) {
      if (!rulersInstance) return;
      ed.setRulerState(!ed.getRulerState());
    },
  });


  editor.Panels.addButton("options", {
    id: "ruler-visibility",
    active: true,
    attributes: { title: "Toggle Rulers" },
    command: "ruler-visibility",
    label: `
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path fill="currentColor" d="M0 8h16v1H0z"/>
      </svg>
    `,
  });

  editor.on("canvas:zoom", ({ zoom }) => {
    rulersInstance?.setZoom(zoom);
  });


  editor.on("canvas:scroll", ({ x, y }) => {
    rulersInstance?.setScroll({ x, y });
  });
};

export default rulerPlugin;
