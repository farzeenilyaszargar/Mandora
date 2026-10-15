"use client";

import { useEffect, useRef } from "react";

type InkPoint = { x: number; y: number; born: number; seed: number };

export default function LiquidField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const points: InkPoint[] = [];
    let frame = 0;
    let last: { x: number; y: number } | null = null;
    let width = 0;
    let height = 0;
    let radius = 70;
    const lifetime = 1900;

    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      radius = Math.min(width * .055, 95);
      points.length = 0;
      last = null;
    }

    function render(now: number) {
      context!.clearRect(0, 0, width, height);
      while (points.length && now - points[0].born > lifetime) points.shift();
      context!.fillStyle = "#fff";
      for (const point of points) {
        const age = (now - point.born) / lifetime;
        const size = radius * Math.pow(1 - age, .55);
        // The fresh tip stays round; the drying tail breaks into uneven liquid edges.
        const erosion = Math.pow(age, 1.6) * .28;
        context!.beginPath();
        for (let j = 0; j <= 48; j++) {
          const angle = j / 48 * Math.PI * 2;
          const ripple = Math.sin(angle * 7 + point.seed) * .45
            + Math.sin(angle * 13 - point.seed * 2) * .3
            + Math.sin(angle * 23 + point.seed * 3) * .25;
          const r = size * (1 + ripple * erosion);
          const x = point.x + Math.cos(angle) * r;
          const y = point.y + Math.sin(angle) * r;
          if (j === 0) context!.moveTo(x, y);
          else context!.lineTo(x, y);
        }
        context!.closePath();
        context!.fill();
      }
      frame = points.length ? requestAnimationFrame(render) : 0;
    }

    function move(event: PointerEvent) {
      if (reduced.matches || event.pointerType === "touch") return;
      const bounds = canvas!.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const now = performance.now();
      if (last) {
        const distance = Math.hypot(x - last.x, y - last.y);
        const steps = Math.min(80, Math.max(1, Math.ceil(distance / 9)));
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          points.push({ x: last.x + (x - last.x) * t, y: last.y + (y - last.y) * t, born: now, seed: now * .001 });
        }
      } else points.push({ x, y, born: now, seed: now * .001 });
      // Bound the work even with a high polling rate mouse.
      if (points.length > 700) points.splice(0, points.length - 700);
      last = { x, y };
      if (!frame) frame = requestAnimationFrame(render);
    }
    function leave() { last = null; }
    function motionChange() {
      if (reduced.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        points.length = 0;
        context!.clearRect(0, 0, width, height);
      }
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    reduced.addEventListener("change", motionChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      reduced.removeEventListener("change", motionChange);
    };
  }, []);

  return <canvas className="liquid-field" ref={ref} aria-hidden="true" />;
}
