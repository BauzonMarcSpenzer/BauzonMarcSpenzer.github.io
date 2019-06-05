var ship;
var invaders = [];
var drops = [];

var isOver = false;

function setup() {
  createCanvas(600, 400);
  ship = new Ship();
  // drop = new Drop(width/2, height/2);
  for (var i = 0; i < 6; i++) {
    invaders[i] = new Invader(i*80+80, 60);
  }
}

function draw() {
  background(51);
  ship.show();
  ship.move();

  if(isOver)
  {
    deathScreen();
    return;
  }

  for (var i = 0; i < drops.length; i++) {
    drops[i].show();
    drops[i].move();
    for (var j = 0; j < invaders.length; j++) {
      if (drops[i].hits(invaders[j])) {
        invaders[j].grow();
        drops[i].evaporate();
        invaders.splice(j, 1);
        break;
      }
    }
  }

  var edge = false;

  for (var i = 0; i < invaders.length; i++) {
    invaders[i].show();
    invaders[i].move();
    if (invaders[i].x > width || invaders[i].x < 0) {
      edge = true;
    }
  }

  if (edge) {
    for (var i = 0; i < invaders.length; i++) {
      invaders[i].shiftDown();
    }
  }

  for (var i = drops.length-1; i >= 0; i--) {
    if (drops[i].toDelete) {
      drops.splice(i, 1);
    }
  }

  if(invaders[0].y > height - 20)
  {
    isOver = true;
  }

}

function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}


function keyPressed() {
  if (key === ' ') {
    var drop = new Drop(ship.x, height);
    drops.push(drop);
  }

  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}




function deathScreen() {
  textSize(48);
  fill(255, 0, 0);
  textStyle(BOLD);
  text("GAME OVER", 200, 200);
  fill(128);
  textSize(30);
  text("Want to try again? Thanks for playing :) ", 100, 100);

}

