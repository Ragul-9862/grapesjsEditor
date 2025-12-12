import { useEffect, useRef, useState } from "react";
import { MathfieldElement, renderMathInElement } from "mathlive";
import { useEditor } from "../context/EditorProvider";
import mathData from "../utils/math";

export default function useMathEditor() {
  const { showModal, latex, setLatex, setShowModal, selectedComponent } = useEditor();

  const mathfieldRef = useRef(null);
  const [activeTab, setActiveTab] = useState(mathData[0].category);

  // Initialize Mathfield when modal opens
  useEffect(() => {
    if (showModal) {
      const mf = new MathfieldElement({
        virtualKeyboardMode: "manual",
        virtualKeyboardTheme: "material",
      });

      mf.value = latex;
      mf.addEventListener("input", () => setLatex(mf.value));

      if (mathfieldRef.current) {
        mathfieldRef.current.innerHTML = "";
        mathfieldRef.current.appendChild(mf);
      }
    }
  }, [showModal]);

  const closeModal = () => setShowModal(false);

  const handleInsert = (latexCmd) => {
    const mf = mathfieldRef.current?.firstChild;
    if (!mf) return;
    mf.insert(latexCmd);
    setLatex(mf.getValue());
  };

  const insertLatexIntoCanvas = () => {
    if (!selectedComponent) return alert("Select a layer first!");

    const id = `math-${Date.now()}`;

    selectedComponent.set(
      "content",
      `<span id="${id}">${latex}</span>`
    );

    selectedComponent.addAttributes({ latex });

    setTimeout(() => {
      renderMathInElement(document.getElementById(id));
    }, 10);

    closeModal();
  };

  return {
    activeTab,
    setActiveTab,
    mathfieldRef,
    handleInsert,
    insertLatexIntoCanvas,
    showModal,
    closeModal,
    tabs: mathData.map((m) => m.category),
    symbols: mathData,
  };
}
