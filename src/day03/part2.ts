import { parseInput, isANumber } from '../util/index.js';

const input = parseInput({ split: { mapper: false } });
let result = 0;

const rowLength = input[0].length;
const numRows = input.length;

const gearMap = new Map<string, number[]>();
const foundGears = new Set<string>();

for (let row = 0; row < input.length; row++) {
  let value = '';

  for (let col = 0; col <= input[row].length; col++) {
    if (isANumber(input[row][col])) {
      value += input[row][col];

      // check previous row
      const prevRow = row - 1;
      if (prevRow >= 0) {
        for (let i = col - 1; i <= col + 1; i++) {
          if (i < 0 || i >= rowLength) {
            continue;
          }

          if (input[prevRow][i] === '*') {
            foundGears.add(`${prevRow}${i}`);
          }
        }
      }

      // check current row
      const prevCol = col - 1;
      if (prevCol >= 0 && input[row][prevCol] === '*') {
        foundGears.add(`${row}${prevCol}`);
      }

      const nextCol = col + 1;
      if (nextCol < rowLength && input[row][nextCol] === '*') {
        foundGears.add(`${row}${nextCol}`);
      }

      // check next row
      const nextRow = row + 1;
      if (nextRow < numRows) {
        for (let i = col - 1; i <= col + 1; i++) {
          if (i < 0 || i >= rowLength) {
            continue;
          }

          if (input[nextRow][i] === '*') {
            foundGears.add(`${nextRow}${i}`);
          }
        }
      }
    } else if (value != '') {
      if (foundGears.size > 0) {
        foundGears.forEach((gear) => {
          const gears = gearMap.get(gear) ?? [];
          gearMap.set(gear, [...gears, Number(value)]);
        });
      }

      value = '';
      foundGears.clear();
    }
  }
}

gearMap.forEach((values, _) => {
  if (values.length == 2) {
    result += values[0] * values[1];
  }
});

export default result;
