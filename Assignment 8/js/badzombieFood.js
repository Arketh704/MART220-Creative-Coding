class badzombieFood 
{
    constructor(x, y) 
    {
        this.x = x;
        this.y = y;
    }

    drawbadFood() 
    {
        push();
        strokeWeight(0);
        fill('white');
        circle(this.x, this.y + 40, 10);
        fill('white');
        circle(this.x + 7, this.y + 40, 10);
        fill('white');
        rect(this.x, this.y, 8, 40);
        fill('green');
        ellipse(this.x + 4, this.y, 30, 55);
        pop();
    }

    updatebadFood(canvasWidth, canvasHeight)
    {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
    }
}
