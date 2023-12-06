import { parseInput } from '../util/index.js';

const input = parseInput({ split: { mapper: false } });
let result = 1;

const times = input[0]
  .split(':')[1]
  .split(' ')
  .filter((value) => value != '')
  .map((time) => Number(time));

const records = input[1]
  .split(':')[1]
  .split(' ')
  .filter((value) => value != '')
  .map((record) => Number(record));
const numRaces = times.length;

for (let race = 0; race < numRaces; race++) {
  let wins = 0;
  for (let timeHeld = 0; timeHeld < times[race]; timeHeld++) {
    const distance = timeHeld * (times[race] - timeHeld);
    if (distance > records[race]) {
      wins++;
    }
  }

  result *= wins;
}

export default result;
