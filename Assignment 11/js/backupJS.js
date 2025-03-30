//Just a file for back up scripts and functions that I may need later on.

function spawnBoxes(count) {
    for (let i = 0; i < count; i++) {
      let boximage = createSprite(random(50, 800), random(50, 800), 'static');
      boximage.img = "./images/box.jpg";
      boximage.scale = 0.05;
      boximage.width = 100;
      boximage.height = 150;
    }
  }


  function createBoxes() {
    for (let i = 0; i < 3; i++) {
      let box = createSprite(random(100, 700), random(100, 700), 100, 100, 'static');
      box.img = "/images/box.jpg";
      box.scale = 0.05;
      box.width = 100;
      box.height = 150;
      box.health = 200; // Add health property to each box
      boxes.push(box);
    }
  }

} else if (kb.pressing('x')) {
  myAnimation.drawAnimation('Attack');
  for (let box of boxes) {
    if (dist(myAnimation.getCurrentAnimation().position.x, myAnimation.getCurrentAnimation().position.y, box.position.x, box.position.y) < 100) {
      box.health -= 1; // Reduce box health by 1
      createParticles(box.position.x, box.position.y); // Corrected positioning
      if (box.health <= 0) {
        box.remove(); // Remove the box if health is zero
        boxes = boxes.filter(b => b !== box); // Update the boxes array
      }
    }
  }
}