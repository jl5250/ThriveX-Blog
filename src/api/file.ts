import Request from '@/utils/request'
import { File, FileDir } from '@/types/app/file'

// 获取目录列表
export const getLocalDirListAPI = async (dir?: string, platform?: string) => {
  return await Request<FileDir[]>('GET', `/file/dir/local?dir=${dir}&platform=${platform}`)
}

// 获取文件列表
export const getFileListAPI = async (dir?: string, platform?: string) => {
  return await Request<File[]>('GET', `/file/list?dir=${dir}&platform=${platform}`)
}
