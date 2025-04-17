class PlayerChar {
    constructor(texture, x, y, z) {
        this.texture = texture;
        this.x = x;
        this.y = y;
        this.z = z;
        this.speed = 5;
    }

    handleInput() 
    {
        if (kb.pressing('w')) {
            this.y -= this.speed;
        }
        if (kb.pressing('s')) {
            this.y += this.speed;
        }
        if (kb.pressing('a')) {
            this.x -= this.speed;
        }
        if (kb.pressing('d')) {
            this.x += this.speed;
        }
    }

    drawPlayer() {
        this.handleInput();

        push();
        texture(this.texture);

        translate(this.x, this.y, this.z);

        rotateX(frameCount * 0.2);
        rotateY(frameCount * 0.3);
        rotateZ(frameCount * 0.4);

        sphere(50, 50); // Draw the character as a sphere

        pop(); // Restore the previous drawing state
    }
}