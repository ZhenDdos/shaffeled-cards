import { deck } from "../constans";
import { Card } from "../types";

export const generateCardField = (size: number = 36): Card[] => {
  const deckCopy = [...deck];
  const result: Card[] = [];

  while (result.length < size) {
    const startIndex = Math.floor(Math.random() * deckCopy.length);
    const [newItem] = deckCopy.splice(startIndex, 1);
    result.push(newItem, newItem);
  }

  return shuffleArray<Card>(result);
};

const shuffleArray = <T>(arr: T[]) => {
  const arrCopy = [...arr];
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }

  return arrCopy;
};

export const getTimeToViewFromSeconds = (time: number) => {
  const [minutes, seconds] = [Math.floor(time / 60), time % 60];

  const transformToTwoSymbols = (number: number) =>
    `${number}`.length < 2 ? `0${number}` : `${number}`;

  return `${transformToTwoSymbols(minutes)}:${transformToTwoSymbols(seconds)}`;
};
