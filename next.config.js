/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ytimg.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
