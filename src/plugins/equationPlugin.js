const equationPlugin = (editor) => {
  editor.Components.addType("equation", {
    model: {
      defaults: {
        tagName: "div",
        attributes: { class: "equation-block" },
        droppable: false,
        selectable: true,
        editable: false,
        copyable: true,
        highlightable: true,
        components: `<div class="math-placeholder" contenteditable="false">Double-click or drop to edit equation</div>`,
      },
    },
    view: {
      onRender({ el, model }) {
        const attr = model.getAttributes() || {};
        if (attr["data-latex"]) {
          el.innerHTML = `<div class="equation-renderer" data-latex="${attr["data-latex"]}">
            \[ ${attr["data-latex"]} \]
          </div>`;
        }
      },
    },
  });

  const openEquationModal = (component) => {
    const existing =
      (component.getAttributes && component.getAttributes()["data-latex"]) || "";
    if (window.__EDITOR_CTX__) {
      window.__EDITOR_CTX__.openModal(component, existing);
    }
  };

  editor.on("component:add", (component) => {
    if (
      component.get("type") === "equation" ||
      component.attributes?.attributes?.["data-block-id"] === "equation-block"
    ) {
      openEquationModal(component);
    }
  });

  editor.on("component:dblclick", (component) => {
    if (component.get("type") === "equation") openEquationModal(component);
  });
};

export default equationPlugin;
