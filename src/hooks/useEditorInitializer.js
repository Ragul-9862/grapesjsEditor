import { useEffect } from "react";
import initEditor from "../utils/useInitEditor"

export default function useEditorInitializer() {
  useEffect(() => {
    initEditor();   
  }, []);
}
