/*
 * @Author: Hhvcg
 * @Date: 2022-12-19 14:45:03
 * @LastEditors: -_-
 * @Description: eventBus
 */

class Bus {
  constructor() {
    this.resp = []
  }
  $on(name, fn) {
    this.resp[name] = this.resp[name] || []
    this.resp[name].push(fn)
  }
  $emit(name, data) {
    this.resp[name].forEach(watcher => {
      watcher(data)
    })
  }
  $off(name) {
    if (this.resp[name]) {
      delete this.resp[name]
    }
  }
}

const bus = new Bus()
export default bus
