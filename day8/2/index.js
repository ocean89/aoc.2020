const _ = require('lodash');
const fp = require('lodash/fp');
const helpers = require('../../helpers');

const instructions = helpers
  .readRows('./input.txt')
  .map(fp.flow(
    fp.split(' '),
    ([op, steps]) => ({
      op,
      steps: op === 'nop' ? 1 : Number(steps),
    }),
  ))
  .value();

const visit = (currentNode, nodes, visitedNodes = [], acc = 0) => {
  const node = _.get(nodes, currentNode);
  const newVisitedNodes = [...visitedNodes, node];
  if (currentNode >= nodes.length) return acc;
  if (_.includes(visitedNodes, node)) return undefined;
  if (node.op === 'acc') return visit(currentNode + 1, nodes, newVisitedNodes, acc + node.steps);
  if (node.op === 'jmp') return visit(currentNode + node.steps, nodes, newVisitedNodes, acc);
  return visit(currentNode + 1, nodes, newVisitedNodes, acc);
};

const generateNewInstructions = (nodes) => nodes.reduce((acc, node, idx) => {
  const newArr = nodes.slice();
  if (node.op === 'jmp' || node.op === 'nop') {
    newArr[idx] = {
      ...node,
      op: node.op === 'jmp' ? 'nop' : 'nop',
    };
    return acc.length === 0 ? [newArr] : [...acc, newArr];
  }
  return acc;
}, []);

console.log(
  generateNewInstructions(instructions)
    .map((nodes) => visit(0, nodes))
    .filter((node) => node !== undefined),
);
