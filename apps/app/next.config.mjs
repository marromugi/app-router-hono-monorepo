/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@tumi/api'],
  experimental: {
    optimizePackageImports: ['@tumi/api']
  }
}

export default nextConfig
