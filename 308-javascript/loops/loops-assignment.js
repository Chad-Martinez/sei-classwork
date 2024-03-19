// PART 1: FIZZ BUZZ

for (i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log('FIZZ BUZZ');
  } else if (i % 3 === 0) {
    console.log('FIZZ');
  } else if (i % 5 === 0) {
    console.log('BUZZ');
  } else {
    console.log(i);
  }
}

// PART 2: PRIME TIME
primeChecker: for (let i = 860; i < 1000; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      console.log(i, 'is not prime');
      continue primeChecker;
    }
  }
  console.log(i, 'is prime');
  break;
}

// PART 3: FEELING LOOPY

const testData =
  'ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26';

const csv =
  'Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232';

let cell = '';
let row = '';

for (i = 0; i < csv.length; i++) {
  // ADDS THE LETTER TO THE WORD(CELL)
  if (csv[i] != ',') {
    cell += csv[i];
  }

  if (csv[i] === ',') {
    // ONCE IT ENCOUNTERS A COMMA IT ADDS THE WORD(CELL) TO THE ROW
    // THEN IT CLEARS THE CELL VARIABLE SO IT CAN BUILD THE NEXT WORD(CELL)
    // console.log('CELL ', cell);
    row += `${cell} `;
    cell = '';
  }

  if (csv[i] === '\n') {
    // ONCE IT ENCOUNTERS A LINE BREAK, IT ADDS THE FINAL WORD(CELL) TO THE ROW AND PRINTS THE ROW
    // THEN IT CLEARS THE ROW AND CELL
    row += `${cell}`;
    console.log(row);
    cell = '';
    row = '';
  }

  if (i === csv.length - 1) {
    // PRINTS THE LAST ROW
    row += `${cell}`;
    console.log(row);
  }
}
