import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: process.env.NEXT_PUBLIC_BASE_URL
      ? [
          {
            protocol: 'http',
            hostname: new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname,
            port: '',
            pathname: '/images/**',
          },
        ]
      : [],
  },
  webpack: (config, { dev }) => {
    config.optimization.minimize = !dev;
    return config;
  },
};

export default nextConfig;
