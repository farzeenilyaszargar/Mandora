"use client";

import { useEffect, useRef } from "react";

type Drop = { x: number; y: number; vx: number; vy: number; born: number; radius: number; phase: number; life: number };

export default function LiquidField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const outlineRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const outline = outlineRef.current;
    if (!canvas || !outline) return;
    const context = canvas.getContext("2d");
    const outlineContext = outline.getContext("2d");
    if (!context || !outlineContext) return;
    const product = document.querySelector<HTMLElement>(".nap-full-width-product");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(any-pointer: fine)");
    const drops: Drop[] = [];
    const frameInterval = 1000 / 60;
    let frame = 0;
    let last: { x: number; y: number; time: number } | null = null;
    let width = 0;
    let height = 0;
    let radius = 95;
    let previous = 0;
    let clipDirty = true;
    let imageVisible = false;

    function enabled() {
      return !reduced.matches && finePointer.matches && !document.hidden;
    }
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      drops.length = 0;
      last = null;
      context!.clearRect(0, 0, width, height);
      outlineContext!.clearRect(0, 0, width, height);
      outline!.style.visibility = "hidden";
    }
    function resize() {
      reset();
      width = window.innerWidth;
      height = window.innerHeight;
      // These blurred shapes do not benefit from a high-DPI backing canvas.
      const ratio = Math.min(window.devicePixelRatio || 1, 1);
      canvas!.width = enabled() ? Math.round(width * ratio) : 1;
      canvas!.height = enabled() ? Math.round(height * ratio) : 1;
      outline!.width = product && enabled() ? canvas!.width : 1;
      outline!.height = product && enabled() ? canvas!.height : 1;
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      outlineContext!.setTransform(ratio, 0, 0, ratio, 0, 0);
      radius = Math.max(62, Math.min(width * .075, 135));
      clipDirty = true;
    }
    function updateClip() {
      if (!product) return;
      const image = product.getBoundingClientRect();
      imageVisible = image.bottom > 0 && image.top < height;
      outline!.style.clipPath = `inset(${Math.max(0, image.top)}px ${Math.max(0, width - image.right)}px ${Math.max(0, height - image.bottom)}px ${Math.max(0, image.left)}px)`;
      clipDirty = false;
    }
    function render(now: number) {
      frame = 0;
      if (!enabled()) { reset(); return; }
      if (now - previous < frameInterval - .5) {
        frame = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min((now - previous) / frameInterval, 2);
      previous = now;
      const damping = Math.pow(.975, dt);
      context!.clearRect(0, 0, width, height);
      context!.fillStyle = "#fff";
      context!.beginPath();
      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i];
        const age = (now - drop.born) / drop.life;
        if (age >= 1) { drops.splice(i, 1); continue; }
        const curl = Math.sin(drop.x * .008 + now * .0004) * Math.cos(drop.y * .009 - now * .0003);
        drop.vx = (drop.vx + Math.cos(curl * Math.PI * 2 + drop.phase) * .075 * dt) * damping;
        drop.vy = (drop.vy + Math.sin(curl * Math.PI * 2 + drop.phase) * .075 * dt) * damping;
        drop.x += drop.vx * dt;
        drop.y += drop.vy * dt;
        const spread = 1 + Math.sin(age * Math.PI) * .3;
        const size = drop.radius * spread * Math.pow(1 - age, .8);
        const rx = size * (1 + .1 * Math.sin(age * 5 + drop.phase));
        const angle = Math.atan2(drop.vy, drop.vx);
        context!.moveTo(drop.x + rx * Math.cos(angle), drop.y + rx * Math.sin(angle));
        context!.ellipse(drop.x, drop.y, rx, size, angle, 0, Math.PI * 2);
      }
      // Batch all liquid shapes into one canvas fill.
      context!.fill();
      if (product) {
        if (clipDirty) updateClip();
        outlineContext!.clearRect(0, 0, width, height);
        outline!.style.visibility = imageVisible && drops.length ? "visible" : "hidden";
        if (imageVisible && drops.length) outlineContext!.drawImage(canvas!, 0, 0, width, height);
      }
      if (drops.length) frame = requestAnimationFrame(render);
    }
    function move(event: PointerEvent) {
      if (!enabled() || event.pointerType === "touch") return;
      const x = event.clientX;
      const y = event.clientY;
      const now = performance.now();
      const from = last ?? { x, y, time: now - 16 };
      const dx = x - from.x;
      const dy = y - from.y;
      const distance = Math.hypot(dx, dy);
      if (last && (distance < 5 || now - from.time < 10)) return;
      const elapsed = Math.max(8, now - from.time);
      const vx = Math.max(-4, Math.min(4, dx / elapsed * 2));
      const vy = Math.max(-4, Math.min(4, dy / elapsed * 2));
      const steps = Math.min(25, Math.max(1, Math.ceil(distance / 18)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const phase = now * .002 + t * .4;
        drops.push({ x: from.x + dx * t, y: from.y + dy * t, vx, vy, born: now, radius: radius * (.8 + .2 * Math.sin(phase)), phase, life: 1700 + 400 * Math.sin(phase) ** 2 });
      }
      if (drops.length > 200) drops.splice(0, drops.length - 200);
      last = { x, y, time: now };
      if (!frame) {
        previous = now - frameInterval;
        frame = requestAnimationFrame(render);
      }
    }
    function leave() { last = null; }
    function scroll() { clipDirty = true; }
    function visibility() { resize(); }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", visibility);
    document.documentElement.addEventListener("pointerleave", leave);
    reduced.addEventListener("change", resize);
    finePointer.addEventListener("change", resize);
    return () => {
      reset();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", visibility);
      document.documentElement.removeEventListener("pointerleave", leave);
      reduced.removeEventListener("change", resize);
      finePointer.removeEventListener("change", resize);
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
          <filter id="nap-liquid-outline" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="soft" />
            <feColorMatrix in="soft" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="merged" />
            <feMorphology in="merged" operator="erode" radius="1.25" result="inner" />
            <feComposite in="merged" in2="inner" operator="out" />
          </filter>
        </defs>
      </svg>
      <canvas className="liquid-field" ref={ref} aria-hidden="true" />
      <canvas className="liquid-image-outline" ref={outlineRef} aria-hidden="true" />
    </>
  );
}
