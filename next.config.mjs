/** @type {import('next').NextConfig} */
const nextConfig = {
  // 关闭严格模式
  reactStrictMode: false,
  // 配置图片来源
  images: {
    // domains: [
    //   'q1.qlogo.cn',
    //   'bu.dusays.com',
    //   'p2.music.126.net',
    //   'p1.music.126.net',
    //   'bucket.starlightpathserver.fun',
    //   'api.starlightpathserver.fun',
    //   'pic1.imgdb.cn'
    // ],
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
  }
}

export default nextConfig
