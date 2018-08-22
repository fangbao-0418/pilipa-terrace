export default (fn, delay = 0) => {
  console.log('start')
  var endTime = new Date().getTime()
  return () => {
    var startTime = new Date().getTime()
    if (startTime >= endTime) {
      fn()
      endTime = startTime + delay
    }
  }
}
