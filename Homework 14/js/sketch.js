let player;
let obstacles = []; // Array to store all obstacles
let items = [];
let score = 0; // Initialize the score
let gameState = "running"; // Game state: "running" or "paused"
let resetTimer = 0; // Timer for resetting the game

function setup() 
{
    createCanvas(800, 800, WEBGL);

    player = new PlayerChar(facetex, -350, -350, 0);
    
    for (let i = 0; i < 5; i++) {
        obstacles.push(new Obstacle(planet, 'sphere', random(-400, 400), random(-400, 400), 0));

    }

    for (let i = 0; i < 5; i++) {
        items.push(new Item(random(-400, 400), random(-400, 400), rainbow)); // Create items with random positions
    }
}

function preload() 
{
    facetex = loadImage('images/Scott.jpg');
    flowertex = loadImage('images/flowers.png');
    popcat = loadImage('images/pop.gif');
    rando = loadImage('images/rando.png');
    rainbow = loadImage('images/rainbow.gif');
    face = loadImage('images/face2.jpg');
    spaceBG = loadImage('images/space.jpg');
    planet = loadImage('images/planet.jpg');
    arial = loadFont('assets/arial.ttf');
}

function draw() {
    if (gameState === "paused") {
        drawWinMessage(); // Show the win message
        if (millis() > resetTimer) {
            resetGame(); // Reset the game after a delay
        }
        return; // Stop further execution of the draw loop
    }

    push();
    noStroke();
    translate(0, 0, -1000); // Move the background slightly back
    texture(spaceBG); // Apply the space texture
    plane(800 * 3, 800 * 3); // Draw a plane with the same size as the canvas
    pop();
    directionalLight(255, 255, 255, 0, 0, -1);
    ambientLight(150);

    for (let item of items) {
        item.drawItem();
    }

    for (let obstacle of obstacles) {
        obstacle.drawObstacle();
    }

    // Check for collisions between obstacles
    for (let i = 0; i < obstacles.length; i++) {
        for (let j = i + 1; j < obstacles.length; j++) {
            if (obstacles[i].checkObstacleCollision(obstacles[j])) {
                // Reverse velocities for both obstacles
                obstacles[i].vx *= -1;
                obstacles[i].vy *= -1;
                obstacles[j].vx *= -1;
                obstacles[j].vy *= -1;
            }
        }

        // Check for collisions between obstacles and items
        for (let item of items) {
            if (obstacles[i].checkItemCollision(item)) {
                // Reverse the obstacle's velocity
                obstacles[i].vx *= -1;
                obstacles[i].vy *= -1;
            }
        }
    }

    for (let obstacle of obstacles) {
        obstacle.updatePosition(); // Update obstacle position
    }

    player.drawPlayer();
    
    // Check for item collection and remove collected items
    for (let i = items.length - 1; i >= 0; i--) {
        if (!items[i].collected && items[i].checkCollision(player)) {
            items[i].collected = true; // Mark as collected
            items.splice(i, 1); // Remove the item from the array
            score++; // Increase score
        }
    }

    // Check for collisions and remove obstacles if collided
    for (let i = obstacles.length - 1; i >= 0; i--) {
        if (obstacles[i].checkCollision(player)) {
            obstacles.splice(i, 1); // Remove the obstacle from the array
        }
    }

    // Draw the score in the top-right corner
    drawScore();

    // Check if the player has collected all items
    if (score === 5) { // Replace 5 with the total number of items spawned
        gameState = "paused"; // Pause the game
        resetTimer = millis() + 3000; // Set a 3-second timer for resetting
    }
}

function drawScore() {
    resetMatrix(); // Reset transformations to draw in 2D
    textAlign(RIGHT, TOP);
    textSize(25);
    textFont(arial);
    fill(255); // White text
    text(`Score: ${score}`, 350, -350); // Display score in the top-right corner
}

function drawWinMessage() {
    push();
    resetMatrix(); // Reset transformations to draw in 2D
    textAlign(CENTER, CENTER);
    textSize(50);
    textFont(arial);
    fill(0, 255, 0); // Green text
    text("You Win!", 0, 0); // Display "You Win" in the center of the screen
    pop();
}

function resetGame() {
    // Reset game variables
    score = 0;
    items = [];
    obstacles = [];
    gameState = "running";

    // Recreate items and obstacles
    for (let i = 0; i < 5; i++) {
        items.push(new Item(random(-400, 400), random(-400, 400), rainbow)); // Create items with random positions
    }

    for (let i = 0; i < 5; i++) {
        obstacles.push(new Obstacle(planet, 'sphere', random(-400, 400), random(-400, 400), 0));

    }

    // Reset player position
    player = new PlayerChar(facetex, 0, 0, 0);
}