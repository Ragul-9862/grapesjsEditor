import useMathEditor from "../../hooks/useMathEditor";
import MathEditorUI from "./MathEditorUI";

const MathEditor = () => {
  const {
    showModal,
    closeModal,
    mathfieldRef,
    activeTab,
    setActiveTab,
    tabs,
    symbols,
    handleInsert,
    insertLatexIntoCanvas,
  } = useMathEditor();

  if (!showModal) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">Math Editor</h5>
            <button className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">

            {/* MathField */}
            <div ref={mathfieldRef} className="mathfield-box mb-3"></div>

            {/* Tabs + Insert Buttons */}
            <MathEditorUI
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              items={symbols.find((s) => s.category === activeTab)?.items || []}
              onInsert={handleInsert}
            />
          </div>
          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-success" onClick={insertLatexIntoCanvas}>
              Insert into Canvas
            </button>
            <button className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MathEditor;
