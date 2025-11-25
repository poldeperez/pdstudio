"use client";

import { useOutroAnimation } from "./useOutroAnimation";
import styles from "./Outro.module.css";
import { useTranslations } from "next-intl";

export default function Outro() {
  const { titleRef } = useOutroAnimation();
  const t = useTranslations("outro");

  return (
    <section className={`outro ${styles.main}`}>
      {/* Main title */}
      <div className={styles.title}>
        <h2 ref={titleRef}>
          {t("title")}
        </h2>
      </div>
    </section>
  );
}