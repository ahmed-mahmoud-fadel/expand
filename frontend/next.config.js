/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "thumb.tildacdn.com",
        hostname: "*",
      }
    ]
  }
}

module.exports = nextConfig
