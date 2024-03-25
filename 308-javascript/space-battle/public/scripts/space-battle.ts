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

const CAPTAIN_HIT_DIALOG: string = 'Yes! Direct Hit!';
const CAPTAIN_MISS_DIALOG: string = 'Rats! We missed!';
const CAPTAIN_DESTROY_DIALOG: string = 'Another one bites the dust!';

const OMICRON_HIT_DIALOG: string = 'Hit!! Soon you will meet your fate!';
const OMICRON_MISS_DIALOG: string = 'Miss? Unacceptable! Recalibrate lasers!';
const OMICRON_DESTROY_DIALOG: string = 'MUAH AHAH AH! Doooom!';

const gameArea = document.getElementById('game-area') as HTMLDivElement;
const selectCaptainModal = document.getElementById(
  'captain-modal'
) as HTMLDivElement;
const selectLeela = document.getElementById(
  'leela-select'
) as HTMLButtonElement;
const selectZapp = document.getElementById('zapp-select') as HTMLButtonElement;
const selectShipModal = document.getElementById('ship-modal') as HTMLDivElement;
const selectPlanetExpress = document.getElementById(
  'planet-express-select'
) as HTMLButtonElement;
const selectNimbus = document.getElementById(
  'nimbus-select'
) as HTMLButtonElement;
const backdrop = document.getElementById('backdrop') as HTMLDivElement;

const setCaptain = document.getElementById('captain') as HTMLImageElement;
const setShip = document.getElementById('player-ship') as HTMLImageElement;
const shipCount = document.getElementById('ship-count') as HTMLDivElement;
const playerHull = document.getElementById(
  'player-hull'
) as HTMLProgressElement;
const omicronHull = document.getElementById(
  'omicron-hull'
) as HTMLProgressElement;
const playerHullTitle: HTMLElement =
  document.getElementById('player-hull-title');
const playerBubble: HTMLElement = document.getElementById('player-bubble');
const omicronBubble: HTMLElement = document.getElementById('omicron-bubble');

const attackBtn: HTMLElement = document.getElementById('attack-btn');

const toggleBackdrop = (): void => backdrop.classList.remove('visible');

const toggleCaptainModal = (): void =>
  selectCaptainModal.classList.remove('visible');

const toggleShipModal = (): void => {
  selectShipModal.classList.add('visible');
  toggleBackdrop();
};

const selectCaptainHandler = (e: InputEvent): void => {
  console.log(e);
  e.target instanceof HTMLButtonElement
    ? (captain = e.target.id)
    : (captain = 'leela-select');

  toggleCaptainModal();
  toggleShipModal();
};

const selectShipHandler = (e: InputEvent): void => {
  e.target instanceof HTMLButtonElement
    ? (ship = e.target.id)
    : (ship = 'planet-express-select');

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

const alienShipFactory = (fleetCount: number): Array<Ship> => {
  const alienFleet: Array<Ship> = [];
  for (let i = 0; i < fleetCount; i++) {
    alienFleet.push({
      hull: Number(Math.floor(Math.random() * (7 - 5 + 1) + 5).toFixed(3)),
      firepower: Math.floor(Math.random() * (4 - 2 + 1) + 2),
      accuracy: (Math.random() * (8 - 6 + 1) + 6) / 10,
    });
  }
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
