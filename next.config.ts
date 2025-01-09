/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: [
    "page.tsx",
    // "page.ts",
    // "loading.ts",
    // FIXME: Next.js has a bug which does not resolve not-found.page.tsx correctly
    // Instead, use `not-found.ts` as a workaround
    // "ts" is required to resolve `not-found.ts`
    // https://github.com/vercel/next.js/issues/65447
    // "ts",
  ],
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
