/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: process.env.DEV_DIST ? '.next-dev' : 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
