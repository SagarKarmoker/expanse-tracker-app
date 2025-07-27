import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is okay if you're using Prisma on the server
  serverExternalPackages: ["@prisma/client"],

  webpack: (config, { isServer }) => {
    return config;
  },
};

export default nextConfig;
