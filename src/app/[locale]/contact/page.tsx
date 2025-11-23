"use client";

import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useContactAnimation } from "./useContactAnimation";
import Header from "../components/Header/Header";
import styles from "./Contact.module.css";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  useSmoothScroll();
  
  const { 
    heroRef, 
    formRef, 
    infoRef 
  } = useContactAnimation();  

  const t = useTranslations("contact");

  return (
    <>
    <Header />
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <h2>
            {t("title")}
          </h2>
          <p>
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.formSection} ref={formRef}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            {/* Left: Form */}
            <div className={`formColumn ${styles.formColumn}`}>
              <form className={styles.form} method="POST" action="/api/contact">
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    {t("form.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.label}>
                    {t("form.company")}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    {t("form.tellUs")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className={styles.textarea}
                    required
                  />
                </div>
                {/* Honeypot field hidden from users */}
                <input type="text" name="phone" tabIndex={-1} autoComplete="off" className="hidden" />

                <button type="submit" className={styles.submitButton}>
                  <span>{t("form.sendMessage")}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <p className={styles.agree}>
                  * {t("form.agree")} Terms of Service & Privacy Policy
                </p>
              </form>
            </div>

            {/* Right: Contact Info */}
            <div className={`infoColumn ${styles.infoColumn}`} ref={infoRef}>
              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Email</h3>
                <a href="mailto:hello@depstudio.com" className={styles.infoLink}>
                  hello@depstudio.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}