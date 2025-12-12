import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";

export function enableYjsLocalSave(editor) {
  const ydoc = new Y.Doc();
  const provider = new IndexeddbPersistence("grapesjs-local-data", ydoc);

  const yContent = ydoc.getText("gjs-json");

  const safeParse = (str) => {
    try {
      return str ? JSON.parse(str) : null;
    } catch {
      return null;
    }
  };

  const sanitizeHtml = (html) =>
    html.replace(/data-gjs-type="yjs-collab"/g, "");

  provider.whenSynced.then(() => {
    let saved = safeParse(yContent.toString());
    if (!saved) return;

    if (saved.html) {
      saved.html = sanitizeHtml(saved.html);
      editor.setComponents(saved.html);
    }

    if (saved.css) editor.setStyle(saved.css);
  });

  const updateStore = () => {
    const html = sanitizeHtml(editor.getHtml());
    const css = editor.getCss();

    const data = JSON.stringify({ html, css });

    yContent.delete(0, yContent.length);
    yContent.insert(0, data);
  };

  editor.on("update", updateStore);
  editor.on("component:add", updateStore);
  editor.on("component:remove", updateStore);
  editor.on("style:change", updateStore);

  // External changes (future-proof)
  yContent.observe(() => {
    const saved = safeParse(yContent.toString());
    if (!saved) return;

    const cleanHTML = sanitizeHtml(saved.html || "");

    if (editor.getHtml() !== cleanHTML)
      editor.setComponents(cleanHTML);

    if (saved.css && editor.getCss() !== saved.css)
      editor.setStyle(saved.css);
  });
}
