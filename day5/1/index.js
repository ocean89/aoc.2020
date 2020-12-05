const _ = require('lodash');
const helpers = require('../../helpers');

const structureRow = (seatCode) => {
  const rowDef = [];
  const seatDef = [];
  seatCode.split('').forEach((char) => {
    if (char === 'F' || char === 'B') rowDef.push(char);
    if (char === 'R' || char === 'L') seatDef.push(char);
  });
  return [rowDef, seatDef];
};

const proximateValue = (rowDef, defaultMax) => {
  let min = 0;
  let max = defaultMax;
  rowDef.forEach((char) => {
    const diff = (max - min) / 2;
    if (char === 'F' || char === 'L') max = Math.floor(max - diff);
    if (char === 'B' || char === 'R') min = Math.round(min + diff);
  });
  return min;
};

const proximateRow = (row) => proximateValue(row, 127);
const proximateColumn = (row) => proximateValue(row, 7);

const calculateId = (rowDef, columnDef) => proximateRow(rowDef) * 8 + proximateColumn(columnDef);

const data = helpers
  .readRows('./input.txt')
  .map(structureRow)
  .map(([rowDef, columnDef]) => calculateId(rowDef, columnDef))
  .value();

console.log(_.max(data));
