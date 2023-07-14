import { suitsSymbols } from "../../constans";
import { Card } from "../../types";
import styles from "./CardItem.module.scss";

interface CardProps {
  card: Card;
  isOpen: boolean;
  onClick(card: Card): void;
}

export const CardItem = ({ card, isOpen, onClick }: CardProps) => {
  const { denomination, suit } = card;
  return (
    <div onClick={() => onClick(card)} className={styles.card}>
      {isOpen ? (
        <div>
          {denomination}
          {suitsSymbols[suit]}
        </div>
      ) : (
        <div className={styles.backSide}></div>
      )}
    </div>
  );
};
