const _ = require('lodash');
const fp = require('lodash/fp');
const helpers = require('../../helpers');

const groups = helpers
  .readRows('./input.txt')
  .map(fp.split(''))
  .reduce(helpers.groupRowsBySpace, [[]])
  .map(((row) => _.intersection(...row)))
  .map(_.size);

console.log(_.sum(groups));
