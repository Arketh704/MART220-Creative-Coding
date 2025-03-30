class zombieFood {
  constructor(x, y, isGood) {
    this.x = x;
    this.y = y;
    this.isGood = isGood;
    this.foodPiece = new Sprite(x, y, 30,);
  }

  draw() {
    if (this.isGood) {
        this.foodPiece.color = "green"
    } else {
        this.foodPiece.color = "red"
    }
  }
}