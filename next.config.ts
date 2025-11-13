import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.imgse.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "s21.ax1x.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "t.alcy.cc",
        port: "",
        pathname: "/**"
      }
    ],
    // 禁用图片优化以绕过私有 IP 检查（图片将直接使用原始 URL）
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
}

export default nextConfig
