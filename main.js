// Sondre Gjellestad | 2017


// Denne funksjonen holder styr på antall elementer som er lastet inn.
// Grunnen til at jeg har en egen funksjon for dette er at det muliggjør
// innlasting mens andre deler av skriptet kjører.
function checkload() {
  loadcount++;
  if ((pageId == 0 && loadcount == 3) || (pageId == 1 && loadcount == 0)) {
    ready = true;
  }
}

function loadFiles(pageId_) {
  pageId = pageId_;
  ready = false;
  loadcount = 0;
  if (pageId == 0) {
    car = loadImage('img/car.png', checkload);
    sign = loadImage('img/sign.png', checkload);
    carSound = loadSound('sound/car-sound.mp3', checkload);
  }
}
