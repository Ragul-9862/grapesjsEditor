
export const addEditorButtons = (editor) => {
  const pn = editor.Panels;
  const panelTop = pn.addPanel({ id: "options" });

  // Add buttons
  panelTop.get("buttons").add([
    {
      id: "save-project",
      attributes: { title: "Save Project" },
      command: "save-project",
      label: "💾",
    },
    {
      id: "export-project",
      attributes: { title: "Export Project" },
      command: "export-project",
      label: "📤",
    },
    {
      id: "import-project",
      attributes: { title: "Import Project" },
      command: "import-project",
      label: "📥",
    },
  ]);

  const cmd = editor.Commands;

  // Save command
  cmd.add("save-project", {
    run() {
      alert("Project Saved!");
    },
  });

  // Export command
  cmd.add("export-project", {
    run(editor) {
      const html = editor.getHtml();
      const css = editor.getCss();
      const data = { html, css };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "grapesjs-project.json";
      a.click();
    },
  });

  // Import command
  cmd.add("import-project", {
    run(editor) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";

      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const text = await file.text();
        const json = JSON.parse(text);

        if (json.html) editor.setComponents(json.html);
        if (json.css) editor.setStyle(json.css);
      };

      input.click();
    },
  });
};
