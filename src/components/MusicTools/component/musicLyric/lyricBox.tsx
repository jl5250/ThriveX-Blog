'use client'

import { LYRICLIST_NULL_TEXT } from '@/constant'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { memo, useMemo } from 'react'

interface LyricBoxProps {
  currentLyricIndex: number
  lyricList: Array<{
    time: number
    content: string
  }>
  lyricBoxRef: React.RefObject<HTMLDivElement | null>
  leading?: number
}

const LyricBox = memo(function LyricBox(props: LyricBoxProps) {
  const { currentLyricIndex, lyricList, lyricBoxRef, leading } = props

  // 使用useMemo优化样式计算
  const getLyricStyle = useMemo(() => {
    return (index: number) => {
      const baseClasses = 'text-center text-balance leading-[16px] transition-all duration-300'
      const activeClasses =
        currentLyricIndex === index
          ? 'font-semibold text-primary scale-110 rounded-lg'
          : 'text-foreground/70'
      return `${baseClasses} ${activeClasses}`
    }
  }, [currentLyricIndex])

  const style = { padding: `${leading ?? 5}px 0` }

  return (
    <ScrollShadow hideScrollBar size={70} className="w-full h-full">
      <div
        ref={lyricBoxRef}
        className="transition-all duration-300 ease-in-out flex flex-col justify-center min-h-full"
      >
        {lyricList.length > 0 ? (
          lyricList.map((item, index) => (
            <p key={`${item.time}-${index}`} className={getLyricStyle(index)} style={style}>
              {item.content}
            </p>
          ))
        ) : (
          <div className="text-[15px] text-center text-foreground/50 animate-pulse">
            {LYRICLIST_NULL_TEXT}
          </div>
        )}
      </div>
    </ScrollShadow>
  )
})

export default LyricBox
