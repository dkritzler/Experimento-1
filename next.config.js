/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.externals.push({
      'three': 'three'
    });
    return config;
  },
}

module.exports = nextConfig