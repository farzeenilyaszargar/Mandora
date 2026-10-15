"use client";

import { useEffect, useRef } from "react";

type Drop = { x: number; y: number; vx: number; vy: number; born: number; radius: number; phase: number; life: number };

export default function LiquidField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const drops: Drop[] = [];
    let frame = 0;
    let last: { x: number; y: number; time: number } | null = null;
    let width = 0;
    let height = 0;
    let radius = 95;
    let previous = 0;

    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      radius = Math.max(62, Math.min(width * .075, 135));
      drops.length = 0;
      last = null;
    }

    function render(now: number) {
      const dt = Math.min((now - previous) / 16.667, 2);
      previous = now;
      context!.clearRect(0, 0, width, height);
      context!.fillStyle = "#fff";
      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i];
        const age = (now - drop.born) / drop.life;
        if (age >= 1) { drops.splice(i, 1); continue; }
        // A smooth curl field carries the ink sideways as its initial momentum dissipates.
        const curl = Math.sin(drop.x * .008 + now * .0004) * Math.cos(drop.y * .009 - now * .0003);
        drop.vx += Math.cos(curl * Math.PI * 2 + drop.phase) * .075 * dt;
        drop.vy += Math.sin(curl * Math.PI * 2 + drop.phase) * .075 * dt;
        drop.vx *= Math.pow(.975, dt);
        drop.vy *= Math.pow(.975, dt);
        drop.x += drop.vx * dt;
        drop.y += drop.vy * dt;
        // The ink spreads first, then draws into narrow rivulets and separating droplets.
        const spread = 1 + Math.sin(age * Math.PI) * .3;
        const size = drop.radius * spread * Math.pow(1 - age, .8);
        context!.beginPath();
        context!.ellipse(drop.x, drop.y, size * (1 + .1 * Math.sin(age * 5 + drop.phase)), size, Math.atan2(drop.vy, drop.vx), 0, Math.PI * 2);
        context!.fill();
      }
      frame = drops.length ? requestAnimationFrame(render) : 0;
    }

    function move(event: PointerEvent) {
      if (reduced.matches || event.pointerType === "touch") return;
      const bounds = canvas!.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const now = performance.now();
      const from = last ?? { x, y, time: now - 16 };
      const dx = x - from.x;
      const dy = y - from.y;
      const distance = Math.hypot(dx, dy);
      if (last && distance < 5) return;
      const elapsed = Math.max(8, now - from.time);
      const vx = Math.max(-4, Math.min(4, dx / elapsed * 2));
      const vy = Math.max(-4, Math.min(4, dy / elapsed * 2));
      const steps = Math.min(35, Math.max(1, Math.ceil(distance / 15)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const phase = now * .002 + t * .4;
        drops.push({ x: from.x + dx * t, y: from.y + dy * t, vx, vy, born: now, radius: radius * (.8 + .2 * Math.sin(phase)), phase, life: 1700 + 400 * Math.sin(phase) ** 2 });
      }
      if (drops.length > 320) drops.splice(0, drops.length - 320);
      last = { x, y, time: now };
      if (!frame) { previous = now; frame = requestAnimationFrame(render); }
    }
    function leave() { last = null; }
    function motionChange() {
      if (reduced.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        drops.length = 0;
        last = null;
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

  return (
    <>
      <svg className="liquid-filter" aria-hidden="true">
        <defs>
          <filter id="nap-liquid-merge" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="soft" />
            <feColorMatrix in="soft" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
          </filter>
        </defs>
      </svg>
      <canvas className="liquid-field" ref={ref} aria-hidden="true" />
    </>
  );
}
