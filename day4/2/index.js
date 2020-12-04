const helpers = require('../../helpers');
const _ = require('lodash');

const validators = {
  byr: /^(19[2-9][0-9]|200[0-2])$/,
  iyr: /^(201[0-9]|2020)$/,
  eyr: /^(202[0-9]|2030)$/,
  hgt: /^((1[5-8][0-9]|19[0-3])cm|(59in|6[0-9]in|7[0-6]in))$/,
  hcl: /^#([0-9a-f]){6}$/,
  ecl: /^(amb|blu|brn|gry|grn|hzl|oth){1}$/,
  pid: /^[0-9]{9}$/,
};

const groupRow = (acc, val) => {
  if (val[0] === '') acc.push([]);
  else acc[acc.length - 1] = [..._.last(acc), ...val];
  return acc;
}

const hasCid = (val) => val.indexOf("cid") >= 0;

const validateKeys = (row) => {
  if (row.length === 8) return true;
  if (row.length === 7) {
    return row.find(hasCid) === undefined;
  }
  return false;
}

const validatePassport = (passport) => {
  let valid = true;
  Object.keys(passport).forEach((key) => {
    if (key !== 'cid' && !(passport[key]?.match(validators[key])?.length > 0)) {
      valid = false;
    }
  });
  return valid;
}

const validateRow = (row) => {
  if(validateKeys(row)) {
    const passport =
      _(row)
        .map(itm => itm.split(':'))
        .fromPairs()
        .value();
    const valid = validatePassport(passport);
    return valid;
  }
  return false;
}

const data = helpers
  .readRows('./input.txt')
  .map(str => str.split(' '))
  .reduce(groupRow, [[]])
  .filter(validateRow)

console.log(data.length);
