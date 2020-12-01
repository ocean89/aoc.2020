var fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf8');
const numbers = file.split('\n').map(val => +val);

let pair;

numbers.find((num1, idx) => {
  const newNumbers = numbers.slice();
  newNumbers.splice(idx, 1);
  const foundNum2 = newNumbers.find(num2 => num1 + num2 === 2020);
  if (foundNum2) {
    pair = [num1, foundNum2];
    return true;
  }
});

console.log(pair[0] * pair[1]);