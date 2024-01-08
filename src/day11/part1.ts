import { parseInput } from '../util/index.js';
import { Transpose } from '../util/array.js';

class BFSItem {
  Position: [number, number];
  DistanceFromStart: number;

  constructor(pos: [number, number], w: number) {
    this.Position = pos;
    this.DistanceFromStart = w;
  }
}

const locateGalaxies = (input: string[][]): [number, number][] => {
  const galaxies: [number, number][] = [];
  input.forEach((row, r) => {
    if (row.includes('#')) {
      row.forEach((char, c) => {
        if (char === '#') {
          galaxies.push([r, c]);
        }
      });
    }
  });

  return galaxies;
};

const expandMap = (input: string[][]): string[][] => {
  const emptyIndices = [];

  for (let r = 0; r < input.length; r++) {
    if (!input[r].includes('#')) {
      emptyIndices.push(r);
    }
  }

  emptyIndices.reverse().forEach((index) => {
    input = [
      ...input.slice(0, index),
      Array(input[0].length).fill('.'),
      ...input.slice(index),
    ];
  });

  return input;
};

const calculateShortestDistanceBetween = (
  start: [number, number],
  dest: [number, number],
  grid: string[][]
): number => {
  const maxRows = grid.length;
  const maxCols = grid[0].length;
  const result = -1;

  const visited = Array.from(Array(grid.length), () =>
    Array(grid[0].length).fill(false)
  ) as boolean[][];

  const q = [];
  q.push(new BFSItem(start, 0));
  visited[start[0]][start[1]] = true;
  while (q.length != 0) {
    const curr: BFSItem = q[0];
    q.shift();

    if (curr.Position[0] === dest[0] && curr.Position[1] === dest[1]) {
      return curr.DistanceFromStart;
    }

    // check below
    if (curr.Position[0] + 1 < maxRows && !visited[curr.Position[0] + 1][curr.Position[1]]) {
      q.push(
        new BFSItem(
          [curr.Position[0] + 1, curr.Position[1]],
          curr.DistanceFromStart + 1
        )
      );
      visited[curr.Position[0] + 1][curr.Position[1]] = true;
    }

    if (dest[1] < start[1]) {
      if (curr.Position[1] - 1 >= 0 && !visited[curr.Position[0]][curr.Position[1] - 1]) {
        q.push(
          new BFSItem(
            [curr.Position[0], curr.Position[1] - 1],
            curr.DistanceFromStart + 1
          )
        );
        visited[curr.Position[0]][curr.Position[1] - 1] = true;
      }
    } else {
      if (curr.Position[1] + 1 < maxCols && !visited[curr.Position[0]][curr.Position[1] + 1]) {
        q.push(
          new BFSItem(
            [curr.Position[0], curr.Position[1] + 1],
            curr.DistanceFromStart + 1
          )
        );
        visited[curr.Position[0]][curr.Position[1] + 1] = true;
      }
    }
  }

  return result;
};

let input = parseInput({
  split: { mapper: (e) => e.split('') },
});
let result = 0;
// Expand Rows
input = expandMap(input);
input = Transpose(input) as string[][];

// Expand Columns
input = expandMap(input);
input = Transpose(input) as string[][];

const galaxies = locateGalaxies(input);

// Find shortest path from each pair
galaxies.forEach((galaxy, index) => {
  let totalLengths = 0;
  for (let g = index + 1; g < galaxies.length; g++) {
    totalLengths += calculateShortestDistanceBetween(galaxy, galaxies[g], input);
  }

  result += totalLengths;
});

export default result;
