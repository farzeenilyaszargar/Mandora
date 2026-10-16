import Link from "next/link";

export default function NapHeader() {
  return (
    <header className="nap-header">
      <Link href="/" className="nap-wordmark" aria-label="Nap home">nap<span>®</span></Link>
      <nav className="nap-nav" aria-label="Main navigation">
        <Link className="nap-docs" href="/blogs">BLOGS</Link>
        <a className="nap-docs" href="https://github.com/farzeenilyaszargar/NotNap/releases">CHANGELOGS</a>
      </nav>
    </header>
  );
}
