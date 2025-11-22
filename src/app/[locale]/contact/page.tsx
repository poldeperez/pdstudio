"use client";

import { useRef } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useContactAnimation } from "./useContactAnimation";
import Header from "../components/Header/Header";
import styles from "./Contact.module.css";

export default function ContactPage() {
  useSmoothScroll();
  
  const { 
    heroRef, 
    formRef, 
    infoRef 
  } = useContactAnimation();

  return (
    <>
    <Header />
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <h2>
            LET'S WORK<br />TOGETHER
          </h2>
          <p>
            We'd love to hear about your project
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.formSection} ref={formRef}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            {/* Left: Form */}
            <div className={`formColumn ${styles.formColumn}`}>
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name *
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
                    Company
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
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className={styles.textarea}
                    required
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  <span>Send Message</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
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

              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Phone</h3>
                <a href="tel:+1234567890" className={styles.infoLink}>
                  +1 (234) 567-890
                </a>
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Location</h3>
                <p className={styles.infoText}>
                  123 Design Street<br />
                  Creative City, CC 12345
                </p>
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Follow</h3>
                <div className={styles.socialLinks}>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    Twitter
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    Instagram
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}