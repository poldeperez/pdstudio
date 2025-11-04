"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import  Lenis  from "lenis";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  title: string;
  description: string;
  index: number;
}

const Card =({title, description, index}: CardProps) => {
  return (
    <div className="card" id={`card-${index+1}`}>
      <div className="card-inner">
        <div className="card-content">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="card-img">
          <img src={`/assets/card-${index+1}.jpg`} alt={title} />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const cards = [
    {
      title: "Brand Strategy",
      description:
        "Crafting unique brand identities that resonate with your target audience and set you apart from the competition.",
    },
    {
      title: "Web Design",
      description:
        "Designing visually stunning and user-friendly websites that provide an exceptional user experience across all devices."
    },
    {
      title: "Digital Marketing",
      description:
        "Implementing effective digital marketing strategies to boost your online presence and drive traffic to your website."
    },
    {
      title: "SEO Optimization",
      description:
        "Implementing effective SEO strategies to improve your website's visibility and ranking on search engines. bkbjjkbkkjkbjkbkbjkbkkbjbkbbkbkjbjkbk"
    }
  ];

    useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cardElements = gsap.utils.toArray<HTMLElement>(".card");

    ScrollTrigger.create({
      trigger: cardElements[0],
      start: "top 35%",
      endTrigger: cardElements[cardElements.length - 1],
      end: "top 30%",
      pin: ".intro",
      pinSpacing: false
    })

    cardElements.forEach((card, index) => {
      const isLastCard = index === cardElements.length - 1;
      const cardInner = card.querySelector<HTMLElement>(".card-inner");

      if (!isLastCard) {
        ScrollTrigger.create({
          trigger: card,
          start: "top 35%",
          endTrigger: ".outro",
          end: "top 65%",
          pin: true,
          pinSpacing: false
        })
      }
      if (cardInner) {
        gsap.to(cardInner, {
          y: `-${(cardElements.length - index) * 14}vh`,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 35%",
            endTrigger: ".outro",
            end: "top 65%",
            scrub: true
          }
        });
      }
    })


    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  }, { scope:container });

  return (
      <div className="app" ref={container}>
        <section className="hero">
          
        </section>
        <section className="intro">
          <h1>
            Creating standout brands and digital experiences that captivate audiences and drive meaningful connections.
          </h1>
        </section>
        <section className="cards">
          {cards.map((card, index) => (
            <Card key={index} {...card} index={index}/>
          ))}
        </section>
        <section className="outro">
          <h1>
            Creating standout brands and digital experiences that captivate audiences and drive meaningful connections.
          </h1>
        </section>

      </div>
  );
}
