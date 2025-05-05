'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaMapMarkerAlt,
  FaCloudSun,
  FaTemperatureHigh,
  FaWind,
  FaRegCalendarAlt,
  FaRegWindowMaximize
} from 'react-icons/fa'
import { formatDate, formatDay } from '@/utils/dayFormat'

interface WeatherData {
  temperature: number //实时气温，单位：摄氏度
  description: string //天气现象（汉字描述）
  winddirection: string //风向描述
  windpower: string //风力级别，单位：级
}

interface LocationData {
  city: string
  province: string
}

export default () => {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVisitorInfo = async () => {
      try {
        // 获取地理位置
        const ipResponse = await fetch(
          `https://restapi.amap.com/v3/ip?key=${process.env.NEXT_PUBLIC_GAODE_KEY_IP}`
        )
        const locationData = await ipResponse.json()

        setLocation({
          province: locationData.province,
          city: locationData.city
        })

        // 获取天气信息
        const weatherResponse = await fetch(
          `https://restapi.amap.com/v3/weather/weatherInfo?key=${process.env.NEXT_PUBLIC_GAODE_KEY_IP}&city=${locationData.adcode}`
        )
        const weatherData = await weatherResponse.json()
        if (weatherData.status === '1') {
          setWeather({
            temperature: weatherData.lives[0].temperature,
            description: weatherData.lives[0].weather,
            winddirection: weatherData.lives[0].winddirection,
            windpower: weatherData.lives[0].windpower
          })
        }
      } catch (error) {
        console.error('Error fetching visitor info:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitorInfo()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col w-full px-4 py-3 border dark:border-none rounded-lg bg-white dark:bg-black-b mb-2 transition-all">
        <div className="flex items-center justify-center space-x-2 py-2">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-500"></div>
          <span className="text-gray-600 dark:text-gray-300">正在加载中...</span>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex flex-col w-full px-4 py-3 border dark:border-none rounded-lg bg-white dark:bg-black-b mb-2 transition-all"
    >
      {/* 地区 */}
      <div className="flex flex-col w-full mb-2">
        <div className="text-2xl font-bold text-primary mb-1 text-center">
          有朋自远方来，不亦说乎！
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-red-500 text-xl" />
            <span className="text-gray-600 dark:text-gray-300 text-xl">欢迎这位来自</span>
            <span className="text-red-500 font-bold text-2xl">{location?.province || '未知'}</span>
            <span className="text-gray-400">|</span>
            <span className="text-red-500 font-bold text-2xl">{location?.city || '未知'}</span>
            <span className="text-gray-600 dark:text-gray-300 text-xl">的朋友！</span>
          </div>
        </div>
      </div>

      {/* 天气 */}
      {weather && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <FaCloudSun className="text-red-500" />
            <span className="text-gray-600 dark:text-gray-300">
              今天的天气<span className="text-red-500 font-bold">{weather.description}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt className="text-red-500" />
            <span className="text-gray-600 dark:text-gray-300">
              日期：<span className="text-red-500 font-bold">{formatDate()}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegWindowMaximize className="text-red-500" />
            <span className="text-gray-600 dark:text-gray-300">
              今天星期<span className="text-red-500 font-bold">{formatDay()}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaTemperatureHigh className="text-red-500" />
            <span className="text-gray-600 dark:text-gray-300">
              温度<span className="text-red-500 font-bold">{weather.temperature}°C</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaWind className="text-red-500" />
            <span className="text-gray-600 dark:text-gray-300">
              今天是<span className="text-red-500 font-bold">{weather.winddirection}</span>风， 风速
              <span className="text-red-500 font-bold">{weather.windpower}</span>级
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
