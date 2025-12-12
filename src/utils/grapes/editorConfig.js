export const editorConfig = {
  container: ".layout-body",
  noticeOnUnload: false,
  fromElement: false,
  storageManager: false,

  styleManager: {
    sectors: [
      {
        name: "Dimension",
        buildProps: ["width", "height"],
        properties: [
          { property: "width", type: "number", units: ["px", "%", "em", "rem", "vw"], default: "595px" },
          { property: "height", type: "number", units: ["px", "%", "em", "rem", "vh"], default: "482px" },
        ]
      }
    ]
  },

  canvas: {
    styles: [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      `
        body {
          width: 595px !important;
          height: 482px !important;
          margin: 0 auto;
          background: #fff;
          border: 1px solid #ddd;
          overflow: hidden;
        }
      `,
    ],
  },
};
