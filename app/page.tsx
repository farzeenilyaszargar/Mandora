import type { Metadata } from "next";
import Image from "next/image";

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
      <Image className="nap-mark" src="/logo.png" alt="" width={44} height={44} priority />
      <h1>nap.</h1>
      <p className="nap-description">All your coding agents. One interface.</p>
      <a className="nap-download" href={macDownloadUrl}>
        <Image src="/apple-platform-logo.png" alt="" width={18} height={22} />
        Download for macOS
      </a>
      <p className="nap-note">We spent all our time on the app.</p>
    </main>
  );
}
