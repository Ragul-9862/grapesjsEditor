import "../assets/jsxgraph.css";
import { createScaleText } from "../utils/graph/createScaleText";

export const registerGraphBlock = (editor) => {
  editor.Components.addType("graph-block", {
    model: {
      defaults: {
        tagName: "div",
        droppable: false,
        selectable: true,
        attributes: { class: "graph-editor-wrapper" },
        xMin: -10,
        xMax: 10,
        yMin: -10,
        yMax: 10,
        xScaleText: 2,
        yScaleText: 2,
        showScale: true,
        showCoords: true,
        xGridDistance: 1,
        yGridDistance: 1,
        xSubGridMultiplier: 3,
        ySubGridMultiplier: 3,
        components: `
          <div style="position:relative; user-select: none;">
            <div class="coord-inputs" 
              style="position:absolute; top:5px; right:5px; z-index:999; background:#fff; padding:6px 8px; border-radius:4px; border:1px solid #ddd; font-size:12px; display:block;">
              X: <input type="number" step="0.1" class="input-x" style="width:60px; margin-right:6px;">
              Y: <input type="number" step="0.1" class="input-y" style="width:60px;">
            </div>
            <div class="scale-inputs" 
              style="position:absolute; top:50px; right:5px; z-index:999; background:#fff; padding:6px 8px; border-radius:4px; border:1px solid #ddd; font-size:12px; display:block;">
              <div style="margin-bottom:4px;">X Scale (1cm=): <input type="number" step="0.5" min="0.1" class="input-x-scale" style="width:60px;"></div>
              <div>Y Scale (1cm=): <input type="number" step="0.5" min="0.1" class="input-y-scale" style="width:60px;"></div>
            </div>
            <div class="graph-box" style="width:500px; height:500px; border:1px solid #ccc; touch-action:none;"></div>
          </div>
        `
      },
      init() {
        // Add traits for GrapesJS settings panel
        this.addTrait([
          { type: 'header', label: 'Graph Quadrants/Units', attributes: { style: 'margin-bottom:5px;' } },
          { type: 'number', label: 'X Min', name: 'xMin', min: -100, max: 0, step: 1, changeProp: 1 },
          { type: 'number', label: 'X Max', name: 'xMax', min: 0, max: 100, step: 1, changeProp: 1 },
          { type: 'number', label: 'Y Min', name: 'yMin', min: -100, max: 0, step: 1, changeProp: 1 },
          { type: 'number', label: 'Y Max', name: 'yMax', min: 0, max: 100, step: 1, changeProp: 1 },
          { type: 'header', label: 'Grid Line Step', attributes: { style: 'margin-top:15px; margin-bottom:5px;' } },
          { type: 'number', label: 'X Major Grid Distance', name: 'xGridDistance', min: 0.1, step: 0.5, changeProp: 1 },
          { type: 'number', label: 'Y Major Grid Distance', name: 'yGridDistance', min: 0.1, step: 0.5, changeProp: 1 },
          { type: 'number', label: 'X Sub-Grid Multiplier', name: 'xSubGridMultiplier', min: 1, step: 1, changeProp: 1 },
          { type: 'number', label: 'Y Sub-Grid Multiplier', name: 'ySubGridMultiplier', min: 1, step: 1, changeProp: 1 },
          { type: 'header', label: 'Axis Tick & Scale Value', attributes: { style: 'margin-top:15px; margin-bottom:5px;' } },
          { type: 'number', label: 'X Scale Value', name: 'xScaleText', min: 0.1, step: 0.5, changeProp: 1 },
          { type: 'number', label: 'Y Scale Value', name: 'yScaleText', min: 0.1, step: 0.5, changeProp: 1 },
          { type: 'header', label: 'Visibility Settings', attributes: { style: 'margin-top:15px; margin-bottom:5px;' } },
          { type: 'checkbox', label: 'Show Scale Text', name: 'showScale', changeProp: 1 },
          { type: 'checkbox', label: 'Show Coord Inputs', name: 'showCoords', changeProp: 1 },
        ]);

        this.on('change:xMin change:xMax change:yMin change:yMax change:xScaleText change:yScaleText change:showScale change:showCoords change:xGridDistance change:yGridDistance change:xSubGridMultiplier change:ySubGridMultiplier', this.view.render);
      }
    },
    view: {
      onRender() {
        const model = this.model;
        const wrapper = this.el;
        const el = wrapper.querySelector(".graph-box");
        if (!el || el.__mounted) return;
        el.__mounted = true;

        const xMin = model.get('xMin'), xMax = model.get('xMax');
        const yMin = model.get('yMin'), yMax = model.get('yMax');
        const xScaleValue = Number(model.get('xScaleText')) || 1;
        const yScaleValue = Number(model.get('yScaleText')) || 1;
        const finalGridX = model.get('xGridDistance') / model.get('xSubGridMultiplier');
        const finalGridY = model.get('yGridDistance') / model.get('ySubGridMultiplier');

        // Initialize JSXGraph
        const board = JXG.JSXGraph.initBoard(el, {
          boundingbox: [xMin, yMax, xMax, yMin],
          axis: true,
          grid: { majorStep: [finalGridX, finalGridY], strokeColor: '#ccc', strokeOpacity: 0.7, strokeWidth: 0.5, dash: 2 },
          showNavigation: true,
          showCopyright: false,
          defaultAxes: {
            x: { ticks: { majorHeight: -1, drawLabels: true, label: { offset: [0,-15] }, strokeColor: 'gray', dash: 2, ticksDistance: xScaleValue } },
            y: { ticks: { majorHeight: -1, drawLabels: true, label: { offset: [-15,0] }, strokeColor: 'gray', dash: 2, ticksDistance: yScaleValue } },
          },
          zoom: { factorX: 1.2, factorY: 1.2, wheel: true, pinch: true },
          pan: { enabled: true, needShift: false },
        });

        const p = board.create('point', [1,1], { name:'A', size:4, strokeColor:'red', fillColor:'red' });

        if (model.get('showScale')) createScaleText(board, model);

        el.__board = board;
      }
    }
  });

  // Add GrapesJS block
  editor.BlockManager.add("graph-editor", {
    label: "Graph Editor",
    category: "Insert",
    content: { type: "graph-block" }
  });
};
