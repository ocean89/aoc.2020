const _ = require('lodash');
const helpers = require('../../helpers');

const numbers = helpers
  .readRows('./input.txt')
  .map(Number)
  .value();

const findRange = (lookFor) => {
  numbers.some((val, idx) => {
    let foundIdx = -1;
    numbers.slice(idx).reduce((acc, val2, idx2) => {
      const sum = acc + val2;
      if (sum === lookFor) {
        const foundRange = numbers.slice(idx, idx2 + idx + 1);
        console.log(_.min(foundRange) + _.max(foundRange));
        foundIdx = idx2;
      }
      return sum;
    }, 0);
    return foundIdx !== -1;
  });
};

findRange(88311122);
