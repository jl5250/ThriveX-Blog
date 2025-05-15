import { ORDER } from '@/constant'
import { MusicListItem } from '@/types/app/music'
import { useMusicStore } from '@/stores'
import { useState, useRef, SyntheticEvent, useEffect, useCallback } from 'react'
import { Dispatch, SetStateAction, RefObject } from 'react'
import useSwitchCurrentMusic from './useSwitchCurrentMusic'
export const INITIAL_VOLUME = 0.66

type Order = 'cycle' | 'single' | 'random'

export interface IAudio {
  canplay: (e: SyntheticEvent<HTMLAudioElement, Event>) => void
  switchMusic: (type: 'pre' | 'next', order?: Order) => void
  setVolume: Dispatch<SetStateAction<number>>
  switchMusicStaus: () => void
  changeJingyin: () => void
  onError: () => void
  onEnd: () => void
  switchOrder: () => void
  setIsMusic: Dispatch<SetStateAction<boolean>>
  currentOrder: Order
  isMusic: boolean
  duration: number
  audioRef: RefObject<HTMLAudioElement | null>
  volume: number
  // bufferPercent: number
  currentTime: number
  currentMusic: MusicListItem
}
//需要放在最外面，否则每次执行函数都会重新创建变量
let volumeCache = 0
let isJingyin = false
export default function useAudio(): IAudio {
  const {
    surgeMusicList,
    hotMusicList,
    newMusicList,
    originalMusicList,
    dailyMusicList,
    currentMusicType,
    duration,
    currentMusic,
    currentTime
  } = useMusicStore()
  // 是否播放音乐
  const [isMusic, setIsMusic] = useState(false)
  //获取audio元素
  const audioRef = useRef<HTMLAudioElement>(null)
  //音量状态
  const [volume, setVolume] = useState(INITIAL_VOLUME)
  const [currentOrder, setCurrentOrder] = useState<Order>('cycle')

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // 当前播放状态
  const switchMusicStaus = useCallback(() => {
    if (audioRef.current) {
      if (isMusic) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsMusic(!isMusic)
    }
  }, [isMusic])

  // 歌曲播放
  const canplay = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    isMusic ? audioRef.current?.play() : audioRef.current?.pause()
  }

  // 歌曲静音
  const changeJingyin = useCallback(() => {
    if (audioRef.current) {
      if (volume > 0) {
        setVolume(0)
        audioRef.current.volume = 0
      } else {
        setVolume(INITIAL_VOLUME)
        audioRef.current.volume = INITIAL_VOLUME
      }
    }
  }, [volume])

  // 切换上/下一首歌曲
  const switchMusic = useCallback(
    (type: 'pre' | 'next', order: Order = 'cycle') => {
      let currentMusicList: MusicListItem[] = []
      // 寻找歌单
      switch (currentMusicType) {
        case 'surge': {
          currentMusicList = surgeMusicList
          break
        }
        case 'hot': {
          currentMusicList = hotMusicList
          break
        }
        case 'new': {
          currentMusicList = newMusicList
          break
        }
        case 'original': {
          currentMusicList = originalMusicList
          break
        }
        case 'like': {
          currentMusicList = dailyMusicList
          break
        }
        default:
          break
      }

      // 如果有歌曲就执行
      if (currentMusicList.length) {
        let currentIndex = currentMusicList.findIndex((item) => item.al?.id === currentMusic.al?.id)
        let Music: MusicListItem | null = null

        switch (order) {
          case 'cycle': {
            // 列表循环播放
            currentIndex += type === 'pre' ? -1 : 1
            currentIndex =
              currentIndex < 0
                ? currentMusicList.length - 1
                : currentIndex % currentMusicList.length
            Music = currentMusicList[currentIndex]
            break
          }
          case 'single': {
            // 单曲循环播放
            Music = currentMusic
            break
          }
          case 'random': {
            // 随机播放
            let randomIndex
            do {
              randomIndex = Math.floor(Math.random() * currentMusicList.length)
            } while (randomIndex === currentIndex && currentMusicList.length > 1)
            Music = currentMusicList[randomIndex]
            break
          }
        }

        if (Music) {
          audioRef.current?.pause()
          // 改变当前音乐
          useSwitchCurrentMusic(Music)
          // 根据当前状态判断是否要播放
          isMusic ? audioRef.current?.play() : audioRef.current?.pause()
        }
      }
    },
    [
      currentMusicType,
      currentMusic,
      isMusic,
      surgeMusicList,
      hotMusicList,
      newMusicList,
      originalMusicList,
      dailyMusicList
    ]
  )

  // 切换播放模式
  const switchOrder = useCallback(() => {
    const index = ORDER.findIndex((item) => item === currentOrder)
    setCurrentOrder(ORDER[(index + 1) % ORDER.length] as Order)
  }, [currentOrder])

  const onError = useCallback(() => {
    if (!currentMusic.initFlag) {
      //防止因为单曲循环报错而不切换音乐
      switchMusic('next', currentOrder === 'single' ? 'cycle' : currentOrder)
      audioRef.current?.pause()
      //TODO:Error时发出提示，并且不在切换音乐
    }
  }, [currentOrder, switchMusic])

  const onEnd = useCallback(() => {
    // 根据当前播放模式决定下一首歌曲
    switch (currentOrder) {
      case 'cycle':
      case 'random': {
        switchMusic('next', currentOrder)
        break
      }
      case 'single': {
        // 单曲循环时，重新播放当前歌曲
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play()
        }
        break
      }
    }
  }, [currentOrder, switchMusic])

  return {
    switchMusicStaus,
    changeJingyin,
    switchMusic,
    setVolume,
    canplay,
    onError,
    onEnd,
    switchOrder,
    setIsMusic,
    currentOrder,
    // bufferPercent,
    currentTime,
    currentMusic,
    isMusic,
    duration,
    audioRef,
    volume
  }
}
