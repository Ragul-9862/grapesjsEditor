import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";

export function enableYjsLocalSave(editor) {
  const ydoc = new Y.Doc();
  const provider = new IndexeddbPersistence("grapesjs-local-data", ydoc);

  const yContent = ydoc.getText("html");

  // --- Safe parse function ---
  const safeParse = (str) => {
    if (!str || str.trim() === "") return null;
    try {
      return JSON.parse(str);
    } catch (e) {
      console.warn("Invalid JSON, clearing corrupted data");
      return null;
    }
  };

  // ---------- LOAD SAVED DATA ----------
  provider.whenSynced.then(() => {
    const saved = safeParse(yContent.toString());

    if (saved) {
      if (saved.html) editor.setComponents(saved.html);
      if (saved.css) editor.setStyle(saved.css);
    }
  });

  // ----------- EDITOR → YJS (SAVE) -----------
  editor.on("update", () => {
    const html = editor.getHtml();
    const css = editor.getCss();

    const json = JSON.stringify({ html, css });

    yContent.delete(0, yContent.length);
    yContent.insert(0, json);
  });

  // ----------- YJS → EDITOR (LIVE UPDATE) -----------
  yContent.observe(() => {
    const saved = safeParse(yContent.toString());
    if (!saved) return;

    const currentHtml = editor.getHtml();
    if (currentHtml !== saved.html) editor.setComponents(saved.html);

    const currentCss = editor.getCss();
    if (currentCss !== saved.css) editor.setStyle(saved.css);
  });

  console.log("Yjs Local Save Enabled");
}
