"use client";

import { useEffect, useRef } from "react";
import { LiquidContourBuilder, type LiquidCircle } from "./liquid-contour";

type Drop = { x: number; y: number; vx: number; vy: number; born: number; radius: number; phase: number; life: number };

export default function LiquidField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const outlineRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const outline = outlineRef.current;
    if (!canvas || !outline) return;
    // This layer is optional: unsupported/privacy-restricted canvases must never
    // obscure the page with an unblended white shape or break navigation.
    if (typeof Path2D !== "function" || typeof CSS === "undefined" ||
        !CSS.supports("mix-blend-mode", "difference")) return;
    let context: CanvasRenderingContext2D | null;
    let outlineContext: CanvasRenderingContext2D | null;
    try {
      context = canvas.getContext("2d");
      outlineContext = outline.getContext("2d");
    } catch { return; }
    if (!context || !outlineContext) return;
    const product = document.querySelector<HTMLElement>(".nap-full-width-product");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(any-pointer: fine)");
    const builder = new LiquidContourBuilder();
    const drops: Drop[] = [];
    const circles: LiquidCircle[] = [];
    let interval = 1000 / 120;
    let maxDrops = 96;
    let slowFrames = 0;
    let stopped = false;
    let contextLost = false;
    const simulationStep = 1000 / 60;
    let frame = 0;
    let previous = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let last: { x: number; y: number; time: number } | null = null;
    let imageRect: DOMRect | null = null;
    let clipDirty = true;
    let allocatedWidth = 0;
    let allocatedHeight = 0;

    function enabled() { return !stopped && !contextLost && !reduced.matches && fine.matches && !document.hidden; }
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      drops.length = 0;
      last = null;
      previous = 0;
      slowFrames = 0;
      canvas!.width = outline!.width = 1;
      canvas!.height = outline!.height = 1;
      allocatedWidth = allocatedHeight = 0;
      canvas!.style.visibility = outline!.style.visibility = "hidden";
    }
    function resize() {
      reset();
      width = window.innerWidth;
      height = window.innerHeight;
      clipDirty = true;
    }
    function surface(left: number, top: number, w: number, h: number) {
      // Grow in coarse tiles, rather than reallocating a full-screen surface every frame.
      const nextWidth = Math.max(allocatedWidth, Math.ceil(w / 128) * 128);
      const nextHeight = Math.max(allocatedHeight, Math.ceil(h / 128) * 128);
      if (nextWidth !== allocatedWidth || nextHeight !== allocatedHeight) {
        // Bound backing-store memory even on very wide/high-resolution displays.
        // Paths and CSS dimensions stay in viewport coordinates.
        const scale = Math.min(1, 2048 / nextWidth, 2048 / nextHeight,
          Math.sqrt(2_000_000 / (nextWidth * nextHeight)));
        for (const layer of [canvas!, ...(product ? [outline!] : [])]) {
          layer.width = Math.ceil(nextWidth * scale);
          layer.height = Math.ceil(nextHeight * scale);
        }
        context!.setTransform(scale, 0, 0, scale, 0, 0);
        if (product) outlineContext!.setTransform(scale, 0, 0, scale, 0, 0);
        allocatedWidth = nextWidth;
        allocatedHeight = nextHeight;
      }
      for (const layer of [canvas!, ...(product ? [outline!] : [])]) {
        layer.style.left = `${left}px`;
        layer.style.top = `${top}px`;
        layer.style.width = `${allocatedWidth}px`;
        layer.style.height = `${allocatedHeight}px`;
      }
    }
    function render(now: number) {
      // A driver/canvas failure disables only the decoration for this mount.
      try { draw(now); }
      catch { stopped = true; reset(); }
    }
    function draw(now: number) {
      frame = 0;
      if (!enabled()) { reset(); return; }
      if (now - previous < interval - .5) { frame = requestAnimationFrame(render); return; }
      const started = performance.now();
      const elapsed = now - previous;
      const dt = Math.min(elapsed / simulationStep, 2);
      previous = now;
      const damping = Math.pow(.975, dt);
      circles.length = 0;
      let minX = width, minY = height, maxX = 0, maxY = 0;
      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i];
        const age = (now - drop.born) / drop.life;
        if (age >= 1) { drops.splice(i, 1); continue; }
        const curl = Math.sin(drop.x * .008 + now * .0004) * Math.cos(drop.y * .009 - now * .0003);
        drop.vx = (drop.vx + Math.cos(curl * Math.PI * 2 + drop.phase) * .075 * dt) * damping;
        drop.vy = (drop.vy + Math.sin(curl * Math.PI * 2 + drop.phase) * .075 * dt) * damping;
        drop.x += drop.vx * dt;
        drop.y += drop.vy * dt;
        const radius = drop.radius * (1 + Math.sin(age * Math.PI) * .3) * Math.pow(1 - age, .8);
        if (radius < 2) continue;
        const support = radius * 1.4 + 14;
        if (drop.x + support < 0 || drop.x - support > width || drop.y + support < 0 || drop.y - support > height) continue;
        circles.push({ x: drop.x, y: drop.y, radius });
        minX = Math.min(minX, drop.x - support); minY = Math.min(minY, drop.y - support);
        maxX = Math.max(maxX, drop.x + support); maxY = Math.max(maxY, drop.y + support);
      }
      if (circles.length) {
        const left = Math.floor(minX / 32) * 32;
        const top = Math.floor(minY / 32) * 32;
        const w = maxX - left;
        const h = maxY - top;
        surface(left, top, w, h);
        const { points, loops } = builder.build(circles, left, top, w, h);
        const path = new Path2D();
        for (const loop of loops) {
          const end = loop[loop.length - 1] * 2;
          const start = loop[0] * 2;
          path.moveTo((points[end] + points[start]) / 2, (points[end + 1] + points[start + 1]) / 2);
          for (let i = 0; i < loop.length; i++) {
            const current = loop[i] * 2;
            const next = loop[(i + 1) % loop.length] * 2;
            path.quadraticCurveTo(points[current], points[current + 1], (points[current] + points[next]) / 2, (points[current + 1] + points[next + 1]) / 2);
          }
          path.closePath();
        }
        context!.clearRect(0, 0, allocatedWidth, allocatedHeight);
        context!.fillStyle = "#fff";
        context!.fill(path, "evenodd");
        canvas!.style.visibility = "visible";
        if (product) {
          if (clipDirty) { imageRect = product.getBoundingClientRect(); clipDirty = false; }
          const image = imageRect!;
          outlineContext!.clearRect(0, 0, allocatedWidth, allocatedHeight);
          const visible = image.top < top + h && image.bottom > top && image.left < left + w && image.right > left;
          outline!.style.visibility = visible ? "visible" : "hidden";
          if (visible) {
            outlineContext!.save();
            outlineContext!.beginPath();
            outlineContext!.rect(image.left - left, image.top - top, image.width, image.height);
            outlineContext!.clip();
            outlineContext!.strokeStyle = "#fff";
            outlineContext!.lineWidth = 1.25;
            outlineContext!.lineJoin = "round";
            outlineContext!.stroke(path);
            outlineContext!.restore();
          }
        }
      } else {
        canvas!.style.visibility = outline!.style.visibility = "hidden";
      }
      // Sustained slow frames, including compositor delays, lower the workload.
      // Do not react to a single GC pause, a tab switch, or initial activation.
      const cost = performance.now() - started;
      const slow = maxDrops === 96 ? cost > 10 || elapsed > 40 : cost > 20 || elapsed > 70;
      slowFrames = slow ? slowFrames + 1 : Math.max(0, slowFrames - 1);
      if (slowFrames >= 24) {
        if (maxDrops === 96) {
          maxDrops = 48;
          interval = 1000 / 60;
          if (drops.length > maxDrops) drops.splice(0, drops.length - maxDrops);
          slowFrames = 0;
        } else {
          stopped = true;
          reset();
          return;
        }
      }
      if (drops.length) frame = requestAnimationFrame(render);
      else reset();
    }
    function move(event: PointerEvent) {
      if (!enabled() || event.pointerType === "touch") return;
      const now = performance.now();
      const x = event.clientX, y = event.clientY;
      const from = last ?? { x, y, time: now - 20 };
      const dx = x - from.x, dy = y - from.y;
      const distance = Math.hypot(dx, dy);
      if (last && (distance < 6 || now - from.time < 16)) return;
      const elapsed = Math.max(8, now - from.time);
      const vx = Math.max(-4, Math.min(4, dx / elapsed * 2));
      const vy = Math.max(-4, Math.min(4, dy / elapsed * 2));
      const steps = Math.min(20, Math.max(1, Math.ceil(distance / 25)));
      const radius = Math.max(62, Math.min(width * .075, 135));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps, phase = now * .002 + t * .4;
        drops.push({ x: from.x + dx * t, y: from.y + dy * t, vx, vy, born: now, radius: radius * (.8 + .2 * Math.sin(phase)), phase, life: 1700 + 400 * Math.sin(phase) ** 2 });
      }
      if (drops.length > maxDrops) drops.splice(0, drops.length - maxDrops);
      last = { x, y, time: now };
      if (!frame) { previous = now - interval; frame = requestAnimationFrame(render); }
    }
    function lost() { contextLost = true; reset(); }
    function restored() { contextLost = false; resize(); }
    function leave() { last = null; }
    function scroll() { clipDirty = true; }
    resize();
    for (const layer of [canvas, outline]) {
      layer.addEventListener("contextlost", lost);
      layer.addEventListener("contextrestored", restored);
    }
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", resize);
    document.documentElement.addEventListener("pointerleave", leave);
    reduced.addEventListener("change", resize);
    fine.addEventListener("change", resize);
    return () => {
      reset();
      for (const layer of [canvas, outline]) {
        layer.removeEventListener("contextlost", lost);
        layer.removeEventListener("contextrestored", restored);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", resize);
      document.documentElement.removeEventListener("pointerleave", leave);
      reduced.removeEventListener("change", resize);
      fine.removeEventListener("change", resize);
    };
  }, []);

  return (
    <>
      <canvas className="liquid-field" ref={ref} aria-hidden="true" />
      <canvas className="liquid-image-outline" ref={outlineRef} aria-hidden="true" />
    </>
  );
}
