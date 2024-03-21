// PART 2

const testData =
  'ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26';

const csv =
  'Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232';

let row = testData.split('\n');

const table = [];

row.forEach((r) => {
  let rowData = r.split(',');
  table.push(rowData);
});

// console.log(table);

// PART 3
// SEPARATE THE TITLES INTO ITS OWN ARRAY
const titles = table.shift();

// CREATING ARRAYS TO STORE THE PEOPLE AND THE KEYS
const people = [];
const keys = [];

titles.forEach((title) => {
  const key = title.toLowerCase();
  keys.push(key);
});

table.forEach((row) => {
  const person = {};

  for (let i = 0; i < row.length; i++) {
    person[keys[i]] = row[i];
  }

  people.push(person);
});

// console.log(people);

// PART 4
// REMOVED THE LAST ELEMENT
people.pop();
// INSERT AT INDEX 1
const p = { id: '48', name: 'Barry', occupation: 'Runner', age: '25' };
people.splice(1, 0, p);
// ADD PERSON TO THE END
const lastPerson = { id: '7', name: 'Bilbo', occupation: 'None', age: '111' };
people.push(lastPerson);
// console.log(people);

let sum = 0;
people.forEach((person) => {
  sum += parseInt(person.age);
});
const averageAge = sum / people.length;
// console.log(averageAge);

// USES THE REDUCE METHOD
const ages = people.reduce((acc, person) => {
  return (acc += parseInt(person.age));
}, 0);
console.log(ages / people.length);

// PART 5

const allValues = [];
people.forEach((person, i) => {
  allValues.push(...Object.values(person));
});

let converted = '';

allValues.forEach((val, i) => {
  if (i === allValues.length - 1) {
    converted += `${val}`;
  } else if ((i + 1) % 4 === 0) {
    converted += `${val}\\n`;
  } else {
    converted += `${val},`;
  }
});

console.log(converted);
