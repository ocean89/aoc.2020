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

const countBags = (lookForBag, bag, ignoreBag = false) => {
  const uniqueBags = _.unionBy(bag.bags, 'bag');
  return [
    bag.bag === lookForBag && !ignoreBag ? 1 : 0,
    ..._.flatten(uniqueBags.map((fb) => countBags(lookForBag, fb))),
  ];
};

fp.flow(
  fp.values,
  fp.map((bag) => countBags('shiny gold bag', bag, true)),
  fp.map(fp.max),
  fp.sum,
  console.log,
)(bagsObject);
