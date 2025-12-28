import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: "http://localhost:4000",
    TOKEN: "myprivatenotes-token",
  },
};

export default nextConfig;
