"use client";

import { Link } from '@/i18n/navigation';
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <div className={styles.ctaSection}>
      <h2>Ready to elevate your brand?</h2>
      <p>Let’s talk about your next project and how we can help you succeed.</p>
      <Link href="/contact" className={styles.ctaButton}>
        Contact Us
      </Link>
    </div>
  );
}