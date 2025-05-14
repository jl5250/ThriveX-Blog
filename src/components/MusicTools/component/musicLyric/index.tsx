'use client'

import { ILyric } from '@/hooks/useLyric'
import { IMusicInfo } from '@/hooks/useMusic'
import { PAGE_SINGER_NULL_TEXT, PAGE_SONG_NULL_TEXT } from '@/constant'
import LyricBox from './lyricBox'
import { memo } from 'react'

const MusicLyric = memo(function MusicLyric(props: {
  leading?: number
  lyricInfo: ILyric
  musicInfo: IMusicInfo
}) {
  const { leading, lyricInfo, musicInfo } = props
  // 获取音乐信息相关
  const { singers, name: songName } = musicInfo
  // 获取歌词相关信息
  const { currentLyricIndex, lyricList, lyricBoxRef } = lyricInfo

  return (
    <>
      {/* 歌名 */}
      <div className="hidden md:block text-[15px] text-center leading-[20px] mb-[10px] flex items-center">
        {songName || PAGE_SONG_NULL_TEXT}
      </div>
      {/* 歌手 */}
      <p className="hidden md:block text-[12px] text-center leading-[20px] mb-[5px] w-[160px]">
        歌手：{singers || PAGE_SINGER_NULL_TEXT}
      </p>
      {/* 歌词 */}
      <LyricBox
        leading={leading}
        currentLyricIndex={currentLyricIndex}
        lyricList={lyricList}
        lyricBoxRef={lyricBoxRef}
      />
    </>
  )
})

export default MusicLyric
