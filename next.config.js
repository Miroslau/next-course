/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'google', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
