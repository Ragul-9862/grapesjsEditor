
import { useEffect } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { getYDoc, getEditorStruct } from "../utils/yjsHelpers";

export default function useYjsSync(editorInstance) {

    useEffect(() => {
        if (!editorInstance) return;

        const doc = getYDoc();
        const provider = new WebsocketProvider(
            "wss://your-server",
            "room-1",
            doc
        );

        const { yXmlFragment } = getEditorStruct(doc);

        editorInstance.setModel(yXmlFragment);

        return () => {
            provider.destroy();
            doc.destroy();
        };
    }, [editorInstance]);

}