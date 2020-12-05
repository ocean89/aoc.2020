const _ = require('lodash');
const helpers = require('../../helpers');

const world = helpers
  .readRows('./input.txt')
  .map((str) => str.split(''))
  .value();

let x = 0; let y = 0; let
  trees = 0;
const maxY = world.length - 1; const
  maxX = world[0].length - 1;

while (y <= maxY) {
  if (world[y][x] === '#') trees += 1;
  x += 3;
  y += 1;
  if (x > maxX) x -= (maxX + 1);
}

console.log(trees);
