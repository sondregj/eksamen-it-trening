// Sondre Gjellestad | 2017

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

function setup() {
  ready = false;
  loadcount = 0;

  car = loadImage('img/car.png', checkload);
  sign = loadImage('img/sign.png', checkload);
  carSound = loadSound('sound/car-sound.mp3', checkload);

  var canvas = createCanvas(600, 200, P2D);
  canvas.parent('animation');
  frameRate(60);
  
  

  noStroke();
  fill(200);

  button = createButton('Replay');
  button.parent('animation');
  button.mouseClicked(replay);

  textAlign(CENTER, CENTER);
  textSize(10);
}

function checkload() {
  loadcount++;
  if (loadcount == 3) { // Things to do when everything is loaded.
    ready = true;
    anim = new Anim();
  }
}

function draw() {
  background(255);
  if (ready) {
    anim.update();
    anim.render();
    console.log("Hello");
  } else {
    text("Loading", width / 2, height / 2);
  }
}
