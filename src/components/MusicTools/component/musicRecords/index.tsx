'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction, memo, useCallback } from 'react'
import { imgUrl } from '@/utils'
import { IMusicInfo } from '@/hooks/useMusic'
import img from '@/assets/image/bg-page.jpg'

interface MusicRecordsProps {
  active: boolean
  isMusic: boolean
  setPanActive: Dispatch<SetStateAction<boolean>>
  musicInfo: IMusicInfo
}

const MusicRecords = memo(function MusicRecords(props: MusicRecordsProps) {
  const { active, isMusic, setPanActive, musicInfo } = props
  const { al } = musicInfo

  const handleClick = useCallback(() => {
    setPanActive((prev) => !prev)
  }, [setPanActive])

  const imageUrl = imgUrl(140, 140, al?.picUrl) ?? img

  return (
    <div
      className={`
        fixed left-[3px] bottom-[50px] 
        w-[80px] h-[80px] 
        cursor-pointer z-[999] 
        rounded-full 
        translate-x-[-50%] 
        transition-all duration-300 ease-in-out
        transform
        ${
          active
            ? 'translate-x-[10px] translate-y-[-20px] md:translate-x-[20px] md:translate-y-[-80px] shadow-lg hover:shadow-white/30'
            : 'hover:translate-x-0'
        }
        hover:scale-105
        active:scale-95
      `}
    >
      <div
        className={`
          bg-hero-pattern bg-cover 
          h-full w-full 
          rounded-full 
          p-[13px] 
          animate-cycle
          ${isMusic ? 'animate-running' : 'animate-paused'}
          hover:brightness-110
          transition-all duration-300
        `}
        id="musicTools"
        onClick={handleClick}
        role="button"
        aria-label={active ? '关闭音乐面板' : '打开音乐面板'}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick()
          }
        }}
      >
        <Image
          width={54}
          height={54}
          src={imageUrl}
          alt={al?.name || '音乐封面'}
          className="rounded-full object-cover h-full w-full"
          priority
          loading="eager"
        />
      </div>
    </div>
  )
})

export default MusicRecords
