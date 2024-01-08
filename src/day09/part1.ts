import { parseInput } from '../util/index.js';

const input = parseInput({
  split: { mapper: (e) => e.split(' ').map((value) => Number(value)) },
});
let result = 0;

input.forEach((pattern) => {
  const differenceTable: number[][] = [pattern];
  let differences: number[];
  let iter = 0;
  do {
    differences = [];
    const table = differenceTable[iter];

    for (let i = 0; i < table.length - 1; i++) {
      differences.push(table[i + 1] - table[i]);
    }

    differenceTable.push(differences);
    iter++;
  } while (!differences.every((entry) => entry === 0));

  differenceTable.forEach((row) => {
    result += row.reverse()[0];
  });
});

export default result;
