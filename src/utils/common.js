// 日期格式化
export function formateTime(time){
  if (!time) return ''

  const year = new Date(time).getFullYear()
  const mouth = new Date(time).getMonth() + 1 >= 10 ? new Date(time).getMonth() + 1 : '0' + (new Date(time).getMonth() + 1)
  const date = new Date(time).getDate() >= 10 ? new Date(time).getDate() : '0' + new Date(time).getDate()
  const hours = new Date(time).getHours() >= 10 ? new Date(time).getHours() : '0' + new Date(time).getHours()
  const minutes = new Date(time).getMinutes() >= 10 ? new Date(time).getMinutes() : '0' + new Date(time).getMinutes()
  const seconds = new Date(time).getSeconds() >= 10 ? new Date(time).getSeconds() : '0' + new Date(time).getSeconds()
  
  return year + '-' + mouth + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
}
