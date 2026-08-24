import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Nap for macOS or join the Windows and Linux waitlists.",
  alternates: {
    canonical: "/download",
  },
  openGraph: {
    title: "Download Nap",
    description: "Choose Apple, Windows, or Linux for Nap.",
    url: "/download",
  },
  twitter: {
    title: "Download Nap",
    description: "Download Nap for macOS or join the Windows and Linux waitlists.",
  },
};

const platforms = [
  {
    name: "Apple",
    icon: "apple",
    status: "Available now",
    action: "Download for macOS",
    href: "/download.txt",
    isDownload: true,
  },
  {
    name: "Windows",
    icon: "windows",
    status: "Waitlist",
    action: "Join waitlist",
  },
  {
    name: "Linux",
    icon: "linux",
    status: "Waitlist",
    action: "Join waitlist",
  },
];

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 text-white">
      <div className="mx-auto min-h-screen max-w-[1120px] border-x border-white/10">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/75 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-4">
            <a href="/" aria-label="Nap home">
              <Image className="brightness-0 invert" src="/logo.png" alt="" width={28} height={28} priority />
            </a>
            <div className="flex items-center gap-6 text-sm font-medium text-white/65">
              <a href="/docs" className="transition hover:text-white">Docs</a>
              <a href="/enterprise" className="transition hover:text-white">Enterprise</a>
              <a href="/download" className="rounded-md bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-[#d8d8d8]">
                Download
              </a>
            </div>
          </div>
        </nav>

        <section className="px-8 py-24">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/28">Download</p>
          <h1 className="mt-6 max-w-[620px] text-5xl font-bold leading-[1.02] md:text-6xl">
            Choose your platform.
          </h1>

          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
            {platforms.map((platform) => (
              <article key={platform.name} className="flex min-h-72 flex-col bg-[#050505] p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/42">
                  <PlatformIcon name={platform.icon} />
                </span>
                <h2 className="mt-8 text-2xl font-bold">{platform.name}</h2>
                <p className="mt-2 text-sm font-semibold text-white/38">{platform.status}</p>
                <div className="mt-auto pt-10">
                  {platform.isDownload ? (
                    <a
                      href={platform.href}
                      download
                      className="inline-flex w-full items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d8d8d8]"
                    >
                      {platform.action}
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/48"
                    >
                      {platform.action}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function PlatformIcon({ name }: { name: string }) {
  const props = {
    className: "h-6 w-6",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (name === "apple") {
    return (
      <svg {...props}>
        <path d="M16.4 13.1c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-2-.9-3.2-.8-1.7 0-3.2 1-4 2.5-1.7 2.9-.4 7.1 1.2 9.4.8 1.1 1.7 2.4 3 2.3 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8s2.2-1.1 3-2.3c.9-1.3 1.3-2.6 1.3-2.7-.1-.1-2.5-1-2.5-3.7z" />
        <path d="M14 5.9c.7-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.9-1 2.9 1 .1 2-.5 2.7-1.3z" />
      </svg>
    );
  }

  if (name === "windows") {
    return (
      <svg {...props}>
        <path d="M3 5.2 10.8 4v7.5H3V5.2z" />
        <path d="M12 3.8 21 2.5v9h-9V3.8z" />
        <path d="M3 12.7h7.8v7.4L3 18.9v-6.2z" />
        <path d="M12 12.7h9v8.8l-9-1.3v-7.5z" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M12 2.2c-2.1 0-3.8 1.7-3.8 3.9 0 1.4.7 2.5 1.4 3.2-1.4.8-2.4 2.4-2.4 4.3 0 3 2.2 5.3 4.8 5.3s4.8-2.3 4.8-5.3c0-1.9-1-3.5-2.4-4.3.7-.7 1.4-1.8 1.4-3.2 0-2.2-1.7-3.9-3.8-3.9zM9 19.7l-2.2 1.7c-.4.3-1 .2-1.3-.2-.3-.4-.2-1 .2-1.3l2-1.5c.4.5.8.9 1.3 1.3zm6 0c.5-.4.9-.8 1.3-1.3l2 1.5c.4.3.5.9.2 1.3-.3.4-.9.5-1.3.2L15 19.7z" />
    </svg>
  );
}
