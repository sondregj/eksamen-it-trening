// Sondre Gjellestad | 2017

var speedInit = 1;
var printPenalty = 0;

function setup() {
  loadFiles(1);

  // Bruker ikke canvas
  noCanvas();

  // Initialisere timer og database
  timer = new Timer();
  database = new Database();
  ui = new UI();


  timer.init();
  database.init(); // initialiserer databasen med eksempler
  ui.init();

  // Sette opp HTML-elementer for brukerinteraksjon
  ui.update();
}


function UI() {
  this.init = function() {
    // Fart og timer
    speedOut = createP('');
    speedOut.parent('speed');

    timeOut = createP('');
    timeOut.parent('time');
    timerToggle = createButton('Start | stopp');
    timerToggle.parent('time');
    timerToggle.mousePressed(timer.toggle);

    // Valg av distanse
    distanceInput = createSlider(0, 5000, 250, 25)
    distanceInput.parent('distance');
    distanceInput.input(ui.update);
    distOut = createSpan('');
    distOut.parent('distance');

    // Valg av fartsgrense
    speedLimit = createSlider(10, 130, 50, 10);
    speedLimit.parent('speedlimit');
    speedLimit.input(ui.update);
    limitOut = createSpan('');
    limitOut.parent('speedlimit');

    // Fartsbot
    penalty = createSpan('Ingen bot.');
    penalty.parent('penalty')

    // Loggføring
    carId = createInput('', text);
    carId.parent('regcheck');
    carId.input(ui.update);
    carId.attribute("maxlength", "7");
    carId.attribute("placeholder", "Registreringsnummer");

    lookupResult = createP('');
    lookupResult.parent('lookup');

    vehiclePenalty = createP('');
    vehiclePenalty.parent('lookup');

    // Legge til kjøretøy i database
    vehicleType = createSelect(0);
    vehicleType.option('Type ');
    vehicleType.option('Personbil');
    vehicleType.option('Buss');
    vehicleType.option('Lastebil');
    vehicleType.option('Moped');
    vehicleType.option('Motorsykkel');
    vehicleType.changed(ui.update);
    vehicleType.parent('addData');
    vehicleType.input(ui.update);

    maxVel = createP('<b>Tillatt toppfart | </b>');
    maxVel.parent('addData');
    maxVel.id('maxVel');
    maxVelOut = createSpan('');
    maxVelOut.parent('maxVel');
    vehicleMaxVel = createSlider(10, 200, 90, 5);
    vehicleMaxVel.parent('addData');
    vehicleMaxVel.input(ui.update);
    vehicleMaxVel.attribute("placeholder", "Tillatt toppfart");


    addButton = createButton('Legg til i register');
    addButton.parent('addData');
    addButton.mousePressed(database.addFromForm);
  }


  this.update = function() {
    // Oppdater uttekstfelt
    distOut.html(distanceInput.value() + " meter");
    limitOut.html(speedLimit.value() + "km/t");
    timeOut.html(timer.time);

    speed = floor((distanceInput.value() / (timer.currentmillis / 1000)) * 360) / 100;

    var speedString = speed.toString();

    var decimals = afterDecimal(speed);
    if (decimals == 0) {
      speedString += ".00";
    } else if (decimals == 1) {
      speedString = speedString + "0";

    }

    var digits = beforeDecimal(speed);
    if (digits == 2) {
      speedString = "0" + speedString;
    } else if (digits == 1) {
      speedString = "00" + speedString;
    } else if (digits == 0) {
      speedString = "000" + speedString;
    }



    if (speed > 1000) {
      speedOut.html("> 1000km/t");
      var penaltySpeed = "> 1000km/t";
    } else {
      speedOut.html(speedString + "km/t");
      var penaltySpeed = speed + "km/t";
    }

    if (timer.hasRun == 0) {
      speedOut.html("000.00km/t");
      timer.hasRun = 1;
    }

    var penaltyKr = penaltyCheck();
    if (penaltyKr == 0) {
      printPenalty = 0;
    } else if (penaltyKr > 0) {
      penaltyKr += "kr";
      printPenalty = 1;
    } else {
      printPenalty = 1;
    }
    var date = day() + "." + month() + "." + year();
    var minutePrint = minute();
    if (minutePrint < 10) {
      minutePrint = "0" + minutePrint;
    }
    var timenow = hour() + "." + minutePrint;
    if (carId.value() == 0) {
      regnr = "Mangler registreringsnummer";
    } else {
      regnr = carId.value();
    }
    if (printPenalty) {
      penalty.html(date + " | " + timenow + " | " + regnr + " | " + penaltySpeed + " | " + penaltyKr);
    } else {
      penalty.html('Ingen bot.')
    }

    var result = database.lookup(regnr);
    if (carId.value().length == 0) {
      lookupResult.html('Skriv inn registreringsnummer.');
    } else if (result == 0) {
      lookupResult.html('Ingen treff.');
    } else {
      var mS = result.maxSpeed;
      if (mS == 0) {
        mS = "ubegrenset";
      } else {
        mS = mS + "km/t";
      }
      lookupResult.html("Kjøretøy: " + result.type + " | Tillatt toppfart: " + mS);
    }
    
    if (!result.maxSpeed == 0) {
      if (speed > result.maxSpeed) {
        vehiclePenalty.html("Bot: " + date + ", " + timenow + ", " + regnr + ", Kjøretøyets toppfart: " + result.maxSpeed + "km/t, " + result.type + ", " + penaltySpeed + ", " + "10000kr");
      } else {
        vehiclePenalty.html('');
      }
    }
  
	
    
    var mVOut = vehicleMaxVel.value();
    if (mVOut == 200) {
      maxVelOut.html("Ubegrenset");
    } else {
      maxVelOut.html(mVOut + "km/t");
    }
  }
}

function Timer() {
  // Variabel som holder antall millisekunder tidtakeren har gått
  this.milliseconds = 0;
  this.running = 0;
  this.hasRun = 0;

  this.startmillis = 0;
  this.currentmillis = 0;
  this.time = 0;

  this.init = function() {
    this.time = "00 min | 00 sek | 000 ms";
  }

  this.toggle = function() {
    if (timer.running) {
      timer.running = 0;
    } else {
      timer.startmillis = millis();
      timer.running = 1;
    }
  }

  this.update = function() {
    this.currentmillis = millis() - this.startmillis;

    var mins = floor(this.currentmillis / 60000);
    if (mins < 10) {
      mins = "0" + mins;
    }

    var secs = floor(this.currentmillis / 1000);
    if (secs < 10) {
      secs = "0" + secs;
    }

    var ms = floor(this.currentmillis % 1000);
    if (ms < 10) {
      ms = "00" + ms;
    } else if (ms < 100) {
      ms = "0" + ms;
    }

    this.time = mins + " min" + " | " + secs + " sek | " + ms + " ms";
    ui.update();
  }
}

function Database() {
  this.storage = [];

  this.init = function() {
    // Denne funksjonen initialiserer databasen med eksempler for oppgaven.
    this.addEntry('SR19766', 'Lastebil', 80);
    this.addEntry('UV54545', 'Moped', 45);
    this.addEntry('GF98987', 'Buss', 100);
    this.addEntry('ST33445', 'Personbil', 0);
  }

  this.addFromForm = function() {
    var a = carId.value();
    if (a !== "") {
      var b = vehicleType.value();
      var c = vehicleMaxVel.value();
      if (c == 200) {c = 0;}
      database.addEntry(a, b, c);
    }
    ui.update();
  }

  this.addEntry = function(id_, type_, maxSpeed_) {
    this.storage.push({
      id: id_,
      type: type_,
      maxSpeed: maxSpeed_
    });
  }

  this.lookup = function(id) {
    for (var i = 0; i < this.storage.length; i++) {
      if (id == this.storage[i].id) {
        var result = this.storage[i];
      }
    }
    if (result) {
      return result;
    } else {
      return 0;
    }
  }
}

function penaltyCheck() {
  var limit = speedLimit.value();
  if (speed > limit) {
    var amount = speed - limit;
    if (limit <= 60) {
      if (amount <= 5) {
        speedPenalty = 750;
      } else if (amount <= 10) {
        speedPenalty = 2050;
      } else if (amount <= 15) {
        speedPenalty = 3700;
      } else if (amount <= 20) {
        speedPenalty = 5350;
      } else if (amount <= 25) {
        speedPenalty = 8300;
      } else {
        speedPenalty = "ANMELDELSE"
      }
    } else if (limit >= 70) {
      if (amount <= 5) {
        speedPenalty = 750;
      } else if (amount <= 10) {
        speedPenalty = 2050;
      } else if (amount <= 15) {
        speedPenalty = 3300;
      } else if (amount <= 20) {
        speedPenalty = 4600;
      } else if (amount <= 25) {
        speedPenalty = 6250;
      } else if (amount <= 30) {
        speedPenalty = 8300;
      } else if (amount <= 35) {
        speedPenalty = 9950;
      } else if (amount <= 40) {
        speedPenalty = 10400;
      } else {
        speedPenalty = "ANMELDELSE"
      }
    }
  } else {
    speedPenalty = 0;
  }
  return speedPenalty;
}

function afterDecimal(n) {
  var d = n.toString().split(".")[1];
  if (d) {
    return d.length;
  }
}

function beforeDecimal(n) {
  return n.toString().split(".")[0].length;
}

function draw() {
  if (timer.running) {
    timer.update();
  }
}
