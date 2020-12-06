const fs = require('fs');
const _ = require('lodash');

const readFile = (filename) => _(fs.readFileSync(filename, 'utf8'));

const readRows = (filename) => readFile(filename).split('\n');

const joinRowsBySpace = (acc, val) => {
  if (val[0] === '' || val[0] === undefined) acc.push([]);
  else acc[acc.length - 1] = [..._.last(acc), ...val];
  return acc;
};

const groupRowsBySpace = (acc, val) => {
  if (val[0] === '' || val[0] === undefined) acc.push([]);
  else acc[acc.length - 1] = [..._.last(acc), val];
  return acc;
};

module.exports = {
  readFile,
  readRows,
  joinRowsBySpace,
  groupRowsBySpace,
};
