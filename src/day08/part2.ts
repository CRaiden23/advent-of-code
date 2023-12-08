import { parseInput } from '../util/index.js';
import { LeastCommonMultiple } from '../util/math.js';

interface Node {
  Left: string;
  Right: string;
}

const Network = new Map<string, Node>();
let Instructions: string[] = [];
const CurrentNodes: string[] = [];
parseInput({
  split: {
    mapper: (line) => {
      if (line.length !== 0) {
        if (!line.includes(' = ')) {
          Instructions = line.split('');
        } else {
          const [NodeName, Exits] = line.split(' = ');
          const [Left, Right] = Exits.slice(1, Exits.length - 1).split(', ');

          if (NodeName[2] === 'A') {
            CurrentNodes.push(NodeName);
          }
          Network.set(NodeName, { Left, Right } as Node);
        }
      }
    },
  },
});

let result = 0;
const steps: number[] = [];
for (let step = 0; ; step++) {
  const NextInstruction = Instructions[step % Instructions.length];

  for (let j = 0; j < CurrentNodes.length; j++) {
    if (CurrentNodes[j] === '') continue;

    const HasZ = CurrentNodes[j][2] === 'Z';
    const Exits = Network.get(CurrentNodes[j]) ?? ({} as Node);

    if (HasZ) {
      steps.push(step);
      CurrentNodes[j] = '';
    } else {
      CurrentNodes[j] = NextInstruction === 'L' ? Exits.Left : Exits.Right;
    }
  }

  if (steps.length === CurrentNodes.length) break;
}

result = LeastCommonMultiple(...steps);

export default result;
