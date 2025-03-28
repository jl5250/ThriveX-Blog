import { useEffect } from 'react'
import { getPlayListTrack } from '@/api/music'
import { MusicList } from '@/types/app/music'
import { useMusicStore } from '@/stores'
import { IAudio } from '@/hooks/useAudio'
import useSwitchCurrentMusic from '@/hooks/useSwitchCurrentMusic'
import { MusicListItem } from '@/types/app/music'
import CardList from '../cardList'

type typeProps = {
  id: number // 传入各个排行版的id
  type: string // 传入各个排行版的类型
  audioInfo: IAudio // 传入当前播放的音乐信息
}
export default function DisCover(props: typeProps) {
  const {
    surgeMusicList,
    hotMusicList,
    newMusicList,
    originalMusicList,
    changeSurgeMusicList,
    changeHotMusicList,
    changeNewMusicList,
    changeOriginalMusicList
  } = useMusicStore()
  const { setIsMusic } = props.audioInfo

  useEffect(() => {
    const fetchDisCover = async () => {
      const { songs } = (await getPlayListTrack(props.id)) as MusicList
      // 保存
      switch (props.type) {
        case 'surge':
          changeSurgeMusicList(songs || [])
          break
        case 'hot':
          changeHotMusicList(songs || [])
          break
        case 'new':
          changeNewMusicList(songs || [])
          break
        case 'original':
          changeOriginalMusicList(songs || [])
        default:
          break
      }
    }
    fetchDisCover()
  }, [])

  const pushIntoPlayingMusicList = async (item: MusicListItem) => {
    useSwitchCurrentMusic(item)
    setIsMusic(true)
    //TODO:push成功的dialog
    // alert('push成功')
  }

  const list = () => {
    switch (props.type) {
      case 'surge':
        return surgeMusicList
      case 'hot':
        return hotMusicList
      case 'new':
        return newMusicList
      case 'original':
        return originalMusicList
      default:
        return []
    }
  }

  return (
    <CardList
      rowClick={pushIntoPlayingMusicList}
      rowDoubleClick={pushIntoPlayingMusicList}
      list={list()}
    />
  )
}
