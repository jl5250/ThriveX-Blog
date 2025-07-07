/** @type {import('next').NextConfig} */
const nextConfig = {
  // 关闭严格模式
  reactStrictMode: false,
  // 配置图片来源
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bucket.starlightpathserver.fun'
      },
      {
        protocol: 'https',
        hostname: 'q1.qlogo.cn'
      },
      {
        protocol: 'https',
        hostname: 'bu.dusays.com'
      },
      {
        protocol: 'https',
        hostname: 'p2.music.126.net'
      },
      {
        protocol: 'https',
        hostname: 'p1.music.126.net'
      },
      {
        protocol: 'https',
        hostname: 'api.starlightpathserver.fun'
      },
      {
        protocol: 'https',
        hostname: 'pic1.imgdb.cn'
      }
    ]
  },
  eslint: {
    // 即使有 ESLint 错误，构建也会继续，不会因为 ESLint 报错而中断
    ignoreDuringBuilds: true
  }
}

export default nextConfig
