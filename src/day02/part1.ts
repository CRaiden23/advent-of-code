import { parseInput } from '../util/index.js';

type Cube = 'red' | 'green' | 'blue';

const CubeCounts: { [cubes in Cube]: number } = {
  red: 12,
  green: 13,
  blue: 14,
};

const IsNotPossible = {};

const input = parseInput({ split: { mapper: false } });
let result = 0;

input.forEach((line, index) => {
  const rounds = line.split(': ')[1].split(';');

  let isPossible = true;
  try {
    rounds.forEach((round) => {
      const dicePulls = round.trimLeft().split(', ');

      dicePulls.forEach((roll) => {
        const [count, color] = roll.split(' ');

        if (Number(count) > CubeCounts[color as Cube]) {
          throw IsNotPossible;
        }
      });
    });
  } catch (err) {
    isPossible = false;
  }

  result += isPossible ? index + 1 : 0;
});

export default result;
