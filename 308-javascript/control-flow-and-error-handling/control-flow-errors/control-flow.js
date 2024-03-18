var PI = 3.1415;
var radius = 5;
var area = PI * radius * radius;
var plantMin = 0.8;
var currentPlantCount = 20;
var plantGrowth = function (weeks) {
    return currentPlantCount * Math.pow(2, weeks);
};
var capacity = area / plantMin;
var maxCapacity = capacity * 0.8;
var minCapacity = capacity * 0.5;
console.log(minCapacity);
var actionType = function (weeks) {
    var numOfPlants = plantGrowth(weeks);
    console.log(numOfPlants);
    try {
        if (numOfPlants > maxCapacity) {
            throw new Error('Time to prune');
        }
        else if (numOfPlants >= minCapacity && numOfPlants <= maxCapacity) {
            return 'Time to monitor';
        }
        else {
            return 'Time to plant';
        }
    }
    catch (error) {
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
var morePlants = 100;
var plantsAfterTen = plantGrowth(10);
var plantAreaAfterTen = plantsAfterTen * plantMin;
console.log('We need ' + plantAreaAfterTen + ' square meters');
// NEW RADIUS
var lengthOfASide = Math.sqrt(plantAreaAfterTen);
var newRadius = lengthOfASide / 2;
console.log('The new radius is ', newRadius);
// PART 3
console.log('If the scientests started with 100 plants = ', actionType(10));
