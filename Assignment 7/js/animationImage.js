class animationImage {
    constructor(fileNames, x, y, width, height, frameDelay = 5) {
        this.fileNames = fileNames;
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.images = [];
        this.currentFrame = 0;
        this.frameDelay = frameDelay;
        this.frameCount = 0;
        this.rotation = 0; // Add rotation property
        this.flip = 1; // Add flip property
        this.loadAnimations();
    }

    updatePos(newX, newY) {
        this.x = newX;
        this.y = newY;
    }

    setRotation(angle) {
        this.rotation = angle;
    }

    setFlip(flip) {
        this.flip = flip;
    }

    loadAnimations() {
        for (let i = 0; i < this.fileNames.length; i++) {
            this.images[i] = loadImage(this.fileNames[i]);
        }
    }

    drawAnimation() {
        if (this.images.length > 0) {
            push();
            translate(this.x, this.y);
            rotate(this.rotation);
            scale(this.flip, 1); // Apply flip
            imageMode(CENTER);
            image(this.images[this.currentFrame], 0, 0, this.w * this.flip, this.h); // Adjust width for flip
            pop();
            this.frameCount++;
            if (this.frameCount >= this.frameDelay) {
                this.currentFrame = (this.currentFrame + 1) % this.images.length;
                this.frameCount = 0;
            }
        } else {
            console.error("Images not loaded");
        }
    }

    setAnimation(fileNames) {
        this.fileNames = fileNames;
        this.images = [];
        this.currentFrame = 0;
        this.loadAnimations();
    }
}