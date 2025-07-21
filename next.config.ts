import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ['techfit.kr.ncloudstorage.com'],  // 외부 이미지 도메인 허용
  }
};

export default nextConfig;
