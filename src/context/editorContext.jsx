import React, { createContext, useContext, useEffect, useState } from "react";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [latex, setLatex] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    window.__EDITOR_CTX__ = {
      openModal: (cmp, initialLatex = "") => {
        setSelectedComponent(cmp);
        setLatex(initialLatex);
        setShowModal(true);
      },
      closeModal: () => {
        setSelectedComponent(null);
        setShowModal(false);
      },
      updateLatex: (value) => setLatex(value),
    };

    return () => delete window.__EDITOR_CTX__;
  }, []);

  return (
    <EditorContext.Provider
      value={{
        showModal,
        setShowModal,
        latex,
        setLatex,
        selectedComponent,
        setSelectedComponent,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
export default EditorContext;
