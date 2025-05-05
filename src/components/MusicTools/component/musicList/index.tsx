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
    changeCurrentMusicType,
    changeSurgeMusicList,
    changeHotMusicList,
    changeNewMusicList,
    changeOriginalMusicList,
    changeDailyMusicList
  } = useMusicStore()

  const [list, setList] = useState<MusicListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [disabledKeys, setDisabledKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState(new Set(['']))

  useEffect(() => {
    const SelectKeys = () => {
      currentMusic.id && setSelectedKeys(new Set([currentMusic.id + ''])) // 设置当前播放的音乐为选中状态
    }
    SelectKeys()
  }, [currentMusic])

  useEffect(() => {
    const saveMusicType = () => {
      changeCurrentMusicType(type) // 设置当前音乐类型
    }
    saveMusicType()
  }, [type])

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
          newList(surgeMusicList)
          break
        case 'hot':
          changeHotMusicList(songs || [])
          newList(hotMusicList)
          break
        case 'new':
          changeNewMusicList(songs || [])
          newList(newMusicList)
          break
        case 'original':
          changeOriginalMusicList(songs || [])
          newList(originalMusicList)
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
      newList(dailyMusicList)
      setLoading(false)
    }
    if (id === undefined && type === 'like') fetchHotRecommend()
    else fetchDisCover()
  }, [])

  // 整理表单数据
  const newList = (listMap: MusicListItem[]) => {
    const row = listMap.map((item, index) => {
      return {
        ...item,
        key: item.id + '',
        index: index,
        arname: item.ar && item.ar[0].name
      }
    })
    setList(row)

    const findDisKey = row
      .filter((item) => item.fee === 1 || item.fee === 4)
      .map((item) => item.key) // 找到不能播放的key
    setDisabledKeys(findDisKey) // 设置不能播放的key
  }

  // 匹配表单的值
  const getKeyValue = (item: any, key: string | number) => {
    if (key === 'dt') {
      return formatTime(item[key])
    }
    if (key === 'index' && currentMusic.id === item.id) {
      return <Image src={img} alt="" />
    } else if (key === 'index' && currentMusic.id !== item.id) {
      return item[key] + 1
    }
    return item[key]
  }

  // 单击row触发事件
  const single = (item: MusicListItem) => {
    if (currentMusic.id === item.id) return // 如果当前点击的歌曲是正在播放的歌曲，则不执行任何操作
    if (item.fee === 1 || item.fee === 4) return // 如果当前点击的歌曲是VIP歌曲，则不执行任何操作
    clearTimeout(timer) // 清除第二次单击事件
    timer = setTimeout(() => {
      useSwitchCurrentMusic(item)
      audioInfo.setIsMusic(true)
    }, 200)
  }

  return (
    <>
      <Table
        isVirtualized
        maxTableHeight={510}
        rowHeight={30}
        disabledKeys={disabledKeys}
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selectedKeys}
        isStriped
        fullWidth
        className="w-[360px] h-[360px] md:h-[500px] md:w-[510px]"
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody emptyContent={LIST_NULL_TEXT} isLoading={loading} loadingContent="加载中...">
          {list.map((item) => (
            <TableRow key={item.key} onClick={() => single(item)} className="hover:cursor-pointer">
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
