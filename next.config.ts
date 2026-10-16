import type { NextConfig } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const nextConfig: NextConfig = {
  async headers() {
    // Only content-versioned files get immutable caching; HTML stays revalidatable.
    return readdirSync(join(process.cwd(), "public"))
      .filter((file) => /-[a-f0-9]{8}\.webp$/.test(file))
      .map((file) => ({
        source: `/${file}`,
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      }));
  },
};

export default nextConfig;
