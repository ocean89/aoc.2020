var fs = require('fs');
const _ = require('lodash');

const readFile = (filename) => {
  return _(fs.readFileSync(filename, 'utf8'));
};

const readRows = (filename) => readFile(filename).split('\n');

module.exports = {
  readFile,
  readRows,
}