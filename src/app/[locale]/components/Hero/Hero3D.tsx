"use client";

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { gsap, ScrollTrigger } from '@/utils/gsap';
import { glsl } from 'three/tsl';

function Model() {
  const { scene } = useGLTF('/logo.glb');
  const modelRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Animation state
  const stateRef = useRef({
    isFloating: true,
    currentScroll: 0,
    floatAmplitude: 0.2,
    floatSpeed: 1.5,
    rotationSpeed: 0.3,
    scannerPosition: 1000,
    mouseX: 0,
    mouseY: 0,
  });

  const scaleRef = useRef(1);
  
  useEffect(() => {
    if (!modelRef.current) return;
    
    const model = modelRef.current;
    
    // Traverse and set material properties
    model.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.metalness = 0.7;
          material.roughness = 0.4;
          material.envMapIntensity = 1.5;
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    // Center the model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    const screenWidth = window.innerWidth;
    let scale = 1;
    let smallScale = 0.7;
    let xTranslate = -1.75;
    let yTranslate = 0;
    if (screenWidth < 600) {
      scale = 0.6;
      smallScale = 0.4;
      xTranslate = 0;
      yTranslate = 0.8;
    } else if (screenWidth < 900) {
      scale = 0.8;
      smallScale = 0.5;
      xTranslate = 0;
      yTranslate = 0.8;
    }
    scaleRef.current = scale;
    
    // Adjust camera based on model size
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.z = maxDim * 1.5;

    // Start at scale 0 (for animation)
    model.scale.set(0, 0, 0);

    
    // Play initial scale-in animation
    gsap.to(model.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 1,
      ease: "power2.out",
    });

    // Hero section trigger - scale back when scrolling up
    const heroTrigger = ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "top -10",
      onEnterBack: () => {
        gsap.to(model.scale, {
          x: scale,
          y: scale,
          z: scale,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(model.position, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
        stateRef.current.isFloating = true;
      }
    });

    // Intro section trigger
    const introEnterTrigger = ScrollTrigger.create({
      trigger: ".intro",
      start: "top 65%",
      onEnter: () => {
        gsap.to(model.scale, {
          x: smallScale,
          y: smallScale,
          z: smallScale,
          duration: 1,
          ease: "power2.out"
        });
        stateRef.current.isFloating = false;
      },
      onLeaveBack: () => {
        gsap.to(model.scale, {
          x: scale,
          y: scale,
          z: scale,
          duration: 1,
          ease: "power2.out"
        });
        stateRef.current.isFloating = true;
      }
    });

    const stickySection = document.querySelector(".modelContainer") as HTMLElement;

if (stickySection) {
  // ✅ Create timeline for all three phases
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".modelContainer",
      start: "top 20%",
      end: "+=750vh", // Total scroll distance for all 3 phases (150 + 300 + 300)
      scrub: 1,
      markers: false,
    }
  });

  // ✅ Phase 1: Move model to left (0-150vh)
  tl.to(model.position, {
    x: xTranslate,
    y: yTranslate,
    ease: "none",
    duration: 150, // Proportional duration
  });

  // ✅ Phase 2: Rotate model 360° (automatically starts after phase 1)
  tl.to(model.rotation, {
    y: Math.PI * 2, // Full rotation
    ease: "none",
    duration: 300, // Proportional duration
  }); // No position parameter = starts after previous animation

  // ✅ Phase 3: Move up (automatically starts after phase 2)
  tl.to(model.position, {
    y: 6, // Move up
    ease: "none",
    duration: 300, // Proportional duration
  });
  tl.to(model.scale, {
    scale: 0.8,
    opacity: 0,
    ease: "none",
    duration: 300, // Proportional duration
  }, "<");

  // ✅ Handle scrolling back
  ScrollTrigger.create({
    trigger: ".modelContainer",
    start: "top 20%",
    onLeaveBack: () => {
      // Reset all transformations when scrolling back up
      gsap.to(model.position, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.to(model.rotation, {
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.to(model.scale, {
        x: smallScale,
        y: smallScale,
        z: smallScale,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  });

} else {
  console.warn("modelContainer not found");
}

    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Listen to scroll
    const handleScroll = () => {
      stateRef.current.currentScroll = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      heroTrigger.kill();
      introEnterTrigger.kill();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [camera]);

  // Animation loop
  useFrame(() => {
    if (!modelRef.current) return;
    
    const model = modelRef.current;
    const { isFloating, currentScroll, floatAmplitude, floatSpeed, rotationSpeed, scannerPosition, mouseX, mouseY } = stateRef.current;

    // Floating animation (only in hero)
    if (isFloating) {
      const floatOffset = Math.sin(Date.now() * 0.001 * floatSpeed) * floatAmplitude * scaleRef.current;
      model.position.y = floatOffset;

      // Cursor follow - smooth rotation based on mouse
      const targetRotationY = mouseX * 0.3;
      const targetRotationX = -mouseY * 0.3;
      model.rotation.y += (targetRotationY - model.rotation.y) * 0.05;
      model.rotation.x += (targetRotationX - model.rotation.x) * 0.05;
    }

    // Scroll-based rotation
    const scrollProgress = Math.min(currentScroll / scannerPosition, 1);

    if (scrollProgress < 1) {
      model.rotation.x = scrollProgress * Math.PI * 2;
      model.rotation.y += 0.001 * rotationSpeed;
    }

  });

  return <primitive ref={modelRef} object={scene} />;
}

export default function Hero3D() {
  return (
    <div 
      className="model"
      style={{ 
        position: 'fixed',
        top: '50%',
        left: 0, 
        width: "100%",
        height: '100vh',
        transform: 'translateY(-50%)',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5]
        }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 2.5,
        }}
        shadows="soft"
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[5, 10, 7]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
            color={0xffffff}
          />
          {/* Fill light for softer shadows */}
          <pointLight
            position={[-5, -5, 5]}
            intensity={0.5}
            color={0xffffff}
          />
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/logo.glb');