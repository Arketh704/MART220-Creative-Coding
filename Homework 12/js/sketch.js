function setup() {
  createCanvas(800, 800, WEBGL);
  myShader = baseColorShader().modify({
    uniforms: {
      'float time': () => millis()
    },
    'vec3 getWorldPosition': `(vec3 pos) {
      pos.y += 20. * sin(time * 0.001 + pos.x * 0.05);
      return pos;
    }`
  });
}

function preload() {
  facetex = loadImage('images/Scott.jpg');
  flowertex = loadImage('images/flowers.png');
  popcat = loadImage('images/pop.gif');
  rando = loadImage('images/rando.png');
  rainbow = loadImage('images/rainbow.gif');
  face = loadImage('images/face2.jpg');
}

function draw() {
  directionalLight(255, 255, 255, 0, 0, -1);
  ambientLight(150);
  background("black");

  spinRings();
  spinRings2();
  faceOrb();
  faceOrbit();
  cubeOrbit();
  rainbowOrbit();
}

function spinRings() {
  let x = 0.2;
  let y = 0.2;
  let z = 0.2;
  let i = 0;
  let v = 100;

  while (i < 20) {
    push();
    texture(myShader);

    let r = (sin(frameCount * 0.1 + i) * 127 + 128);
    let g = (cos(frameCount * 0.5 + i) * 127 + 128);
    let b = (sin(frameCount * 0.5 + i + PI / 2) * 127 + 128);
    fill(r, g, b);

    let offset = i * 1;

    let dynamicSize = 40 + v + sin(frameCount * 0.1 + i) * 10;

    rotateX(frameCount * x + offset);
    rotateY(frameCount * y + offset);
    rotateZ(frameCount * z + offset);

    translate(0, 0, -600);
    torus(dynamicSize, 2, 40);
    pop();

    i++;
    v += 100;
  }
}

function spinRings2() {
  let x = 0.2;
  let y = 0.2;
  let z = 0.2;
  let i = 0;
  let v = 100;

  while (i < 20) {
    push();
    texture(myShader);

    let r = (sin(frameCount * 0.1 + i) * 127 + 128);
    let g = (cos(frameCount * 0.5 + i) * 127 + 128);
    let b = (sin(frameCount * 0.5 + i + PI / 2) * 127 + 128);
    fill(r, g, b);

    let offset = i * 1;

    let dynamicSize = 40 + v + sin(frameCount * 0.1 + i) * 10;

    rotateX(frameCount * x + offset);
    rotateY(frameCount * y + offset);
    rotateZ(frameCount * z + offset);

    translate(0, 0, 600);
    torus(dynamicSize, 2, 40);
    pop();

    i++;
    v += 100;
  }
}


function faceOrb()
{
  push();
  texture(facetex);

  translate(0, 0, -100);

  rotateX(frameCount * 0.2);
  rotateY(frameCount * 0.3);
  rotateZ(frameCount * 0.4);

  sphere(150, 150);

  pop();
}

function faceOrbit() {
  push();
  texture(face);

  let orbitRadius = 300;
  let orbitX = cos(frameCount * 2) * orbitRadius;
  let orbitY = sin(frameCount * 1) * orbitRadius;

  translate(orbitX, orbitY, 200);

  rotateX(frameCount * 3);
  rotateY(frameCount * 2);
  rotateZ(frameCount * 1);

  sphere(50,50);

  pop();
}

function cubeOrbit() {
  push();
  texture(popcat);

  let orbitRadius = 300;
  let orbitX = cos(frameCount * 1) * orbitRadius;
  let orbitY = sin(frameCount * 1) * orbitRadius;

  translate(orbitX, orbitY, 50);

  rotateX(frameCount * 1);
  rotateY(frameCount * 4);
  rotateZ(frameCount * 2);

  box(50,50);

  pop();
}

function rainbowOrbit() {
  push();
  texture(rainbow);

  let orbitRadius = 300;
  let orbitX = cos(frameCount * 2) * orbitRadius;
  let orbitY = sin(frameCount * 2) * orbitRadius;

  translate(orbitX, orbitY, 100);

  rotateX(frameCount * 2);
  rotateY(frameCount * 5);
  rotateZ(frameCount * 1);

  box(100,50);

  pop();
}