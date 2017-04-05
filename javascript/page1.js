// Sondre Gjellestad | 2017

function setup() {
  loadFiles(0);

  // Setter opp canvas
  var canvas = createCanvas(600, 200, P2D);
  canvas.parent('animation');
  frameRate(60);

  // Initialisere animasjon
  anim = new Anim();

  // Innstillinger for tegning
  noStroke();
  fill(200);
  textAlign(CENTER, CENTER);
  textSize(10);

  // Setter opp HTML elementer for brukerinteraksjon
  setupHTML();
}

function setupHTML() {
  button = createButton('Replay');
  button.parent('animation');
  button.mouseClicked(replay);
}

function Anim() {
  this.carX = 0;
  this.done = 0;

  this.reset = function() {
    this.carX = 0;
    this.done = 0;
  }

  this.update = function() {
    if (this.carX > 350) {
      if (this.done == 0) {
        carSound.play();
        this.done = 1;
      }
    } else {
      this.carX += 1.5;
    }
  }

  this.render = function() {
    background(150, 150, 240);
    rect(0, 150, width, 50);
    image(car, this.carX, 100, 175, 100);
    image(sign, 525, 450 - this.carX, 55, 50);
  }
}

function replay() {
  anim.reset();
}

function draw() {
  background(255);
  if (ready) {
    anim.update();
    anim.render();
  } else {
    text("Loading", width / 2, height / 2);
  }
}
