function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('black');
  
  //pointer ref
  text(`${mouseX}, ${mouseY}`, 20, 20);
  
  
  //bottom of the bowl
  fill('white');
  stroke(0);
  ellipse(200, 277, 65, 35);
  
  //the bowl itself
  fill('white');
  stroke(0);
  ellipse(200, 224, 160, 125);
  
  //the broth
  fill('#967C28');
  stroke(0);
  ellipse(200, 210, 150, 95)
  
    // The chop sticks
  fill('white');
  stroke('#815A4B');
  line(20, 100, 200, 257);
  
  fill('white');
  stroke('#815A4B');
  line(100, 100, 200, 257);
  
  //noodle block
  fill('#D8C19E');
  stroke(0);
  rect(150, 200, 95, 45)
  
  noodleLines();
  
  //Egg 1
  fill('#FFFFFF');
  stroke(0);
  ellipse(200, 245, 45, 25)
  fill('#E8FF00');
  stroke(0);
  ellipse(205, 245, 25, 10)
  
  //Egg 2
  fill('#FFFFFF');
  stroke(0);
  ellipse(215, 235, 25, 45)
  fill('#E8FF00');
  stroke(0);
  ellipse(215, 225, 12, 20)
  
  //Fish cake 1
  fill('white');
  stroke(0);
  ellipse(200, 185, 50, 25);
  fill('purple');
  stroke(0);
  ellipse(200, 185, 25, 12);
  
  //Fish cake 2
  fill('white');
  stroke(0);
  ellipse(230, 185, 50, 25);
  fill('purple');
  stroke(0);
  ellipse(230, 185, 25, 12);
  

  
  
}

// Noodle block line function
function noodleLines(){
  var counter = 0
  var x1 = 152
  var y1 = 243
  var x2 = 247
  var y2 = 200
  while (counter <= 10){
    stroke('#70614A');
    line(x1, y2, x2, y2);
    y1 += 4
    y2 += 4
    counter += 1
  }
  
}
