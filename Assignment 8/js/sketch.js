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
let boxPositions = [];
let myAnimation;

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
  textFont(myFont);
  textSize(20);
  
  myAnimation = new MyCharacter(50, 50);
  myAnimation.loadAnimation('Idle', idleAnim);
  myAnimation.loadAnimation('Walk', walkAnim);
  countDownInterval = setInterval(updateCountDown, 1000);

  for (let i = 0; i < 30; i++) {
    let food;
    if (floor(random(0, 2)) == 0) {
      food = new zombieFood(random(100, 750), random(100, 750), false);
    } else {
      food = new zombieFood(random(100, 750), random(100, 750), true);
    }
    myZombieFood.push(food);
  }
  mousePressed = playBackgroundSound;

  spawnBoxes(3);
}

function draw() {
  background(mygrass);
  displayinfo();
  moveCharacter();
  drawFood();
  endgame();

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
        health -= 30;
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
function displayinfo() {
  fill(255);
  textSize(30);
  text("Score: " + score, 50, 50);
  text("Health: " + health, 200, 50);
  text("Time Left: " + countDown, 425, 50);
}

function replayAnimation() {
  myAnimation.reset();
}

function endgame(){
  if(countDown == 0 || health <= 0){
    backgroundMusic.stop();
    noLoop();
    fill(255);
    textSize(48);
    text("Game Over", width/2 - 100, height/2);
  }
  else if(score == 10){
    backgroundMusic.stop();
    noLoop();
    fill(255);
    textSize(48);
    text("You Win", width/2 - 100, height/2);

  }
}

function spawnBoxes(count) {
  for (let i = 0; i < count; i++) {
    let boximage = createSprite(random(50, 800), random(50, 800), 'static');
    boximage.img = "./images/box.jpg";
    boximage.scale = 0.05;
    boximage.width = 100;
    boximage.height = 150;
  }
}
