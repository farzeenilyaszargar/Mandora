"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";

export default function ScrollHero({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = root.current!;
    const stage = container.querySelector<HTMLElement>(".nap-scroll-stage")!;
    const title = stage.querySelector<HTMLElement>("#nap-title")!;
    const action = stage.querySelector<HTMLElement>(".nap-action")!;
    const image = stage.querySelector<HTMLElement>(".nap-scroll-product")!;
    const fading = stage.querySelectorAll<HTMLElement>(".nap-description, .nap-eyebrow, .nap-download-note, .nap-scroll-hint");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let titleX = 0, titleY = 0, actionX = 0, actionY = 0, imageY = 0, scale = 1;

    function measure() {
      title.style.transform = "none";
      action.style.transform = "none";
      const bounds = stage.getBoundingClientRect();
      const heading = title.getBoundingClientRect();
      const cta = action.getBoundingClientRect();
      const mobile = bounds.width <= 700;
      scale = mobile ? .64 : .36;
      const headingTop = mobile ? 105 : 110;
      titleX = (bounds.width - heading.width * scale) / 2 - (heading.left - bounds.left);
      titleY = headingTop - (heading.top - bounds.top);
      const actionTop = headingTop + heading.height * scale + (mobile ? 22 : 28);
      actionX = (bounds.width - cta.width) / 2 - (cta.left - bounds.left);
      actionY = actionTop - (cta.top - bounds.top);
      imageY = actionTop + cta.height + (mobile ? 15 : 22);
      const availableHeight = Math.max(80, bounds.height - imageY - 25);
      image.style.width = `${Math.min(1040, bounds.width * .88, availableHeight * 1380 / 872)}px`;
      image.style.top = `${imageY}px`;
      update();
    }

    function update() {
      const range = container.offsetHeight - stage.offsetHeight;
      const raw = Math.max(0, Math.min(1, -container.getBoundingClientRect().top / Math.max(1, range)));
      const progress = reduced.matches ? (raw > .25 ? 1 : 0) : raw * raw * (3 - 2 * raw);
      title.style.transform = `translate(${titleX * progress}px, ${titleY * progress}px) scale(${1 + (scale - 1) * progress})`;
      action.style.transform = `translate(${actionX * progress}px, ${actionY * progress}px)`;
      fading.forEach((element) => { element.style.opacity = `${Math.max(0, 1 - progress * 3)}`; });
      image.style.transform = `translateX(-50%) translateY(${(1 - progress) * stage.offsetHeight * .75}px)`;
      image.style.opacity = `${Math.max(0, (progress - .15) / .85)}`;
      image.style.visibility = progress === 0 ? "hidden" : "visible";
      frame = 0;
    }
    function scroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    measure();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", measure);
    reduced.addEventListener("change", scroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", measure);
      reduced.removeEventListener("change", scroll);
    };
  }, []);

  return (
    <main className="nap-scroll-page" ref={root}>
      <div className="contrast-page nap-scroll-stage">
        {children}
        <figure className="nap-scroll-product">
          <Image src="/nap-app-hero.png" alt="Nap’s native workspace with project sessions and an agent conversation." width={1380} height={872} sizes="(max-width: 700px) 88vw, 1040px" />
        </figure>
        <span className="nap-scroll-hint">SCROLL TO EXPLORE ↓</span>
      </div>
    </main>
  );
}
