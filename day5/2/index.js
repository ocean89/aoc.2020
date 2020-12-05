const _ = require('lodash');
const helpers = require('../../helpers');

const generateSeatLayout = () => {
  const seats = [];
  for (let index = 0; index < 128; index += 1) {
    seats[index] = Array(8);
  }
  return seats;
};

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

const calculateSeat = ([rowDef, columnDef]) => [proximateRow(rowDef), proximateColumn(columnDef)];
const calculateId = (row, column) => row * 8 + column;

const fillSeats = (seats) => {
  const seatLayout = generateSeatLayout();
  seats.forEach(([row, column]) => {
    seatLayout[row][column] = true;
  });
  return seatLayout;
};

const data = helpers
  .readRows('./input.txt')
  .map(structureRow)
  .map(calculateSeat)
  .value();

const findFreeSeats = (seatLayout) => {
  for (let rowIndx = 0; rowIndx < seatLayout.length; rowIndx += 1) {
    const row = seatLayout[rowIndx];
    for (let seatIdx = 0; seatIdx < row.length; seatIdx += 1) {
      const seat = row[seatIdx];
      if (!seat) {
        console.log([rowIndx, seatIdx], calculateId(rowIndx, seatIdx));
      }
    }
  }
};

findFreeSeats(fillSeats(data));
