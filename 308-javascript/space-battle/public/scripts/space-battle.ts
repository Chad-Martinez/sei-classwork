type Ship = {
  hull: number;
  firepower: number;
  accuracy: number;
};

const playerShip: Ship = {
  hull: 20,
  firepower: 4,
  accuracy: 0.7,
};

let captain: string;
let ship: string;
const alienCount: number = 5;

const CAPTAIN_HIT_DIALOG = 'Yes! Direct Hit!';
const CAPTAIN_MISS_DIALOG = 'Rats! We missed!';
const CAPTAIN_DESTROY_DIALOG = 'Another one bites the dust!';

const OMICRON_HIT_DIALOG = 'Hit!! Soon you will meet your fate!';
const OMICRON_MISS_DIALOG = 'Miss? Unacceptable! Recalibrate lasers!';
const OMICRON_DESTROY_DIALOG = 'MUAH AHAH AH! Doooom!';

const gameArea = document.getElementById('game-area');
const selectCaptainModal = document.getElementById('captain-modal');
const selectLeela = document.getElementById('leela-select');
const selectZapp = document.getElementById('zapp-select');
const selectShipModal = document.getElementById('ship-modal');
const selectPlanetExpress = document.getElementById('planet-express-select');
const selectNimbus = document.getElementById('nimbus-select');
const backdrop = document.getElementById('backdrop');

const setCaptain = document.getElementById('captain');
const setShip = document.getElementById('player-ship');
const shipCount = document.getElementById('ship-count');
const playerHull = document.getElementById('player-hull');
const omicronHull = document.getElementById('omicron-hull');
const playerHullTitle = document.getElementById('player-hull-title');
const playerBubble = document.getElementById('player-bubble');
const omicronBubble = document.getElementById('omicron-bubble');

const attackBtn = document.getElementById('attack-btn');

const toggleBackdrop = () => {
  backdrop.classList.remove('visible');
};

const toggleCaptainModal = () => {
  selectCaptainModal.classList.remove('visible');
};

const toggleShipModal = () => {
  selectShipModal.classList.add('visible');
  toggleBackdrop();
};

const selectCaptainHandler = (e) => {
  captain = e.target.id;
  toggleCaptainModal();
  toggleShipModal();
};

const selectShipHandler = (e) => {
  ship = e.target.id;

  if (captain === 'zapp-select') {
    setCaptain.setAttribute('src', 'images/zapp-main.webp');
    setCaptain.setAttribute('alt', 'Zapp');
  }
  if (ship === 'nimbus-select') {
    setShip.setAttribute('src', 'images/nimbus.webp');
    setShip.setAttribute('alt', 'Nimbus');
    setShip.style.height = '320px';
    playerHullTitle.innerText = 'Nimbus Hull';
  }

  selectShipModal.classList.remove('visible');
  gameArea.classList.remove('opacity');
  setOmicronHull(omicronFleet[omicronFleet.length - 1].hull);
};

const alienShipFactory = (fleetCount) => {
  const alienFleet: Array<Ship> = [];
  for (let i = 0; i < fleetCount; i++) {
    alienFleet.push({
      hull: Number(Math.floor(Math.random() * (7 - 5 + 1) + 5).toFixed(3)),
      firepower: Math.floor(Math.random() * (4 - 2 + 1) + 2),
      accuracy: (Math.random() * (8 - 6 + 1) + 6) / 10,
    });
  }
  console.log('GENERATED FLEET ', alienFleet);
  return alienFleet;
};

const isHit = (accuracy: number): boolean =>
  accuracy > Math.random() ? true : false;

const setOmicronHull = (hullValue) => {
  omicronHull.max = hullValue;
  omicronHull.value = hullValue;
};

const speak = (element, dialog) => {
  element.innerText = dialog;
  element.style.opacity = 1;
  setTimeout(() => {
    element.style.opacity = 0;
  }, 2500);
};

const omicronFleet: Array<Ship> = alienShipFactory(alienCount);

const omicronAttack = () => {
  if (isHit(omicronFleet[omicronFleet.length - 1].accuracy)) {
    playerShip.hull -= omicronFleet[omicronFleet.length - 1].firepower;
    playerHull.value = playerShip.hull;
    speak(omicronBubble, OMICRON_HIT_DIALOG);
  } else {
    speak(omicronBubble, OMICRON_MISS_DIALOG);
  }
};

const attack = () => {
  console.log(omicronFleet);

  if (omicronFleet.length > 0) {
    if (isHit(playerShip.accuracy)) {
      omicronFleet[omicronFleet.length - 1].hull -= playerShip.firepower;
      omicronHull.value = omicronFleet[omicronFleet.length - 1].hull;
      speak(playerBubble, CAPTAIN_HIT_DIALOG);
    } else {
      speak(playerBubble, CAPTAIN_MISS_DIALOG);
    }
    if (omicronFleet[omicronFleet.length - 1].hull > 0) {
      setTimeout(omicronAttack, 500);
    } else {
      omicronFleet.pop();
      speak(playerBubble, CAPTAIN_DESTROY_DIALOG);
      shipCount.innerText = omicronFleet.length.toString();
      setOmicronHull(omicronFleet[omicronFleet.length - 1].hull);
    }
  }
};
selectLeela.addEventListener('click', selectCaptainHandler);
selectZapp.addEventListener('click', selectCaptainHandler);
selectPlanetExpress.addEventListener('click', selectShipHandler);
selectNimbus.addEventListener('click', selectShipHandler);
attackBtn.addEventListener('click', attack);
