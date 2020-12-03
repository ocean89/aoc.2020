const helpers = require('../../helpers');
const _ = require('lodash');

const world = helpers
  .readRows('./input.txt')
  .map(str => str.split(''))
  .value();

const steps = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];

const product = steps.reduce((acc, step) => {
  let x = 0, y = 0, trees = 0;
  const maxY = world.length - 1, maxX = world[0].length - 1;
  while (y <= maxY) {
    if (world[y][x] === '#') trees++;
    x += step[0];
    y += step[1];
    if (x > maxX) x = x - (maxX + 1);
  }
  return acc * trees;
}, 1);

console.log(product);