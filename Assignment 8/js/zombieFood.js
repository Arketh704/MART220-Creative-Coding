class zombieFood {
  constructor(x, y, isGood) {
    this.x = x;
    this.y = y;
    this.isGood = isGood;
    this.foodPiece = new Sprite(x, y, 30);
  }

  draw() {
    if (this.isGood) {
        this.foodPiece.color = "green"
    } else {
        this.foodPiece.color = "red"
    }
  }


  updatePosition(newX, newY) {
    this.x = newX;
    this.y = newY;
    this.foodPiece.position.x = newX;
    this.foodPiece.position.y = newY;
  }
}