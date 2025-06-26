export * from './dayFormat'
export * from './await-io'
export * from './htmlParser'
export * from './musicUtils'

// 获取随机数
export const getRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
