import { ImageResponse } from "next/og";

export const alt = "Nap — Your agents. All together. Native AI coding app for Mac.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function SocialImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "55px 65px", background: "#0b0b0b", color: "#f3f3ed", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 64, fontWeight: 700, letterSpacing: -5 }}>nap</span>
        <span style={{ fontSize: 24, color: "#aaa9a0" }}>nap.cx</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 700, letterSpacing: -7, lineHeight: .95 }}>
        <span>YOUR AGENTS.</span><span>ALL TOGETHER.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#aaa9a0" }}>
        <span>Native AI coding app for Mac</span><span>@napverse</span>
      </div>
    </div>,
    size,
  );
}
