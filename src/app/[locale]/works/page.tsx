"use client";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useWorksPageAnimation } from "./useWorksPageAnimation";
import Header from "../components/Header/Header";
import CTASection from "../components/CTASection/CTASection";
import styles from "./WorksPage.module.css";

const projects = [
	{
		title: "Web app - PdG Consultors",
		description:
			"A modern web platform for collaborative work, featuring real-time updates and a sleek UI.",
		image: "/works/pdg-consultors.jpg",
	},
	{
		title: "Web app - CdC Boat Tours",
		description:
			"Complete rebranding and digital presence for a fast-growing fintech startup.",
		image: "/works/cdc-boat-tours.jpg",
	},
	{
		title: "Website - Veterinos",
		description:
			"E-commerce solution with custom design, seamless checkout, and advanced analytics.",
		image: "/works/veterinos.jpg",
	},
	{
		title: "Website - Aequalis",
		description:
			"Mobile-first application for on-the-go productivity, with offline support and cloud sync.",
		image: "/works/aequalis-mobil2.jpg",
	},
	{
		title: "Web app - One goal",
		description:
			"Integrated marketing campaign with social, email, and influencer outreach.",
		image: "/works/onegoal-devices.jpg",
	},
	{
		title: "Website - PdG Consultors",
		description:
			"A secure client portal for document sharing and project management.",
		image: "/works/pdg-office.jpg",
	},
];

export default function WorksPage() {
	const { introRef } = useWorksPageAnimation();
	useSmoothScroll();

	return (
		<>
			<Header />
			<section className={styles.worksSection}>
				{/* Intro */}
				<div className={styles.worksIntro} ref={introRef}>
					<h2>OUR WORK</h2>
					<p>
						We partner with ambitious brands and organizations to create digital
						experiences that inspire, engage, and deliver results. Here are some of
						our favorite projects—each one a story of collaboration, creativity,
						and measurable impact.
					</p>
				</div>

				{/* Projects Grid */}
				<div className={styles.projectsGrid}>
					{projects.map((project) => (
						<div
							key={project.title}
							className={styles.projectCard}
							style={{ backgroundImage: `url(${project.image})` }}
							tabIndex={0}
							aria-label={project.title}
						>
							<h3 className={styles.projectTitle}>{project.title}</h3>
						</div>
					))}
				</div>

				<CTASection />
			</section>
		</>
	);
}