import { parseInput } from '../util/index.js';

type Cube = 'red' | 'green' | 'blue';

const input = parseInput({ split: { mapper: false } });
let result = 0;

input.forEach((line) => {
  const CubeCounts: { [cubes in Cube]: number } = {
    red: Number.MIN_SAFE_INTEGER,
    green: Number.MIN_SAFE_INTEGER,
    blue: Number.MIN_SAFE_INTEGER,
  };

  const rounds = line.split(': ')[1].split(';');

  rounds.forEach((round) => {
    const dicePulls = round.trimLeft().split(', ');

    dicePulls.forEach((roll) => {
      const [count, color] = roll.split(' ');

      if (Number(count) > CubeCounts[color as Cube]) {
        CubeCounts[color as Cube] = Number(count);
      }
    });
  });

  result += CubeCounts.red * CubeCounts.green * CubeCounts.blue;
});

export default result;
