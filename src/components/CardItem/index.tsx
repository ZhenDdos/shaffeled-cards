import { suitsSymbols } from "../../constans";
import { Card } from "../../types";
import styles from "./CardItem.module.scss";

interface CardProps {
  card: Card;
  isOpen: boolean;
  onClick(card: Card): void;
}

export const CardItem = ({ card, isOpen, onClick }: CardProps) => {
  const { rank, suit } = card;
  return (
    <div
      className={`${styles.card} ${!isOpen ? styles["is-flipped"] : ""}`}
      onClick={(e) => onClick(card)}
    >
      <div
        className={`${styles["card__face"]} ${styles["card__face--front"]} ${
          styles[`${suit}_${rank}`]
        }`}
      ></div>
      <div
        className={`${styles["card__face"]} ${styles["card__face--back"]} ${styles.mapShirt}`}
      ></div>
    </div>
  );
};
