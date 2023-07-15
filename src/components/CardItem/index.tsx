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
    <div className={styles.scene}>
      <div
        className={`${styles.card} ${!isOpen ? styles["is-flipped"] : ""}`}
        onClick={(e) => onClick(card)}
      >
        <div
          className={`${styles["card__face"]} ${styles["card__face--front"]}`}
        >
          {denomination}
          {suitsSymbols[suit]}
        </div>
        <div
          className={`${styles["card__face"]} ${styles["card__face--back"]}`}
        ></div>
      </div>
    </div>
  );
};
