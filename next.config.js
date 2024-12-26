/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the static export to enable API routes
  images: { unoptimized: true },
};

module.exports = nextConfig;