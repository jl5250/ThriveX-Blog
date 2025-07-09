import Request from "@/utils/request";
import { Config } from "@/types/app/config";

// 获取网站配置
export const getWebConfigDataAPI = <T>(type: string) => Request<T>("GET", `/web_config/list/${type}`)

// 修改网站配置
export const editWebConfigDataAPI = (type: string, data: object) => Request<{ [string: string]: string }>("PATCH", `/web_config/${type}`, { data })

// 获取高德地图配置
export const getGaodeMapConfigDataAPI = () => Request("GET", `/env_config/gaode_map`)

// 根据名称获取页面配置
export const getPageConfigDataByNameAPI = (name: string) => Request<Config>("GET", `/page_config/name/${name}`)