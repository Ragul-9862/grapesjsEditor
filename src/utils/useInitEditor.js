import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-rulers/dist/grapesjs-rulers.min.css";

import presetWebpage from "grapesjs-preset-webpage";
import scriptEditor from "grapesjs-script-editor";

import blocks, { fileMenuItems } from "../utils/blocks/blocks";

import graphEditorPlugin from "../plugins/graphEditorPlugin";
import equationPlugin from "../plugins/equationPlugin";
import rulerPlugin from "../plugins/rulerPlugin";

import { enableYjsLocalSave } from "../utils/yjs/enableYjsLocalSave";
import { addEditorButtons } from "../utils/buttons/editorButtons";

let editorInstance = null;

const initEditor = () => {
  if (editorInstance) return editorInstance;

  editorInstance = grapesjs.init({
    container: ".layout-body",
    noticeOnUnload: false,
    storageManager: false,
    fromElement: false,

    styleManager: {
      sectors: [
        {
          name: "Dimension",
          buildProps: ["width", "height"],
          properties: [
            { property: "width", type: "number", units: ["px", "%"], default: "595px" },
            { property: "height", type: "number", units: ["px", "%"], default: "482px" },
          ],
        },
      ],
    },

    canvas: {
      styles: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
        `
          body {
            width: 595px !important;
            height: 482px !important;
            margin: 0 auto;
            background: #fff;
          }
        `,
      ],
    },

    plugins: [
      presetWebpage,
      scriptEditor,
      rulerPlugin,
      graphEditorPlugin,
      equationPlugin,
    ],

    pluginsOpts: {
      "grapesjs-preset-webpage": {
        skip: ["text-section", "link-block", "basic-blocks"],
      },
    },

    blockManager: {
      appendTo: "#blocks",
      fileMenuItems,
      blocks,
    },

    panels: { defaults: [] },
  });


  addEditorButtons(editorInstance);


  setTimeout(() => enableYjsLocalSave(editorInstance), 200);

  return editorInstance;
};

export default initEditor;
