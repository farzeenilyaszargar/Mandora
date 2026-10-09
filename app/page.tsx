import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Nap Download" },
  openGraph: { title: "Nap Download" },
  twitter: { title: "Nap Download" },
};

const macDownloadUrl =
  "https://github.com/farzeenilyaszargar/NotNap/releases/latest/download/NotNap-macos.dmg";

export default function Home() {
  return (
    <main className="barebones">
      <h1>nap.</h1>
      <p><strong>All your coding agents. One interface.</strong></p>
      <p><a href={macDownloadUrl}>Download for macOS</a></p>
      <p><em>We spent all our time on the app.</em></p>
    </main>
  );
}
