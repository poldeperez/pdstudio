import { Link } from '@/i18n/navigation';
import styles from "./Footer.module.css";
import { useTranslations } from "next-intl";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("navigation");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Company Info */}
        <div className={styles.column}>
          <h3 className={styles.logo}>dz node</h3>
          <p className={styles.tagline}>
            hello@dznode.com
          </p>
        </div>

        {/* Navigation Links */}
        <div className={styles.column}>
          <h4 className={styles.heading}>{t("navigate")}</h4>
          <ul className={styles.list}>
            <li>
              <Link href="/" className={styles.link}>
                {t("home")}
              </Link>
            </li>
            <li>
              <Link href="/services" className={styles.link}>
                {t("services")}
              </Link>
            </li>
            <li>
              <Link href="/work" className={styles.link}>
                {t("works")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.link}>
                {t("contact")}
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {currentYear} Dz node. {t("allRights")}.
        </p>
        <div className={styles.legal}>
          <Link href="/privacy" className={styles.legalLink}>
            {t("privPolicy")}
          </Link>
          <Link href="/legal" className={styles.legalLink}>
            {t("termsOf")}
          </Link>
        </div>
      </div>
    </footer>
  );
}