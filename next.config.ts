import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export", // 启用静态导出
  // 如果你的项目使用了动态路由，需要配置 basePath 和 assetPrefix
  basePath: process.env.NODE_ENV === "production" ? "/taroblog-git-master-1940879828s-projects.vercel.app" : "", // GitHub Pages 的仓库名称
  assetPrefix: process.env.NODE_ENV === "production" ? "/taroblog-git-master-1940879828s-projects.vercel.app/" : "" // GitHub Pages 的仓库名称
}

export default nextConfig
