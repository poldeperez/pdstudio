"use client";
import { useRef } from "react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Services from "./components/Services/Services";
import Products from "./components/Products/Products";
import CircleBackground from "./components/CircleBackground/CircleBackground";
import styles from "./page.module.css";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  
  useSmoothScroll();

  return (
    <div className="app" ref={container}>
      <Header />
      
      {/* ✅ Hero + Intro section with background */}
      <div style={{ position: "relative" }}>
        <CircleBackground />
        <Hero />
        <Intro />
      </div>

      {/* Services without background */}
      <Services />
      
      <section className={styles.outro}>
        <h1>
          Creating standout brands and digital experiences that captivate
          audiences and drive meaningful connections.
        </h1>
      </section>
      
      <Products />
    </div>
  );
}
