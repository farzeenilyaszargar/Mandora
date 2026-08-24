"use client";

import { useState } from "react";

const macDownloadUrl = "https://github.com/farzeenilyaszargar/NotNap/releases/latest/download/NotNap-macos.dmg";

export default function DownloadModalButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-[#d8d8d8]"
      >
        Download
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] grid min-h-dvh place-items-center bg-black/75 px-5 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#050505] p-7 text-left text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold">Download Nap</h2>
                <p className="mt-3 text-sm leading-6 text-white/48">
                  Choose the build for your Mac.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-sm font-bold text-white/45 transition hover:text-white"
                aria-label="Close download dialog"
              >
                x
              </button>
            </div>

            <div className="mt-8 grid gap-3">
              <a
                href={macDownloadUrl}
                className="flex items-center justify-between gap-3 rounded-lg bg-white px-5 py-3 text-left text-sm font-bold text-black transition hover:bg-[#d8d8d8]"
              >
                <span>Download For MacOS</span>
                <AppleIcon />
              </a>
              <a
                href="/waitlist"
                className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3 text-left text-sm font-bold text-white/60 transition hover:border-white/20 hover:text-white"
              >
                <span>Join Windows/Linux Waitlist</span>
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function AppleIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.4 13.1c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-2-.9-3.2-.8-1.7 0-3.2 1-4 2.5-1.7 2.9-.4 7.1 1.2 9.4.8 1.1 1.7 2.4 3 2.3 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8s2.2-1.1 3-2.3c.9-1.3 1.3-2.6 1.3-2.7-.1-.1-2.5-1-2.5-3.7z" />
      <path d="M14 5.9c.7-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.9-1 2.9 1 .1 2-.5 2.7-1.3z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
