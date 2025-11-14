"use client";

import { useOutroAnimation } from "./useOutroAnimation";
import styles from "./Outro.module.css";

export default function Outro() {
  const { titleRef } = useOutroAnimation();

  return (
    <section className={`outro ${styles.main}`}>
      {/* Main title */}
      <div className={styles.title}>
        <h2 ref={titleRef}>
          LET'S CREATE SOMETHING AMAZING TOGETHER
        </h2>
      </div>
    </section>
  );
}