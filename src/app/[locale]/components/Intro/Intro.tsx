"use client";

import { useIntroAnimation } from "./useIntroAnimation";
import styles from "./Intro.module.css";
import {useTranslations} from 'next-intl';

export default function Intro() {
  const { titleRef, subtitleRef, columnsRef, modelTextRef } = useIntroAnimation();
  const t = useTranslations("intro");

  return (
    <section className={`intro ${styles.main}`}>
      {/* Main title */}
      <div className={styles.title}>
        <h1 ref={titleRef}>
          {t("title")}
        </h1>
      </div>

      {/* Subtitle */}
      <div className={styles.subtitle}>
        <h2 ref={subtitleRef}>{t("subtitle")}</h2>
      </div>

      {/* Two column section */}
      <div className={styles.columns} ref={columnsRef}>
        <div className={styles.column}>
          <h3>{t("ourApproach")}</h3>
          <p>
            {t("approach")}
          </p>
        </div>
        <div className={styles.column}>
          <h3>{t("ourProcess")}</h3>
          <p>
            {t("process")}
          </p>
        </div>
      </div>

      {/* 3D Model container with text */}
      <div className={`modelContainer ${styles.modelContainer}`}>
        <div className={styles.modelWrapper}>
          {/* 3D model will be positioned here via CSS */}
        </div>
        <div className={`modelText ${styles.modelText}`} ref={modelTextRef}>
          <h2>{t("innDesign")}</h2>
          <p>
            {t("design1")}
          </p>
          <p>
            {t("design2")}
          </p>
        </div>
      </div>
    </section>
  );
}