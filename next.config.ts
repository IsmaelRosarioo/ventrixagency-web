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
        source: "/assets/:path*",
        destination: `${MAP_UPSTREAM}/assets/:path*`,
      },
      {
        source: "/settings.json",
        destination: `${MAP_UPSTREAM}/settings.json`,
      },
      {
        source: "/maps/:path*",
        destination: `${MAP_UPSTREAM}/maps/:path*`,
      },
      {
        source: "/data/:path*",
        destination: `${MAP_UPSTREAM}/data/:path*`,
      },
      {
        source: "/textures.json",
        destination: `${MAP_UPSTREAM}/textures.json`,
      },
    ];
  },
};

export default nextConfig;
