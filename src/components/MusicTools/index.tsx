'use client'

import {
  FaVolumeHigh,
  FaVolumeLow,
  FaVolumeOff,
  FaVolumeXmark,
  FaForwardStep,
  FaBackwardStep,
  FaPause,
  FaPlay,
  FaBarsStaggered,
  FaRepeat,
  FaShuffle
} from 'react-icons/fa6'
import { Card, CardFooter, Button, Slider, Image } from '@heroui/react'
import useMusicInfo from '@/hooks/useMusic'
import useLyric from '@/hooks/useLyric'
import useAudio from '@/hooks/useAudio'
import CardHeader from './component/cardHeader'
import MusicLyric from './component/musicLyric'
import { formatTime } from '@/utils/dayFormat'
import { useState, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { imgUrl } from '@/utils'
import Loading from '../Loading'

// 动态导入组件以优化加载性能
const DynamicMusicRecords = dynamic(() => import('./component/musicRecords'), {
  loading: () => <Loading />
})

export default function MusicTools() {
  // 是否展开card
  const [isExpanded, setIsExpanded] = useState(false)
  // 是否点击了pan显示card
  const [active, setPanActive] = useState(false)
  // 拖动时的临时时间
  const [tempTime, setTempTime] = useState<number | null>(null)
  // 获取音乐信息的Hook
  const musicInfo = useMusicInfo()
  // 获取歌词信息的Hook
  const lyricInfo = useLyric()
  // 获取歌词信息的Hook
  const lyricInfo2 = useLyric()
  // 获取音频信息的Hook
  const audioInfo = useAudio()
  const {
    isMusic,
    audioRef,
    currentOrder,
    volume,
    currentTime,
    duration,
    changeJingyin,
    canplay,
    onEnd,
    onError,
    switchMusicStaus,
    switchMusic,
    setVolume
  } = audioInfo

  // 获取歌曲信息
  const { al, url } = musicInfo

  const iconSize = 20
  // 使用useMemo优化音量图标计算
  const VolumeIcon = useMemo(() => {
    if (volume === 0) return <FaVolumeXmark size={iconSize} />
    if (volume > 0 && volume <= 0.33) return <FaVolumeOff size={iconSize} />
    if (volume > 0.33 && volume <= 0.66) return <FaVolumeLow size={iconSize} />
    if (volume > 0.66 && volume <= 1) return <FaVolumeHigh size={iconSize} />
    return null
  }, [volume])

  // 使用useMemo优化播放模式图标计算
  const OrderIcon = useMemo(() => {
    switch (currentOrder) {
      case 'cycle':
        return <FaRepeat size={iconSize} />
      case 'single':
        return <FaRepeat size={iconSize} className="text-primary" />
      case 'random':
        return <FaShuffle size={iconSize} />
      default:
        return <FaRepeat size={iconSize} />
    }
  }, [currentOrder])

  // 处理拖动时的进度更新
  const handleTimeChange = useCallback((value: number | number[]) => {
    if (typeof value === 'number') {
      setTempTime(value)
    }
  }, [])

  // 使用useCallback优化事件处理函数，拖动更新播放时间
  const updateTime = useCallback(
    (value: number | number[]) => {
      if (typeof value === 'number' && audioRef.current) {
        audioRef.current.currentTime = value / 1000
        setTempTime(null)
      }
    },
    [audioRef]
  )

  // 使用useCallback优化事件处理函数，点击展开卡片
  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  return (
    <>
      <audio
        ref={audioRef}
        src={url}
        aria-label='music-player'
        onTimeUpdate={(e) => lyricInfo.updateTime(e)}
        onCanPlay={(e) => canplay(e)}
        onEnded={() => onEnd()}
        onError={() => onError()}
        className="hidden"
      />

      <DynamicMusicRecords
        active={active}
        setPanActive={setPanActive}
        isMusic={isMusic}
        musicInfo={musicInfo}
      />

      <Card
        shadow="lg"
        isFooterBlurred
        className={`fixed bottom-[5%] left-[1%] md:top-[68%] md:left-[1%] border-none z-[998] bg-white/40 w-full transition-all duration-500 ease-in-out ${
          active
            ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
            : 'translate-x-[-500px] translate-y-[500px] scale-0 opacity-0'
        } ${
          isExpanded
            ? 'h-[85vh] md:w-[70vw] md:h-[80vh] md:top-[8%]'
            : 'h-[295px] md:w-[700px] md:h-[200px]'
        }`}
      >
        {/* 音乐歌单组件 */}
        <CardHeader
          musicInfo={musicInfo}
          lyricInfo={lyricInfo2}
          audioInfo={audioInfo}
          isExpanded={isExpanded}
        />
        <Image
          removeWrapper
          src={imgUrl(1236, 794, al?.picUrl)}
          alt="音乐封面"
          className="z-0 w-full h-full object-cover"
        />
        {/* 音乐信息组件 */}
        <CardFooter
          className={`absolute z-10 bottom-0 grid gap-1 grid-flow-row-dense grid-rows-4 grid-cols-12 items-center justify-center w-full h-[200px] transition-all duration-500 ease-in-out transform ${
            isExpanded ? 'md:gap-x-10' : 'md:gap-x-2'
          }`}
        >
          {/* 歌词 */}
          <div
            className={`flex flex-col items-center row-span-2 md:row-span-2 row-start-1 md:row-start-2 col-span-12 col-start-1 h-full md:h-[180px] ${
              isExpanded ? 'md:col-start-2 md:col-span-4' : 'md:col-start-2 md:col-span-5'
            }`}
          >
            <MusicLyric leading={10} musicInfo={musicInfo} lyricInfo={lyricInfo} />
          </div>
          <div
            className={`flex flex-col row-start-3 col-span-8 col-start-5 justify-center ${
              isExpanded ? 'md:col-start-6 md:col-span-8' : 'md:col-start-7 md:col-span-6'
            }`}
          >
            {/* 播放按钮 */}
            <div className="flex items-end justify-center h-full space-x-2">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 transition-colors duration-200"
                radius="full"
                variant="light"
                onPress={() => switchMusic('pre', currentOrder)}
              >
                <FaBackwardStep size={iconSize} />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 transition-colors duration-200"
                radius="full"
                variant="light"
                onPress={() => switchMusicStaus()}
              >
                {isMusic ? <FaPause size={iconSize} /> : <FaPlay size={iconSize} />}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 transition-colors duration-200"
                radius="full"
                variant="light"
                onPress={() => switchMusic('next', currentOrder)}
              >
                <FaForwardStep size={iconSize} />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 transition-colors duration-200"
                radius="full"
                variant="light"
                onPress={() => audioInfo.switchOrder()}
                title={`当前模式：${
                  currentOrder === 'cycle'
                    ? '列表循环'
                    : currentOrder === 'single'
                    ? '单曲循环'
                    : '随机播放'
                }`}
              >
                {OrderIcon}
              </Button>
              <div className="flex flex-col group">
                <Slider
                  className="opacity-0 group-hover:opacity-100 h-14 transition-opacity duration-200"
                  defaultValue={volume}
                  value={volume}
                  maxValue={1}
                  minValue={0}
                  orientation="vertical"
                  size="sm"
                  step={0.02}
                  color="foreground"
                  onChange={(value) => setVolume(value as number)}
                />
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10 transition-colors duration-200"
                  radius="full"
                  variant="light"
                  onPress={() => changeJingyin()}
                >
                  {VolumeIcon}
                </Button>
              </div>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 transition-colors duration-200"
                radius="full"
                variant="light"
                onPress={toggleExpand}
              >
                <FaBarsStaggered size={iconSize} />
              </Button>
            </div>
            {/* 播放进度 */}
            <div className="flex flex-col mt-3 gap-1">
              <Slider
                aria-label="Music progress"
                classNames={{
                  track: 'bg-default-500/30',
                  thumb: 'w-2 h-2 after:w-2 after:h-2 after:bg-foreground'
                }}
                color="foreground"
                value={tempTime ?? currentTime}
                defaultValue={0}
                maxValue={duration}
                size="sm"
                onChange={handleTimeChange}
                onChangeEnd={updateTime}
                showTooltip
                tooltipProps={{
                  placement: 'top',
                  showArrow: true,
                  content: formatTime(tempTime ?? currentTime),
                  classNames: {
                    base: 'bg-black/80 text-white px-2 py-1 rounded-md text-xs',
                    arrow: 'bg-black/80'
                  }
                }}
              />
              <div className="flex justify-between text-sm">
                <p className="text-foreground/80">{formatTime(currentTime)}</p>
                <p className="text-foreground/50">{formatTime(duration)}</p>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
