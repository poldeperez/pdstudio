"use client";

import { useIntroAnimation } from "./useIntroAnimation";
import styles from "./Intro.module.css";

export default function Intro() {
  const { titleRef, subtitleRef, columnsRef, modelTextRef } = useIntroAnimation();

  return (
    <section className={`intro ${styles.main}`}>
      {/* Main title */}
      <div className={styles.title}>
        <h1 ref={titleRef}>
          We are a digital studio crafting exceptional experiences through
          design and technology.
        </h1>
      </div>

      {/* Subtitle */}
      <div className={styles.subtitle}>
        <h2 ref={subtitleRef}>WHO WE ARE WHO WE ARE WHO WE ARE</h2>
      </div>

      {/* Two column section */}
      <div className={styles.columns} ref={columnsRef}>
        <div className={styles.column}>
          <h3>Our Approach</h3>
          <p>
            We believe in creating digital experiences that are not only
            visually stunning but also highly functional and user-centric.
            Every project starts with understanding your goals and audience.
          </p>
        </div>
        <div className={styles.column}>
          <h3>Our Process</h3>
          <p>
            From initial concept to final delivery, we work collaboratively
            with our clients to ensure every detail aligns with their vision.
            We iterate, refine, and perfect until we implement the experience
            that best represents our clients identity.
          </p>
        </div>
      </div>

      {/* 3D Model container with text */}
      <div className={`modelContainer ${styles.modelContainer}`}>
        <div className={styles.modelWrapper}>
          {/* 3D model will be positioned here via CSS */}
        </div>
        <div className={`modelText ${styles.modelText}`} ref={modelTextRef}>
          <h2>Innovation meets Design</h2>
          <p>
            We combine cutting-edge technology with creative design thinking
            to build products that stand out in the digital landscape.<br />
            Our goal is to allow our clients to leave an impression of themselves 
            through disruptive designs and experiences.
          </p>
        </div>
      </div>
    </section>
  );
}