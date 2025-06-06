/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Allow cross-origin requests in development mode
  experimental: {
    allowedDevOrigins: ['localhost', '192.168.100.218']
  },
};

module.exports = nextConfig;