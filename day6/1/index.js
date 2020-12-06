const _ = require('lodash');
const fp = require('lodash/fp');
const helpers = require('../../helpers');

const groups = helpers
  .readRows('./input.txt')
  .map(fp.split(''))
  .reduce(helpers.joinRowsBySpace, [[]])
  .map(_.uniq)
  .map(_.size);

console.log(_.sum(groups));
