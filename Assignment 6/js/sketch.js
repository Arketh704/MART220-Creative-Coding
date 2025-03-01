// Global Variables
var x, y;
let cat, shroom, chatgpt, myFont;
let shroomX = 260, shroomY = 245;
let lastMoveTime = 0, moveInterval = 2000;
let bgColor = "black", keyPressedFlag = false, isMoving = false;
let myZombieFood = [], idleFileNames = [], walkFileNames = [];
let ramen, foodMoveInterval = 10000, lastFoodMoveTime = 0, timer = 35;
let score = 0;
var myAnimation, idleAnimation, ZombieFood;

// Preload assets
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
    ZombieFood = new zombieFood(random(1, 800), random(1, 800));
    myZombieFood.push(ZombieFood);
  }
  score = 0; // Reset score
}

// Main draw
function draw() {
  background(bgColor);
  image(chatgpt, 0, 0, chatgpt.width, chatgpt.height);
  image(cat, 125, 65, cat.width / 5, cat.height / 5);
  image(shroom, shroomX, shroomY, shroom.width / 6, shroom.height / 6);
  ramen.drawRamen();
  ramen.drawShapes();
  handleMovement();

  for (let i = 0; i < myZombieFood.length; i++) {
    myZombieFood[i].drawFood();
  }

  updateShroomPosition();
  updateZombieFoodPosition();

  if (keyIsPressed && !keyPressedFlag) {
    handleKeyPress();
  }

  if (isMoving) {
    myAnimation.updatePos(myAnimation.x, myAnimation.y);
    myAnimation.drawAnimation();
  } else {
    idleAnimation.updatePos(myAnimation.x, myAnimation.y);
    idleAnimation.drawAnimation();
  }

  updateTimer();
  displayTimer();
  displayScore(); // Call displayScore to show the score on the canvas
}

// Update shroom position
function updateShroomPosition() {
  let shroomTime = millis();
  if (shroomTime - lastMoveTime > moveInterval) {
    shroomX = random(width / 2);
    shroomY = random(height / 2);
    lastMoveTime = shroomTime;
  }
}

// Update zombie food position
function updateZombieFoodPosition() {
  let currentTime = millis();
  if (currentTime - lastFoodMoveTime > foodMoveInterval) {
    for (let i = 0; i < myZombieFood.length; i++) {
      myZombieFood[i].updateFood(width, height);
    }
    lastFoodMoveTime = currentTime;
  }
}

// Update and display timer
function updateTimer() {
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  if (timer == 0) {
    setup();
  }
}

function displayTimer() {
  textSize(32);
  fill(255);
  text("You have: " + timer + " seconds left", 10, 50);
}

function displayScore() {
  textSize(32);
  fill(255);
  text("Score: " + score, 10, 90);
}

// Handle key press events
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
      ramen.randomizeShapes();
      break;
    case 't':
      ramen.resetShapes();
      break;
  }
}

// Handle movement
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

  for (let k = 0; k < myZombieFood.length; k++) {
    if (myAnimation.hasColided(myZombieFood[k].x, myZombieFood[k].y, 25, 25)) {
      myZombieFood.splice(k, 1);
      score++;
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