import { useTranslations } from "next-intl";
import Header from "../components/Header/Header";
import styles from "./privacyPage.module.css";


export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <>
      <Header />
      <div className={`${styles.bgSurface} ${styles.textPrimary}`}>
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
                <div className={styles.spaceY8}>
                  <div className={styles.mb4}>
                    <h2 className={styles.sectionTitle}>{t("priv_protec")}</h2>
                    <p className={styles.sectionContent}>
                      {t("priv_protec_text")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section1.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section1.content")}
                    </p>
                    <div>
                      {t.rich("section1.bullets", {
                        b: (chunks) => <strong>{chunks}</strong>,
                        ul: (chunks) => <ul className={styles.listDisc}>{chunks}</ul>,
                        li: (chunks) => <li>{chunks}</li>
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section2.title")}
                    </h3>
                    <div className={styles.sectionContent}>
                      {t.rich("section2.content", {
                        b: (chunks) => <strong>{chunks}</strong>,
                        ul: (chunks) => <ul className={styles.listDisc}>{chunks}</ul>,
                        li: (chunks) => <li>{chunks}</li>
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section3.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section3.content")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section4.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section4.content")}
                    </p>
                    <div>
                      {t.rich("section4.bullets", {
                        b: (chunks) => <strong>{chunks}</strong>,
                        ul: (chunks) => <ul className={styles.listDisc}>{chunks}</ul>,
                        li: (chunks) => <li>{chunks}</li>
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section5.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section5.content")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section6.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section6.content")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section7.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section7.content")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section8.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section8.content")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section9.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section9.content")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section10.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section10.content")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section11.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section11.content")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section12.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section12.content")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section13.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section13.content")}
                    </p>
                    <div className={styles.sectionContent}>
                      {t.rich("section13.bullets", {
                        b: (chunks) => <strong>{chunks}</strong>,
                        ul: (chunks) => <ul className={styles.listDisc}>{chunks}</ul>,
                        li: (chunks) => <li>{chunks}</li>
                      })}
                    </div>
                    <p className={styles.sectionContent}>
                      {t("section13.content2")}
                    </p>
                    <div className={styles.sectionContent}>
                      {t.rich("section13.bullets2", {
                        b: (chunks) => <strong>{chunks}</strong>,
                        ul: (chunks) => <ul className={styles.listDisc}>{chunks}</ul>,
                        li: (chunks) => <li>{chunks}</li>
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section14.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section14.content")}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.sectionTitle}>
                      {t("section15.title")}
                    </h3>
                    <p className={styles.sectionContent}>
                      {t("section15.content")}
                    </p>
                  </div>
                  <div className={styles.mb4}>
                    <h2 className={styles.sectionTitle}>{t("changePrivacy.title")}</h2>
                    <p className={styles.sectionContent}>
                      {t("changePrivacy.content")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
