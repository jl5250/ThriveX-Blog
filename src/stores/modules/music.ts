import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { MusicListItem } from '@/types/app/music'

interface initialMusic {
  // 每日推荐音乐列表
  dailyMusicList: MusicListItem[]
  // 飙升榜音乐列表
  surgeMusicList: MusicListItem[]
  // 新歌榜音乐列表
  newMusicList: MusicListItem[]
  // 原创榜音乐列表
  originalMusicList: MusicListItem[]
  // 热歌榜音乐列表
  hotMusicList: MusicListItem[]
  // 当前音乐信息
  currentMusic: MusicListItem
  // 当前音乐的歌词
  currentLyric: string
  // 当前音乐的时长
  duration: number
  // 当前音乐的播放时间
  currentTime: number
  // 当前音乐的歌词下标
  currentLyricIndex: number
}

// 初始化状态（initFlag为了判断是否是第一次）
export const initialCurrentMusic = { initFlag: true }
const initialState: initialMusic = {
  dailyMusicList: [],
  surgeMusicList: [],
  newMusicList: [],
  originalMusicList: [],
  hotMusicList: [],
  currentMusic: initialCurrentMusic,
  currentLyric: '',
  duration: 0,
  currentTime: 0,
  currentLyricIndex: 0
}

interface musicState {
  dailyMusicList: MusicListItem[]
  changeDailyMusicList: (status: MusicListItem[]) => void

  surgeMusicList: MusicListItem[]
  changeSurgeMusicList: (status: MusicListItem[]) => void

  newMusicList: MusicListItem[]
  changeNewMusicList: (status: MusicListItem[]) => void

  originalMusicList: MusicListItem[]
  changeOriginalMusicList: (status: MusicListItem[]) => void

  hotMusicList: MusicListItem[]
  changeHotMusicList: (status: MusicListItem[]) => void

  currentMusic: MusicListItem
  changeCurrentMusic: (status: MusicListItem) => void

  currentLyric: string
  changeCurrentLyric: (status: string) => void

  duration: number
  changeDuration: (status: number) => void

  currentTime: number
  changeCurrentTime: (status: number) => void

  currentLyricIndex: number
  changeCurrentLyricIndex: (status: number) => void
}
export default create(
  persist<musicState>(
    (set) => ({
      ...initialState,

      changeDailyMusicList: (status) => set({ dailyMusicList: status }),

      changeSurgeMusicList: (status) => set({ surgeMusicList: status }),

      changeNewMusicList: (status) => set({ newMusicList: status }),

      changeOriginalMusicList: (status) => set({ originalMusicList: status }),

      changeHotMusicList: (status) => set({ hotMusicList: status }),

      changeCurrentMusic: (status) => set({ currentMusic: status }),

      changeCurrentLyric: (status) => set({ currentLyric: status }),

      changeDuration: (status) => set({ duration: status }),

      changeCurrentTime: (status) => set({ currentTime: status }),

      changeCurrentLyricIndex: (status) => set({ currentLyricIndex: status })
    }),
    {
      name: 'music_storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
