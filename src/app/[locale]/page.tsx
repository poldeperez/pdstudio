"use client";
import { useRef } from "react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Services from "./components/Services/Services";
import Products from "./components/Products/Products";
import CircleBackground from "./components/CircleBackground/CircleBackground";
import Outro from "./components/Outro/Outro";
import styles from "./page.module.css";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  
  useSmoothScroll();

  return (
    <div className="app" ref={container}>      
      <Header />
      {/* Hero + Intro section with background */}
      <div style={{ position: "relative" }}>
        {/*<CircleBackground /> */}
        <Hero />
        <Intro />
      </div>
      <Services />      
      <Outro /> 
      <Products />
    </div>
  );
}
