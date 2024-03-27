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

let captainName: string;
let shipName: string;
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

const captain = document.getElementById('captain') as HTMLImageElement;
const ship = document.getElementById('player-ship') as HTMLImageElement;
const shipLaser = document.getElementById(
  'captain-ship-laser'
) as HTMLImageElement;
const omicronShipCount = document.getElementById(
  'ship-count'
) as HTMLDivElement;
const playerHull = document.getElementById(
  'player-hull'
) as HTMLProgressElement;
const omicronShip = document.getElementById('omicron-ship') as HTMLImageElement;
const omicronLaser = document.getElementById(
  'omicron-ship-laser'
) as HTMLImageElement;
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
    ? (captainName = e.target.id)
    : (captainName = 'leela-select');

  toggleCaptainModal();
  toggleShipModal();
};

const selectShipHandler = (e: InputEvent): void => {
  e.target instanceof HTMLButtonElement
    ? (shipName = e.target.id)
    : (shipName = 'planet-express-select');

  if (captainName === 'zapp-select') {
    captain.setAttribute('src', 'images/zapp-main.webp');
    captain.setAttribute('alt', 'Zapp');
  }
  if (shipName === 'nimbus-select') {
    ship.setAttribute('src', 'images/nimbus.webp');
    ship.setAttribute('alt', 'Nimbus');
    ship.style.height = '320px';
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

const fireLasers = (ship: HTMLImageElement): void => {
  ship.classList.add('fire');
  setTimeout(() => ship.classList.remove('fire'), 600);
};

const omicronAttack = (): void => {
  if (isHit(omicronFleet[omicronFleet.length - 1].accuracy)) {
    fireLasers(omicronLaser);
    playerShip.hull -= omicronFleet[omicronFleet.length - 1].firepower;
    playerHull.value = playerShip.hull;
    speak(omicronBubble, OMICRON_HIT_DIALOG);
  } else {
    speak(omicronBubble, OMICRON_MISS_DIALOG);
  }
};

const attack = (): void => {
  console.log(omicronFleet);

  if (omicronFleet.length > 0) {
    if (isHit(playerShip.accuracy)) {
      fireLasers(shipLaser);
      omicronFleet[omicronFleet.length - 1].hull -= playerShip.firepower;
      omicronHull.value = omicronFleet[omicronFleet.length - 1].hull;
      speak(playerBubble, CAPTAIN_HIT_DIALOG);
      // console.log('SHIP POSITION ', ship.getBoundingClientRect());
      // ship.classList.add('retreat');
    } else {
      speak(playerBubble, CAPTAIN_MISS_DIALOG);
    }
    if (omicronFleet[omicronFleet.length - 1].hull > 0) {
      setTimeout(omicronAttack, 500);
    } else {
      omicronFleet.pop();
      speak(playerBubble, CAPTAIN_DESTROY_DIALOG);
      omicronShipCount.innerText = omicronFleet.length.toString();
      setOmicronHull(omicronFleet[omicronFleet.length - 1].hull);
    }
  }
};
selectLeela.addEventListener('click', selectCaptainHandler);
selectZapp.addEventListener('click', selectCaptainHandler);
selectPlanetExpress.addEventListener('click', selectShipHandler);
selectNimbus.addEventListener('click', selectShipHandler);
attackBtn.addEventListener('click', attack);
