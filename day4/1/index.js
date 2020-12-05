const _ = require('lodash');
const helpers = require('../../helpers');

const groupRow = (acc, val) => {
  if (val[0] === '') acc.push([]);
  else acc[acc.length - 1] = [..._.last(acc), ...val];
  return acc;
};

const hasCid = (val) => val.indexOf('cid') >= 0;

const validateRow = (row) => {
  if (row.length === 8) return true;
  if (row.length === 7) {
    return row.find(hasCid) === undefined;
  }
  return false;
};

const data = helpers
  .readRows('./input.txt')
  .map((str) => str.split(' '))
  .reduce(groupRow, [[]])
  .filter(validateRow);

console.log(data.length);
