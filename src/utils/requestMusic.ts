// 最新调整：在 .env 文件中配置音乐项目后端 API 地址
const url = process.env.NEXT_PUBLIC_MUSIC_API

export default async <T>(method: string, api: string, data?: any, caching = true) => {
  try {
    const res = await fetch(`${url}${api}`, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      [method === 'POST' ? 'body' : '']: JSON.stringify(data ? data : {}),
      cache: caching ? 'force-cache' : 'no-store'
    })

    return res?.json() as Promise<ResponseData<T>>
  } catch (error) {
    console.log('捕获到异常：', error)
  }
}
