export enum CardRank {
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "J",
  Queen = "Q",
  King = "K",
  Ace = "A",
}

export enum CardSuit {
  Clubs = "clubs",
  Diamonds = "diamonds",
  Hearts = "hearts",
  Spades = "spades",
}

export interface Card {
  rank: CardRank;
  suit: CardSuit;
}
