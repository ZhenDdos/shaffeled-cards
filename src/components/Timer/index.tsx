import {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useMemo,
  ForwardedRef,
} from "react";
import styles from "./Timer.module.scss";
import { getTimeToViewFromSeconds } from "../../utils";

export interface TimerMethods {
  startTimer(): void;
  resetTimer(): void;
  stopTimer(): void;
  currentTime: number;
}

export const Timer = forwardRef((_, ref) => {
  const [time, setTime] = useState<number>(0);

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

  useImperativeHandle<unknown, TimerMethods>(ref, () => {
    return {
      resetTimer,
      startTimer,
      stopTimer,
      currentTime: time,
    };
  });

  return <div className={styles.timer}>{getTimeToViewFromSeconds(time)}</div>;
});
