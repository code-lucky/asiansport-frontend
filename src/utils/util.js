//获取月份天数和月份第一天周几
export function getDateNum(date, str) {
  let arr = date.split(str)
  let y = arr[0]
  let m = arr[1]
  return [new Date(y, m, 0).getDate(), new Date(y, m - 1, 1).getDay()]
}

//格式化年月日
export function formatDate(time, formatString) {
  const date = new Date(time)
  // 定义正则和值之间的关系
  const obj = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  // 替换
  for (const key in obj) {
    if (new RegExp(`(${key})`).test(formatString)) {
      const value = (obj[key] + '').padStart(2, '0')
      formatString = formatString.replace(RegExp.$1, value)
    }
  }
  return formatString
}
function padLeftZero(time) {
  time = time + ''
  return ('00' + time).slice(time.length)
}

// 时间戳(毫秒)转化分钟
export function formatDuration(duration) {
  duration = duration / 1000
  // 488s / 60 = 8.12
  var minute = Math.floor(duration / 60)
  // 488s % 60
  var second = Math.floor(duration) % 60

  return padLeftZero(minute) + ':' + padLeftZero(second)
}

// 时间处理(如：10000 --> 1.0万)
export function formatCount(count) {
  var counter = parseInt(count)
  if (counter > 100000000) {
    return (counter / 100000000).toFixed(1) + '亿'
  } else if (counter > 10000) {
    return (counter / 10000).toFixed(1) + '万'
  } else {
    return counter + ''
  }
}

// 节流
export function throttle(
  fn,
  interval = 1000,
  options = {
    leading: true,
    trailing: false
  }
) {
  // 1.记录上一次的开始时间
  const { leading, trailing, resultCallback } = options
  let lastTime = 0
  let timer = null
  // 2.事件触发时, 真正执行的函数
  const _throttle = function (...args) {
    return new Promise((resolve) => {
      // 2.1.获取当前事件触发时的时间
      const nowTime = new Date().getTime()
      if (!lastTime && !leading) lastTime = nowTime
      // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
      const remainTime = interval - (nowTime - lastTime)
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        // 2.3.真正触发函数
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        // 2.4.保留上次触发的时间
        lastTime = nowTime
        return
      }
      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null
          lastTime = !leading ? 0 : new Date().getTime()
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
        }, remainTime)
      }
    })
  }
  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }
  return _throttle
}

// 防抖
export function debounce(fn, delay = 500, immediate = false, resultCallback) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null
  let isInvoke = false
  // 2.真正执行的函数
  const _debounce = function (...args) {
    return new Promise((resolve) => {
      // 取消上一次的定时器
      if (timer) clearTimeout(timer)

      // 判断是否需要立即执行
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        isInvoke = true
      } else {
        // 延迟执行
        timer = setTimeout(() => {
          // 外部传入的真正要执行的函数
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  }
  // 封装取消功能
  _debounce.cancel = function () {
    console.log(timer)
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }
  return _debounce
}

// 处理时间函数入口，传入正常时间格式，最终输入对应时间格式(仿微信时间格式)
export function handlerMsgTime(timeValue) {
  timeValue = new Date(timeValue).getTime()
  var timeNew = new Date().getTime() // 当前时间
  // console.log('传入的时间', timeValue, timeNew)
  var timeDiffer = timeNew - timeValue // 与当前时间误差
  // console.log('时间差', timeDiffer)
  var returnTime = ''
  // if (timeDiffer <= 60000) {
  //   // 一分钟内
  //   returnTime = "刚刚";
  // } else if (timeDiffer > 60000 && timeDiffer < 3600000) {
  //   // 1小时内
  //   returnTime = Math.floor(timeDiffer / 60000) + "分钟前";
  // } else if (
  // timeDiffer >= 3600000 &&
  if (timeDiffer < 86400000 && isYestday(timeValue) === false) {
    // 今日
    returnTime = formatTime(timeValue).substr(11, 5)
  } else if (timeDiffer > 3600000 && isYestday(timeValue) === true) {
    // 昨天
    returnTime = '昨天 ' + formatTime(timeValue).substr(11, 5)
  } else if (timeDiffer > 86400000 && timeDiffer <= 518400000) {
    // 星期几
    returnTime = getWeeken(timeValue) + ' ' + formatTime(timeValue).substr(11, 5)
  } else if (timeDiffer > 86400000 && isYestday(timeValue) === false && isYear(timeValue) === true) {
    // 今年
    returnTime = formatTime(timeValue).substr(5, 11)
  } else if (timeDiffer > 86400000 && isYestday(timeValue) === false && isYear(timeValue) === false) {
    // 不属于今年
    returnTime = formatTime(timeValue).substr(0, 16)
  }
  return returnTime
}
//其它辅助函数
function isYear(timeValue) {
  // 是否为今年
  const dateyear = new Date(timeValue).getFullYear()
  const toyear = new Date().getFullYear()
  // console.log(dateyear, toyear)
  if (dateyear === toyear) {
    return true
  } else {
    return false
  }
}
function getWeeken(date) {
  var weekArray = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六')
  var week = weekArray[new Date(date).getDay()]
  return week
}
function formatTime(date) {
  var t = getTimeArray(date)
  return [t[0], t[1], t[2]].map(formatNumber).join('-') + ' ' + [t[3], t[4], t[5]].map(formatNumber).join(':')
}
function getTimeArray(date) {
  date = new Date(date)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day, hour, minute, second].map(formatNumber)
}
// 转化日期 如2018-7-6 -->(2018-07-06)
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function isYestday(timeValue) {
  // 是否为昨天
  const date = new Date(timeValue)
  const today = new Date()
  if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
    if (today.getDate() - date.getDate() === 1) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
