var idleAnim, walkAnim, attackAnim;
let myFont;
let lastMoveTime = 0, moveInterval = 2000;
let myZombieFood = [];
let score = 0;
let backgroundMusic, zombieFoodSound, badZombieFoodSound;
let countDown = 3000;
let countDownInterval;
let health = 10000;
let boxes = [];
let myAnimation;
const particles = []; // Array to hold particles

function preload() {
  myFont = loadFont('Font/Quicksand.ttf');
  mygrass = loadImage('images/grass.jpg');
  mycrate = loadImage('images/box.jpg');
  idleAnim = loadStrings("data/idle.txt");
  walkAnim = loadStrings("data/walk.txt");
  attackAnim = loadStrings("data/attack.txt");
  backgroundMusic = loadSound('audio/backgroundMusic.wav');
  zombieFoodSound = loadSound('audio/zombiefoodSound.wav');
  badZombieFoodSound = loadSound('audio/badzombiefoodSound.wav');
}

function setup() {
  createCanvas(800, 800);
  textFont(myFont);
  textSize(20);
  
  myAnimation = new MyCharacter(50, 50);
  myAnimation.loadAnimation('Idle', idleAnim);
  myAnimation.loadAnimation('Walk', walkAnim);
  myAnimation.loadAnimation('Attack', attackAnim);
  countDownInterval = setInterval(updateCountDown, 1000);

  for (let i = 0; i < 30; i++) {
    let food = new zombieFood(random(100, 750), random(100, 750), floor(random(0, 2)) === 0);
    myZombieFood.push(food);
  }

  createBoxes();
}

function draw() {
  background(mygrass);
  movement();
  displayinfo();
  endgame();

  // Update and draw particles separately
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

function movement() {
  if (kb.pressing('d')) {
    myAnimation.updatePosition('forward');
    myAnimation.drawAnimation('Walk');
    for (let box of boxes) {
      if (myAnimation.isColliding(box)) {
        myAnimation.updatePosition('Idle');
        myAnimation.drawAnimation('Idle');
      }
    }
  } else if (kb.pressing('a')) {
    myAnimation.updatePosition('reverse');
    myAnimation.drawAnimation('Walk');
  } else if (kb.pressing('w')) {
    myAnimation.updatePosition('up');
    myAnimation.drawAnimation('Walk');
  } else if (kb.pressing('s')) {
    myAnimation.updatePosition('down');
    myAnimation.drawAnimation('Walk');
  } else if (kb.pressing('x')) {
    myAnimation.drawAnimation('Attack');
    for (let box of boxes) {
      if (dist(myAnimation.getCurrentAnimation().position.x, myAnimation.getCurrentAnimation().position.y, box.position.x, box.position.y) < 100) {
        box.health -= 1; // Reduce box health by 1
        createParticles(box.position.x, box.position.y); // Corrected positioning
        if (box.health <= 0) {
          box.remove(); // Remove the box if health is zero
          boxes = boxes.filter(b => b !== box); // Update the boxes array
        }
      }
    }
  } else {
    myAnimation.drawAnimation('Idle');
  }

  for (let i = myZombieFood.length - 1; i >= 0; i--) {
    myZombieFood[i].draw();
    if (myAnimation.isOverlapping(myZombieFood[i].foodPiece)) {
      if (myZombieFood[i].isGood) {
        score++;
        zombieFoodSound.play();
      } else {
        health -= 30;
        badZombieFoodSound.play();
      }
      myZombieFood[i].foodPiece.remove();
      myZombieFood.splice(i, 1);
    }
  }
}

function updateCountDown() {
  if (countDown > 0) {
    countDown--;
  } else {
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

function endgame() {
  if (countDown <= 0 || health <= 0) {
    backgroundMusic.stop();
    noLoop();
    fill(255);
    textSize(48);
    text("Game Over", width / 2 - 100, height / 2);
  } else if (boxes.length === 0) { // Check if all boxes are gone
    backgroundMusic.stop();
    noLoop();
    fill(255);
    textSize(48);
    text("You Win", width / 2 - 100, height / 2);
  } else if (score >= 10) {
    backgroundMusic.stop();
    noLoop();
    fill(255);
    textSize(48);
    text("You Win", width / 2 - 100, height / 2);
  }
}

function createBoxes() {
  for (let i = 0; i < 3; i++) {
    let box = createSprite(random(100, 700), random(100, 700), 100, 100, 'static');
    box.img = "/images/box.jpg";
    box.scale = 0.05;
    box.width = 100;
    box.height = 150;
    box.health = 200; // Add health property to each box
    boxes.push(box);
  }
}

function createParticles(x, y) {
  for (let i = 0; i < 3; i++) {
    let p = new Particle(x, y);
    particles.push(p);
  }
}


