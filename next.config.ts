import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'ciim-public-media-s3.s3.eu-west-2.amazonaws.com',
      'i.pinimg.com',
    ],
  },
};

export default nextConfig;
