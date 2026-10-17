"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LiquidField = dynamic(
  () => import("./liquid-field").catch(() => ({ default: () => null })),
  { ssr: false },
);

export default function DeferredLiquidField() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(any-pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    function activate(event: PointerEvent) {
      if (event.pointerType === "touch" || document.hidden || !fine.matches || reduced.matches || connection?.saveData) return;
      // No idle download: visitors who only read/scroll never fetch the renderer.
      window.removeEventListener("pointermove", activate);
      setReady(true);
    }
    window.addEventListener("pointermove", activate, { passive: true });
    return () => window.removeEventListener("pointermove", activate);
  }, []);
  return ready ? <LiquidField /> : null;
}
