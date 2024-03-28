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
const GAME_WON_TITLE = 'Congratulations Captain';
const GAME_WON_SLOGAN =
  "Call me cocky, but if there's an alien out there I can't kill, I haven't met him and killed him yet.";
const GAME_LOST_TITLE = 'DOOOOOOOOMMMMMM!!!';
const GAME_RETREAT_TITLE = 'COWARD!';
const GAME_RETREAT_SLOGAN =
  'My instincts are to hide in the barrel like the wiley fish.';

const OMICRON_HIT_DIALOG: string = 'Hit!! Soon you will meet your fate!';
const OMICRON_MISS_DIALOG: string = 'Miss? Unacceptable! Recalibrate lasers!';
const OMICRON_DESTROY_DIALOG: string = 'MUAH AHAH AH! Doooom!';

const backdrop = document.getElementById('backdrop') as HTMLDivElement;
const gameArea = document.getElementById('game-area') as HTMLDivElement;
const selectCaptainModal = document.getElementById(
  'captain-modal'
) as HTMLDivElement;
const selectShipModal = document.getElementById('ship-modal') as HTMLDivElement;
const gameFinishModal = document.getElementById(
  'game-finish-modal'
) as HTMLDivElement;

const selectCaptain = document.querySelector('.captain__container');
const selectShip = document.querySelector('.ship__container');

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

const attackBtn = document.getElementById('attack-btn') as HTMLButtonElement;
const retreatBtn = document.getElementById('retreat-btn') as HTMLButtonElement;

const toggleBackdrop = (): void => {
  backdrop.classList.toggle('visible');
};

const toggleCaptainModal = (): void =>
  selectCaptainModal.classList.remove('visible');

const toggleShipModal = (): void => {
  selectShipModal.classList.add('visible');
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
    const shipImg = captain.children[1].firstElementChild as HTMLImageElement;
    shipImg.setAttribute('src', 'images/nimbus.webp');
    shipImg.setAttribute('alt', 'Nimbus');
    shipImg.style.height = '320px';
    captainHullTitle.textContent = 'Nimbus Hull';
    captainShip.hull = 30;
    captainShip.firepower = 6;
    captainShip.accuracy = 0.5;
  }
  selectShipModal.classList.toggle('visible');
  toggleBackdrop();
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
  element.textContent = dialog;
  element.style.opacity = '1';
  setTimeout(() => {
    element.style.opacity = '0';
  }, 2800);
};

const omicronFleet: Array<Ship> = alienShipFactory(alienCount);

const fireLasers = (player: HTMLDivElement, hit: string): void => {
  const ship = player.children[1].lastElementChild as HTMLImageElement;
  ship.classList.add(`${hit}`);
  setTimeout(() => ship.classList.remove(`${hit}`), 600);
};

const gameFinish = (action: string): void => {
  const content = gameFinishModal.firstElementChild as HTMLDivElement;
  const title = content.firstElementChild as HTMLDivElement;
  const gameFinishImage = content.children[1] as HTMLImageElement;
  const slogan = content.children[2] as HTMLDivElement;
  if (action == 'retreat') {
    title.textContent = GAME_RETREAT_TITLE;
    gameFinishImage.setAttribute('src', 'images/zapp-fish-full.webp');
    gameFinishImage.setAttribute('alt', 'The Wiley Fish');
    slogan.textContent = GAME_RETREAT_SLOGAN;
    gameFinishModal.classList.toggle('visible');
  } else if (action == 'lose') {
    title.textContent = GAME_LOST_TITLE;
    gameFinishImage.setAttribute('src', 'images/lrrr-doom.webp');
    gameFinishImage.setAttribute('alt', 'Doooom!');
    gameFinishImage.style.width = '300px';
    slogan.textContent = '';
    gameFinishModal.classList.toggle('visible');
  } else {
    gameFinishModal.classList.toggle('visible');
  }
  toggleBackdrop();
};

const subtractDamage = (
  offense: Ship,
  defense: Ship,
  defenseHull: HTMLProgressElement
): number => {
  defense.hull -= offense.firepower;
  defenseHull.value = defense.hull;
  return defense.hull;
};

const omicronAttack = (): void => {
  if (isHit(omicronFleet[omicronFleet.length - 1].accuracy)) {
    fireLasers(omicron, 'hit');
    const enemyHull: number = subtractDamage(
      omicronFleet[omicronFleet.length - 1],
      captainShip,
      captainHull
    );
    enemyHull <= 0
      ? gameFinish('lose')
      : speak(omicronBubble, OMICRON_HIT_DIALOG);
  } else {
    fireLasers(omicron, 'miss');
    speak(omicronBubble, OMICRON_MISS_DIALOG);
  }
};

const attack = (): void => {
  if (omicronFleet.length > 0) {
    if (isHit(captainShip.accuracy)) {
      fireLasers(captain, 'hit');
      subtractDamage(
        captainShip,
        omicronFleet[omicronFleet.length - 1],
        omicronHull
      );
      speak(captainBubble, CAPTAIN_HIT_DIALOG);
      // console.log('SHIP POSITION ', ship.getBoundingClientRect());
      // ship.classList.add('retreat');
    } else {
      fireLasers(captain, 'miss');
      speak(captainBubble, CAPTAIN_MISS_DIALOG);
    }
    if (omicronFleet[omicronFleet.length - 1].hull > 0) {
      setTimeout(omicronAttack, 500);
    } else {
      omicronFleet.pop();
      if (omicronFleet.length <= 0) {
        gameFinish('win');
      } else {
        speak(captainBubble, CAPTAIN_DESTROY_DIALOG);
        retreatBtn.classList.remove('push--disabled');
        retreatBtn.classList.add('push--flat');
        omicronShipCount.textContent = omicronFleet.length.toString();
        setOmicronHull(omicronFleet[omicronFleet.length - 1].hull);
      }
    }
  }
};

const retreatHandler = (e) => {
  const ship = captain.children[1].firstElementChild as HTMLImageElement;
  ship.classList.toggle('retreat');
  setTimeout(() => {
    ship.classList.toggle('retreat');
    gameFinish('retreat');
  }, 1500);
};

const reset = (e: InputEvent) => {
  if (e.target instanceof HTMLButtonElement) location.reload();
};

selectCaptain.addEventListener('click', selectCaptainHandler);
selectShip.addEventListener('click', selectShipHandler);
attackBtn.addEventListener('click', attack);
retreatBtn.addEventListener('click', retreatHandler);
gameFinishModal.addEventListener('click', reset);
