let breadX, breadY, lettuceX, lettuceY, cheeseX, cheeseY, tomatoX, tomatoY;
let moveIngredient = false;


function setup() {
  createCanvas(400, 400);
  // Starting positions for the ingredients
  breadX = width / 2;
  breadY = height / 2;
  lettuceX = width / 2;
  lettuceY = height / 2 - 40;
  cheeseX = width / 2;
  cheeseY = height / 2 - 80;
  tomatoX = width / 2;
  tomatoY = height / 2 - 120;
}

function draw() {
  background(255);

  // Title in upper left corner
  textSize(20);
  text("The P5 Sandwich", 165, 30);
  
  fill('#BA7D67'); // Color for bread
  rect(breadX - 60, breadY - 110, 120, 40); // Bottom bread slice

  // Drawing the sandwich ingredients
  fill('#BA7D67'); // Color for bread
  rect(breadX - 60, breadY + 50, 120, 40); // Bottom bread slice
  
  fill(0, 255, 0); // Lettuce color
  ellipse(lettuceX, lettuceY + 60, 100, 20); // Lettuce slice
  
  fill(255, 255, 0); // Cheese color
  rect(cheeseX - 50, cheeseY + 50, 100, 20); // Cheese slice
  
  fill(255, 0, 0); // Tomato color
  ellipse(tomatoX, tomatoY + 75, 60, 20); // Tomato slice

  // My name in the lower-right corner
  textSize(12);
  textAlign(RIGHT);
  text("ChatGPT", width - 10, height - 10);
}

function mousePressed() {
  // When mouse is clicked, ingredients move to random positions
  if (moveIngredient) {
    breadX = random(width);
    breadY = random(height);
    lettuceX = random(width);
    lettuceY = random(height);
    cheeseX = random(width);
    cheeseY = random(height);
    tomatoX = random(width);
    tomatoY = random(height);
  }
  moveIngredient = !moveIngredient;
}