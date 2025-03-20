var myAnimation, idleAnimation;
let ZombieFood, BadZombieFood;
let numZombieFood = 10, numBadZombieFood = 5; // New variables to control the number of each food
let chatgpt, myFont;
let lastMoveTime = 0, moveInterval = 2000;
let bgColor = "black", keyPressedFlag = false, isMoving = false;
let myZombieFood = [], myBadZombieFood = [], idleFileNames = [], walkFileNames = [];
let foodMoveInterval = 10000, lastFoodMoveTime = 0, timer = 35;
let score = 0;
let backgroundMusic, zombieFoodSound, badZombieFoodSound;

function preload() {
  for (let i = 1; i <= 5; i++) {
    walkFileNames.push('./assets/Walk' + i + '.png');
  }
  myAnimation = new animationImage(walkFileNames, 0, 230, innerWidth / 8, innerHeight / 8, 5);

  for (let i = 1; i <= 10; i++) {
    idleFileNames.push('./assets/Idle' + i + '.png');
  }
  idleAnimation = new animationImage(idleFileNames, 0, 230, innerWidth / 8, innerHeight / 8, 10);

  chatgpt = loadImage('images/chatgpt.webp');
  myFont = loadFont('Font/Quicksand.ttf');
  backgroundMusic = loadSound('audio/backgroundMusic.wav');
  zombieFoodSound = loadSound('audio/zombiefoodSound.wav');
  badZombieFoodSound = loadSound('audio/badzombiefoodSound.wav');
}

function setup() {
  createCanvas(800, 800);
  textFont(myFont);
  textSize(20);
  for (let i = 0; i < numZombieFood; i++) {
    ZombieFood = new zombieFood(random(1, 800), random(1, 800));
    myZombieFood.push(ZombieFood);
  }
  for (let i = 0; i < numBadZombieFood; i++) {
    BadZombieFood = new badzombieFood(random(1, 800), random(1, 800));
    myBadZombieFood.push(BadZombieFood);
  }

  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.loop();
  }
  score = 0;
}

function draw() {
  background(bgColor);
  image(chatgpt, 0, 0, chatgpt.width, chatgpt.height);
  handleMovement();

  for (let i = 0; i < myZombieFood.length; i++) {
    myZombieFood[i].drawFood();
  }

  for (let i = 0; i < myBadZombieFood.length; i++) {
    myBadZombieFood[i].drawbadFood();
  }

  updateZombieFoodPosition();


  if (isMoving) {
    myAnimation.updatePos(myAnimation.x, myAnimation.y);
    myAnimation.drawAnimation();
  } else {
    idleAnimation.updatePos(myAnimation.x, myAnimation.y);
    idleAnimation.drawAnimation();
  }

  updateTimer();
  displayTimer();
  displayScore();
}


// Update zombie food position
function updateZombieFoodPosition() {
  let currentTime = millis();
  if (currentTime - lastFoodMoveTime > foodMoveInterval) {
    for (let i = 0; i < myZombieFood.length; i++) {
      myZombieFood[i].updateFood(width, height);
    }
    for (let i = 0; i < myBadZombieFood.length; i++) {
      myBadZombieFood[i].updatebadFood(width, height);
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
    setup(); // Restart the game when the timer reaches 0
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

  for (let k = myZombieFood.length - 1; k >= 0; k--) {
    if (collideRectCircle(myAnimation.x - myAnimation.w / 2, myAnimation.y - myAnimation.h / 2, myAnimation.w, myAnimation.h, myZombieFood[k].x, myZombieFood[k].y, 25)) {
      myZombieFood.splice(k, 1);
      score++;
      zombieFoodSound.play();
    }
  }

  for (let k = myBadZombieFood.length - 1; k >= 0; k--) {
    if (collideRectCircle(myAnimation.x - myAnimation.w / 2, myAnimation.y - myAnimation.h / 2, myAnimation.w, myAnimation.h, myBadZombieFood[k].x, myBadZombieFood[k].y, 25)) {
      myBadZombieFood.splice(k, 1);
      score--;
      badZombieFoodSound.play();
    }
  }
}


function mousePressed() {
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.loop();
  }
}
