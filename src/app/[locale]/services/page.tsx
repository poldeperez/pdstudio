"use client";

import { useState } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useServicesPageAnimation } from "./useServicesPageAnimation";
import Header from "../components/Header/Header";
import styles from "./ServicesPage.module.css";
import CTASection from "../components/CTASection/CTASection";

export const servicesData = [
	{
		title: "Brand Strategy",
		description:
			"Crafting unique brand identities that resonate with your target audience and set you apart from the competition.",
		qualities: ["Market research", "Positioning", "Messaging", "Visual identity"],
		extraInfo:
			"We analyze your market, competitors, and audience to craft a unique brand identity that stands out and connects emotionally.",
	},
	{
		title: "Web Design",
		description:
			"Designing visually stunning and user-friendly websites that provide an exceptional user experience across all devices.",
		qualities: [
			"Responsive layouts",
			"UI/UX best practices",
			"Accessibility",
			"Performance",
		],
		extraInfo:
			"Our web designs are not just beautiful—they’re built for usability, speed, and conversion, ensuring your visitors become customers.",
	},
	{
		title: "Digital Marketing",
		description:
			"Implementing effective digital marketing strategies to boost your online presence and drive traffic to your website.",
		qualities: [
			"Social media",
			"Email campaigns",
			"Content strategy",
			"Analytics",
		],
		extraInfo:
			"From SEO to social media, we create campaigns that drive real results and help your business grow online.",
	},
	{
		title: "SEO Optimization",
		description:
			"Implementing effective SEO strategies to improve your website's visibility and ranking on search engines.",
		qualities: [
			"Keyword research",
			"On-page SEO",
			"Link building",
			"Technical audits",
		],
		extraInfo:
			"We use the latest techniques to boost your search rankings, increase organic traffic, and maximize your online visibility.",
	},
];

export default function ServicesPage() {
	const { introRef } = useServicesPageAnimation();
	useSmoothScroll();

	// Default to Web Design (index 1)
	const [activeIdx, setActiveIdx] = useState(1);

	return (
		<>
			<Header />
			<section className={styles.servicesSection}>
				{/* Intro */}
				<div className={styles.servicesIntro} ref={introRef}>
					<h2>WHAT WE DO</h2>
					<p>
						At dep studio, we believe in a collaborative, transparent, and iterative
						approach. We listen, research, and co-create with you to deliver solutions
						that are tailored, effective, and future-proof. Every service we offer is
						rooted in strategy, creativity, and measurable results.
					</p>
				</div>

				{/* Tabbed Services */}
				<div className={styles.servicesTabsWrapper}>
					{/* Tabs */}
					<div className={styles.tabsColumn}>
						{servicesData.map((service, idx) => (
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
										<p>{servicesData[activeIdx].description}</p>
										<ul className={styles.cardQualities}>
											{servicesData[activeIdx].qualities.map((q, i) => (
												<li key={i}>{q}</li>
											))}
										</ul>
									</div>
									<div className={styles.cardImg}>
										<img
											src={`/assets/card-${activeIdx + 1}.jpg`}
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