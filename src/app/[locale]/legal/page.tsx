import { useTranslations } from "next-intl";
import styles from "./legalPage.module.css";
import Header from "../components/Header/Header";

export default function LegalPage() {
  const t = useTranslations("legal");

  return (
    <>
    <Header />
    <div className={styles.bgSurface + " " + styles.textPrimary}>
      <main>
        {/* Hero Banner */}
        <section className={styles.bgPrimary}>
          <div className={styles.container}>
            <div className={styles.heroBanner}>
              <h1 className={styles.heroTitle}>
                {t("title")}
              </h1>
              <p className={styles.heroSubtitle}>
                {t("subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.prose}>
              <div>
                <h2 className={styles.sectionTitle}>
                  {t("section1.title")}
                </h2>
                <p className={styles.sectionContent}>
                  {t("section1.content")}
                </p>
              </div>

              <div>
                <h2 className={styles.sectionTitle}>
                  {t("section2.title")}
                </h2>
                <p className={styles.sectionContent}>
                  {t("section2.content")}
                </p>
                <p className={styles.sectionContent}>
                  {t("section2.content2")}
                </p>
              </div>

              <div>
                <h2 className={styles.sectionTitle}>
                  {t("section3.title")}
                </h2>
                <p className={styles.sectionContent}>
                  {t("section3.content")}
                </p>
              </div>

              <div>
                <h2 className={styles.sectionTitle}>
                  {t("section4.title")}
                </h2>
                <p className={styles.sectionContent}>
                  {t("section4.content")}
                </p>
              </div>

              <div>
                <h2 className={styles.sectionTitle}>
                  {t("section5.title")}
                </h2>
                <p className={styles.sectionContent}>
                  {t("section5.content")}
                </p>
              </div>
              <div>
                <h2 className={styles.sectionTitle}>
                  {t("section6.title")}
                </h2>
                <p className={styles.sectionContent}>
                  {t("section6.content")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
