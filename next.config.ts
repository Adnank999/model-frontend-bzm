import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // distDir: 'build',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fashionmodel.bzm.com.bd", 
      },
    ],
  },
};

export default nextConfig;
