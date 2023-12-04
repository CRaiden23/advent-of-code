import { isANumber, parseInput } from '../util';

const input = parseInput({ split: { mapper: false } });
let result = 0;
const wonCards = new Map<number, number>();
const winningNumbers: Set<string>[] = [];

input.forEach((line, index) => {
  const cardID = index + 1;
  const [winningNumbersString, actualNumbers] = line
    .split(': ')[1]
    .split(' | ');
  const winningNumbersSet = new Set<string>();

  winningNumbersString.split(' ').forEach((value) => {
    if (isANumber(value)) {
      winningNumbersSet.add(value);
    }
  });
  winningNumbers.push(winningNumbersSet);

  let points = 0;
  actualNumbers.split(' ').forEach((number) => {
    if (isANumber(number) && winningNumbers[index].has(number)) {
      points++;
    }
  });

  for (let i = 1; i <= points; i++) {
    const prevCount = wonCards.get(cardID + i) ?? 0;
    wonCards.set(cardID + i, prevCount + 1);
  }

  const copyCards = wonCards.get(cardID) ?? 0;
  if (copyCards !== 0) {
    for (let i = 0; i < copyCards; i++) {
      for (let i = 1; i <= points; i++) {
        const prevCount = wonCards.get(cardID + i) ?? 0;
        wonCards.set(cardID + i, prevCount + 1);
      }
    }
  }
});

let cardCount = 0;
wonCards.forEach((count) => {
  cardCount += count;
});

result = input.length + cardCount;

export default result;
