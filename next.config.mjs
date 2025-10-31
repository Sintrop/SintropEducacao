/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "firebasestorage.googleapis.com" },
      { hostname: "media.discordapp.net" },
      { hostname: "*" },
    ],
  },
  experimental: {
    // You may not need this, it's just to support moduleResolution: 'node16'
    extensionAlias: {
      ".js": [".tsx", ".ts", ".jsx", ".js"],
    },
  },
};

export default nextConfig;
