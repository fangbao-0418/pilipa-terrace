// 创建键盘事件
export function createKeyboardEvent (type, keyCode) {
  const evtObj = document.createEvent('UIEvents')
  evtObj.initUIEvent(type, true, true, window, 1)
  evtObj.keyCode = keyCode
  return evtObj
}
