import {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useMemo,
} from "react";
import styles from "./Timer.module.scss";

export interface TimerMethods {
  startTimer(): void;
  resetTimer(): void;
  stopTimer(): void;
}

export const Timer = forwardRef((_, ref) => {
  const [time, setTime] = useState<number>(0);

  const timeToView = useMemo(() => {
    const [minutes, seconds] = [Math.floor(time / 60), time % 60];

    const transformToTwoSymbols = (number: number) =>
      `${number}`.length < 2 ? `0${number}` : `${number}`;

    return `${transformToTwoSymbols(minutes)}:${transformToTwoSymbols(
      seconds
    )}`;
  }, [time]);

  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const clearIntervalIfExist = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const stopTimer = () => {
    clearIntervalIfExist();
  };

  const resetTimer = () => {
    clearIntervalIfExist();
    setTime(0);
  };

  const startTimer = () => {
    clearIntervalIfExist();
    intervalRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  useImperativeHandle(ref, () => {
    return {
      resetTimer,
      startTimer,
      stopTimer,
    };
  });

  return <div className={styles.timer}>{timeToView}</div>;
});
