import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const UnderConstructionContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const comingSoonRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animations on load
    gsap.from(containerRef.current, {
      duration: 1.2,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.from(logoRef.current, {
      duration: 1,
      scale: 0.8,
      rotation: 360,
      ease: "elastic.out(1, 0.5)",
      delay: 0.2,
    });

    gsap.from(h1Ref.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 0.4,
    });

    gsap.from([messageRef.current, comingSoonRef.current], {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power2.out",
      stagger: 0.2,
      delay: 0.6,
    });

    // Plane flying animation
    gsap.to(planeRef.current, {
      duration: 20,
      x: "100vw",
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        gsap.set(planeRef.current, { x: "-200px" });
      },
    });

    gsap.to(planeRef.current, {
      duration: 2,
      y: -20,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Clouds floating animation
    cloudRefs.current.forEach((cloud, i) => {
      gsap.to(cloud, {
        duration: 15 + i * 5,
        x: "100vw",
        ease: "none",
        repeat: -1,
        delay: i * 3,
        onRepeat: () => {
          gsap.set(cloud, { x: "-150px" });
        },
      });

      gsap.to(cloud, {
        duration: 3 + i,
        y: Math.random() * 20 - 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    // Logo pulse animation
    gsap.to(logoRef.current, {
      duration: 2,
      scale: 1.05,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-400 via-blue-300 to-orange-200">
      {/* Animated clouds */}
      <div
        ref={(el) => {
          cloudRefs.current[0] = el;
        }}
        className="absolute top-[15%] text-6xl opacity-80"
        style={{ left: "-150px" }}
      >
        ☁️
      </div>
      <div
        ref={(el) => {
          cloudRefs.current[1] = el;
        }}
        className="absolute top-[25%] text-7xl opacity-70"
        style={{ left: "-150px" }}
      >
        ☁️
      </div>
      <div
        ref={(el) => {
          cloudRefs.current[2] = el;
        }}
        className="absolute top-[40%] text-5xl opacity-90"
        style={{ left: "-150px" }}
      >
        ☁️
      </div>
      <div
        ref={(el) => {
          cloudRefs.current[3] = el;
        }}
        className="absolute top-[60%] text-6xl opacity-75"
        style={{ left: "-150px" }}
      >
        ☁️
      </div>
      <div
        ref={(el) => {
          cloudRefs.current[4] = el;
        }}
        className="absolute top-[10%] text-8xl opacity-60"
        style={{ left: "-150px" }}
      >
        ☁️
      </div>

      {/* Animated plane */}
      <div
        ref={planeRef}
        className="absolute top-[20%] text-7xl"
        style={{
          left: "-200px",
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
        }}
      >
        ✈️
      </div>

      {/* Main content */}
      <div
        ref={containerRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12"
      >
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-sky-400 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
            <div className="text-6xl">🐕</div>
          </div>
        </div>

        {/* Main heading */}
        <h1
          ref={h1Ref}
          className="text-5xl md:text-7xl font-bold text-white mb-4 text-center tracking-tight"
          style={{
            textShadow:
              "3px 3px 6px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.5)",
          }}
        >
          JOYFUL PET TRANSPORT
        </h1>

        {/* Tagline */}
        <p
          className="text-xl md:text-2xl text-white/90 mb-12 text-center font-medium"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
        >
          Transporting Pets Has Never Been This Easy
        </p>

        {/* Coming soon box */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-12 py-10 shadow-2xl max-w-2xl w-full text-center">
          <p
            ref={messageRef}
            className="text-2xl md:text-3xl text-blue-600 mb-3 font-semibold"
          >
            We're building something new
          </p>
          <p
            ref={comingSoonRef}
            className="text-3xl md:text-4xl text-orange-500 font-bold uppercase tracking-wider"
          >
            Coming Soon
          </p>

          {/* Decorative pets */}
          <div className="flex justify-center gap-8 mt-8">
            <div
              className="text-5xl animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "2s" }}
            >
              🐶
            </div>
            <div
              className="text-5xl animate-bounce"
              style={{ animationDelay: "0.3s", animationDuration: "2s" }}
            >
              🐱
            </div>
            <div
              className="text-5xl animate-bounce"
              style={{ animationDelay: "0.6s", animationDuration: "2s" }}
            >
              🐰
            </div>
          </div>
        </div>

        {/* Bottom features */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="text-center">
            <div className="text-5xl mb-2">🌍</div>
            <div
              className="text-white font-semibold text-sm"
              style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)" }}
            >
              Worldwide
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-2">❤️</div>
            <div
              className="text-white font-semibold text-sm"
              style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)" }}
            >
              Safe & Caring
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-2">⭐</div>
            <div
              className="text-white font-semibold text-sm"
              style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)" }}
            >
              Trusted Service
            </div>
          </div>
        </div>
      </div>

      {/* Decorative ground elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-300/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default UnderConstructionContent;
