'use client'

import { Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react'
import { ILyric } from '@/hooks/useLyric'
import { IMusicInfo } from '@/hooks/useMusic'
import { IAudio } from '@/hooks/useAudio'
import MusicLyric from '../musicLyric'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useMemo, memo } from 'react'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading'

// 动态导入MusicList组件
const DynamicMusicList = dynamic(() => import('../musicList'), {
  loading: () => <Loading />
})

// 使用memo优化组件重渲染
const MusicHeader = memo(function MusicHeader(props: {
  isExpanded: boolean
  lyricInfo: ILyric
  musicInfo: IMusicInfo
  audioInfo: IAudio
}) {
  const { lyricInfo, musicInfo, audioInfo, isExpanded } = props
  const isDesktop = useMediaQuery('(min-width: 768px)')

  // 使用useMemo优化tabs配置
  const tabs = useMemo(
    () => [
      {
        title: '每日推荐',
        content: <DynamicMusicList type="like" audioInfo={audioInfo} />
      },
      {
        title: '飙升榜',
        content: <DynamicMusicList id={19723756} type="surge" audioInfo={audioInfo} />
      },
      {
        title: '新歌榜',
        content: <DynamicMusicList id={3779629} type="new" audioInfo={audioInfo} />
      },
      {
        title: '原创榜',
        content: <DynamicMusicList id={2884035} type="original" audioInfo={audioInfo} />
      },
      {
        title: '热歌榜',
        content: <DynamicMusicList id={3778678} type="hot" audioInfo={audioInfo} />
      }
    ],
    [audioInfo]
  )

  return (
    <CardHeader
      className={`absolute transition-all duration-300 ease-in-out ${
        isExpanded ? 'flex opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-4'
      }`}
    >
      <Tabs
        items={tabs}
        color="primary"
        isVertical={isDesktop}
        size={isDesktop ? 'lg' : 'sm'}
        variant="solid"
      >
        {(item) => (
          <Tab key={item.title} title={item.title} className="transition-all duration-200">
            {item.content}
          </Tab>
        )}
      </Tabs>
      <Card
        className={`hidden md:flex w-[550px] h-[500px] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-xl transition-all duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <CardBody className="flex flex-col items-center overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <MusicLyric leading={10} musicInfo={musicInfo} lyricInfo={lyricInfo} />
        </CardBody>
      </Card>
    </CardHeader>
  )
})

export default MusicHeader
