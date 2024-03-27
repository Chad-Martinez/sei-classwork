type Ship = {
  hull: number;
  firepower: number;
  accuracy: number;
};

const captainShip: Ship = {
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
const selectCaptain = document.querySelector('.captain__container');
console.log(selectCaptain);
const selectShipModal = document.getElementById('ship-modal') as HTMLDivElement;
const selectShip = document.querySelector('.ship__container');
console.log('SHIP ', selectShip);
const backdrop = document.getElementById('backdrop') as HTMLDivElement;

const captain = document.getElementById('captain') as HTMLDivElement;
const omicronShipCount = document.getElementById(
  'ship-count'
) as HTMLDivElement;
const captainHull = document.getElementById(
  'captain-hull'
) as HTMLProgressElement;

const omicron = document.getElementById('omicron') as HTMLDivElement;
const omicronHull = document.getElementById(
  'omicron-hull'
) as HTMLProgressElement;
const captainHullTitle: HTMLElement =
  document.getElementById('captain-hull-title');
const captainBubble: HTMLElement = document.getElementById('captain-bubble');
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
    const captainImg = captain.children[0]
      .firstElementChild as HTMLImageElement;
    captainImg.setAttribute('src', 'images/zapp-main.webp');
    captainImg.setAttribute('alt', 'Zapp');
  }
  if (shipName === 'nimbus-select') {
    const ship = captain.children[1].firstElementChild as HTMLImageElement;
    ship.setAttribute('src', 'images/nimbus.webp');
    ship.setAttribute('alt', 'Nimbus');
    ship.style.height = '320px';
    captainHullTitle.innerText = 'Nimbus Hull';
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

const speak = (element: HTMLElement, dialog: string): void => {
  element.innerText = dialog;
  element.style.opacity = '1';
  setTimeout(() => {
    element.style.opacity = '0';
  }, 2800);
};

const omicronFleet: Array<Ship> = alienShipFactory(alienCount);

const fireLasers = (player: HTMLDivElement): void => {
  const ship = player.children[1].lastElementChild as HTMLImageElement;
  ship.classList.add('fire');
  setTimeout(() => ship.classList.remove('fire'), 600);
};

const subtractDamage = (
  offense: Ship,
  defense: Ship,
  defenseHull: HTMLProgressElement
) => {
  defense.hull -= offense.firepower;
  defenseHull.value = defense.hull;
};

const omicronAttack = (): void => {
  if (isHit(omicronFleet[omicronFleet.length - 1].accuracy)) {
    fireLasers(omicron);
    subtractDamage(
      omicronFleet[omicronFleet.length - 1],
      captainShip,
      captainHull
    );
    speak(omicronBubble, OMICRON_HIT_DIALOG);
  } else {
    speak(omicronBubble, OMICRON_MISS_DIALOG);
  }
};

const attack = (): void => {
  if (omicronFleet.length > 0) {
    if (isHit(captainShip.accuracy)) {
      fireLasers(captain);
      subtractDamage(
        captainShip,
        omicronFleet[omicronFleet.length - 1],
        omicronHull
      );
      speak(captainBubble, CAPTAIN_HIT_DIALOG);
      // console.log('SHIP POSITION ', ship.getBoundingClientRect());
      // ship.classList.add('retreat');
    } else {
      speak(captainBubble, CAPTAIN_MISS_DIALOG);
    }
    if (omicronFleet[omicronFleet.length - 1].hull > 0) {
      setTimeout(omicronAttack, 500);
    } else {
      omicronFleet.pop();
      speak(captainBubble, CAPTAIN_DESTROY_DIALOG);
      omicronShipCount.innerText = omicronFleet.length.toString();
      setOmicronHull(omicronFleet[omicronFleet.length - 1].hull);
    }
  }
};
selectCaptain.addEventListener('click', selectCaptainHandler);
selectShip.addEventListener('click', selectShipHandler);
attackBtn.addEventListener('click', attack);
