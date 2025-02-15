var myAnimation;

function preload() {
    let fileNames = [
        "./assets/Walk (1).png",
        "./assets/Walk (2).png",
        "./assets/Walk (3).png",
        "./assets/Walk (4).png",
        "./assets/Walk (5).png",
        "./assets/Walk (6).png",
        "./assets/Walk (7).png",
        "./assets/Walk (8).png",
        "./assets/Walk (9).png",
        "./assets/Walk (10).png"
    ];
    myAnimation = new animationImage(fileNames, 0, 400, innerWidth / 6, innerHeight / 4, 4); 
}

function setup() 
{
    createCanvas(800, 600);
}

function draw()
{
    background("black");
    myAnimation.drawAnimation();
}