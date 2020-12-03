const helpers = require('../../helpers');
const _ = require('lodash');

const world = helpers
  .readRows('./input.txt')
  .map(str => str.split(''))
  .value();

let x = 0, y = 0, trees = 0;
const maxY = world.length - 1, maxX = world[0].length - 1;
console.log(maxX, maxY)
while (y <= maxY) {
  console.log(x, y, world[y][x] === '#')
  if (world[y][x] === '#') trees++;
  x += 3;
  y += 1;
  if (x > maxX) x = x - (maxX + 1);
}

console.log(trees);