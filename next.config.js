/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            'firebasestorage.googleapis.com'
        ],
        formats: [
            'image/avif',
            'image/webp'
        ]
    },
    output: 'export'
};

// const dotenv = require('dotenv');
// dotenv.config();