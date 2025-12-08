import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export const enableYjsSync = (editor) => {

  // 1. Create Yjs document
  const ydoc = new Y.Doc();

  // 2. Connect to WebSocket Provider
  const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",       // or your own server
    "grapesjs-room-01",          // room name
    ydoc
  );

  // 3. Shared Yjs maps
  const yComponents = ydoc.getMap("components");
  const yStyles = ydoc.getMap("styles");

  // ========== SYNC COMPONENTS ==========

  // When remote user changes it → update GrapesJS content
  yComponents.observe(() => {
    const json = yComponents.get("data");
    if (json) {
      editor.setComponents(json);
    }
  });

  // When local GrapesJS changes → push to Yjs
  editor.on("component:update", () => {
    yComponents.set("data", editor.getComponents());
  });
  editor.on("component:add", () => {
    yComponents.set("data", editor.getComponents());
  });
  editor.on("component:remove", () => {
    yComponents.set("data", editor.getComponents());
  });

  // ========== SYNC STYLES ==========

  yStyles.observe(() => {
    const json = yStyles.get("data");
    if (json) {
      editor.setStyle(json);
    }
  });

  editor.on("style:change", () => {
    yStyles.set("data", editor.getStyle());
  });

  // ========== YJS CONNECTION LOGS ==========
  provider.on("status", (e) => {
    console.log("Yjs connection:", e.status);  // connected/disconnected
  });

  return provider;
};
