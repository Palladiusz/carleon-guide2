/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['render.albiononline.com']
    }
}

module.exports = nextConfig
