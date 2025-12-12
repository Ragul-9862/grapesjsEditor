import presetWebpage from "grapesjs-preset-webpage";
import scriptEditor from "grapesjs-script-editor";
import rulers from "grapesjs-rulers";
import graphEditor from "../../components/graph/jsxgraph-utils";
import rulerConfig from "./rulerConfig";

export const editorPlugins = [
  presetWebpage,
  scriptEditor,
  (editor) => rulers(editor, rulerConfig.options),
  graphEditor,
];

export const editorPluginOpts = {
  "gjs-rulers": rulerConfig.options,
  "grapesjs-preset-webpage": { skip: ["text-section", "link-block", "basic-blocks"] },
};
