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

class Space {
  IsGalaxy: boolean;
  Distance: number;

  constructor(isGalaxy: boolean, distance: number) {
    this.IsGalaxy = isGalaxy;
    this.Distance = distance;
  }
}

const expandMap = (input: Space[][]) => {
  for (let r = 0; r < input.length; r++) {
    if (input[r].filter((tile) => tile.IsGalaxy).length === 0) {
      for (let c = 0; c < input[r].length; c++) {
        input[r][c].Distance = 1000000;
      }
    }
  }
};

const calculateShortestDistanceBetween = (
  start: [number, number],
  dest: [number, number],
  grid: Space[][]
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
    if (
      curr.Position[0] + 1 < maxRows &&
      !visited[curr.Position[0] + 1][curr.Position[1]]
    ) {
      q.push(
        new BFSItem(
          [curr.Position[0] + 1, curr.Position[1]],
          curr.DistanceFromStart +
            grid[curr.Position[0] + 1][curr.Position[1]].Distance
        )
      );
      visited[curr.Position[0] + 1][curr.Position[1]] = true;
    }

    if (dest[1] < start[1]) {
      if (
        curr.Position[1] - 1 >= 0 &&
        !visited[curr.Position[0]][curr.Position[1] - 1]
      ) {
        q.push(
          new BFSItem(
            [curr.Position[0], curr.Position[1] - 1],
            curr.DistanceFromStart +
              grid[curr.Position[0]][curr.Position[1] - 1].Distance
          )
        );
        visited[curr.Position[0]][curr.Position[1] - 1] = true;
      }
    } else {
      if (
        curr.Position[1] + 1 < maxCols &&
        !visited[curr.Position[0]][curr.Position[1] + 1]
      ) {
        q.push(
          new BFSItem(
            [curr.Position[0], curr.Position[1] + 1],
            curr.DistanceFromStart +
              grid[curr.Position[0]][curr.Position[1] + 1].Distance
          )
        );
        visited[curr.Position[0]][curr.Position[1] + 1] = true;
      }
    }
  }

  return result;
};
const galaxies: [number, number][] = [];
let input = parseInput({
  split: {
    mapper: (e, r) => {
      const starMapRow: Space[] = [];

      e.split('').forEach((tile, c) => {
        const isGalaxy = tile === '#';

        starMapRow.push(new Space(isGalaxy, 1));

        if (isGalaxy) {
          galaxies.push([r, c]);
        }
      });

      return starMapRow;
    },
  },
});
let result = 0;

// Expand Rows
expandMap(input);

// Expand Columns
input = Transpose(input) as Space[][];
expandMap(input);

// Restore Map
input = Transpose(input) as Space[][];

// Find shortest path from each pair
galaxies.forEach((galaxy, index) => {
  let totalLengths = 0;
  for (let g = index + 1; g < galaxies.length; g++) {
    totalLengths += calculateShortestDistanceBetween(
      galaxy,
      galaxies[g],
      input
    );
  }

  result += totalLengths;
});

export default result;
