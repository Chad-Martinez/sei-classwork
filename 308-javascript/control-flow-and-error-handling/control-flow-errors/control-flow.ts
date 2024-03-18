const PI: number = 3.1415;
const radius: number = 5;
const area: number = PI * radius * radius;
const plantMin: number = 0.8;
const currentPlantCount: number = 20;

const plantGrowth = (weeks: number) => {
  return currentPlantCount * 2 ** weeks;
};

const capacity: number = area / plantMin;
const maxCapacity: number = capacity * 0.8;

const minCapacity: number = capacity * 0.5;
console.log(minCapacity);

const actionType = (weeks: number) => {
  const numOfPlants = plantGrowth(weeks);
  console.log(numOfPlants);
  try {
    if (numOfPlants > maxCapacity) {
      throw new Error('Time to prune');
    } else if (numOfPlants >= minCapacity && numOfPlants <= maxCapacity) {
      return 'Time to monitor';
    } else {
      return 'Time to plant';
    }
  } catch (error) {
    console.error(error);
    return 'Too many plants';
  }
};

// PART 1
console.log('1 week growth =', actionType(1));
console.log('2 week growth =', actionType(2));
console.log('3 week growth =', actionType(3));

// PART 2
// ADDITIONAL SPACE NEEDED
const morePlants: number = 100;
const plantsAfterTen: number = plantGrowth(10);
const plantAreaAfterTen: number = plantsAfterTen * plantMin;
console.log('We need ' + plantAreaAfterTen + ' square meters');

// NEW RADIUS
const lengthOfASide: number = Math.sqrt(plantAreaAfterTen);
const newRadius: number = lengthOfASide / 2;
console.log('The new radius is ', newRadius);

// PART 3
console.log('If the scientests started with 100 plants = ', actionType(10));
