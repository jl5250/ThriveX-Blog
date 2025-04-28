'use client'

import CardList from '../musicList'
import { useEffect } from 'react'
import { MusicListItem } from '@/types/app/music'
import { useMusicStore } from '@/stores'
import { getLike } from '@/api/music'
import useSwitchCurrentMusic from '@/hooks/useSwitchCurrentMusic'
import { IAudio } from '@/hooks/useAudio'

export default function cardRecommend(props: { audioInfo: IAudio }) {
  const { dailyMusicList, changeDailyMusicList } = useMusicStore()
  const { audioInfo } = props
  const { setIsMusic } = audioInfo

  // 获取每日推荐歌曲
  useEffect(() => {
    const fetchHotRecommend = async () => {
      const res = await getLike()
      const dailySongs = res?.data.dailySongs || []
      // 保存
      changeDailyMusicList(dailySongs)
    }
    fetchHotRecommend()
  }, [])

  const pushIntoPlayingMusicList = async (item: MusicListItem) => {
    useSwitchCurrentMusic(item)
    setIsMusic(true)
    //TODO:push成功的dialog
    // alert('push成功')
  }
  return <div>123</div>
}
