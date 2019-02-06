import * as THREE from 'three';

export default function addLabel(threeObj, text) {
  if (!threeObj.isObject3D) {
    throw "Object is not valid threeJS Object3D. Can't apply the label.";
  }

  const obj = threeObj;
  obj.geometry.computeBoundingSphere();
  const objBoundingSphereRadius = obj.geometry.boundingSphere.radius;

  const objRadiusInCanvasPixels = null;

  const labelCanvas = getLabelCanvas(
    text,
    16,
    'white',
    'black',
    10/objBoundingSphereRadius
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
  sphereRadius
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

  // width and height have to be powers of two
  canvas.width = 2048;
  canvas.height = 2048;

  // canvas.height = size * 6;

  console.log(
    sphereRadius,
    (canvas.height / 2 - 2 * sphereRadius),
    canvas.height
  );

  canvas.style.backgroundColor = "rgba(255, 255, 255, 0)";

  // add the background of the label
  ctx.fillStyle = sBgColor;
  ctx.fillRect(canvas.width/2, (canvas.height/2 - 3*sphereRadius), textBoxWidth, textBoxHeight);

  ctx.fillStyle = sColor;

  // set the font styles again, as now they have reset because of the canvas resizing
  ctx.font = fontStyles;

  ctx.fillText(sText, (canvas.width/2 + textBoxPadding), (canvas.height/2 - 3*sphereRadius + fontSize));

  // draw a line from the bottom-center of the text to all the way down the canvas
  ctx.fillStyle = 'gray';
  // draw the underline
  ctx.beginPath();
  ctx.moveTo((canvas.width / 2), (canvas.height/2 - 3*sphereRadius));
  ctx.lineTo(canvas.width / 2, canvas.height / 2);
  ctx.stroke();

  return canvas;
}

function getSpriteLabel(canvas) {
  const texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.SpriteMaterial({
    map: texture
  });

  const sprite = new THREE.Sprite( material );

  sprite.scale.set(material.map.image.width/100, material.map.image.height/100, 1);

  return sprite;
}

