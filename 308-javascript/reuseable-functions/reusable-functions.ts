// PART 1

// For example, stringsLongerThan(['say', 'hello', 'in', 'the', 'morning'], 3); would return ["hello", "morning"].
// Take a number, n, and print every number between 1 and n without using loops. Use recursion.

const numArr: Array<number> = [12, 3, 5, 42, 253, 21, 4, 6, 54];

// Take an array of numbers and return the sum.
const numSum = (numberArr: Array<number>): number =>
  numberArr.reduce((acc, curr) => acc + curr, 0);

console.log('SUM OF NUMBERS ', numSum(numArr));

// Take an array of numbers and return the average.
const average = (numberArr: Array<number>): number =>
  numSum(numberArr) / numberArr.length;

console.log('AVERAGE OF NUMBERS ', average(numArr));

// Take an array of strings and return the longest string.
const stringArr: Array<string> = ['say', 'hello', 'in', 'the', 'morning'];
const colors: Array<string> = ['green', 'blue', 'yellow', 'red', 'aquamarine'];

const longestString = (strArray: Array<string>): string => {
  const sortedArray = strArray.sort((a, b) => b.length - a.length);

  return sortedArray[0];
};

console.log('THE LONGEST STRING IS ', longestString(colors));

// Take an array of strings, and a number and return an array of the strings that are longer than the given number.
const numberOfChar = 4;
const stringsLongerThanNum = (
  stringArr: Array<string>,
  num: number
): Array<string> =>
  stringArr.filter((str: string): boolean => str.length > num);

console.log(
  `THE STRINGS LONGER THAN ${numberOfChar} ARE `,
  stringsLongerThanNum(stringArr, 4)
);

const countBetween = (num: number) => {
  if (num > 0) {
    console.log(num);
    countBetween(num - 1);
  }
};

countBetween(10);

// // PART 2
type Person = {
  id: string;
  name: string;
  occupation: string;
  age?: string;
  updated_at?: Date;
};

const people: Array<Person> = [
  { id: '42', name: 'Bruce', occupation: 'Knight', age: '41' },
  { id: '48', name: 'Barry', occupation: 'Runner', age: '25' },
  { id: '57', name: 'Bob', occupation: 'Fry Cook', age: '19' },
  { id: '63', name: 'Blaine', occupation: 'Quiz Master', age: '58' },
  { id: '7', name: 'Bilbo', occupation: 'None', age: '111' },
];

const sortByAge = (people: Array<Person>): Array<Person> =>
  people.sort((a: Person, b: Person) => parseInt(a.age) - parseInt(b.age));

console.log('PEOPLE SORTED BY AGE ', sortByAge(people));

const youngerThanFifty = (people: Array<Person>): Array<Person> =>
  people.filter((person: Person) => parseInt(person.age) < 50);

console.log('PEOPLE YOUNGER THAN 50 ', youngerThanFifty(people));

const mappedPeople = (
  people: Array<Person>
): Array<{ [key: string]: string }> =>
  people.map((person: Person) => {
    return {
      id: person.id,
      name: person.name,
      job: person.occupation,
      age: (parseInt(person.age) + 1).toString(),
    };
  });

console.log('MAPPED OBJECTS TO NEW ARRAY ', mappedPeople(people));

people.push({ id: '99', name: 'Jim', occupation: 'Coder' });

const avgAge = (people: Array<Person>): number =>
  people.reduce((acc, curr) => acc + parseInt(curr.age), 0);

// // PART 3

const incrementAge = (person: Person): void => {
  'age' in person
    ? (person.age = (parseInt(person.age) + 1).toString())
    : (person.age = '0');

  person.updated_at = new Date();
};

incrementAge(people[5]);
console.log('INCREMENTS AGE AND ADDS DATE PROPERTY ', people[5]);

const copiedPerson = (person: Person): Person => {
  // DEEP COPY TO PREVENT MANIPULATION OF ORIGINAL UPDATED_AT DATE OBJECT
  const newPerson: Person = JSON.parse(JSON.stringify(person));

  'age' in newPerson
    ? (newPerson.age = (parseInt(newPerson.age) + 1).toString())
    : (newPerson.age = '0');

  newPerson.updated_at = new Date();

  return newPerson;
};

const oldPerson: Person = people[5];
const newPerson: Person = copiedPerson(people[5]);
console.log('NEW COPIED PERSON ', newPerson);
console.log(
  'IS OLDPERSON DATE OBJECT === NEWPERSON DATE OBJECT? ',
  oldPerson.updated_at === newPerson.updated_at
);

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// ######## PART 4 & PART 5 - REVISITING PAST ASSIGNEMENTS ######## //
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// DATA COLLECTIONS

// // PART 2

// Declare a variable that stores the number of columns in each row of data within the CSV.
// Instead of hard-coding four columns per row, expand your code to accept any number of columns. This should be calculated dynamically based on the first row of data.

const testData: string =
  'ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26';

const testDataExtraColumn: string =
  'ID,Name,Occupation,Age,Gender\n42,Bruce,Knight,41,M\n57,Bob,Fry Cook,19,M\n63,Blaine,Quiz Master,58,F\n98,Bill,Doctor’s Assistant,26,M';

const csv: string =
  'Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232';

const formatData = (stringData: string): Array<Array<string>> => {
  const rows: Array<string> = stringData.split('\n');

  const table: Array<Array<string>> = [];

  rows.forEach((item: string) => {
    const rowData: Array<string> = item.split(',');
    table.push(rowData);
  });
  return table;
};

// ## TEST CASES ## //
const formatedTestData: Array<Array<string>> = formatData(testData);
const formatedExtraColumn: Array<Array<string>> =
  formatData(testDataExtraColumn);
const formatedCSV: Array<Array<string>> = formatData(csv);
console.log('ORIGNAL TEST DATA ', formatedTestData);
console.log('TEST DATA WITH AN EXTRA COLUMN ', formatedExtraColumn);
console.log('CSV STRING DATA ', formatedCSV);

// PART 3

const formatToObjects = (
  stringData: string
): Array<{ [key: string]: string }> => {
  const rows: Array<string> = stringData.split('\n');
  const objectKeys: Array<string> = rows.shift().split(',');
  const people: Array<{ [key: string]: string }> = [];

  rows.forEach((row: string) => {
    const person: { [key: string]: string } = {};
    row.split(',').forEach((cellData: string, i: number) => {
      person[objectKeys[i].toLowerCase()] = cellData;
    });
    people.push(person);
  });

  return people;
};

const formattedPeople: Array<{ [key: string]: string }> =
  formatToObjects(testDataExtraColumn);
console.log('DATA FORMATED TO OBJECTS ', formattedPeople);

// PART 5

const peopleCSV: Array<{ [key: string]: string }> = [
  { id: '42', name: 'Bruce', occupation: 'Knight', age: '41' },
  { id: '48', name: 'Barry', occupation: 'Runner', age: '25' },
  { id: '57', name: 'Bob', occupation: 'Fry Cook', age: '19' },
  { id: '63', name: 'Blaine', occupation: 'Quiz Master', age: '58' },
  { id: '7', name: 'Bilbo', occupation: 'Burgler', age: '111' },
];

const objectsToString = (objArr: Array<{ [key: string]: string }>): string => {
  let titles: Array<string> = Object.keys(objArr[0]);
  let convertedStr: string = titles.join(',').concat('\\n');

  const allValuesToString: Array<string> = [];
  objArr.forEach((obj: { [key: string]: string }, i: number) => {
    allValuesToString.push(...Object.values(obj));
  });

  allValuesToString.forEach((val: string, i: number) => {
    if (i === allValuesToString.length - 1) {
      convertedStr += `${val}`;
    } else if ((i + 1) % titles.length === 0) {
      convertedStr += `${val}\\n`;
    } else {
      convertedStr += `${val},`;
    }
  });

  return convertedStr;
};

console.log(
  'OBJECTS CONVERTED BACK TO A STRING ',
  objectsToString(formattedPeople)
);
