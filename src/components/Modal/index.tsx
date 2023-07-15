import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import { Button } from "../Button";

interface ModalProps {
  title: string;
  text: string;
  onCancel?(): void;
  onConfirm?(): void;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

export const Modal = ({
  text,
  title,
  onCancel,
  onConfirm,
  cancelButtonText = "Отменить",
  confirmButtonText = "Подтвердить",
}: ModalProps) => {
  return createPortal(
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <button onClick={onCancel || onConfirm} className={styles.closeButton}>
          x
        </button>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
        <div className={styles.actionButtons}>
          {onConfirm && (
            <Button onClick={onConfirm}>{confirmButtonText}</Button>
          )}
          {onCancel && <Button onClick={onCancel}>{cancelButtonText}</Button>}
        </div>
      </div>
    </div>,
    document.getElementById("modalPortaL") as HTMLElement
  );
};
