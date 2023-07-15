import { Card, CardRank, CardSuit } from "../types";

export const deck: Card[] = Object.values(CardRank).reduce(
  (acc, rank) => {
    return [
      ...acc,
      { rank, suit: CardSuit.Clubs },
      { rank, suit: CardSuit.Diamonds },
      { rank, suit: CardSuit.Hearts },
      { rank, suit: CardSuit.Spades },
    ];
  },
  [] as Card[]
);

export const suitsSymbols: Record<CardSuit, string> = {
  [CardSuit.Clubs]: "♣",
  [CardSuit.Diamonds]: "♦",
  [CardSuit.Hearts]: "♥",
  [CardSuit.Spades]: "♠",
};
