// Sondre Gjellestad | 2017

function setup() {
  startLoad(0);

  // Creating canvas
  canvas = createCanvas(600, 200, P2D);
  canvas.parent('canvas');

  // Set pen
  stroke(0);
  strokeWeight(3);

  // Create particle objects
  particles = [];
  for (var i = 0; i < 200; i++) {
    particles[i] = new Particle();
  }
}

function Particle() {
  this.pos = createVector(random(0, width), random(0, height));
  this.vel = createVector(random(-1, 1), random(-1, 1));

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.edges = function() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }

  this.render = function() {
    point(this.pos.x, this.pos.y);
  }
}

function draw() {
  if (ready) {
    background(255);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].edges();
      particles[i].render();
    }
  }
}
