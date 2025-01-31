// Press R to change the color of the background to Red
// Press G to change the color of the background to Green
// Press B to change the color of the background to Blue
// Press P to change it back to Black
// Press O to change the position of the Eggs and Fish cakes
// Press T to put the shapes back in place

let cloudOneX = 50;
let x, y;
let bgColor = 'black'; // Set the initial background color

// Original positions
let originalEgg1X = 200, originalEgg1Y = 245;
let originalEgg2X = 215, originalEgg2Y = 235;
let originalFishCake1X = 200, originalFishCake1Y = 185;
let originalFishCake2X = 230, originalFishCake2Y = 185;

// Current positions
let egg1X = originalEgg1X, egg1Y = originalEgg1Y;
let egg2X = originalEgg2X, egg2Y = originalEgg2Y;
let fishCake1X = originalFishCake1X, fishCake1Y = originalFishCake1Y;
let fishCake2X = originalFishCake2X, fishCake2Y = originalFishCake2Y;

// Color variables for the eggs
let brothColor = '#FFFFFF'; // Initial egg color (white)

// Flag to check if key was pressed
let keyPressedFlag = false;

// Flag for tracking mouse movement
let mouseHasMoved = false; 

//Main setup
function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
}

//Main draw
function draw() {
  background(bgColor); // Set background to the current bgColor
  
  // Checks if the key is pressed
  if (isKeyPressed && !keyPressedFlag) {
    keyPressedFlag = true;

    // Move shapes to random positions
    if (key === 'O' || key === 'o') {
      egg1X = random(width);
      egg1Y = random(height);
      egg2X = random(width);
      egg2Y = random(height);
      fishCake1X = random(width);
      fishCake1Y = random(height);
      fishCake2X = random(width);
      fishCake2Y = random(height);
    }
    
    // Reset shapes to their original positions
    if (key === 'T' || key === 't') {
      egg1X = originalEgg1X;
      egg1Y = originalEgg1Y;
      egg2X = originalEgg2X;
      egg2Y = originalEgg2Y;
      fishCake1X = originalFishCake1X;
      fishCake1Y = originalFishCake1Y;
      fishCake2X = originalFishCake2X;
      fishCake2Y = originalFishCake2Y;
    }
    
    // Change background color based on key press
    if (key === 'R' || key === 'r') {
      bgColor = 'red'; // Set background to red
    } else if (key === 'B' || key === 'b') {
      bgColor = 'blue'; // Set background to blue
    } else if (key === 'G' || key === 'g') {
      bgColor = 'green'; // Set background to green
    } else if (key === 'P' || key === 'p') {
      bgColor = 'black'; // Set background to black
    }
  }
  
  // Coordinates
  //fill('white');
  //text(`${mouseX}, ${mouseY}`, 345, 20);
  
  //Name
  fill('rgb(1,245,1)');
  text('Landon Vernon', 315, 395);
  
  //Title
  fill('rgb(1,245,1)');
  text('The Ramen', 5, 15)

  // Bottom of Bowl
  fill('white');
  stroke(0);
  ellipse(200, 277, 65, 35);
  
  // The Bowl
  fill('white');
  stroke(0);
  ellipse(200, 224, 160, 125);
  
  // The broth
  fill(brothColor);
  stroke(0);
  ellipse(200, 210, 150, 95)
  
  // The chop sticks
  fill('white');
  stroke('#815A4B');
  line(20, 100, 200, 257);
  fill('white');
  stroke('#815A4B');
  line(100, 100, 200, 257);
  
  // Noodle Block draw function
  noodleLines();
  
  // Egg 1 - Use the egg1Color variable to set its color
  fill('white');
  stroke(0);
  ellipse(egg1X, egg1Y, 45, 25);
  fill('#E8FF00');
  stroke(0);
  ellipse(egg1X + 5, egg1Y, 25, 10);
  
  // Egg 2
  fill('white');
  stroke(0);
  ellipse(egg2X, egg2Y, 25, 45);
  fill('#E8FF00');
  stroke(0);
  ellipse(egg2X, egg2Y - 10, 12, 20);
  
  // Fish cake 1
  fill('white');
  stroke(0);
  ellipse(fishCake1X, fishCake1Y, 50, 25);
  fill('purple');
  stroke(0);
  ellipse(fishCake1X, fishCake1Y, 25, 12);
  
  // Fish cake 2
  fill('white');
  stroke(0);
  ellipse(fishCake2X, fishCake2Y, 50, 25);
  fill('purple');
  stroke(0);
  ellipse(fishCake2X, fishCake2Y, 25, 12);
}

// Noodle block line function
function noodleLines(){
  var counter = 0
  var x1 = 150
  var y1 = 200
  var x2 = 245
  var y2 = 200
  fill('#D8C19E');
  stroke(0);
  rect(150, 200, 95, 45)
  while (counter <= 10){
    stroke('#70614A');
    line(x1, y1, x2, y2);
    y1 += 4
    y2 += 4
    counter += 1
  }
}

// Mouse event: changes broth color
function mouseMoved() {
  brothColor = color(random(255), random(255), random(255)); // Random color
  mouseHasMoved = true; // Set flag to true when the mouse moves
}

// Reset flag when key is released
function keyReleased() {
  keyPressedFlag = false; // Reset the flag when the key is released
}
