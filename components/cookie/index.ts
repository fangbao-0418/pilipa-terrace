export default {
  set (obj: {[key: string]: string}, options?: {path?: string, expires?: any, domain?: string, secure?: any}) {
    let str = ''
    if (typeof options.expires === 'number') {
      const time = new Date().getTime()
      options.expires = new Date(time + options.expires)
    }
    if (options.expires && options.expires instanceof Date === false) {
      throw new Error('options`s expires must be a Date or Number')
    }
    options.expires = options.expires.toGMTString() || ''
    options.path = options.path || '/'
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        str = `${key}=${obj[key]};
        expires=${options.expires};
        path=${options.path};
        ${(options.domain !== undefined ? `domain=${options.domain};` : '')}
        ${(options.secure !== undefined ? `secure=${options.secure};` : '')} `
        str = str.replace(/;\s*/g, '; ').trim().slice(0, -1)
        document.cookie = str
      }
    }
  },
  get (name: string) {
    if (name) {
      const arr: any = document.cookie.split('; ')
      for (const item of arr) {
        if (new RegExp(name + '=').test(item)) {
          return item.substring(name.length + 1)
        }
      }
      return undefined
    } else {
      throw new Error('name is not empty')
    }
  },
  remove (names: string[] | string | undefined) {
    const type = typeof names
    const date: any = new Date()
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
    const expires = date.toGMTString()
    let val
    switch (type) {
    case 'string':
      if (names === '') {
        throw new Error('name is not empty string')
      }
      val = this.get(names)
      document.cookie = `${names}=${val}; expires=${expires}`
      break
    case 'object':
      if (names instanceof Array) {
        for (const name of names) {
          val = this.get(name)
          document.cookie = `${name}=${val}; expires=${expires}`
        }
      } else {
        throw new Error('type is not allowed')
      }
      break
    case 'undefined':
      this.removeAll()
      break
    default:
      throw new Error('type is not allowed')
    }
  },
  removeAll () {
    const date: any = new Date()
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
    const expires = date.toGMTString()
    const cookies = document.cookie.split('; ')
    cookies.map((item) => {
      document.cookie = `${item}; expires=${expires}`
    })
  }
}
