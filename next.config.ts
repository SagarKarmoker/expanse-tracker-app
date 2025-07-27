import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is okay if you're using Prisma on the server
  serverExternalPackages: ["@prisma/client"],

  webpack: (config, { isServer }) => {
    // Fix for Prisma Client on Vercel
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
};

export default nextConfig;
