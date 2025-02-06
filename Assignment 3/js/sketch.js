let x, y;
let cat;
let shroom;
let chatgpt;
let myFont;
let shroomX = 260;
let shroomY = 245;
let lastMoveTime = 0; 
let moveInterval = 2000;
let bgColor = "black";
let brothColor = "#AC7158";
let keyPressedFlag = false;

// Original positions of shapes
let originalEgg1X = 200, originalEgg1Y = 245;
let originalEgg2X = 215, originalEgg2Y = 235;
let originalFishCake1X = 200, originalFishCake1Y = 185;
let originalFishCake2X = 230, originalFishCake2Y = 185;

// Current positions after keypress
let egg1X = originalEgg1X, egg1Y = originalEgg1Y;
let egg2X = originalEgg2X, egg2Y = originalEgg2Y;
let fishCake1X = originalFishCake1X, fishCake1Y = originalFishCake1Y;
let fishCake2X = originalFishCake2X, fishCake2Y = originalFishCake2Y;

function preload() {
  cat = loadImage('images/popcat.gif');
  shroom = loadImage('images/shroom.png');
  chatgpt = loadImage('images/chatgpt.webp');
  myFont = loadFont('Font/Quicksand.ttf');  
}

// Main setup
function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
  textFont(myFont);
  textSize(20);
}

// Main draw
function draw() {
  background(bgColor);
  image(chatgpt, 30, 30, chatgpt.width / 3, chatgpt.height / 3);
  image(cat, 125, 65, cat.width / 5, cat.height / 5 );
  image(shroom, shroomX, shroomY, shroom.width / 6, shroom.height / 6);

  let shroomTime = millis();
  if (shroomTime - lastMoveTime > moveInterval) {
    shroomX = random(width / 2);
    shroomY = random(height / 2);
    lastMoveTime = shroomTime;
  }

  if (keyIsPressed && !keyPressedFlag) {
    handleKeyPress();
  }

  //displayCoordinates();
  drawRamen();
  drawShapes();
}

// Handles all keypress-based changes
function handleKeyPress() {
  keyPressedFlag = true;
  switch (key.toLowerCase()) {
    case 'r': 
      bgColor = "red";
      break;
    case 'g':
      bgColor = "green";
      break;
    case 'b':
      bgColor = "blue";
      break;
    case 'p':
      bgColor = "black";
      break;
    case 'o':
      randomizeShapes();
      break;
    case 't':
      resetShapes();
      break;
  }
}

function randomizeShapes() {
  egg1X = random(45, width - 45);
  egg1Y = random(25, height - 25);
  egg2X = random(45, width - 45);
  egg2Y = random(25, height - 25);
  fishCake1X = random(45, width - 45);
  fishCake1Y = random(25, height - 25);
  fishCake2X = random(45, width - 45);
  fishCake2Y = random(25, height - 25);
}

function resetShapes() {
  egg1X = originalEgg1X;
  egg1Y = originalEgg1Y;
  egg2X = originalEgg2X;
  egg2Y = originalEgg2Y;
  fishCake1X = originalFishCake1X;
  fishCake1Y = originalFishCake1Y;
  fishCake2X = originalFishCake2X;
  fishCake2Y = originalFishCake2Y;
}

function displayCoordinates() {
  fill('white');
  text(`${mouseX}, ${mouseY}`, 345, 20);
}

function drawRamen() {
  // Name
  fill("rgb(1,245,1)");
  text("Landon Vernon", 250, 395);

  // Title
  fill("rgb(1,245,1)");
  text("The Ramen", 5, 20);

  // Bottom of Bowl
  fill("white");
  stroke(0);
  ellipse(200, 277, 65, 35);

  // The Bowl
  fill("white");
  stroke(0);
  ellipse(200, 224, 160, 125);

  // The Broth
  fill(brothColor);
  stroke(0);
  ellipse(200, 210, 150, 95);

  // The Chopsticks
  stroke("#815A4B");
  line(10, 90, 200, 257);
  line(80, 90, 200, 257);

  // Noodles
  noodleLines();
}

function drawShapes() {
  // Egg 1
  fill("white");
  stroke(0);
  ellipse(egg1X, egg1Y, 45, 25);
  fill("#E8FF00");
  ellipse(egg1X + 5, egg1Y, 25, 10);

  // Egg 2
  fill("white");
  stroke(0);
  ellipse(egg2X, egg2Y, 25, 45);
  fill("#E8FF00");
  ellipse(egg2X, egg2Y - 10, 12, 20);

  // Fish Cake 1
  fill("white");
  stroke(0);
  ellipse(fishCake1X, fishCake1Y, 50, 25);
  fill("purple");
  ellipse(fishCake1X, fishCake1Y, 25, 12);

  // Fish Cake 2
  fill("white");
  stroke(0);
  ellipse(fishCake2X, fishCake2Y, 50, 25);
  fill("purple");
  ellipse(fishCake2X, fishCake2Y, 25, 12);
}

// Noodle block line function
function noodleLines() {
  let counter = 0;
  let x1 = 150;
  let y1 = 200;
  let x2 = 245;
  let y2 = 200;
  fill("#D8C19E");
  stroke(0);
  rect(150, 200, 95, 45);
  while (counter <= 10) {
    stroke("#70614A");
    line(x1, y1, x2, y2);
    y1 += 4;
    y2 += 4;
    counter += 1;
  }
}

// Mouse event: changes broth color
function mouseMoved() {
  brothColor = color(random(255), random(255), random(255)); // Random color
}

// Reset flag when key is released
function keyReleased() {
  keyPressedFlag = false; // Reset the flag when the key is released
}
