"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SPOT_SIZE = 520;

export function HeroLightSpot() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const spot = spotRef.current;
    if (!wrapper || !spot) return;

    // 초기 위치: 섹션 중앙
    const rect = wrapper.getBoundingClientRect();
    gsap.set(spot, {
      x: rect.width / 2 - SPOT_SIZE / 2,
      y: rect.height / 2 - SPOT_SIZE / 2,
    });

    const onMouseMove = (e: MouseEvent) => {
      const r = wrapper.getBoundingClientRect();
      gsap.to(spot, {
        x: e.clientX - r.left - SPOT_SIZE / 2,
        y: e.clientY - r.top - SPOT_SIZE / 2,
        duration: 0.9,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div
        ref={spotRef}
        className="absolute"
        style={{
          width: SPOT_SIZE,
          height: SPOT_SIZE,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
