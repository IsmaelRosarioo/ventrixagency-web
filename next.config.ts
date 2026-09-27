import type { NextConfig } from "next";

const MAP_UPSTREAM = process.env.MAP_UPSTREAM_URL || "http://157.250.201.26:25670";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/map/:path*",
        destination: `${MAP_UPSTREAM}/:path*`,
      },
      {
        source: "/map",
        destination: `${MAP_UPSTREAM}/`,
      },
    ];
  },
};

export default nextConfig;
