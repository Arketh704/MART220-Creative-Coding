class Ramen {
    constructor() {
        this.brothColor = "#AC7158";
        this.originalEgg1X = 200;
        this.originalEgg1Y = 245;
        this.originalEgg2X = 215;
        this.originalEgg2Y = 235;
        this.originalFishCake1X = 200;
        this.originalFishCake1Y = 185;
        this.originalFishCake2X = 230;
        this.originalFishCake2Y = 185;
        this.egg1X = this.originalEgg1X;
        this.egg1Y = this.originalEgg1Y;
        this.egg2X = this.originalEgg2X;
        this.egg2Y = this.originalEgg2Y;
        this.fishCake1X = this.originalFishCake1X;
        this.fishCake1Y = this.originalFishCake1Y;
        this.fishCake2X = this.originalFishCake2X;
        this.fishCake2Y = this.originalFishCake2Y;
    }

    drawRamen() {
        // Name
        fill('black')
        rect(650, 740, 200, 150)
        fill("rgb(1,245,1)");
        text("Landon Vernon", 650, 780);

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
        fill(this.brothColor);
        stroke(0);
        ellipse(200, 210, 150, 95);

        // The Chopsticks
        push();
        strokeWeight(4);
        stroke("#815A4B");
        line(10, 90, 200, 257);
        line(80, 90, 200, 257);
        pop();

        // Noodles
        this.noodleLines();
    }

    drawShapes() {
        // Egg 1
        fill("white");
        stroke(0);
        ellipse(this.egg1X, this.egg1Y, 45, 25);
        fill("#E8FF00");
        ellipse(this.egg1X + 5, this.egg1Y, 25, 10);

        // Egg 2
        fill("white");
        stroke(0);
        ellipse(this.egg2X, this.egg2Y, 25, 45);
        fill("#E8FF00");
        ellipse(this.egg2X, this.egg2Y - 10, 12, 20);

        // Fish Cake 1
        fill("white");
        stroke(0);
        ellipse(this.fishCake1X, this.fishCake1Y, 50, 25);
        fill("purple");
        ellipse(this.fishCake1X, this.fishCake1Y, 25, 12);

        // Fish Cake 2
        fill("white");
        stroke(0);
        ellipse(this.fishCake2X, this.fishCake2Y, 50, 25);
        fill("purple");
        ellipse(this.fishCake2X, this.fishCake2Y, 25, 12);
    }

    noodleLines() {
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

    randomizeShapes() {
        this.egg1X = random(45, width - 45);
        this.egg1Y = random(25, height - 25);
        this.egg2X = random(45, width - 45);
        this.egg2Y = random(25, height - 25);
        this.fishCake1X = random(45, width - 45);
        this.fishCake1Y = random(25, height - 25);
        this.fishCake2X = random(45, width - 45);
        this.fishCake2Y = random(25, height - 25);
    }

    resetShapes() {
        this.egg1X = this.originalEgg1X;
        this.egg1Y = this.originalEgg1Y;
        this.egg2X = this.originalEgg2X;
        this.egg2Y = this.originalEgg2Y;
        this.fishCake1X = this.originalFishCake1X;
        this.fishCake1Y = this.originalFishCake1Y;
        this.fishCake2X = this.originalFishCake2X;
        this.fishCake2Y = this.originalFishCake2Y;
    }

    displayCoordinates() {
        fill('white');
        text(`${mouseX}, ${mouseY}`, 345, 20);
    }

    mouseMoved() {
        this.brothColor = color(random(255), random(255), random(255)); // Random color
    }
}