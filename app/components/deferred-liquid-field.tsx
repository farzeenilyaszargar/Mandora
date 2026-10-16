"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LiquidField = dynamic(() => import("./liquid-field"), { ssr: false });

export default function DeferredLiquidField() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(any-pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let scheduled = false;
    let activated = false;
    function activate() {
      scheduled = false;
      if (!activated && fine.matches && !reduced.matches) {
        activated = true;
        setReady(true);
      }
    }
    function schedule() {
      if (scheduled || activated || !fine.matches || reduced.matches) return;
      scheduled = true;
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(activate, { timeout: 1200 });
      } else {
        timer = setTimeout(activate, 150);
      }
    }
    // Load the decorative effect after critical content, or on desktop interaction.
    if (document.readyState === "complete") schedule();
    window.addEventListener("load", schedule, { once: true });
    window.addEventListener("pointermove", activate, { once: true, passive: true });
    fine.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      if (idle !== undefined) window.cancelIdleCallback(idle);
      clearTimeout(timer);
      window.removeEventListener("load", schedule);
      window.removeEventListener("pointermove", activate);
      fine.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return ready ? <LiquidField /> : null;
}
