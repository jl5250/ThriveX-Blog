import { useEffect, useRef, useMemo } from 'react'
import { lyricItem, parseLyric } from '@/utils'
import { RefObject } from 'react'
import { useMusicStore } from '@/stores'

export interface ILyric {
  updateTime: (e: any, fuzzy?: boolean) => void
  currentLyricIndex: number
  currentTime: number
  lyricList: lyricItem[]
  lyricBoxRef: RefObject<HTMLDivElement | null>
}

export default function useLyric() {
  // 获取当前歌曲和当前歌词
  const {
    currentLyric,
    currentMusic,
    currentTime,
    currentLyricIndex,
    changeCurrentTime,
    changeCurrentLyricIndex
  } = useMusicStore()
  // 转换歌词
  const lyricList = useMemo(() => parseLyric(currentLyric), [currentLyric])

  /**
   * 更新播放时间和当前歌词下标的函数（会被audio的onUpdateTime调用）
   * 有时候直接点击进度条跳转会匹配不到导致index为-1，所以传入第二个参数
   * 为了模糊匹配（可以缓解这个情况）
   * @param e
   */
  const updateTime = (e: any) => {
    // 修改全局播放时间
    const newTime =
      typeof e !== 'string' ? parseInt((e.target.currentTime * 1000).toFixed()) : parseInt(e)
    changeCurrentTime(newTime)

    // 找到当前歌词下标
    const index = lyricList.findIndex((item, i) => {
      // 如果是最后一句歌词，直接返回
      if (i === lyricList.length - 1) {
        return item.time <= newTime
      }
      // 否则检查当前歌词和下一句歌词的时间
      return item.time <= newTime && lyricList[i + 1].time > newTime
    })

    if (index !== -1) {
      // 修改当前的歌词下标
      changeCurrentLyricIndex(index)
    }
  }

  // 获取包裹歌词的盒子
  const lyricBoxRef = useRef<HTMLDivElement>(null)

  /**
   * 滚动歌词的副作用函数
   */
  useEffect(() => {
    if (lyricBoxRef.current) {
      // 获取歌词容器中当前歌词的对应元素
      const currentLyricWrapper = lyricBoxRef.current.children[currentLyricIndex] as HTMLElement
      const currentLyricParent = lyricBoxRef.current.parentElement as HTMLElement

      if (currentLyricWrapper) {
        // 当前歌词偏移到盒子中心的偏移量 = 距离父亲顶部的距离 - 歌词容器高度的一半(card的歌词容器高度是140px) + 自身高度的一半
        const offsetTop =
          currentLyricWrapper.offsetTop -
          (currentLyricParent?.parentElement?.clientHeight ?? 140) / 2 +
          currentLyricWrapper?.clientHeight / 2 -
          20
        // 设置偏移量
        // lyricBoxRef.current.style.transform = `translateY(${-offsetTop}px)`
        // currentLyricParent.scrollTop = offsetTop
        currentLyricParent.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    }
    // 在当前歌词Index改变，或者是歌曲改变时执行
  }, [currentLyricIndex, currentMusic, currentTime])

  return {
    updateTime,
    currentLyricIndex,
    currentTime,
    lyricList,
    lyricBoxRef
  }
}
