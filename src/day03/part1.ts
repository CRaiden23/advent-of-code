import { parseInput, isANumber } from '../util';

const specialChars = /[^0-9.]/g;

const input = parseInput({ split: { mapper: false } });
let result = 0;

const rowLength = input[0].length;
const numRows = input.length;

for (let row = 0; row < input.length; row++) {
  let value = '';
  let isPartNumber = false;

  for (let col = 0; col <= input[row].length; col++) {
    if (isANumber(input[row][col])) {
      value += input[row][col];

      if (!isPartNumber) {
        // check previous row
        const prevRow = row - 1;
        if (prevRow >= 0) {
          for (let i = col - 1; i <= col + 1; i++) {
            if (i < 0 || i >= rowLength) {
              continue;
            }

            if (input[prevRow][i].match(specialChars)) {
              isPartNumber = true;
              break;
            }
          }
        }

        // check current row
        if (!isPartNumber) {
          const prevCol = col - 1;
          if (prevCol >= 0 && input[row][prevCol].match(specialChars)) {
            isPartNumber = true;
          }

          const nextCol = col + 1;
          if (nextCol < rowLength && input[row][nextCol].match(specialChars)) {
            isPartNumber = true;
          }
        }

        // check next row
        const nextRow = row + 1;
        if (!isPartNumber && nextRow < numRows) {
          for (let i = col - 1; i <= col + 1; i++) {
            if (i < 0 || i >= rowLength) {
              continue;
            }

            if (input[nextRow][i].match(specialChars)) {
              isPartNumber = true;
              break;
            }
          }
        }
      }
    } else if (value != '' || isPartNumber) {
      if (isPartNumber) {
        result += Number(value);
      }

      value = '';
      isPartNumber = false;
    }
  }
}

export default result;
