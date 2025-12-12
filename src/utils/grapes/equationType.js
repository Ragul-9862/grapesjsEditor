export const registerEquationType = (editor) => {
  editor.Components.addType("equation", {
    model: {
      defaults: {
        tagName: "div",
        attributes: { class: "equation-block" },
        droppable: false,
        selectable: true,
        editable: false,
        highlightable: true,
        components: `<div class="math-placeholder">Double-click to edit</div>`,
      },
    },
    view: {
      onRender({ el, model }) {
        const latex = model.getAttributes()?.["data-latex"] || "";
        if (latex) {
          el.innerHTML = `<div class="equation-renderer">\\[ ${latex} \\]</div>`;
        }
      },
    }
  });
};
