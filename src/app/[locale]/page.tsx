"use client";
import { useRef } from "react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Header from "./components/Header/Header"
import Hero from "./components/Hero/Hero"
import Intro from "./components/Intro/Intro"
import Services from "./components/Services/Services"
import Products from "./components/Products/Products"
import styles from "./page.module.css"

export default function Home() {
  
  useSmoothScroll(); 

  const container = useRef<HTMLDivElement>(null);

  return (
      <> 
        <Header />
        <div className="app" ref={container}>
          <Hero />
          <Intro />
          <Services />
          <Products />
          <div style={{ height: '50vh'}}/>
          <section className={styles.outro}>
            <h1>
              Creating standout brands and digital experiences that captivate audiences and drive meaningful connections.
            </h1>
          </section>

        </div>
      </> 
  );
}
