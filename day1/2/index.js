var fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf8');
const numbers = file.split('\n').map(val => +val);

let pair;

numbers.find((num1, idx) => {
  const newNumbers = numbers.slice();
  newNumbers.splice(idx, 1);
  return newNumbers.find((num2, idx2) => {
    const newNumbers2 = newNumbers.slice();
    newNumbers2.splice(idx2, 1);
    const foundNum3 = newNumbers2.find(num3 => num1 + num2 + num3 === 2020);
    if (foundNum3) {
      pair = [num1, num2, foundNum3];
      return true;
    }
  });
});

console.log(pair[0] * pair[1] * pair[2]);