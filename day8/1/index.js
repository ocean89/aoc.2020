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
  if (_.includes(visitedNodes, node)) return acc;
  if (node.op === 'acc') return visit(currentNode + 1, nodes, newVisitedNodes, acc + node.steps);
  if (node.op === 'jmp') return visit(currentNode + node.steps, nodes, newVisitedNodes, acc);
  return visit(currentNode + 1, nodes, newVisitedNodes, acc);
};

console.log(visit(0, instructions));
