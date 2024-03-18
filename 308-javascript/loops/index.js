// let change = 6
// let quaterCount = 0

// while (change > 0) {
//     change -= .25;
//     quaterCount += 1
// }

// console.log(`He had ${quaterCount} quaters remaining`)

// let i = 10;

// while (i <= 100) {
//     console.log(i)
//     i += 20;
//     if (i == 90) {
//         i = 20;
//     }
// }

// let divByFour = 500

// while (divByFour < 801) {
//     console.log(divByFour);
//     divByFour += 4;
// }

// for (i = 2; i < 20; i++) {

//     let isPrime = true;

//     for (j = 2; j < i; j++) {
//         if (i % j === 0) {
//             isPrime = false;
//             break;
//         }
//     }

//     if (isPrime) {
//         console.log(i, 'is prime')
//     }
// }

// let x = 10

// do {
//     x--;
//     console.log(x);
// } while (x > 3);

// LABELED LOOPS
// let prime = 2;

// outer: for (let i = 2; i < 30; i++) {

//     for (let j = 2; j < i; j++) {

//         if (i % j === 0) {
//             continue outer;
//         }
//     }

//     console.log(i, 'is prime')
// }

// BREAK AND CONTINUE

// for (let i = 0; i < 10; i++) {
//   if (i == 5) {
//     continue;
//   }
//   console.log(i);
// }

for (let i = 0; i < 10; i++) {
  if (i == 5) {
    break;
  }
  console.log(i);
}
