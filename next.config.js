/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'firebasestorage.googleapis.com'
        ],
        formats: [
            'image/avif',
            'image/webp'
        ]
    }
}

module.exports = nextConfig

// const dotenv = require('dotenv');
// dotenv.config();