// The initial numbers that must be verified.
const n1 = 10;
const n2 = 15;
const n3 = 20;
const n4 = 5;

// Check one: add up to 50
// This is a fairly simple operation using
// arithmetic operators and a comparison.
const isSum50 = n1 + n2 + n3 + n4 == 50;

// Check two: at least two odd numbers
// Here, we use modulus to check if something is odd.
// Since % 2 is 0 if even and 1 if odd, we can use
// arithmetic to count the total number of odd numbers.
const isTwoOdd = (n1 % 2) + (n2 % 2) + (n3 % 2) + (n4 % 2) >= 2;

// Check three: no number larger than 25
// This time, we use the OR operator to check
// if ANY of the numbers is larger than 25.
const isOver25 = n1 > 25 || n2 > 25 || n3 > 25 || n4 > 25;

// Check four: all unique numbers
// This is long, and there are more efficient
// ways of handling it with other data structures
// that we will review later.
const isUnique =
  n1 != n2 && n1 != n3 && n1 != n4 && n2 != n3 && n2 != n4 && n3 != n4;

// Here, we put the results into a single variable
// for convenience. Note how we negate isOver25 using
// the ! operator. We could also have tested for
// "isUnder25" as an alternative.
const isValid = isSum50 && isTwoOdd && !isOver25 && isUnique;

// Finally, log the results.
// console.log(isValid);

// Part 1
const firstLarger = n1 > n4;
console.log('Is first larger than last ' + firstLarger);

const result = ((n1 + n2) * 3) % n4;
console.log(`The result is ${result}`);

const isNotOver25 = n1 <= 25 || n2 <= 25 || n3 <= 25 || n4 <= 25;
// console.log(isNotOver25);

const isNotValid = isSum50 && isTwoOdd && isOver25 && isUnique;
console.log(isNotValid);

// Part 2
const trip = 1500;
const budget = 175;
const avgCost = 3;

const gallonsAtX = (mpg) => {
  return trip / mpg;
};

const isEnoughMoney = (totalGallons, speed) => {
  return totalGallons * avgCost <= budget;
};

const hoursAtX = (speed) => {
  return trip / speed;
};

//Calaculations t 55mpg
//Question 1
const gallonsAt55 = gallonsAtX(30);
console.log(`Gallons at 55mph = ${gallonsAt55}`);
//Question 2
const isEnoughMoneyAt55 = isEnoughMoney(gallonsAt55, 55);
console.log(`Do we have enough money at 55mph? ${isEnoughMoneyAt55}`);
// Question 3
const hoursAt55 = hoursAtX(55);
console.log(
  `It will take ${Math.round(hoursAt55)} hours to complete the trip at 55mph`
);

//Calculations at 60mph
//Question 1
const gallonsAt60 = gallonsAtX(28);
console.log(`Gallons at 60mph = ${Math.round(gallonsAt60)}`);

//Questions 2
const isEnoughMoneyAt60 = isEnoughMoney(gallonsAt60, 60);
console.log(`Do we have enough money 60mph? ${isEnoughMoneyAt60}`);

//Question 3
const hoursAt60 = hoursAtX(60);
console.log(
  `It will take ${Math.round(hoursAt60)} hours to complete the trip at 60mph`
);

//Calculations at 75
//Question 1
const gallonsAt75 = gallonsAtX(23);
console.log(`Gallons at 75mph = ${Math.round(gallonsAt75)}`);

//Questions 2
const isEnoughMoneyAt75 = isEnoughMoney(gallonsAt75, 75);
console.log(`Do we have enough money 75mph? ${isEnoughMoneyAt75}`);

//Question 3
const hoursAt75 = hoursAtX(75);
console.log(`It will take ${hoursAt75} hours to complete the trip at 75mph`);
