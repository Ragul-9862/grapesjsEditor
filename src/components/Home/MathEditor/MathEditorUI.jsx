const MathEditorUI = ({ tabs, activeTab, setActiveTab, items, onInsert }) => {
  return (
    <>
      <div className="nav nav-tabs mb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn btn-sm me-2 ${
              activeTab === tab ? "btn-primary" : "btn-outline-secondary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="d-flex flex-wrap gap-2">
        {items.map((item, i) => (
          <button
            key={i}
            className="btn btn-outline-dark btn-sm"
            onClick={() => onInsert(item.insert)}
            dangerouslySetInnerHTML={{ __html: item.label }}
          />
        ))}
      </div>
    </>
  );
};

export default MathEditorUI;
