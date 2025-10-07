import { useRef } from "react";
import styles from "@/styles/LongPressButton.module.css";

interface LongPressButtonProps {
  onLongPress: () => void;
  duration?: number;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function LongPressButton({
  onLongPress,
  duration = 1000,
  disabled = false,
  children,
  className = "",
}: LongPressButtonProps) {
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handlePressStart = () => {
    if (disabled) return;

    // Add the pressing class for animation
    if (buttonRef.current) {
      buttonRef.current.classList.add(styles.pressing);
    }

    pressTimerRef.current = setTimeout(() => {
      onLongPress();
      if (buttonRef.current) {
        buttonRef.current.classList.remove(styles.pressing);
      }
    }, duration);
  };

  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    if (buttonRef.current) {
      buttonRef.current.classList.remove(styles.pressing);
    }
  };

  const handlePressCancel = () => {
    handlePressEnd();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles.longPressButton} ${className} ${disabled ? styles.disabled : ""}`}
      disabled={disabled}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressCancel}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressCancel}
    >
      {children}
      <div className={styles.progressBar} />
    </button>
  );
}
