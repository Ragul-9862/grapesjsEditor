import { registerGraphBlock } from "../hooks/useGraphEditor";

const graphEditorPlugin = (editor) => {
  registerGraphBlock(editor);
};

export default graphEditorPlugin;
