import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.imgse.com", // 注意这里要包含 www
        port: "",
        pathname: "/**" // 精确匹配图片路径
      },
      {
        protocol: "https",
        hostname: "s21.ax1x.com", // 注意这里要包含 www
        port: "",
        pathname: "/**" // 精确匹配图片路径
      },
      {
        protocol: "https",
        hostname: "t.alcy.cc", // 注意这里要包含 www
        port: "",
        pathname: "/**" // 精确匹配图片路径
      }
    ]
  }
}

export default nextConfig
