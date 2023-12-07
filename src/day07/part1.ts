import { parseInput } from '../util/index.js';

type Card =
  | 'A'
  | 'K'
  | 'Q'
  | 'J'
  | 'T'
  | '9'
  | '8'
  | '7'
  | '6'
  | '5'
  | '4'
  | '3'
  | '2';

const CardStrengths: { [cards in Card]: number } = {
  A: 12,
  K: 11,
  Q: 10,
  J: 9,
  T: 8,
  9: 7,
  8: 6,
  7: 5,
  6: 4,
  5: 3,
  4: 2,
  3: 1,
  2: 0,
};

class Hand {
  Cards: string;
  Bid: number;
  HandMap: Map<string, number>;
  Rank = 0;

  constructor(cards: string, bid: number, map: Map<string, number>) {
    this.Cards = cards;
    this.Bid = bid;
    this.HandMap = map;
  }

  determineInitialRank() {
    const matchingCounts = Array.from(this.HandMap.values());
    const numSets = matchingCounts.length;

    switch (numSets) {
      case 1:
        this.Rank = 6;
        break;
      case 2:
        if (matchingCounts.find((count) => count === 4)) {
          this.Rank = 5;
        } else {
          this.Rank = 4;
        }
        break;
      case 3:
        if (matchingCounts.find((count) => count === 3)) {
          this.Rank = 3;
        } else {
          this.Rank = 2;
        }
        break;
      case 4:
        this.Rank = 1;
        break;
      default:
        this.Rank = 0;
        break;
    }
  }
}

const handleTies = (hands: Hand[]): Hand[] => {
  hands.sort((a, b) => {
    if (a.Rank > b.Rank) {
      return 1;
    }

    if (a.Rank < b.Rank) {
      return -1;
    }

    if (a.Rank === b.Rank) {
      for (let i = 0; i < a.Cards.length; i++) {
        if (
          CardStrengths[a.Cards[i] as Card] > CardStrengths[b.Cards[i] as Card]
        ) {
          return 1;
        } else if (
          CardStrengths[a.Cards[i] as Card] < CardStrengths[b.Cards[i] as Card]
        ) {
          return -1;
        }
      }
    }

    return 0;
  });

  return hands;
};

const hands = parseInput({
  split: {
    mapper: (line) => {
      const [cards, bid] = line.split(' ');
      const hand = new Map<string, number>();

      cards.split('').forEach((card) => {
        hand.set(card, (hand.get(card) ?? 0) + 1);
      });

      return new Hand(cards, Number(bid), hand);
    },
  },
});
let result = 0;

hands.forEach((hand) => hand.determineInitialRank());

handleTies(hands).forEach((hand, index) => {
  result += hand.Bid * (index + 1);
});

export default result;
