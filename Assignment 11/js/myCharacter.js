class MyCharacter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation;
    this.createAnimation();
    this.speed = 4;
  }

  createAnimation() {
    this.currentAnimation = createSprite(this.x, this.y,);
  }

  loadAnimation(animationType, fileNames) {
    this.currentAnimation.addAnimation(animationType, fileNames[0], fileNames[fileNames.length - 1]);
    this.currentAnimation.width = 300;
    this.currentAnimation.height = 300;
  }

  drawAnimation(animationType) {
    this.currentAnimation.frameDelay = 5;
    this.currentAnimation.scale = 0.25;
    this.currentAnimation.changeAnimation(animationType);

    if (animationType == 'Walk' && this.direction == 'forward') {
      this.currentAnimation.direction = 0;
      this.currentAnimation.mirror.x = false;
      this.currentAnimation.speed = this.speed;
    } else if (animationType == 'Walk' && this.direction == 'reverse') {
      this.currentAnimation.mirror.x = true;
      this.currentAnimation.direction = 180;
      this.currentAnimation.speed = this.speed;
    } else if (animationType == 'Walk' && this.direction == 'down') {
      this.currentAnimation.mirror.x = false;
      this.currentAnimation.direction = -270;
      this.currentAnimation.speed = this.speed;
    } else if (animationType == 'Walk' && this.direction == 'up') {
      this.currentAnimation.mirror.x = false;
      this.currentAnimation.direction = 270;
      this.currentAnimation.speed = this.speed;
    } else {
      this.currentAnimation.velocity.x = 0;
      this.currentAnimation.velocity.y = 0;
    }
  }

  updatePosition(direction) {
    this.direction = direction;
  }

  isColliding(myImage) {
    return this.currentAnimation.collide(myImage);
  }

  isOverlapping(myImage) {
    return this.currentAnimation.overlap(myImage);
  }

  getCurrentAnimation() {
    return this.currentAnimation;
  }
}