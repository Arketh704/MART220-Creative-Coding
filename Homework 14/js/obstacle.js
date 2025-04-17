class Obstacle {
    constructor(texture, shape, x, y, z) {
        this.texture = texture;
        this.shape = shape; // Shape type (e.g., 'box', 'sphere', etc.)
        this.x = x;         // X position
        this.y = y;         // Y position
        this.z = z;         // Z position
        this.visible = true; // Visibility flag

        // Velocity for patrolling (only on x and y axes)
        this.vx = random(-2, 2); // Random X velocity
        this.vy = random(-2, 2); // Random Y velocity
    }

    checkCollision(player) {
        const distance = dist(this.x, this.y, this.z, player.x, player.y, player.z);
        return distance < 100; // Adjust collision threshold as needed
    }

    checkObstacleCollision(other) {
        const distance = dist(this.x, this.y, this.z, other.x, other.y, other.z);
        return distance < 50; // Adjust collision threshold based on obstacle size
    }

    checkItemCollision(item) {
        const distance = dist(this.x, this.y, this.z, item.x, item.y, item.z);
        return distance < 50; // Adjust collision threshold based on item size
    }

    updatePosition() {
        // Update position based on velocity (only x and y)
        this.x += this.vx;
        this.y += this.vy;

        // Reverse direction if hitting canvas boundaries (only x and y)
        if (this.x > 400 || this.x < -400) this.vx *= -1;
        if (this.y > 400 || this.y < -400) this.vy *= -1;
    }

    drawObstacle() {
        if (!this.visible) return; // Skip drawing if not visible

        push(); // Save the current drawing state
        translate(this.x, this.y); // Move to the object's position
        noStroke(); // Disable stroke for the shape

        if (this.texture) {
            texture(this.texture); // Apply texture if provided
        }

        // Draw the specified shape
        switch (this.shape) {
            case 'box':
                box(50);
                break;
            case 'sphere':
                sphere(50); // Draw a sphere with radius 50
                break;
            case 'cylinder':
                cylinder(30, 100); // Draw a cylinder with radius 30 and height 100
                break;
            default:
                console.error('Unknown shape:', this.shape);
        }

        pop(); // Restore the previous drawing state
    }
}