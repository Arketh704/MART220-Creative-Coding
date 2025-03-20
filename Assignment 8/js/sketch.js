var idleAnim, walkAnim;
let zombieFoodInstance;
let myFont;
let lastMoveTime = 0, moveInterval = 2000;
let bgColor = "black", keyPressedFlag = false, isMoving = false;
let myZombieFood = [];
let score = 0;
let backgroundMusic, zombieFoodSound, badZombieFoodSound;
let countDown = 30;
let countDownInterval;
let health = 100;
let boxes = 3;
let boxPositions = []; // Store box positions

function preload() {
  idleAnim = loadStrings("data/idle.txt");
  walkAnim = loadStrings("data/walk.txt");
  myFont = loadFont('Font/Quicksand.ttf');
  backgroundMusic = loadSound('audio/backgroundMusic.wav');
  zombieFoodSound = loadSound('audio/zombiefoodSound.wav');
  badZombieFoodSound = loadSound('audio/badzombiefoodSound.wav');
  mygrass = loadImage('images/grass.jpg');
  mycrate = loadImage('images/box.jpg');
}

function setup() {
  createCanvas(800, 800);
  generateBoxPositions(); // Generate random positions for boxes
  textFont(myFont);
  textSize(20);
  
  myAnimation = new MyCharacter(50, 50);
  myAnimation.loadAnimation('Idle', idleAnim);
  myAnimation.loadAnimation('Walk', walkAnim);

  countDownInterval = setInterval(updateCountDown, 1000);

  for (let i = 0; i < 20; i++) {
    let food;
    if (floor(random(0, 3)) == 0) {
      food = new zombieFood(random(100, 800), random(100, 800), false);
    } else {
      food = new zombieFood(random(100, 800), random(100, 800), true);
    }
    myZombieFood.push(food);
  }
  mousePressed = playBackgroundSound;

  boximage = createSprite(200, 200, 1, 1,'static');
  boximage.img = "./images/box.jpg";
  boximage.scale = 0.05;
  boximage.diameter = 60;
}

function draw() {
  background(mygrass);
  moveCharacter();
  drawFood();
  displayScore();
  displayCountDown();
  displayhealth();
}

function moveCharacter() {
  if (kb.pressing('d')) {
    myAnimation.updatePosition('forward');
    myAnimation.draw('Walk');
  } else if (kb.pressing('a')) {
    myAnimation.updatePosition('reverse');
    myAnimation.draw('Walk');
  } else if (kb.pressing('w')) {
    myAnimation.updatePosition('up');
    myAnimation.draw('Walk');
  } else if (kb.pressing('s')) {
    myAnimation.updatePosition('down');
    myAnimation.draw('Walk');
  } else {
    myAnimation.draw('Idle');
  }

  for (let i = 0; i < myZombieFood.length; i++) {
    myZombieFood[i].draw();

    if (myAnimation.isColliding(myZombieFood[i].foodPiece)) {
      if (myZombieFood[i].isGood) {
        score++;
        zombieFoodSound.play();
      } else {
        score--;
        health -= 10;
        badZombieFoodSound.play();
      }

      myZombieFood[i].foodPiece.remove();
    }
  }
}

function drawFood() {
  for (let i = 0; i < myZombieFood.length; i++) {
    myZombieFood[i].draw();
  }
}

function playBackgroundSound() {
  if (!backgroundMusic.isPlaying() && getAudioContext().state !== 'running') {
    userStartAudio().then(() => {
      backgroundMusic.play();
    }).catch(err => console.error("Audio context could not start:", err));
  }
}


function updateCountDown() {
  countDown--;
  if (countDown == 0) {
      clearInterval(countDownInterval);
  }
}
function displayCountDown() {
  textSize(24);
  text("Time left: " + countDown, width - 200, 50);
}

function displayScore() {
  fill(255);
  textSize(24);
  text("Score: " + score, 50, 50);
}

function displayhealth() {
  fill(255);
  textSize(24);
  text("Health: " + health, 50, 100);
}

function replayAnimation() {
  myAnimation.reset();
}

function generateBoxPositions() {
  for (let i = 0; i < boxes; i++) {
    let x = random(width); // Randomize x position
    let y = random(height); // Randomize y position
    let size = random(20, 50); // Random size between 20 and 50
    boxPositions.push({ x, y, size }); // Store position and size
  }
}

function drawBoxes() {
  for (let i = 0; i < boxPositions.length; i++) {
    let box = boxPositions[i];
    image(mycrate, box.x, box.y, box.size, box.size); // Draw the box at its static position
  }
}
