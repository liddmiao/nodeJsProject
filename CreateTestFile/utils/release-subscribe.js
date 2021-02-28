class EventEmitter {
  constructor () {
    this.handler = {}
  }
  on (eventName, callback) {
    if (!this.handler[eventName]) {
      this.handler[eventName] = []
    }
    this.handler[eventName].push(callback)
  }
  emit (eventName, ...args) {
    if (this.handler[eventName]) {
      for (let i = 0; i < this.handler[eventName].length; i++) {
        this.handler[eventName][i](...args)   
      }
    }
  }
}
exports.EventEmitter = EventEmitter