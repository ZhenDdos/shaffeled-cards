export enum CardDenomination {
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9",
    Ten = "10",
    Jack = "J",
    Queen = "Q",
    King = "K",
    Ace = "A"
}

export enum CardSuit {
    Clubs = "♣",
    Diamonds = "♦",
    Hearts = "♥",
    Spades = "♠"
}

export interface Card {
    denomination: CardDenomination,
    suit: CardSuit
} 