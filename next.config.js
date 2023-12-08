/** @type {import('next').NextConfig} */
let nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['with-sports-s3.s3.ap-northeast-2.amazonaws.com'],
    },
}

module.exports = nextConfig

// module.exports = nextConfig

// nextConfig = {
//     reactStrictMode: true,
//     swcMinify: true,
//     images: {
//         domains: ['with-sports-s3.s3.ap-northeast-2.amazonaws.com'],
//     },
// }