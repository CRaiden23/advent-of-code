import { parseInput } from '../util';

type NumberWord =
  | 'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine';

const Numbers: { [numbers in NumberWord]: string } = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const input = parseInput({ split: { mapper: false } });
let result = -1;

const isANumber = (input: string): boolean => {
  return !isNaN(parseInt(input));
};

const findFirstNumber = (input: string): string | undefined => {
  for (let i = 0; i < input.length; i++) {
    if (isANumber(input[i])) {
      return input[i];
    }

    let part = input[i];
    for (let j = 1; j < 5 && i + j < input.length; j++) {
      if (isANumber(input[i + j])) {
        break;
      }

      part += input[i + j];
      if (j >= 2) {
        if (Numbers[part as NumberWord]) {
          return Numbers[part as NumberWord];
        }
      }
    }
  }
};

const findLastNumber = (input: string): string | undefined => {
  for (let i = input.length - 1; i >= 0; i--) {
    if (isANumber(input[i])) {
      return input[i];
    }

    let part = input[i];
    for (let j = 1; j < 5 && i - j >= 0; j++) {
      if (isANumber(input[i - j])) {
        break;
      }

      part = input[i - j] + part;
      if (j >= 2) {
        if (Numbers[part as NumberWord]) {
          return Numbers[part as NumberWord];
        }
      }
    }
  }
};

input.forEach((line) => {
  const first = findFirstNumber(line);
  const last = findLastNumber(line);
  if (first && last) {
    result += Number(first + last);
  }
});

export default result;
