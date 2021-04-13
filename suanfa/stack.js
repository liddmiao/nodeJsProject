module.exports = () => {
  let stackItems = []
  this.push = function (item) {
    stackItems.push(item)
  }
  this.pop = function () {
    stackItems.pop()
  }
  this.size = function () {
    return stackItems.length
  }
  this.isEmpty = function () {
    return stackItems.length === 0
  }
  this.top = function () {
    return stackItems[stackItems.length - 1]
  }
  this.bottom = function () {
    return stackItems[0]
  }
  this.clear = function () {
    stackItems = []
  }
}