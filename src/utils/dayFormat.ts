import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime)
dayjs.extend(localeData)
dayjs.extend(updateLocale)

// 更新 locale 配置以自定义显示
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  }
})

export function dayFormat(timestamp: number | string) {
    const now = dayjs();
    const target = dayjs(+timestamp);

  if (now.isSame(target, 'day')) {
    return '今天'
  } else if (now.subtract(1, 'day').isSame(target, 'day')) {
    return '昨天'
  } else if (now.subtract(2, 'day').isSame(target, 'day')) {
    return '前天'
  } else {
    return target.fromNow()
  }
}

/**
 * 给出毫秒数，返回时间格式: mm:ss
 * @param time
 * @returns
 */
export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60 / 1000)
  let res = ''
  if (minutes < 10) {
    res += '0'
    res += minutes
  } else {
    res += minutes
  }
  res += ':'
  const seconds = Math.floor((time / 1000) % 60)
  if (seconds < 10) {
    res += '0'
    res += seconds
  } else {
    res += seconds
  }
  return res
}

/**
 * 给出日期，返回时间格式: yyyy-mm-dd
 * @param date
 * @returns
 */
export const formatDate = () => {
  var date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // getMonth() 返回 0-11
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatDay = () => {
  var d = new Date()
  var weekday = new Array(7)
  weekday[0] = '一'
  weekday[1] = '二'
  weekday[2] = '三'
  weekday[3] = '四'
  weekday[4] = '五'
  weekday[5] = '六'
  weekday[6] = '日'

  return weekday[d.getDay()]
}
