/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['img.icons8.com', 'images.unsplash.com', 'picsum.photos',"example.com","f005.backblazeb2.com"],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3002/api/:path*", // backend

        // destination: "https://secure1.mirrorinfo.in/api/:path*",
      },
    ];
  },
};

export default nextConfig;
