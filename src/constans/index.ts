import { Card, CardDenomination, CardSuit } from "../types";


export const deck: Card[] = Object.values(CardDenomination).reduce(
  (acc, denomination) => {
    return [
      ...acc,
      { denomination, suit: CardSuit.Clubs },
      { denomination, suit: CardSuit.Diamonds },
      { denomination, suit: CardSuit.Hearts },
      { denomination, suit: CardSuit.Spades },
    ];
  },
  [] as Card[]
);

export const suitsSymbols: Record<CardSuit, string> = {
  [CardSuit.Clubs]: "♣",
  [CardSuit.Diamonds]: "♦",
  [CardSuit.Hearts]: "♥",
  [CardSuit.Spades]: "♠"
}
