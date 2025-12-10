import "../../assets/jsxgraph.css";


function createScaleText(board, model) {
  
    const scaleX = () => board.getBoundingBox()[2] * 0.95; 
    const scaleY = () => board.getBoundingBox()[1] * 0.95; 

    const xScaleValue = Number(model.get('xScaleText')) || 1;
    const yScaleValue = Number(model.get('yScaleText')) || 1;

    board.create('text', [
        scaleX,
        scaleY,
       
        () =>
            `<div style="padding: 5px 15px;">` +
            `Scale<br>` +
            `X axis 1cm = ${xScaleValue.toFixed(2)} unit(s)<br>` +
            `Y axis 1cm = ${yScaleValue.toFixed(2)} unit(s)` +
            `</div>`
    ], {
        fontSize: 12,
        anchorX: 'right',
        anchorY: 'top',
        name: 'scaleDisplay',
      
        strokeColor: "black",
        layer: 9,
        display: 'html', 
        cssStyle: `
            background-color: rgb(240 240 240 / 40%);
    border: 1px solid rgb(102 102 102 / 58%);
            padding: 5px 15px !important; /* Retaining !important to force padding */
            border-radius: 3px;
            pointer-events: none;
            margin: 5px; 
            min-width: 150px; 
            text-align: left;
            /* Ensure box model is standard */
            box-sizing: border-box; 
        `,
    });
}

export default function graphEditor(editorInstance) {
    editorInstance.Components.addType("graph-block", {
        model: {
            defaults: {
                tagName: "div",
                droppable: false,
                selectable: true,
                attributes: { class: "graph-editor-wrapper" },
                // Store graph configuration in the model
                xMin: -10,
                xMax: 10,
                yMin: -10,
                yMax: 10,
                xScaleText: 2, // Controls both axis ticks and scale display
                yScaleText: 2, // Controls both axis ticks and scale display
                showScale: true,
                showCoords: true,
                xGridDistance: 1,
                yGridDistance: 1,
                xSubGridMultiplier: 3,
                ySubGridMultiplier: 3,

                // Component HTML structure
                components: `
                    <div style="position:relative; user-select: none;">
                        
                        <div class="coord-inputs" 
                             style="position:absolute; top:5px; right:5px; z-index:999; background:#fff; padding:6px 8px; border-radius:4px; border:1px solid #ddd; font-size:12px; display:block;">
                            X: <input type="number" step="0.1" class="input-x" style="width:60px; margin-right:6px;">
                            Y: <input type="number" step="0.1" class="input-y" style="width:60px;">
                        </div>
                        
                        <div class="scale-inputs" 
                             style="position:absolute; top:50px; right:5px; z-index:999; background:#fff; padding:6px 8px; border-radius:4px; border:1px solid #ddd; font-size:12px; display:block;">
                            <div style="margin-bottom: 4px;">X Scale (1cm=): <input type="number" step="0.5" min="0.1" class="input-x-scale" style="width:60px;"></div>
                            <div>Y Scale (1cm=): <input type="number" step="0.5" min="0.1" class="input-y-scale" style="width:60px;"></div>
                        </div>
                        
                        <div class="graph-box" style="width:500px; height:500px; border:1px solid #ccc; touch-action: none;"></div>
                    </div>
                `
            },

            // -------------------------------------
            // 2. Add Settings Panel (Traits)
            // -------------------------------------
            init() {
                this.addTrait([
                    {
                        type: 'header',
                        label: 'Graph Quadrants/Units',
                        attributes: { style: 'margin-bottom: 5px;' }
                    },
                    {
                        type: 'number',
                        label: 'X Min (X\')',
                        name: 'xMin',
                        min: -100,
                        max: 0,
                        step: 1,
                        changeProp: 1
                    },
                    {
                        type: 'number',
                        label: 'X Max (X)',
                        name: 'xMax',
                        min: 0,
                        max: 100,
                        step: 1,
                        changeProp: 1
                    },
                    {
                        type: 'number',
                        label: 'Y Min (Y\')',
                        name: 'yMin',
                        min: -100,
                        max: 0,
                        step: 1,
                        changeProp: 1
                    },
                    {
                        type: 'number',
                        label: 'Y Max (Y)',
                        name: 'yMax',
                        min: 0,
                        max: 100,
                        step: 1,
                        changeProp: 1
                    },

                    {
                        type: 'header',
                        label: 'Grid Line Step',
                        attributes: { style: 'margin-top: 15px; margin-bottom: 5px;' }
                    },
                    {
                        type: 'number',
                        label: 'X Major Grid Distance',
                        name: 'xGridDistance',
                        min: 0.1,
                        step: 0.5,
                        changeProp: 1
                    },
                    {
                        type: 'number',
                        label: 'Y Major Grid Distance',
                        name: 'yGridDistance',
                        min: 0.1,
                        step: 0.5,
                        changeProp: 1
                    },
                    {
                        type: 'number',
                        label: 'X Sub-Grid Multiplier',
                        name: 'xSubGridMultiplier',
                        min: 1,
                        step: 1,
                        changeProp: 1,
                        help: 'e.g., 3 means 2 extra lines (1/3 unit spacing)'
                    },
                    {
                        type: 'number',
                        label: 'Y Sub-Grid Multiplier',
                        name: 'ySubGridMultiplier',
                        min: 1,
                        step: 1,
                        changeProp: 1,
                        help: 'e.g., 3 means 2 extra lines (1/3 unit spacing)'
                    },

                    {
                        type: 'header',
                        label: 'Axis Tick & Scale Value',
                        attributes: { style: 'margin-top: 15px; margin-bottom: 5px;' }
                    },
                    {
                        type: 'number',
                        label: 'X Scale Value (1cm=)',
                        name: 'xScaleText',
                        min: 0.1,
                        step: 0.5,
                        changeProp: 1,
                        help: 'Controls axis tick label distance and scale display'
                    },
                    {
                        type: 'number',
                        label: 'Y Scale Value (1cm=)',
                        name: 'yScaleText',
                        min: 0.1,
                        step: 0.5,
                        changeProp: 1,
                        help: 'Controls axis tick label distance and scale display'
                    },

                    {
                        type: 'header',
                        label: 'Visibility Settings',
                        attributes: { style: 'margin-top: 15px; margin-bottom: 5px;' }
                    },
                    {
                        type: 'checkbox',
                        label: 'Show Scale Text',
                        name: 'showScale',
                        changeProp: 1
                    },
                    {
                        type: 'checkbox',
                        label: 'Show Coord Inputs',
                        name: 'showCoords',
                        changeProp: 1
                    },
                ]);

                // Update listener to include all properties
                this.on('change:xMin change:xMax change:yMin change:yMax change:xScaleText change:yScaleText change:showScale change:showCoords change:xGridDistance change:yGridDistance change:xSubGridMultiplier change:ySubGridMultiplier', this.handlePropertyChange);
            },

            // Method to handle property changes and update the view
            handlePropertyChange() {
                this.view.render();
            }
        },

        view: {
            onRender() {
                const model = this.model;
                const wrapper = this.el;
                const el = wrapper.querySelector(".graph-box");
                const inputX = wrapper.querySelector(".input-x");
                const inputY = wrapper.querySelector(".input-y");
                const inputXScale = wrapper.querySelector(".input-x-scale");
                const inputYScale = wrapper.querySelector(".input-y-scale");

                const coordInputsDiv = wrapper.querySelector(".coord-inputs");

                // Get properties from the model
                const xMin = model.get('xMin');
                const xMax = model.get('xMax');
                const yMin = model.get('yMin');
                const yMax = model.get('yMax');

                // Use default 1 if value is invalid/undefined during first render
                const xScaleValue = Number(model.get('xScaleText')) || 1;
                const yScaleValue = Number(model.get('yScaleText')) || 1;

                const xGridDistance = model.get('xGridDistance');
                const yGridDistance = model.get('yGridDistance');
                const xSubGridMultiplier = model.get('xSubGridMultiplier');
                const ySubGridMultiplier = model.get('ySubGridMultiplier');

                // CALCULATE FINAL GRID DISTANCE
                const finalGridX = xGridDistance / xSubGridMultiplier;
                const finalGridY = yGridDistance / ySubGridMultiplier;

                // Determine bounding box based on model properties
                const boundingBox = [xMin, yMax, xMax, yMin];

                // -------------------------------------
                // Handle Coordinate Input Visibility
                // -------------------------------------
                coordInputsDiv.style.display = model.get('showCoords') ? 'block' : 'none';

                // If board already exists, remove it before re-initializing
                if (el.__board) {
                    JXG.JSXGraph.freeBoard(el.__board);
                    el.__board = null;
                    el.__mounted = false;
                }

                if (!el || el.__mounted) return;
                el.__mounted = true;

                // -------------------------------------
                // 3. Create/Initialize board with Zoom, Pan, and Custom Ticks/Grid
                // -------------------------------------
                const board = JXG.JSXGraph.initBoard(el, {
                    boundingbox: boundingBox,
                    axis: true,
                    grid: {
                        majorStep: [finalGridX, finalGridY],
                        strokeColor: '#ccc',
                        strokeOpacity: 0.7,
                        strokeWidth: 0.5,
                        dash: 2
                    },
                    showNavigation: true,
                    showCopyright: false,

                    // Set custom ticks for the axes
                    defaultAxes: {
                        x: {
                            ticks: {
                                majorHeight: -1,
                                drawLabels: true,
                                label: { offset: [0, -15] },
                                strokeColor: 'gray',
                                dash: 2,
                                ticksDistance: xScaleValue,
                            }
                        },
                        y: {
                            ticks: {
                                majorHeight: -1,
                                drawLabels: true,
                                label: { offset: [-15, 0] },
                                strokeColor: 'gray',
                                dash: 2,
                                ticksDistance: yScaleValue,
                            }
                        }
                    },

                    zoom: {
                        factorX: 1.2,
                        factorY: 1.2,
                        wheel: true,
                        pinch: true
                    },
                    pan: {
                        enabled: true,
                        needShift: false
                    }
                });

                // Draggable point (Recreated on every render)
                const p = board.create('point', [1, 1], {
                    name: 'A',
                    size: 4,
                    strokeColor: "red",
                    fillColor: "red"
                });

                // -------------------------------------
                // 4. Add Scale Text (if enabled)
                // -------------------------------------
                if (model.get('showScale')) {
                    createScaleText(board, model);
                }

                // -------------------------------------
                // Bindings (Re-attach on every render)
                // -------------------------------------

                // Set initial values for all inputs
                if (inputX && inputY && model.get('showCoords')) {
                    inputX.value = p.X().toFixed(2);
                    inputY.value = p.Y().toFixed(2);
                }

                // Set initial values for scale inputs
                if (inputXScale && inputYScale) {
                    inputXScale.value = xScaleValue.toFixed(2);
                    inputYScale.value = yScaleValue.toFixed(2);
                }

                // Live coordinates next to the point
                board.create('text', [
                    () => p.X() + 0.3,
                    () => p.Y() + 0.3,
                    () => `(${p.X().toFixed(2)}, ${p.Y().toFixed(2)})`
                ], {
                    fontSize: 14,
                    strokeColor: "black"
                });

                // Point coordinate updates (remains the same)
                if (inputX && inputY && model.get('showCoords')) {
                    p.on('drag', () => {
                        let x = p.X();
                        let y = p.Y();
                        inputX.value = x.toFixed(2);
                        inputY.value = y.toFixed(2);
                    });

                    inputX.addEventListener("input", () => {
                        const x = parseFloat(inputX.value);
                        const y = p.Y();
                        if (!isNaN(x)) p.moveTo([x, y]);
                    });
                    inputY.addEventListener("input", () => {
                        const x = p.X();
                        const y = parseFloat(inputY.value);
                        if (!isNaN(y)) p.moveTo([x, y]);
                    });
                }

                // Scale updates - triggers re-render via model change
                if (inputXScale && inputYScale) {
                    inputXScale.addEventListener("input", () => {
                        const x = parseFloat(inputXScale.value);
                        if (!isNaN(x) && x > 0) {
                            model.set('xScaleText', x);
                        }
                    });
                    inputYScale.addEventListener("input", () => {
                        const y = parseFloat(inputYScale.value);
                        if (!isNaN(y) && y > 0) {
                            model.set('yScaleText', y);
                        }
                    });
                }

                // Store board only in DOM (not GrapesJS model)
                el.__board = board;

                
            }
        }
    });

    // Add block in GrapesJS panel
    editorInstance.BlockManager.add("graph-editor", {
        label: "Graph Editor",
        category: "Insert",
        content: { type: "graph-block" }
    });
}