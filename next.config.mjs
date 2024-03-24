/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                // Define the remote pattern for the QR code API
                protocol: 'http',
                hostname: 'api.qrserver.com',
                port: '',
            },
        ],
    },
};

// module.exports = nextConfig;

export default nextConfig;
