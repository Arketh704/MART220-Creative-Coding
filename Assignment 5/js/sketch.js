var myAnimation;
var idleAnimation;
var ZombieFood;
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
let keyPressedFlag = false;
let isMoving = false;
let myZombieFood = [];
let idleFileNames = [];
let walkFileNames = [];
let ramen;

function preload() {
  for (let i = 1; i <= 5; i++) {
    walkFileNames.push('./assets/Walk' + i + '.png');
  }
  myAnimation = new animationImage(walkFileNames, 0, 230, innerWidth / 8, innerHeight / 8, 5);

  for (let i = 1; i <= 10; i++) {
    idleFileNames.push('./assets/Idle' + i + '.png');
  }
  idleAnimation = new animationImage(idleFileNames, 0, 230, innerWidth / 8, innerHeight / 8, 10);

  cat = loadImage('images/popcat.gif');
  shroom = loadImage('images/shroom.png');
  chatgpt = loadImage('images/chatgpt.webp');
  myFont = loadFont('Font/Quicksand.ttf');  
}

// Main setup
function setup() {
  createCanvas(800, 800);
  textFont(myFont);
  textSize(20);
  ramen = new Ramen();
  for (let i = 0; i < 15; i++) {
    ZombieFood = new zombieFood('Zombie', random(1 , 800), random(1 , 800));
    myZombieFood.push(ZombieFood);
  }
}

// Main draw
function draw() {
  background(bgColor);
  image(chatgpt, 0, 0, chatgpt.width, chatgpt.height);
  image(cat, 125, 65, cat.width / 5, cat.height / 5 );
  image(shroom, shroomX, shroomY, shroom.width / 6, shroom.height / 6);
  ramen.drawRamen();
  ramen.drawShapes();
  handleMovement();

  for (let i = 0; i < myZombieFood.length; i++) {
    myZombieFood[i].drawFood();
  }

  let shroomTime = millis();
  if (shroomTime - lastMoveTime > moveInterval) {
    shroomX = random(width / 2);
    shroomY = random(height / 2);
    lastMoveTime = shroomTime;
  }

  if (keyIsPressed && !keyPressedFlag) {
    handleKeyPress();
  }

  if (isMoving) {
    myAnimation.updatePos(myAnimation.x, myAnimation.y);
    myAnimation.drawAnimation();
  } else {
    idleAnimation.updatePos(myAnimation.x, myAnimation.y); // Update idleAnimation position
    idleAnimation.drawAnimation();
  }
}

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
      bgColor = "black";d
      break;
    case 'o':
      ramen.randomizeShapes();
      break;
    case 't':
      ramen.resetShapes();
      break;
  }
}

function handleMovement() {
  isMoving = false;
  if (keyIsDown(87)) { // W key
    myAnimation.y -= 2;
    isMoving = true;
  }
  if (keyIsDown(83)) { // S key
    myAnimation.y += 2;
    isMoving = true;
  }
  if (keyIsDown(65)) { // A key
    myAnimation.x -= 2;
    myAnimation.setFlip(-1); // Flip left
    isMoving = true;
  }
  if (keyIsDown(68)) { // D key
    myAnimation.x += 2;
    myAnimation.setFlip(1); // Flip right
    isMoving = true;
  }

  // Check for collisions with zombie food
  for (let k = 0; k < myZombieFood.length; k++) {
    if (myAnimation.hasColided(myZombieFood[k].x, myZombieFood[k].y, 25, 25)) {
      myZombieFood.splice(k, 1);
    }
  }
}

// Mouse event: changes broth color
function mouseMoved() {
  if (ramen) {
    ramen.mouseMoved();
  }
}

// Reset flag when key is released
function keyReleased() {
  keyPressedFlag = false; // Reset the flag when the key is released
}