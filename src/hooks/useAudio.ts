import { ORDER } from '@/constant'
import { MusicListItem } from '@/types/app/music'
import { useMusicStore } from '@/stores'
import { useState, useRef, SyntheticEvent, useEffect } from 'react'
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // 当前播放状态
  const switchMusicStaus = () => {
    if (audioRef.current) {
      isMusic ? audioRef.current.pause() : audioRef.current.play()
      setIsMusic(!isMusic)
    }
  }

  const canplay = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    isMusic ? audioRef.current?.play() : audioRef.current?.pause()
  }

  const changeJingyin = () => {
    // isJingyin和volumnCache放在函数外，防止每次执行函数都重新声明变量
    if (!isJingyin) {
      volumeCache = volume
      setVolume(0)
    } else {
      setVolume(volumeCache)
    }
    isJingyin = !isJingyin
  }

  const [currentOrder, setCurrentOrder] = useState<Order>('cycle')

  // 切换上/下一首歌曲
  const switchMusic = (type: 'pre' | 'next', order: Order = 'cycle') => {
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
          currentIndex += type === 'pre' ? -1 : 1
          //循环播放
          currentIndex =
            currentIndex < 0 ? currentMusicList.length - 1 : currentIndex % currentMusicList.length
          break
        }
        case 'single': {
          break
        }
        case 'random': {
          currentIndex = Math.floor(Math.random() * (currentMusicList.length + 1))
        }
      }
      Music = currentMusicList[currentIndex]
      audioRef.current?.pause()
      // 改变当前音乐
      useSwitchCurrentMusic(Music)
      // 根据当前状态判断是否要播放
      isMusic ? audioRef.current?.play() : audioRef.current?.pause()
    }
  }

  const switchOrder = () => {
    const index = ORDER.findIndex((item) => item === currentOrder)
    setCurrentOrder(ORDER[(index + 1) % ORDER.length] as Order)
  }

  const onError = () => {
    if (!currentMusic.initFlag) {
      //防止因为单曲循环报错而不切换音乐
      switchMusic('next', currentOrder === 'single' ? 'cycle' : currentOrder)
      audioRef.current?.pause()
      //TODO:Error时发出提示，并且不在切换音乐
    }
  }

  const onEnd = () => {
    switchMusic('next', currentOrder)
  }

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
