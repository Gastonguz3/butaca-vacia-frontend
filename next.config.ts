import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //Para que next permita cargar imagenes desde el dominio de tmdb
  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
};

export default nextConfig;
