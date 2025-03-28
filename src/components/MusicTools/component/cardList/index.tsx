'use client'

import { MusicListItem } from '@/types/app/music'
import { useMusicStore } from '@/stores'
import img from '@/assets/image/playing.gif'
import Image from 'next/image'
import { formatTime } from '@/utils/dayFormat'
import { LIST_NULL_TEXT } from '@/constant'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@heroui/react'

interface Props {
  rowClick?: (item: MusicListItem) => void
  rowDoubleClick?: (item: MusicListItem) => void
  list: MusicListItem[]
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

export default function CardList(props: Props) {
  const { list } = props
  // 请求热榜推荐歌曲的数据
  const { rowClick, rowDoubleClick } = props
  const { currentMusic } = useMusicStore()

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
      rowClick && rowClick(item)
    }, 200)
  }

  // 双击row触发事件
  const double = (item: MusicListItem) => {
    clearTimeout(timer) // 清除第一次单击事件
    rowDoubleClick && rowDoubleClick(item)
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
        <TableBody items={row} emptyContent={LIST_NULL_TEXT}>
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
