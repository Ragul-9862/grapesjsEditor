// src/hooks/useRuler.js
import { useEffect } from "react";
import rulers from "grapesjs-rulers";
import rulerConfig from "../utils/rulers/rulerConfig";

const useRuler = (editor) => {
    useEffect(() => {
        if (!editor) return;

        // Initialize ruler plugin
        rulers(editor, rulerConfig);

        // Optional: add toggle command
        editor.Commands.add("ruler-visibility", {
            run(editor) {
                const rulerState = editor.getRulerState?.() || false;
                editor.setRulerState && editor.setRulerState(!rulerState);
            },
        });
    }, [editor]);
};

export default useRuler;
