'use client'

import { Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react'
import CardRecommend from '../cardRecommend'
import DisCover from '../disCover'
import { ILyric } from '@/hooks/useLyric'
import { IMusicInfo } from '@/hooks/useMusic'
import { IAudio } from '@/hooks/useAudio'
import MusicLyric from '../musicLyric'

export default function MusicHeader(props: {
  isExpanded: boolean
  lyricInfo: ILyric
  musicInfo: IMusicInfo
  audioInfo: IAudio
}) {
  const { lyricInfo, musicInfo, audioInfo, isExpanded } = props

  let tabs = [
    {
      title: '每日推荐',
      content: <CardRecommend audioInfo={audioInfo} />
    },
    {
      title: '飙升榜',
      content: <DisCover id={19723756} type="surge" audioInfo={audioInfo} />
    },
    {
      title: '新歌榜',
      content: <DisCover id={3779629} type="new" audioInfo={audioInfo} />
    },
    {
      title: '原创榜',
      content: <DisCover id={2884035} type="original" audioInfo={audioInfo} />
    },
    {
      title: '热歌榜',
      content: <DisCover id={3778678} type="hot" audioInfo={audioInfo} />
    }
  ]

  return (
    <CardHeader className={`absolute ${isExpanded ? 'hidden md:flex' : 'hidden'} flex-row`}>
      <Tabs aria-label="Dynamic tabs" items={tabs} color="primary" isVertical variant="solid">
        {(item) => (
          <Tab key={item.title} title={item.title}>
            {item.content}
          </Tab>
        )}
      </Tabs>
      <Card className="w-[450px] h-[500px] bg-white/60 dark:bg-black/60">
        <CardBody className="flex flex-col items-center">
          {/* 歌词 */}
          <MusicLyric leading={10} musicInfo={musicInfo} lyricInfo={lyricInfo} />
        </CardBody>
      </Card>
    </CardHeader>
  )
}
