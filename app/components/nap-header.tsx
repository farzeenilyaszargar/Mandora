export default function NapHeader() {
  return (
    <header className="nap-header">
      <a href="/" className="nap-wordmark" aria-label="Nap home">nap<span>®</span></a>
      <nav className="nap-nav" aria-label="Main navigation">
        <a className="nap-docs" href="/blogs">BLOGS</a>
        <a className="nap-docs" href="https://github.com/farzeenilyaszargar/NotNap/releases">CHANGELOGS</a>
      </nav>
    </header>
  );
}
