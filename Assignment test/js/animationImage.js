class animationImage
{
    constructor(fileNames, x, y, width, height, frameDelay = 5)
    {
        this.fileNames = fileNames;
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.images = [];
        this.currentFrame = 0;
        this.frameDelay = frameDelay;
        this.frameCount = 0;
        this.loadAnimations();
    }

    loadAnimations()
    {
        for (let i = 0; i < this.fileNames.length; i++) {
            this.images[i] = loadImage(this.fileNames[i]);
        }
    }

    drawAnimation()
    {
        if (this.images.length > 0) {
            image(this.images[this.currentFrame], this.x, this.y, this.w, this.h);
            this.frameCount++;
            if (this.frameCount >= this.frameDelay) {
                this.currentFrame = (this.currentFrame + 1) % this.images.length;
                this.frameCount = 0;
            }
        } else {
            console.error("Images not loaded");
        }
    }   
}