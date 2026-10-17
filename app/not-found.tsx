import Link from "next/link";
import NapHeader from "./components/nap-header";
import DeferredLiquidField from "./components/deferred-liquid-field";
import "./contrast.css";
import "./not-found.css";

export default function NotFound() {
  return (
    <main className="contrast-page nap-not-found">
      <NapHeader />
      <section className="nap-lost" aria-labelledby="lost-title">
        <p className="nap-section-label">A SMALL DETOUR.</p>
        <h1 className="nap-lost-code" aria-label="404 — Page not found">
          <span aria-hidden="true">4<span className="nap-lost-zero">0</span>4</span>
        </h1>
        <h2 id="lost-title">This page took a nap.</h2>
        <p className="nap-lost-description">The page you’re looking for isn’t here.<br />Let’s get you back to what’s next.</p>
        <Link href="/" className="nap-download nap-lost-home">Back to home</Link>
      </section>
      <footer className="nap-lost-footer">
        <span>© 2026 NAP</span>
        <span>GOOD IDEAS DON’T END HERE.</span>
      </footer>
      <DeferredLiquidField />
    </main>
  );
}
