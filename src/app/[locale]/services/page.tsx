"use client";

import { useState } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useServicesPageAnimation } from "./useServicesPageAnimation";
import Header from "../components/Header/Header";
import styles from "./ServicesPage.module.css";
import CTASection from "../components/CTASection/CTASection";
import { useTranslations } from "next-intl";
import { CardProps } from "../components/Services/ServiceCard"

export default function ServicesPage() {
	const { introRef } = useServicesPageAnimation();
	useSmoothScroll();
	const t = useTranslations("services");
	const servicesData = t.raw("cards");

	// Default to Web Design (index 0)
	const [activeIdx, setActiveIdx] = useState(0);

	return (
		<>
			<Header />
			<section className={styles.servicesSection}>
				{/* Intro */}
				<div className={styles.servicesIntro} ref={introRef}>
					<h2>{t("title")}</h2>
					<p>
						{t.rich("subtitle", {
							b: (chunks) => <strong className={styles.boldWhite}>{chunks}</strong>,
						})}
					</p>
				</div>

				{/* Tabbed Services */}
				<div className={styles.servicesTabsWrapper}>
					{/* Tabs */}
					<div className={styles.tabsColumn}>
						{servicesData.map((service: CardProps, idx: number) => (
							<button
								key={service.title}
								className={`${styles.tabButton} ${activeIdx === idx ? styles.activeTab : ""
									}`}
								onMouseEnter={() => setActiveIdx(idx)}
								onFocus={() => setActiveIdx(idx)}
								tabIndex={0}
								type="button"
							>
								{service.title}
							</button>
						))}
					</div>

					{/* Service Info */}
					<div className={styles.infoColumn}>
						<div className={styles.cardInner}>
							<div className={styles.cardContent}>
								<h1>{servicesData[activeIdx].title}</h1>
								<div className={styles.cardColumns}>
									<div className={styles.cardText}>
										<p>{servicesData[activeIdx].descLong}</p>
										<p>{t("deliver")}</p>
										<ul className={styles.cardQualities}>
											{servicesData[activeIdx].qualities.map((q: string, i: number) => (
												<li key={i}>{q}</li>
											))}
										</ul>
									</div>
									<div className={styles.cardImg}>
										<img
											src={`/assets/service-${activeIdx + 1}.jpg`}
											alt={servicesData[activeIdx].title}
										/>
									</div>
									
								</div>
							</div>
							
							<div className={styles.extraInfo}>
                                {servicesData[activeIdx].extraInfo}
                            </div>
						</div>
					</div>
				</div>

				<CTASection />
			</section>
		</>
	);
}