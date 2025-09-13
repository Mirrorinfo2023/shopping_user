/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['img.icons8.com', 'images.unsplash.com', 'picsum.photos',"example.com"],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://localhost:3002/api/:path*", // backend

        destination: "https://api.mayway.in/api/:path*",
      },
    ];
  },
};

export default nextConfig;
