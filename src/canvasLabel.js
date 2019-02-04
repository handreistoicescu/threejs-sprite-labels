import * as THREE from 'three';

export default function addLabel(threeObj, text) {
  if (!threeObj.isObject3D) {
    throw "Object is not valid threeJS Object3D. Can't apply the label.";
  }

  const obj = threeObj;
  obj.geometry.computeBoundingSphere();
  const objBoundingSphereRadius = obj.geometry.boundingSphere.radius;

  const labelCanvas = getLabelCanvas(
    text,
    48,
    'white',
    'black',
    objBoundingSphereRadius
  );

  const spriteLabel = getSpriteLabel(labelCanvas);

  obj.add(spriteLabel);

  return obj;
}

function getLabelCanvas(
  sText,
  fontSize,
  sColor,
  sBgColor,
  size
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontStyles = `${fontSize}px sans-serif`;

  // see how wide the text will be
  ctx.font = fontStyles;
  const textWidth = ctx.measureText(sText).width;

  // compute a padding
  const textBoxPadding = fontSize * 0.2;

  // total dimensions of text box
  const textBoxWidth = textWidth + 2 * textBoxPadding;
  const textBoxHeight = fontSize + 2 * textBoxPadding;

  // canvas height will be assigned from parameter
  // canvas.height = 500;
  canvas.height = size * 6;

  // offset is computed relative to height because of how the design looks like
  const textBoxOffset = canvas.height / 4;
  canvas.width = (textBoxWidth + textBoxOffset) * 2;
  canvas.style.backgroundColor = "rgba(255, 255, 255, 0)";

  // console.log(
  //   `Canvas width: ${canvas.width}\n`,
  //   `Canvas height: ${canvas.height}\n`,
  //   `Textbox width: ${textBoxWidth}\n`,
  //   `Obj sphere radius: ${size}\n`
  // );

  // add the background of the label
  ctx.fillStyle = sBgColor;
  ctx.fillRect((canvas.width / 2 + textBoxOffset), 0, textBoxWidth, textBoxHeight);

  ctx.fillStyle = sColor;

  // set the font styles again, as now they have reset because of the canvas resizing
  ctx.font = fontStyles;

  ctx.fillText(sText, (canvas.width / 2 + textBoxOffset + textBoxPadding), (fontSize + textBoxPadding));


  // draw a line from the bottom-center of the text to all the way down the canvas
  ctx.fillStyle = 'gray';
  // draw the underline
  ctx.beginPath();
  ctx.moveTo((canvas.width / 2 + textBoxOffset - textBoxPadding), textBoxHeight / 2);
  ctx.lineTo(canvas.width / 2, canvas.height / 6);
  ctx.lineTo(canvas.width / 2, canvas.height / 2);
  ctx.stroke();

  return canvas;
}

function getSpriteLabel(canvas) {
  const spriteMaterial = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture( canvas )
  });
  const sprite = new THREE.Sprite( spriteMaterial );

  sprite.scale.set(1, 1, 1);

  return sprite;
}