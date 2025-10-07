import { useCallback, useEffect, useState } from "react";
import LongPressButton from "@/components/LongPressButton";
import styles from "@/styles/Tool.module.css";

export default function Tool() {
  const [stage, setStage] = useState<"select" | "view">("select");
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [outliarNumber, setOutliarNumber] = useState<number>(1);
  const [fakeOutliarNumber, setFakeOutliarNumber] = useState<number>(2);
  const [revealedPlayer, setRevealedPlayer] = useState<number | null>(null);
  const [viewedPlayers, setViewedPlayers] = useState<Set<number>>(new Set());

  const generateOutliar = useCallback(() => {
    // Generate random outliar and fake outliar when entering view stage
    const outliar = Math.floor(Math.random() * playerCount) + 1;
    let fakeOutliar = Math.floor(Math.random() * playerCount) + 1;
    while (fakeOutliar === outliar) {
      fakeOutliar = Math.floor(Math.random() * playerCount) + 1;
    }
    setOutliarNumber(outliar);
    setFakeOutliarNumber(fakeOutliar);
    setViewedPlayers(new Set()); // Reset viewed players when entering view stage
  }, [playerCount]);

  useEffect(() => {
    if (stage === "view") generateOutliar();
  }, [stage, generateOutliar]);

  const handlePlayerCountSelect = (count: number) => {
    setPlayerCount(count);
    setStage("view");
  };

  const handleLongPress = (playerNum: number) => {
    setRevealedPlayer(playerNum);
    setViewedPlayers((prev) => new Set(prev).add(playerNum));
  };

  const handleRevealClose = () => {
    setRevealedPlayer(null);
  };

  const handleBackToSelect = () => {
    setStage("select");
    setRevealedPlayer(null);
  };

  const getRevealedNumber = (playerNum: number): number => {
    if (playerNum === outliarNumber) {
      return fakeOutliarNumber;
    }
    return outliarNumber;
  };

  if (stage === "select") {
    return (
      <section className={styles.toolSection}>
        <h1 className={styles.sectionTitle}>游戏工具</h1>
        <div className={styles.selectContainer}>
          <h2 className={styles.subtitle}>选择游戏人数</h2>
          <div className={styles.playerButtons}>
            {[4, 5, 6, 7].map((count) => (
              <button
                key={count}
                type="button"
                className={styles.playerButton}
                onClick={() => handlePlayerCountSelect(count)}
              >
                {count}人
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.toolSection}>
      <h1 className={styles.sectionTitle}>身份查看</h1>
      <div className={styles.viewContainer}>
        <p className={styles.instruction}>长按玩家编号查看身份信息</p>
        <div className={styles.playerGrid}>
          {Array.from({ length: playerCount }, (_, i) => i + 1).map(
            (playerNum) => (
              <LongPressButton
                key={playerNum}
                onLongPress={() => handleLongPress(playerNum)}
                duration={700}
                disabled={viewedPlayers.has(playerNum)}
              >
                {playerNum}
              </LongPressButton>
            )
          )}
        </div>
        <div className={styles.gameActions}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBackToSelect}
          >
            重新选择人数
          </button>
          <button
            type="button"
            disabled={viewedPlayers.size === 0}
            className={styles.backButton}
            onClick={generateOutliar}
          >
            下一轮
          </button>
        </div>
      </div>

      {revealedPlayer !== null && (
        <button
          type="button"
          className={styles.overlay}
          onClick={handleRevealClose}
        >
          <div className={styles.revealCard}>
            <p className={styles.revealText}>
              “异类”是 {getRevealedNumber(revealedPlayer)} 号玩家
            </p>
          </div>
        </button>
      )}
    </section>
  );
}
