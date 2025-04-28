'use client'

import { MusicListItem, MusicList } from '@/types/app/music'
import { useMusicStore } from '@/stores'
import img from '@/assets/image/playing.gif'
import Image from 'next/image'
import { formatTime } from '@/utils/dayFormat'
import { LIST_NULL_TEXT } from '@/constant'
import { IAudio } from '@/hooks/useAudio'
import { useEffect, useState } from 'react'
import { getPlayListTrack, getLike } from '@/api/music'
import useSwitchCurrentMusic from '@/hooks/useSwitchCurrentMusic'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@heroui/react'

interface Props {
  id?: number // 传入各个排行版的id
  type: string // 传入各个排行版的类型
  audioInfo: IAudio // 传入当前播放的音乐信息
}

let timer: any = null

const columns = [
  {
    key: 'index',
    label: ''
  },
  {
    key: 'name',
    label: '歌曲'
  },
  {
    key: 'arname',
    label: '歌手'
  },
  {
    key: 'dt',
    label: '时长'
  }
]

export default function MUsicList(props: Props) {
  const { id, type, audioInfo } = props

  const {
    currentMusic,
    surgeMusicList,
    hotMusicList,
    newMusicList,
    originalMusicList,
    dailyMusicList,
    changeSurgeMusicList,
    changeHotMusicList,
    changeNewMusicList,
    changeOriginalMusicList,
    changeDailyMusicList
  } = useMusicStore()

  const [list, setList] = useState<MusicListItem[]>([])
  const [loading, setLoading] = useState(true)

  // 请求热榜推荐歌曲的数据
  useEffect(() => {
    const fetchDisCover = async () => {
      if (id === undefined) return
      setLoading(true)
      const { songs } = (await getPlayListTrack(id)) as MusicList
      // 保存
      switch (type) {
        case 'surge':
          changeSurgeMusicList(songs || [])
          setList(surgeMusicList)
          break
        case 'hot':
          changeHotMusicList(songs || [])
          setList(hotMusicList)
          break
        case 'new':
          changeNewMusicList(songs || [])
          setList(newMusicList)
          break
        case 'original':
          changeOriginalMusicList(songs || [])
          setList(originalMusicList)
        default:
          break
      }
      setLoading(false)
    }
    const fetchHotRecommend = async () => {
      setLoading(true)
      const res = await getLike()
      const dailySongs = res?.data.dailySongs || []
      // 保存
      changeDailyMusicList(dailySongs)
      setList(dailyMusicList)
      setLoading(false)
    }
    if (id === undefined && type === 'like') fetchHotRecommend()
    else fetchDisCover()
  }, [])

  // 整理表单数据
  const row = list.map((item, index) => {
    return {
      ...item,
      key: item.id,
      index: index + 1,
      arname: item.ar && item.ar[0].name
    }
  })

  // 匹配表单的值
  const getKeyValue = (item: any, key: string | number) => {
    if (key === 'dt') {
      return formatTime(item[key])
    }
    if (key === 'index' && currentMusic.id === item.id) {
      return <Image src={img} alt="" />
    } else if (key === 'index' && currentMusic.id !== item.id) {
      return item[key]
    }
    return item[key]
  }

  // 单击row触发事件
  const single = (item: MusicListItem) => {
    clearTimeout(timer) // 清除第二次单击事件
    timer = setTimeout(() => {
      useSwitchCurrentMusic(item)
      audioInfo.setIsMusic(true)
    }, 200)
  }

  // 双击row触发事件
  const double = (item: MusicListItem) => {
    clearTimeout(timer) // 清除第一次单击事件
    useSwitchCurrentMusic(item)
    audioInfo.setIsMusic(true)
  }

  return (
    <>
      <Table
        isVirtualized
        maxTableHeight={510}
        rowHeight={30}
        isStriped
        fullWidth
        className="w-[510px]"
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody
          items={row}
          emptyContent={LIST_NULL_TEXT}
          isLoading={loading}
          loadingContent="加载中..."
        >
          {(item) => (
            <TableRow
              key={item.key}
              onClick={() => single(item)}
              onDoubleClick={() => double(item)}
              className="hover:cursor-pointer hover:bg-[#f5f5f5]"
            >
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
