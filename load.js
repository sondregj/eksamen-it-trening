// Sondre Gjellestad | 2017

/*
Denne funksjonen holder styr på antall elementer som er lastet inn.
Grunnen til at jeg har en egen funksjon for dette er at det muliggjør
innlasting mens andre deler av skriptet kjører.
*/

var loadPage1 = 3;
var loadPage2 = 0;

function startLoad(pageId_) {
  pageId = pageId_;
  ready = false;
  loadcount = 0;
  if (pageId == 0) {
    ready = true;
  }
  if (pageId == 1) {
    car = loadImage('img/car.png', checkLoad);
    sign = loadImage('img/sign.png', checkLoad);
    carSound = loadSound('sound/car-sound.mp3', checkLoad);
  } else if (pageId == 2) {
    ready = true;
  }
}

function checkLoad() {
  loadcount++;
  if ((pageId == 1 && loadcount == loadPage1) || (pageId == 2 && loadcount == loadPage2)) {
    ready = true;
  }
}
