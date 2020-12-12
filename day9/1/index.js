const helpers = require('../../helpers');

const numbers = helpers
  .readRows('./input.txt')
  .map(Number)
  .value();

const findVal = (range) => numbers.slice(range).find((val, idx) => {
  const compareArray = numbers.slice(idx, range + idx);
  return !compareArray.some(
    (v1, v1Idx) => compareArray.slice(v1Idx).some(
      (v2) => (v1 + v2) === val,
    ),
  );
});

console.log(findVal(25));
