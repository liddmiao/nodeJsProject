class Stack{
  constructor () {
    this.stackItems = []
  }
  push (item) {
    this.stackItems.push(item)
  }
  pop () {
    return this.stackItems.pop()
  }
  size () {
    return this.stackItems.length
  }
  isEmpty () {
    return this.stackItems.length === 0
  }
  top () {
    return this.stackItems[this.stackItems.length - 1]
  }
  bottom () {
    return this.stackItems[0]
  }
  clear () {
    this.stackItems = []
  }
}

module.exports = Stack