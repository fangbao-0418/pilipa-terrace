export default function () {
  return (target: any) => {
    let events: any[] = []
    function trigger (...args: any[]) {
      events.map((item) => {
        if (item.name === args[0]) {
          item.fn.apply(null, args.slice(1))
        }
      })
      return target.prototype
    }
    function on (name: string, fn: any) {
      events.push({
        name,
        fn
      })
      return target.prototype
    }
    function off (name?: string) {
      events.map((item, index) => {
        if (item.name === name) {
          events.splice(index, 1)
        }
      })
      if (!name) {
        events = []
      }
      return target.prototype
    }
    target.prototype.trigger = trigger
    target.prototype.on = on
    target.prototype.off = off
  }
}
