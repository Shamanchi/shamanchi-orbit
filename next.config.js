/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/shamanchi-orbit',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
