"use client";

import { useEffect, useRef } from "react";

type Drop = { x: number; y: number; vx: number; vy: number; born: number; radius: number; phase: number; life: number };

export default function LiquidField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const whiteRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const whiteCanvas = whiteRef.current;
    if (!canvas || !whiteCanvas) return;
    const context = canvas.getContext("2d");
    const whiteContext = whiteCanvas.getContext("2d");
    const mask = document.createElement("canvas");
    const field = mask.getContext("2d", { willReadFrequently: true });
    if (!context || !field || !whiteContext) return;
    // Keep inversion and white bitmap disturbance on independent layers.
    const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    let cell = 4;
    let bitmap: ImageData;
    let whiteBitmap: ImageData;
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
      cell = width <= 700 ? 2 : 3;
      canvas!.width = whiteCanvas!.width = mask.width = Math.ceil(width / cell);
      canvas!.height = whiteCanvas!.height = mask.height = Math.ceil(height / cell);
      bitmap = context!.createImageData(canvas!.width, canvas!.height);
      whiteBitmap = whiteContext!.createImageData(canvas!.width, canvas!.height);
      field!.setTransform(1 / cell, 0, 0, 1 / cell, 0, 0);
      field!.filter = "blur(1.6px)";
      radius = Math.max(62, Math.min(width * .075, 135));
      drops.length = 0;
      last = null;
    }

    function render(now: number) {
      const dt = Math.min((now - previous) / 16.667, 2);
      previous = now;
      field!.clearRect(0, 0, width, height);
      field!.fillStyle = "#fff";
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
        field!.beginPath();
        field!.ellipse(drop.x, drop.y, size * (1 + .1 * Math.sin(age * 5 + drop.phase)), size, Math.atan2(drop.vy, drop.vx), 0, Math.PI * 2);
        field!.fill();
      }
      const pixels = field!.getImageData(0, 0, mask.width, mask.height).data;
      const output = bitmap.data;
      const white = whiteBitmap.data;
      for (let y = 0; y < mask.height; y++) {
        for (let x = 0; x < mask.width; x++) {
          const index = (y * mask.width + x) * 4;
          const alpha = pixels[index + 3] / 255;
          const coverage = Math.max(0, Math.min(1, (alpha - .12) / .76));
          const threshold = (bayer[(y % 4) * 4 + x % 4] + .5) / 16;
          output[index] = output[index + 1] = output[index + 2] = 255;
          // Solid contrast remains underneath: the bitmap never punches black holes.
          output[index + 3] = alpha > .42 ? 255 : 0;
          white[index] = white[index + 1] = white[index + 2] = 255;
          // Only opaque white pixels are added, with ordered dithering around the edges.
          white[index + 3] = coverage * .32 > threshold ? 255 : 0;
        }
      }
      context!.putImageData(bitmap, 0, 0);
      whiteContext!.putImageData(whiteBitmap, 0, 0);
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
        whiteContext!.clearRect(0, 0, width, height);
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
      <canvas className="liquid-field" ref={ref} aria-hidden="true" />
      <canvas className="liquid-field liquid-field-white" ref={whiteRef} aria-hidden="true" />
    </>
  );
}
