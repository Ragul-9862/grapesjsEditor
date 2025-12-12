/*
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export const enableYjsSync = (editor) => {
  const ydoc = new Y.Doc();

  const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    "grapesjs-room-01",
    ydoc
  );

  const yComponents = ydoc.getMap("components");
  const yStyles = ydoc.getMap("styles");

  yComponents.observe(() => {
    const json = yComponents.get("data");
    if (json) editor.setComponents(json);
  });

  editor.on("update", () =>
    yComponents.set("data", editor.getHtml())
  );

  yStyles.observe(() => {
    const json = yStyles.get("data");
    if (json) editor.setStyle(json);
  });

  editor.on("style:change", () =>
    yStyles.set("data", editor.getCss())
  );

  provider.on("status", (e) => {
    console.log("Yjs connection:", e.status);
  });

  return provider;
};
*/
