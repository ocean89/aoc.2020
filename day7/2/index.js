const _ = require('lodash');
const fp = require('lodash/fp');
const helpers = require('../../helpers');

const arrangeBag = fp.flow(
  fp.split(', '),
  fp.reduce((acc, val) => {
    if (val === 'no other bag') return acc;
    const splitIndex = val.indexOf(' ');
    const count = +val.slice(0, splitIndex);
    return [...acc, ..._.fill(Array(count), val.slice(splitIndex + 1))];
  }, []),
);

const bagsArray = helpers
  .readRows('./input.txt')
  .map(fp.flow(
    fp.replace('.', ''),
    fp.split('bags'),
    fp.join('bag'),
    fp.split('contains'),
    fp.join('contain'),
    fp.split(' contain '),
    (rowSplit) => ({ bag: rowSplit[0], bags: arrangeBag(rowSplit[1]) }),
  ))
  .value();

const bagsObject = _.keyBy(bagsArray, 'bag');

_.values(bagsObject).forEach((bag) => {
  // eslint-disable-next-line no-param-reassign
  bag.bags = [
    ...bag?.bags.map((bagKey) => bagsObject[bagKey]),
  ];
});

const countBags = (bag, ignoreBag = false) => ([
  ignoreBag ? 0 : 1,
  ..._.flatten(bag.bags.map((cb) => countBags(cb))),
]);

console.log(_.sum(countBags(bagsObject['shiny gold bag'], true)));
