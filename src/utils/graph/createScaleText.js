export const createScaleText = (board, model) => {
  const scaleX = () => board.getBoundingBox()[2] * 0.95;
  const scaleY = () => board.getBoundingBox()[1] * 0.95;

  const xScaleValue = Number(model.get('xScaleText')) || 1;
  const yScaleValue = Number(model.get('yScaleText')) || 1;

  board.create('text', [
    scaleX,
    scaleY,
    () =>
      `<div style="padding: 5px 15px;">
        Scale<br>
        X axis 1cm = ${xScaleValue.toFixed(2)} unit(s)<br>
        Y axis 1cm = ${yScaleValue.toFixed(2)} unit(s)
      </div>`
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
      padding: 5px 15px !important;
      border-radius: 3px;
      pointer-events: none;
      margin: 5px;
      min-width: 150px;
      text-align: left;
      box-sizing: border-box;
    `,
  });
};
