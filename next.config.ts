/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "example.com",
      "localhost",
    ], // Deprecated, TODO: Remove in favor of remotePatterns
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "**",
        pathname: "/**",
        search: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "**",
        pathname: "/**",
        search: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "**",
        pathname: "/**",
        search: "**",
      },
    ],
  },
};

export default nextConfig;
