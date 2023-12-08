import { parseInput } from '../util/index.js';

interface Node {
  Left: string;
  Right: string;
}

const Network = new Map<string, Node>();
let Instructions: string[] = [];
parseInput({
  split: {
    mapper: (line) => {
      if (line.length !== 0) {
        if (!line.includes(' = ')) {
          Instructions = line.split('');
        } else {
          const [nodeName, exits] = line.split(' = ');
          const [left, right] = exits.slice(1, exits.length - 1).split(', ');

          Network.set(nodeName, { Left: left, Right: right } as Node);
        }
      }
    },
  },
});

let result = 0;
let CurrentNode = 'AAA';
for (let i = 0; ; i++) {
  if (CurrentNode === 'ZZZ') {
    result = i;
    break;
  }

  const NextInstruction = Instructions[i % Instructions.length];
  const Exits = Network.get(CurrentNode) ?? ({} as Node);

  CurrentNode = NextInstruction === 'L' ? Exits.Left : Exits.Right;
}

export default result;
