let shapes = [];
let cam;
let facetex, flowertex, popcat, rando, rainbow, face, tv, dexter, blankTexture, arialFont;

function preload() {
  facetex = loadImage('images/Scott.jpg');
  flowertex = loadImage('images/flowers.png');
  popcat = loadImage('images/pop.gif');
  rando = loadImage('images/rando.png');
  rainbow = loadImage('images/rainbow.gif');
  face = loadImage('images/face2.jpg');
  tv = loadModel('assets/TV.obj');
  dexter = loadImage('images/dexter.jpg');
  blankTexture = createGraphics(100, 100);
  blankTexture.background(255);
  arialFont = loadFont('assets/arial.ttf');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  cam = createCamera();
  initShapes();
}

function draw() {
  let camX = 0;
  let camY = 0;
  let camZ = 2000;
  cam.setPosition(camX, camY, camZ);
  cam.lookAt(0, 0, 0);

  directionalLight(255, 255, 255, 0, 0, -1);
  ambientLight(150);
  background("black");

  push();
  resetMatrix();
  textFont(arialFont);
  fill(255);
  textSize(48);
  text("Landon Vernon", -900, -800);
  text("Daytime Television", 400, -800);
  pop();

  for (let shape of shapes) {
    push();
    applyOrbit(shape);
    applyRotation(shape);
    applyTexture(shape);
    renderShape(shape);
    pop();
  }
}

function mousePressed() {
  for (let shape of shapes) {
    if (shape.type === "sphere" || shape.type === "box") {
      shape.texture = shape.texture === blankTexture ? shape.originalTexture : blankTexture;
    }
  }
}

function initShapes() {
  shapes = [
    {
      type: "model",
      texture: rainbow,
      translate: [100, 100, 0],
      rotationSpeed: [0.5, 0.7, 0.8],
      size: [10, 10],
      model: tv,
    },
    {
      type: "sphere",
      texture: face,
      originalTexture: face,
      dynamic: true,
      translate: [500, 500, 0],
      rotationSpeed: [10, 1, 1],
      size: [50, 50],
      orbitOffset: 0,
      rotationFactor: 100,
    },
    {
      type: "box",
      texture: popcat,
      originalTexture: popcat,
      dynamic: true,
      translate: [100, 100, 0],
      rotationSpeed: [1, 1, 1],
      size: [100, 100, 100],
      orbitOffset: 0,
      rotationFactor: 200,
    },
    {
      type: "cylinder",
      texture: flowertex,
      dynamic: true,
      translate: [200, 200, 0],
      rotationSpeed: [1, 1, 1],
      size: [50, 100],
      orbitOffset: -800,
      rotationFactor: 200,
    },
    {
      type: "cone",
      texture: rainbow,
      dynamic: true,
      translate: [400, 300, 0],
      rotationSpeed: [1, 1, 1],
      size: [50, 100],
      orbitOffset: 0,
      rotationFactor: 400,
    },
  ];
}

function applyOrbit(shape) {
  if (shape.dynamic) {
    let orbitRadius = 700;
    let angle = frameCount * 0.01 * (shape.rotationFactor || 1) + (shape.orbitOffset || 0);
    let orbitX = cos(angle) * orbitRadius;
    let orbitY = sin(angle) * orbitRadius;
    translate(orbitX, orbitY, shape.translate[2]);
  } else {
    translate(...shape.translate);
  }
}

function applyRotation(shape) {
  let [rx, ry, rz] = shape.rotationSpeed || [0, 0, 0];
  rotateX(frameCount * rx);
  rotateY(frameCount * ry);
  rotateZ(frameCount * rz);
}

function applyTexture(shape) {
  if (shape.texture && shape.texture instanceof p5.Image) {
    texture(shape.texture);
  } else {
    normalMaterial();
  }
}

function renderShape(shape) {
  switch (shape.type) {
    case "sphere":
      sphere(...(shape.size || [50, 50]), 24, 24);
      break;
    case "box":
      box(...(shape.size || [100, 100, 100]));
      break;
    case "model":
      if (shape.model) model(shape.model);
      break;
    case "cylinder":
      cylinder(...(shape.size || [50, 100]));
      break;
    case "cone":
      cone(...(shape.size || [50, 100]));
      break;
    default:
      box(100);
      break;
  }
}
