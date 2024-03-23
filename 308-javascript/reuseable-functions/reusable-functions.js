// PART 1
// For example, stringsLongerThan(['say', 'hello', 'in', 'the', 'morning'], 3); would return ["hello", "morning"].
// Take a number, n, and print every number between 1 and n without using loops. Use recursion.
var numArr = [12, 3, 5, 42, 253, 21, 4, 6, 54];
// Take an array of numbers and return the sum.
var numSum = function (numberArr) {
    return numberArr.reduce(function (acc, curr) { return acc + curr; }, 0);
};
console.log('SUM OF NUMBERS ', numSum(numArr));
// Take an array of numbers and return the average.
var average = function (numberArr) {
    return numSum(numberArr) / numberArr.length;
};
console.log('AVERAGE OF NUMBERS ', average(numArr));
// Take an array of strings and return the longest string.
var stringArr = ['say', 'hello', 'in', 'the', 'morning'];
var colors = ['green', 'blue', 'yellow', 'red', 'aquamarine'];
var longestString = function (strArray) {
    var sortedArray = strArray.sort(function (a, b) { return b.length - a.length; });
    return sortedArray[0];
};
console.log('THE LONGEST STRING IS ', longestString(colors));
// Take an array of strings, and a number and return an array of the strings that are longer than the given number.
var numberOfChar = 4;
var stringsLongerThanNum = function (stringArr, num) {
    return stringArr.filter(function (str) { return str.length > num; });
};
console.log("THE STRINGS LONGER THAN ".concat(numberOfChar, " ARE "), stringsLongerThanNum(stringArr, 4));
var countBetween = function (num) {
    if (num > 0) {
        console.log(num);
        countBetween(num - 1);
    }
};
countBetween(10);
var people = [
    { id: '42', name: 'Bruce', occupation: 'Knight', age: '41' },
    { id: '48', name: 'Barry', occupation: 'Runner', age: '25' },
    { id: '57', name: 'Bob', occupation: 'Fry Cook', age: '19' },
    { id: '63', name: 'Blaine', occupation: 'Quiz Master', age: '58' },
    { id: '7', name: 'Bilbo', occupation: 'None', age: '111' },
];
var sortByAge = function (people) {
    return people.sort(function (a, b) { return parseInt(a.age) - parseInt(b.age); });
};
console.log('PEOPLE SORTED BY AGE ', sortByAge(people));
var youngerThanFifty = function (people) {
    return people.filter(function (person) { return parseInt(person.age) < 50; });
};
console.log('PEOPLE YOUNGER THAN 50 ', youngerThanFifty(people));
var mappedPeople = function (people) {
    return people.map(function (person) {
        return {
            id: person.id,
            name: person.name,
            job: person.occupation,
            age: (parseInt(person.age) + 1).toString(),
        };
    });
};
console.log('MAPPED OBJECTS TO NEW ARRAY ', mappedPeople(people));
people.push({ id: '99', name: 'Jim', occupation: 'Coder' });
var avgAge = function (people) {
    return people.reduce(function (acc, curr) { return acc + parseInt(curr.age); }, 0);
};
// // PART 3
var incrementAge = function (person) {
    'age' in person
        ? (person.age = (parseInt(person.age) + 1).toString())
        : (person.age = '0');
    person.updated_at = new Date();
};
incrementAge(people[5]);
console.log('INCREMENTS AGE AND ADDS DATE PROPERTY ', people[5]);
var copiedPerson = function (person) {
    // DEEP COPY TO PREVENT MANIPULATION OF ORIGINAL UPDATED_AT DATE OBJECT
    var newPerson = JSON.parse(JSON.stringify(person));
    'age' in newPerson
        ? (newPerson.age = (parseInt(newPerson.age) + 1).toString())
        : (newPerson.age = '0');
    newPerson.updated_at = new Date();
    return newPerson;
};
var oldPerson = people[5];
var newPerson = copiedPerson(people[5]);
console.log('NEW COPIED PERSON ', newPerson);
console.log('IS OLDPERSON DATE OBJECT === NEWPERSON DATE OBJECT? ', oldPerson.updated_at === newPerson.updated_at);
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// ######## PART 4 & PART 5 - REVISITING PAST ASSIGNEMENTS ######## //
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// DATA COLLECTIONS
// // PART 2
// Declare a variable that stores the number of columns in each row of data within the CSV.
// Instead of hard-coding four columns per row, expand your code to accept any number of columns. This should be calculated dynamically based on the first row of data.
var testData = 'ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26';
var testDataExtraColumn = 'ID,Name,Occupation,Age,Gender\n42,Bruce,Knight,41,M\n57,Bob,Fry Cook,19,M\n63,Blaine,Quiz Master,58,F\n98,Bill,Doctor’s Assistant,26,M';
var csv = 'Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232';
var formatData = function (stringData) {
    var rows = stringData.split('\n');
    var table = [];
    rows.forEach(function (item) {
        var rowData = item.split(',');
        table.push(rowData);
    });
    return table;
};
// ## TEST CASES ## //
var formatedTestData = formatData(testData);
var formatedExtraColumn = formatData(testDataExtraColumn);
var formatedCSV = formatData(csv);
console.log('ORIGNAL TEST DATA ', formatedTestData);
console.log('TEST DATA WITH AN EXTRA COLUMN ', formatedExtraColumn);
console.log('CSV STRING DATA ', formatedCSV);
// PART 3
var formatToObjects = function (stringData) {
    var rows = stringData.split('\n');
    var objectKeys = rows.shift().split(',');
    var people = [];
    rows.forEach(function (row) {
        var person = {};
        row.split(',').forEach(function (cellData, i) {
            person[objectKeys[i].toLowerCase()] = cellData;
        });
        people.push(person);
    });
    return people;
};
var formattedPeople = formatToObjects(testDataExtraColumn);
console.log('DATA FORMATED TO OBJECTS ', formattedPeople);
// PART 5
var peopleCSV = [
    { id: '42', name: 'Bruce', occupation: 'Knight', age: '41' },
    { id: '48', name: 'Barry', occupation: 'Runner', age: '25' },
    { id: '57', name: 'Bob', occupation: 'Fry Cook', age: '19' },
    { id: '63', name: 'Blaine', occupation: 'Quiz Master', age: '58' },
    { id: '7', name: 'Bilbo', occupation: 'Burgler', age: '111' },
];
var objectsToString = function (objArr) {
    var titles = Object.keys(objArr[0]);
    var convertedStr = titles.join(',').concat('\\n');
    var allValuesToString = [];
    objArr.forEach(function (obj, i) {
        allValuesToString.push.apply(allValuesToString, Object.values(obj));
    });
    allValuesToString.forEach(function (val, i) {
        if (i === allValuesToString.length - 1) {
            convertedStr += "".concat(val);
        }
        else if ((i + 1) % titles.length === 0) {
            convertedStr += "".concat(val, "\\n");
        }
        else {
            convertedStr += "".concat(val, ",");
        }
    });
    return convertedStr;
};
console.log('OBJECTS CONVERTED BACK TO A STRING ', objectsToString(formattedPeople));
