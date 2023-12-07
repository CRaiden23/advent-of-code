import { parseInput } from '../util/index.js';

type Card =
  | 'A'
  | 'K'
  | 'Q'
  | 'T'
  | '9'
  | '8'
  | '7'
  | '6'
  | '5'
  | '4'
  | '3'
  | '2'
  | 'J';

const CardStrengths: { [cards in Card]: number } = {
  A: 12,
  K: 11,
  Q: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
  J: 0,
};

enum Rank {
  FiveKind = 6,
  FourKind = 5,
  FullHouse = 4,
  ThreeKind = 3,
  TwoPair = 2,
  OnePair = 1,
  HighCard = 0,
}

class Hand {
  Cards: string;
  Bid: number;
  HandMap: Map<string, number>;
  JokerCount = 0;
  Rank = 0;

  constructor(
    cards: string,
    bid: number,
    map: Map<string, number>,
    jokerCount: number
  ) {
    this.Cards = cards;
    this.Bid = bid;
    this.HandMap = map;
    this.JokerCount = jokerCount;
  }

  determineInitialRank() {
    const matchingCounts = Array.from(this.HandMap.values());
    const numSets = matchingCounts.length;
    const hasAtLeastOneJoker = this.JokerCount > 0;
    const hasTwoJokers = this.JokerCount == 2;

    switch (numSets) {
      case 1:
        this.Rank = Rank.FiveKind;
        break;
      case 2:
        if (matchingCounts.find((count) => count === 4)) {
          this.Rank = hasAtLeastOneJoker ? Rank.FiveKind : Rank.FourKind;
        } else {
          this.Rank = hasAtLeastOneJoker ? Rank.FiveKind : Rank.FullHouse;
        }
        break;
      case 3:
        if (matchingCounts.find((count) => count === 3)) {
          this.Rank = hasAtLeastOneJoker ? Rank.FourKind : Rank.ThreeKind;
        } else {
          if (hasAtLeastOneJoker) {
            this.Rank = hasTwoJokers ? Rank.FourKind : Rank.FullHouse;
          } else {
            this.Rank = Rank.TwoPair;
          }
        }
        break;
      case 4:
        this.Rank = hasAtLeastOneJoker ? Rank.ThreeKind : Rank.OnePair;
        break;
      default:
        this.Rank = hasAtLeastOneJoker ? Rank.OnePair : Rank.HighCard;
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
      let jokerCount = 0;

      cards.split('').forEach((card) => {
        hand.set(card, (hand.get(card) ?? 0) + 1);
        if (card === 'J') jokerCount++;
      });

      return new Hand(cards, Number(bid), hand, jokerCount);
    },
  },
});
let result = 0;

hands.forEach((hand) => hand.determineInitialRank());

handleTies(hands).forEach((hand, index) => {
  result += hand.Bid * (index + 1);
});

export default result;
