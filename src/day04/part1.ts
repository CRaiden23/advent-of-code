import { isANumber, parseInput } from '../util';

const input = parseInput({ split: { mapper: false } });
let result = 0;

input.forEach((line) => {
  const [winningNumbersString, actualNumbers] = line
    .split(': ')[1]
    .split(' | ');
  const winningNumbersSet = new Set<string>();

  winningNumbersString.split(' ').forEach((value) => {
    if (isANumber(value)) {
      winningNumbersSet.add(value);
    }
  });

  console.log(winningNumbersSet);

  let points = 0;
  actualNumbers.split(' ').forEach((number) => {
    if (isANumber(number) && winningNumbersSet.has(number)) {
      if (points === 0) {
        points++;
      } else {
        points *= 2;
      }
    }
  });

  result += points;
});

export default result;
