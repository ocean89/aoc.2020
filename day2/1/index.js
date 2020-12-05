const helpers = require('../../helpers');

const structureRow = (rawRow) => {
  const split = rawRow.split(':');
  const firstSplit = split[0].split(' ');
  const minMax = firstSplit[0].split('-');
  return {
    min: +minMax[0],
    max: +minMax[1],
    letter: firstSplit[1],
    password: split[1].trim(),
  };
};

const validatePassword = (row) => {
  const count = row.password.split('').filter((letter) => letter === row.letter).length;
  return count >= row.min && count <= row.max;
};

const validCount = helpers.readRows('./input.txt')
  .map(structureRow)
  .filter(validatePassword)
  .value()
  .length;

console.log(validCount);
