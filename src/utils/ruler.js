import rulers from "grapesjs-rulers";

export default {
  plugin: rulers,
  options: {
    rulerHeight: 20,
    fontSize: "10px",
    strokeStyle: "#ff0000",   
    lineWidth: 1,
    sides: ["top", "left"],
    enableMouseTracking: true,
    enableToolTip: true
  }
};
