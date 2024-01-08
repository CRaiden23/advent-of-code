import { parseInput } from '../util/index.js';

type Tile = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S';

const CompatibleNorth: { [tiles in Tile]: Tile[] } = {
  '|': ['|', 'F', 'S', '7'],
  L: ['|', 'F', 'S', '7'],
  J: ['|', 'F', 'S', '7'],
  S: ['|', 'F', 'S', '7'],
  7: [],
  F: [],
  '.': [],
  '-': [],
};

const CompatibleSouth: { [tiles in Tile]: Tile[] } = {
  '|': ['|', 'J', 'S', 'L'],
  S: ['|', 'J', 'S', 'L'],
  7: ['|', 'J', 'S', 'L'],
  F: ['|', 'J', 'S', 'L'],
  J: [],
  L: [],
  '.': [],
  '-': [],
};

const CompatibleEast: { [tiles in Tile]: Tile[] } = {
  '-': ['-', 'J', '7', 'S'],
  S: ['-', 'J', '7', 'S'],
  F: ['-', 'J', '7', 'S'],
  L: ['-', 'J', '7', 'S'],
  7: [],
  J: [],
  '.': [],
  '|': [],
};

const CompatibleWest: { [tiles in Tile]: Tile[] } = {
  '-': ['-', 'F', 'L', 'S'],
  S: ['-', 'F', 'L', 'S'],
  J: ['-', 'F', 'L', 'S'],
  7: ['-', 'F', 'L', 'S'],
  F: [],
  L: [],
  '|': [],
  '.': [],
};

class Pipe {
  Label: Tile;
  Position: [number, number];
  Key: string;

  constructor(label: Tile, position: [number, number], key: string) {
    this.Label = label;
    this.Position = position;
    this.Key = key;
  }

  checkAdjacent(input: string[], prevKey: string): Pipe {
    if (input[this.Position[1] - 1] !== undefined) {
      const northTile = input[this.Position[1] - 1][this.Position[0]] as Tile;
      if (CompatibleNorth[this.Label].includes(northTile)) {
        const key = [this.Position[0], this.Position[1] - 1].join('');

        if (key != prevKey) {
          return new Pipe(northTile, [this.Position[0], this.Position[1] - 1], key);
        }
      }
    }

    if (input[this.Position[1] + 1] !== undefined) {
      const southTile = input[this.Position[1] + 1][this.Position[0]] as Tile;
      if (CompatibleSouth[this.Label].includes(southTile)) {
        const key = [this.Position[0], this.Position[1] + 1].join('');

        if (key != prevKey) {
          return new Pipe(southTile, [this.Position[0], this.Position[1] + 1], key);
        }
      }
    }

    if (input[this.Position[1]][this.Position[0] + 1] !== undefined) {
      const eastTile = input[this.Position[1]][this.Position[0] + 1] as Tile;
      if (CompatibleEast[this.Label].includes(eastTile)) {
        const key = [this.Position[0] + 1, this.Position[1]].join('');

        if (key != prevKey) {
          return new Pipe(eastTile, [this.Position[0] + 1, this.Position[1]], key);
        }
      }
    }

    if (input[this.Position[1]][this.Position[0] - 1] !== undefined) {
      const westTile = input[this.Position[1]][this.Position[0] - 1] as Tile;
      if (CompatibleWest[this.Label].includes(westTile)) {
        const key = [this.Position[0] - 1, this.Position[1]].join('');

        if (key != prevKey) {
          return new Pipe(westTile, [this.Position[0] - 1, this.Position[1]], key);
        }
      }
    }
    return new Pipe('.', [-1, -1], '-1-1');
  }
}

const input = parseInput({
  split: {
    mapper: false,
  },
});

let start: Pipe = {} as Pipe;
let cycleLength = 0;
let result = 0;
for (let row = 0; row < input.length; row++) {
  if (input[row].includes('S')) {
    start = new Pipe('S', [input[row].indexOf('S'), row], [input[row].indexOf('S'), row].join(''));
    let foundPipe = start.checkAdjacent(input, '');

    let prevKey = start.Key;
    let currentTile = foundPipe;
    cycleLength++;
    while (currentTile.Label !== 'S') {
      foundPipe = currentTile.checkAdjacent(input, prevKey);

      prevKey = currentTile.Key;
      currentTile = foundPipe;
      cycleLength++;
    }
  }
}

result = cycleLength / 2;

export default result;
