


class Item {
    constructor(x, y, texture) {
        this.x = x; // X position
        this.y = y; // Y position
        this.z = 0; // Z position (default to 0)
        this.size = random(20, 50); // Random size for the shape
        this.type = random(['box', 'sphere', 'cylinder']); // Random shape type
        this.collected = false; // Flag to check if the item is collected
        this.texture = texture; // Assign a random texture
    }

    checkCollision(player) {
        const distance = dist(this.x, this.y, this.z, player.x, player.y, player.z);
        return distance < 100; // Adjust collision threshold as needed
    }

    drawItem() {
        if (this.collected) return; // Skip drawing if collected

        push();
        translate(this.x, this.y, this.z); // Move to the item's position
        noStroke(); // Disable stroke for the shape
        if (this.texture) {
            texture(this.texture); // Apply the random texture
        }

        // Draw the specified shape
        switch (this.type) {
            case 'box':
                box(this.size);
                break;
            case 'sphere':
                sphere(this.size / 1.5); // Sphere radius is half the size
                break;
            case 'cylinder':
                cylinder(this.size / 2, this.size); // Cylinder with radius and height
                break;
        }

        pop();
    }
}