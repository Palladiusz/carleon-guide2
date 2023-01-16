/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['render.albiononline.com']
    }
}

module.exports = nextConfig
