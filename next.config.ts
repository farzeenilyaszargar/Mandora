import type { NextConfig } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const nextConfig: NextConfig = {
  async redirects() {
    return ["nap-code.com", "www.nap-code.com"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://www.nap.cx/:path*",
      permanent: true,
    }));
  },
  async headers() {
    // Only content-versioned files get immutable caching; HTML stays revalidatable.
    return readdirSync(join(process.cwd(), "public"))
      .filter((file) => /-[a-f0-9]{8}\.(?:webp|png)$/.test(file))
      .map((file) => ({
        source: `/${file}`,
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      }));
  },
};

export default nextConfig;
