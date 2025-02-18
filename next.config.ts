import type { NextConfig } from 'next';

const getHostnameFromEnv = () => {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_BASE_URL || '');
    return url.hostname;
  } catch {
    return '';
  }
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: getHostnameFromEnv(),
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
