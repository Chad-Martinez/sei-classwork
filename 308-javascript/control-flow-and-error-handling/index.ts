// let x: number = 10;
// let y: number = 5;

// {
//     let w: number = 20;
//     let x: number = 11;
//     let z: number = x + y;

//     {
//         let x: number = 12;
//         console.log(z + w)
//     }
// }

// console.dir(window)

// const num: number = -10;

// if (num >= 0) {
//     console.log('Number is positive')
// } else {
//     console.log('Number is negative')
// }

// const age: number = 18;

// if (age < 19) {
//     console.log('Access Denied!')
// } else {
//     //Access Granted...do something else
// }

let num = -120;

if (num > 0) {
  if (num > 100) {
    console.log('Number is greater than 100');
  } else if (num < 100) {
    console.log('Number is less than 100');
  }
} else if (num < 0) {
  console.log('Number is negative');
}

let score = 85;

if (score >= 90) {
  console.log('A');
} else if (score >= 80) {
  console.log('B');
} else if (score >= 70) {
  console.log('C');
} else if (score >= 55) {
  console.log('D');
} else {
  console.log('F');
}
