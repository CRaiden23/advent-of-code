import { parseInput } from '../util';

const input = parseInput({
  split: {
    mapper: (e) => e.replace(/\D/g, ''),
  },
});
let result = -1;

input.forEach((line) => {
  if (line.length == 1) {
    result += Number(line[0] + line[0]);
  } else {
    result += Number(line[0] + line[line.length - 1]);
  }
});

export default result;
