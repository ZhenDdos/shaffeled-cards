import React, { useCallback, useRef, useState } from "react";
import { CardField } from "./components/CardField";
import { Card } from "./types";
import { generateCardField } from "./utils";
import { Timer, TimerMethods } from "./components/Timer";
import styles from "./App.module.scss";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";

const App = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [tryCounts, setTryCounts] = useState<number>(0);
  const timerRef = useRef<TimerMethods>();
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState<boolean>(false);

  const onIncreaseTryCounts = () => {
    setTryCounts((tryCounts) => tryCounts + 1);
  };

  const stopTimer = useCallback(() => {
    timerRef.current?.stopTimer();
  }, []);

  const resetTimer = useCallback(() => {
    timerRef.current?.resetTimer();
  }, []);

  const startGame = () => {
    setCards(generateCardField());
    timerRef.current?.startTimer();
  };

  const endGame = () => {
    setCards([]);
    resetTimer();
    setTryCounts(0);
  };

  const openEndGameModal = () => {
    setIsEndGameModalOpen(true);
  };

  const closeEndGameModal = () => {
    setIsEndGameModalOpen(false);
  };

  const handleEndGameModalOpen = () => {
    stopTimer();
    if(!!cards.length) setIsEndGameModalOpen(true);
  };

  const handleEndGameModalCancelClose = () => {
    closeEndGameModal();
    timerRef.current?.startTimer();
  };

  const handleEndGameModalConfirmClose = () => {
    closeEndGameModal();
    endGame();
  };

  return (
    <div className="App">
      <div className={styles.rootContainer}>
        <div>
          <div className={styles.buttonsContainer}>
            <Button
              onClick={startGame}
              isDisabled={!!cards.length}
              className={styles.gameControlButton}
            >
              Начать игру
            </Button>
            <Button
              onClick={handleEndGameModalOpen}
              className={styles.gameControlButton}
            >
              Закончить игру
            </Button>
          </div>
          {!!cards.length ? (
            <CardField
              cards={cards}
              onEndGame={stopTimer}
              onIncreaseTryCounts={onIncreaseTryCounts}
            />
          ) : (
            <div className={styles.emptyFieldMessage}>
              Нажмите начать игру, чтобы заполнить поле
            </div>
          )}
        </div>
        <div></div>
      </div>
      <div className={styles.timerContainer}>
        <Timer ref={timerRef} />
      </div>
      <div className={styles.counts}>Количество попыток: {tryCounts}</div>
      {isEndGameModalOpen && (
        <Modal
          title="Вы действительно хотите закончить игру?"
          text="Данные игры не сохраняться"
          onCancel={handleEndGameModalCancelClose}
          onConfirm={handleEndGameModalConfirmClose}
        />
      )}
    </div>
  );
};

export default App;
