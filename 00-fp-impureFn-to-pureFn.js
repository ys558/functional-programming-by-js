/*
  Impure function 
*/

let minimum = 21;
const checkAgeImpure = (age) => age > minimum;

console.log(checkAgeImpure(24)); // true

minimum = 27;
console.log(checkAgeImpure(24)); // false

minimum = 18;
console.log(checkAgeImpure(24)); // true

/*
  change to Pure function 1
*/
const checkAge = (age) => {
  const minimum = 21;
  return age >= minimum;
};
console.log(checkAge(24)); // true

minimum = 27;
console.log(checkAge(24)); // true

minimum = 18;
console.log(checkAge(24)); // true

/*
  change to Pure function 2
*/

const immutableMinimum = Object.freeze({
  value: 21,
});
const checkAge2 = (age) => age > immutableMinimum;

console.log(checkAge2(24)); // true

/*
  change to Pure function 3 
  use ES6+ to achieve immutability
*/

const a = [1, 2];
const f = (a, el) => [...a, el];

const result = f(a, 3);
// no matter how many times you call f, the result will always be the same
console.log(result); // [1, 2, 3]
console.log(result); // [1, 2, 3]
