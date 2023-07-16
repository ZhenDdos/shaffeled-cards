import React, { useCallback, useMemo, useRef, useState } from "react";
import { CardField } from "./components/CardField";
import { Card } from "./types";
import { generateCardField, getTimeToViewFromSeconds } from "./utils";
import { Timer, TimerMethods } from "./components/Timer";
import styles from "./App.module.scss";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";

const App = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [tryCounts, setTryCounts] = useState<number>(0);
  const timerRef = useRef<TimerMethods>();
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState<boolean>(false);
  const [isCompleteGameModalOpen, setIsCompleteGameModalOpen] =
    useState<boolean>(false);

  const isGameStarted = !!cards.length;

  const onIncreaseTryCounts = () => {
    setTryCounts((tryCounts) => tryCounts + 1);
  };

  const onStartGameClick = () => {
    setCards(generateCardField());
    timerRef.current?.startTimer();
  };

  const endGame = () => {
    setCards([]);
    timerRef.current?.resetTimer();
    setTryCounts(0);
  };

  const closeEndGameModal = () => {
    setIsEndGameModalOpen(false);
  };

  const onEndGameClick = () => {
    timerRef.current?.stopTimer();
    setIsEndGameModalOpen(true);
  };

  const handleEndGameModalCancelClose = () => {
    closeEndGameModal();
    timerRef.current?.startTimer();
  };

  const handleEndGameModalConfirmClose = () => {
    closeEndGameModal();
    endGame();
  };

  const onCompleteGame = () => {
    setIsCompleteGameModalOpen(true);
    timerRef.current?.stopTimer();
  };

  const handleCloseCompleteModal = () => {
    setIsCompleteGameModalOpen(false);
    endGame();
  };

  const getCompleteGameText = () => {
    const time = timerRef.current?.currentTime;
    return `Вы успешно завершили игру за ${tryCounts} попыток. Затраченное время - ${getTimeToViewFromSeconds(
      time!
    )}`;
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <div className={styles.timerContainer}>
          <Timer ref={timerRef} />
        </div>
        <div>
          <Button
            onClick={isGameStarted ? onEndGameClick : onStartGameClick}
            className={styles.gameControlButton}
          >
            {isGameStarted ? "Закончить игру" : "Начать игру"}
          </Button>
        </div>
        <div className={styles.counts}>Попытки: {tryCounts}</div>
      </div>
      <div className={styles.content}>
        {!!cards.length ? (
          <CardField
            cards={cards}
            onCompleteGame={onCompleteGame}
            onIncreaseTryCounts={onIncreaseTryCounts}
          />
        ) : (
          <div className={styles.emptyFieldPlaceholder}>
            Нажмите начать игру, чтобы заполнить поле
          </div>
        )}
      </div>

      {isEndGameModalOpen && (
        <Modal
          title="Вы действительно хотите закончить игру?"
          text="Данные игры не сохранятся"
          onCancel={handleEndGameModalCancelClose}
          onConfirm={handleEndGameModalConfirmClose}
        />
      )}
      {isCompleteGameModalOpen && (
        <Modal
          title="Поздравляю, вы победили!!!"
          text={getCompleteGameText()}
          onConfirm={handleCloseCompleteModal}
          confirmButtonText="Завершить"
        />
      )}
    </div>
  );
};

export default App;
