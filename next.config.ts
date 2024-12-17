import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/textrazor/:path*',
                destination: 'https://api.textrazor.com/:path*',
            },
        ];
    },
};

export default nextConfig;