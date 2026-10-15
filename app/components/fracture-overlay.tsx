"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Fragment = {
  points: Point[];
  path: Path2D;
  center: Point;
  area: number;
  cracked: number | null;
  fall: number | null;
  impact: Point;
  spin: number;
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function makeFragments(width: number, height: number): Fragment[] {
  const cols = Math.ceil(width / 190);
  const rows = Math.ceil(height / 170);
  const grid: Point[][] = [];
  for (let row = 0; row <= rows; row++) {
    grid[row] = [];
    for (let col = 0; col <= cols; col++) {
      grid[row][col] = {
        x: col * width / cols + (col === 0 || col === cols ? 0 : Math.sin(row * 23 + col * 17) * width / cols * .3),
        y: row * height / rows + (row === 0 || row === rows ? 0 : Math.sin(row * 13 + col * 29) * height / rows * .3),
      };
    }
  }
  const fragments: Fragment[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const a = grid[row][col], b = grid[row][col + 1];
      const c = grid[row + 1][col], d = grid[row + 1][col + 1];
      const triangles = (row + col) % 2 ? [[a, b, c], [b, d, c]] : [[a, b, d], [a, d, c]];
      for (const points of triangles) {
        const path = new Path2D();
        path.moveTo(points[0].x, points[0].y);
        points.slice(1).forEach(point => path.lineTo(point.x, point.y));
        path.closePath();
        const [p, q, r] = points;
        const center = { x: (p.x + q.x + r.x) / 3, y: (p.y + q.y + r.y) / 3 };
        fragments.push({
          points, path, center,
          area: Math.abs((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x)) / 2,
          cracked: null, fall: null, impact: center,
          spin: Math.sin(fragments.length * 7) * 1.5,
        });
      }
    }
  }
  return fragments;
}

export default function FractureOverlay({ download }: { download: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [finished, setFinished] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let frame = 0;
    let width = 0, height = 0, removedArea = 0;
    let cascade: number | null = null;
    let fragments: Fragment[] = [];
    const source = document.createElement("canvas");
    const sourceContext = source.getContext("2d")!;
    let assets: HTMLImageElement[] = [];
    const finish = () => {
      disposed = true;
      cancelAnimationFrame(frame);
      setFinished(true);
    };

    const drawSource = () => {
      const ctx = sourceContext;
      const small = width < 600;
      const gutter = small ? 20 : Math.max(40, (width - 1120) / 2);
      ctx.fillStyle = "#101111";
      ctx.fillRect(0, 0, width, height);
      ctx.textAlign = "left";
      ctx.fillStyle = "#f2f3ef";
      ctx.font = `600 27px Fustat, Arial, sans-serif`;
      ctx.fillText("nap.", gutter, small ? 51 : 59);
      ctx.strokeStyle = "#ffffff14";
      ctx.beginPath(); ctx.moveTo(gutter, 95); ctx.lineTo(width - gutter, 95); ctx.stroke();
      ctx.textAlign = "center";
      const titleY = small ? 161 : Math.min(205, height * .25);
      ctx.font = `500 ${width < 360 ? 36 : small ? 42 : 72}px Fustat, Arial, sans-serif`;
      ctx.fillText("All your agents.", width / 2, titleY);
      ctx.fillText("One quiet place.", width / 2, titleY + (small ? 48 : 80));
      ctx.fillStyle = "#91958f";
      ctx.font = `400 ${small ? 13 : 16}px Fustat, Arial, sans-serif`;
      ctx.fillText("Claude Code. Codex. Cursor. OpenCode.", width / 2, titleY + (small ? 88 : 125));
      const image = assets[0];
      const imageY = titleY + (small ? 130 : 175);
      const imageWidth = Math.min(width - gutter * 2, 900, Math.max(0, height - imageY - 32) * image.naturalWidth / image.naturalHeight);
      const imageHeight = imageWidth * image.naturalHeight / image.naturalWidth;
      ctx.drawImage(image, (width - imageWidth) / 2, imageY, imageWidth, imageHeight);
      ctx.strokeStyle = "#ffffff20";
      ctx.strokeRect((width - imageWidth) / 2, imageY, imageWidth, imageHeight);
    };

    const render = (now: number) => {
      if (disposed) return;
      context.clearRect(0, 0, width, height);
      context.drawImage(source, 0, 0, width, height);
      let animating = false;
      // Cut holes first, then draw falling fragments above the remaining surface.
      context.globalCompositeOperation = "destination-out";
      for (const fragment of fragments) {
        if (fragment.fall !== null && now >= fragment.fall) context.fill(fragment.path);
      }
      context.globalCompositeOperation = "source-over";
      for (const fragment of fragments) {
        if (fragment.cracked === null) continue;
        const age = now - fragment.cracked;
        const fallAge = fragment.fall === null ? -1 : now - fragment.fall;
        if (fallAge > 850) continue;
        animating = true;
        context.save();
        if (fallAge >= 0) {
          const t = fallAge / 850;
          const x = (fragment.center.x - width / 2) * t * .45;
          const y = 80 * t + height * 1.5 * t * t;
          context.translate(fragment.center.x + x, fragment.center.y + y);
          context.rotate(fragment.spin * t);
          context.translate(-fragment.center.x, -fragment.center.y);
          context.globalAlpha = 1 - Math.pow(t, 2);
          context.save();
          context.clip(fragment.path);
          context.drawImage(source, 0, 0, width, height);
          context.restore();
        }
        context.strokeStyle = "#e4e9df99";
        context.lineWidth = .8;
        context.stroke(fragment.path);
        const spread = Math.min(1, age / 140);
        context.beginPath();
        for (const point of fragment.points) {
          context.moveTo(fragment.impact.x, fragment.impact.y);
          context.lineTo(fragment.impact.x + (point.x - fragment.impact.x) * spread, fragment.impact.y + (point.y - fragment.impact.y) * spread);
        }
        context.stroke();
        context.restore();
      }
      if (cascade !== null && now - cascade > 1100) { finish(); return; }
      if (animating || cascade !== null) frame = requestAnimationFrame(render);
      else frame = 0;
    };

    const resize = () => {
      if (disposed) return;
      // Resizing a partly broken surface finishes the reveal instead of rebuilding it.
      if (removedArea > 0) { finish(); return; }
      width = innerWidth; height = innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = source.width = Math.round(width * ratio);
      canvas.height = source.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      sourceContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      fragments = makeFragments(width, height);
      drawSource();
      render(performance.now());
    };

    const crack = (event: PointerEvent) => {
      if (disposed || !assets.length || cascade !== null) return;
      const x = event.clientX, y = event.clientY;
      const hit = fragments.find(fragment => fragment.cracked === null && context.isPointInPath(fragment.path, x * Math.min(devicePixelRatio || 1, 2), y * Math.min(devicePixelRatio || 1, 2)));
      if (!hit) return;
      const now = performance.now();
      hit.impact = { x, y };
      hit.cracked = now;
      hit.fall = now + 220;
      removedArea += hit.area;
      if (removedArea >= width * height * .5) {
        cascade = now;
        fragments.forEach((fragment, index) => {
          if (fragment.cracked !== null) return;
          fragment.cracked = now;
          fragment.fall = now + (index % 7) * 25;
        });
      }
      if (!frame) frame = requestAnimationFrame(render);
    };
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    const motionChange = () => { if (motion.matches) finish(); };

    if (motion.matches) { queueMicrotask(finish); return () => { disposed = true; }; }
    Promise.all([loadImage("/nap-app-hero.png"), document.fonts.ready]).then(([image]) => {
      if (disposed) return;
      assets = [image];
      resize();
      setReady(true);
      canvas.addEventListener("pointermove", crack);
      canvas.addEventListener("pointerdown", crack);
      window.addEventListener("resize", resize);
    }).catch(finish);
    window.addEventListener("keydown", keyboard);
    motion.addEventListener("change", motionChange);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", crack);
      canvas.removeEventListener("pointerdown", crack);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", keyboard);
      motion.removeEventListener("change", motionChange);
    };
  }, []);

  if (finished) return null;
  return (
    <>
      <div className="fracture-shell" aria-hidden="true">
        {!ready && <div className="fracture-fallback">nap.</div>}
        <canvas ref={canvasRef} />
      </div>
      <a className="quick-download" href={download}>download for mac →</a>
    </>
  );
}
