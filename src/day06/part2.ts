import { parseInput } from '../util/index.js';

const input = parseInput({ split: { mapper: false } });
let result = 0;

const time = Number(
  input[0]
    .split(':')[1]
    .split(' ')
    .filter((value) => value != '')
    .reduce((time, curr) => time += curr)
);
const record = Number(
  input[1]
    .split(':')[1]
    .split(' ')
    .filter((value) => value != '')
    .reduce((record, curr) => record += curr)
);

for (let timeHeld = 0; timeHeld < time; timeHeld++) {
  const distance = timeHeld * (time - timeHeld);
  if (distance > record) {
    result++;
  }
}

export default result;
