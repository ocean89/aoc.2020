const helpers = require('../../helpers');
const _ = require('lodash');

const structureRow = (rawRow) => {
  const split = rawRow.split(':');
  const firstSplit = split[0].split(' ');
  const minMax = firstSplit[0].split('-');
  return {
    min: +minMax[0],
    max: +minMax[1],
    letter: firstSplit[1],
    password: split[1].trim().split(''),
  };
};

const validatePassword = (row) => {
  const minLetter = row.password?.[row.min - 1] === row.letter ? 1 : 0;
  const maxLetter = row.password?.[row.max - 1] === row.letter ? 1 : 0;
  return minLetter + maxLetter === 1;
}

const validCount = helpers.readRows('./input.txt')
  .map(structureRow)
  .filter(validatePassword)
  .value()
  .length;

console.log(validCount);