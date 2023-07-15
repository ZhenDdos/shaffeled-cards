import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Card } from "../../types";
import { CardItem } from "../CardItem";
import styles from "./CardField.module.scss";

interface CardFieldProps {
  cards: Card[];
  onCompleteGame(): void;
  onIncreaseTryCounts(): void;
}

export const CardField = ({
  cards,
  onCompleteGame,
  onIncreaseTryCounts,
}: CardFieldProps) => {
  const [openedCards, setOpenCards] = useState<Card[]>([]);
  const [currentOpenedCards, setCurrentOpenedCards] = useState<
    (Card & { cardIndex: number })[]
  >([]);
  const updateCardsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTwoOpenedCards = useCallback(() => {
    if (
      currentOpenedCards[0].rank === currentOpenedCards[1].rank &&
      currentOpenedCards[0].suit === currentOpenedCards[1].suit
    ) {
      setOpenCards((openedCards) => [...openedCards, ...currentOpenedCards]);
    }

    setCurrentOpenedCards([]);
  }, [currentOpenedCards, openedCards]);

  const handleCardClick = useCallback(
    (cardIndex: number) => (card: Card) => {
      if (!!currentOpenedCards.find((card) => card.cardIndex === cardIndex))
        return;
      switch (currentOpenedCards.length) {
        case 0:
          setCurrentOpenedCards([
            {
              ...card,
              cardIndex,
            },
          ]);
          break;
        case 1:
          setCurrentOpenedCards((currentOpenedCards) => [
            ...currentOpenedCards,
            {
              ...card,
              cardIndex,
            },
          ]);
          break;
        default:
          break;
      }
    },
    [currentOpenedCards.length]
  );

  useEffect(() => {
    if (currentOpenedCards.length === 2) {
      onIncreaseTryCounts();
      updateCardsTimerRef.current = setTimeout(handleTwoOpenedCards, 1500);
    }

    return () => {
      updateCardsTimerRef.current && clearTimeout(updateCardsTimerRef.current);
    };
  }, [currentOpenedCards.length]);

  useEffect(() => {
    if (openedCards.length === cards.length) {
      onCompleteGame();
    }
  }, [openedCards.length]);

  return (
    <div className={styles.container}>
      {cards.map((card, idx) => {
        const isCardOpen = !!currentOpenedCards.find(
          ({ cardIndex }) => cardIndex === idx
        );
        const isCardInvisible = !!openedCards.find(
          ({ rank, suit }) => rank === card.rank && suit === card.suit
        );

        return (
          <div className={isCardInvisible ? styles.invisible : ""}>
            <CardItem
              card={card}
              isOpen={isCardOpen}
              onClick={handleCardClick(idx)}
            />
          </div>
        );
      })}
    </div>
  );
};
