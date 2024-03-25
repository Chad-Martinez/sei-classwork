type Ship = {
  hull: number;
  firepower: number;
  accuracy: number;
};

const ussAssembly: Ship = {
  hull: 20,
  firepower: 5,
  accuracy: 0.7,
};

const selectCaptainModal = document.getElementById('captain-modal');
const selectLeela = document.getElementById('select-leela');
const selectZapp = document.getElementById('select-zapp');
const selectShipModal = document.getElementById('ship-modal');
const selectPlanetExpress = document.getElementById('select-planet-express');
const selectNimbus = document.getElementById('select-nimbus');
const backdrop = document.getElementById('backdrop');
const startGameButton = document.getElementById('start');

const toggleBackdrop = () => {
  backdrop.classList.remove('visible');
};

const toggleCaptainModal = () => {
  console.log('firing');
  selectCaptainModal.classList.remove('visible');
};

const toggleShipModal = () => {
  selectShipModal.classList.add('visible');
  toggleBackdrop();
};

let captain: string;
let ship: string;
let alienCount: number;

const selectCaptainHandler = (e) => {
  captain = e.srcElement.innerText;
  console.log('CAPTAIN ', captain);
  toggleCaptainModal();
  toggleShipModal();
};

const selectShipHandler = (e) => {
  ship = e.srcElement.innerText;
  console.log('SHIP ', ship);
  selectShipModal.classList.remove('visible');
  // startGame();
};

const alienShipFactory = (fleetCount) => {
  const alienFleet: Array<Ship> = [];
  for (let i = 0; i <= fleetCount; i++) {
    alienFleet.push({
      hull: Number(Math.floor(Math.random() * (6 - 3 + 1) + 3).toFixed(3)),
      firepower: Math.floor(Math.random() * (4 - 2 + 1) + 2),
      accuracy: (Math.random() * (8 - 6 + 1) + 6) / 10,
    });
  }
  return alienFleet;
};

const isHit = (accuracy: number): boolean =>
  accuracy > Math.random() ? true : false;

const startGame = () => {
  const alienFleet: Array<Ship> = alienShipFactory(alienCount);

  let remainingAlienShips = alienCount;
  let index = 0;

  outer: while (remainingAlienShips > 0) {
    console.log(`#####THE ALIENS HAVE ${remainingAlienShips} MORE SHIPS#####`);
    // console.log(
    //   '%c You have done ' + ' damage ',
    //   'font-style: italic; background: azure; border: 1px solid grey;'
    // );
    while (ussAssembly.hull > 0 && alienFleet[index].hull > 0) {
      if (ussAssembly.hull <= 0) break outer;
      if (isHit(ussAssembly.accuracy)) {
        alienFleet[index].hull -= ussAssembly.firepower;
        console.log('USS ASSEMBLY SCORED A HIT');
        console.log(`ALIEN SHIP HULL AT ${alienFleet[index].hull}`);
      } else {
        console.log('USS ASSEMBLY MISSED!');
      }
      if (alienFleet[index].hull > 0) {
        console.log('ALIEN SHIP PREPARING TO ATTACK');
        if (isHit(alienFleet[index].accuracy)) {
          ussAssembly.hull -= alienFleet[index].firepower;
          console.log('ALIEN SHIP SCORED A HIT');
          console.log(`USS ASSEMBLY HULL AT ${ussAssembly.hull}`);
        } else {
          console.log('ALIEN SHIP MISSED');
        }
      } else {
        console.log('Alien Ship Destroyed');
        // const retreat = prompt('Do you want to retreat? (yes or no)');
        // if (retreat.toLowerCase() === 'yes') break outer;
      }
    }
    remainingAlienShips -= 1;
  }
  console.log('SHIPS REMAINING ', remainingAlienShips);
  if (ussAssembly.hull > 0 && remainingAlienShips === 0) {
    console.log('YOU WON!!!!');
  } else if (ussAssembly.hull <= 0) {
    console.log('YOU LOST!!!');
  } else if (ussAssembly.hull > 0 && remainingAlienShips > 0) {
    console.log('YOU RETREATED - COWARD!!!');
  }
};

// const backdropClickHandler = () => {
//   toggleModal();
// };

selectLeela.addEventListener('click', selectCaptainHandler);
selectZapp.addEventListener('click', selectCaptainHandler);
selectPlanetExpress.addEventListener('click', selectShipHandler);
selectNimbus.addEventListener('click', selectShipHandler);

// backdrop.addEventListener('click', backdropClickHandler);

// ####### NOT USED #########

// CSS CONSOLE STYLES

// console.log(
//   '%cAltering the text experience',
//   'background-color: fuchsia ; color: white ; font-weight: bold ; ' +
//     'font-size: 20px ; font-style: italic ; text-decoration: underline ; ' +
//     "font-family: 'american typewriter' ; text-shadow: 1px 1px 3px black ;"
// );

// console.log(
//   '%cWelcome to Space Battle!',
//   'display: inline-block ; border: 3px solid red ; border-radius: 7px ; ' +
//     'padding: 10px ; margin: 20px ;' +
//     'font-size: 24px ; '
// );

// console.log(
//   '%cAre you ready?!',
//   'color: white ; font-weight: bold ; ' +
//     'margin: 20px ;' +
//     'font-size: 20px ; font-style: italic ; text-decoration: underline ; ' +
//     "font-family: 'american typewriter' ; text-shadow: 1px 1px 3px black ;"
// );

// console.log('space battle');
