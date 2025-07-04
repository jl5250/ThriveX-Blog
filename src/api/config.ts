import Request from "@/utils/request";

// 获取网站配置
export const getWebConfigDataAPI = <T>(type: string) => Request<T>("GET", `/web_config/list/${type}`)

// 修改网站配置
export const editWebConfigDataAPI = (type: string, data: object) => Request<{ [string: string]: string }>("PATCH", `/web_config/${type}`, { data })


// 获取高德地图配置
export const getGaodeMapConfigDataAPI = () => Request("GET", `/env_config/gaode_map`)