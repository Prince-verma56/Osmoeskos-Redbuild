"use client";

import { useState, useEffect, useCallback } from "react";
import { Preloader } from "@/components/layout/preloader";
import { ScrollTrigger } from "@/lib/animations/gsap";

export function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    // Only show on very first visit (not on route changes)
    const seen = sessionStorage.getItem("osmekos-preloader-seen");
    const frame = requestAnimationFrame(() => {
      if (!seen) {
        setShowPreloader(true);
      } else {
        setPreloaderDone(true);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem("osmekos-preloader-seen", "1");
    setPreloaderDone(true);
    setShowPreloader(false);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      <div style={{ opacity: showPreloader && !preloaderDone ? 0 : 1, transition: "opacity 0.3s ease" }}>
        {children}
      </div>
    </>
  );
}
