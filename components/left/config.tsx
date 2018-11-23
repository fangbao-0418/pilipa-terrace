import Config from '../config'
export const getHomePage = () => {
  let url = '/'
  let mark = ''
  Config.menu.find((item) => {
    if (item.hidden !== true) {
      if (item.path) {
        url = item.path
        mark = item.mark
        return true
      } else {
        if (item.children) {
          return item.children.findIndex((item2) => {
            if (item2.hidden !== true) {
              url = item2.path
              mark = item.mark
              return true
            }
          }) > -1
        }
      }
    }
  })
  return {
    path: url,
    mark
  }
}
