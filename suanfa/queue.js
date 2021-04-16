class Queue {
  constructor () {
    this.queueItems = []
  }
  initData(arr) {
    this.queueItems = arr
  }
  enqueue(data) {
    this.queueItems.push(data)
  }
  dequeue() {
    return this.queueItems.shift()
  }
  size() {
    return this.queueItems.length
  }
  head() {
    return this.queueItems[0]
  }
  isEmpty() {
    return this.queueItems.length === 0
  }
}

// 约瑟夫环
function del_ring (arr) {
  let queue = new Queue()
  queue.initData(arr)
  var index = 0;
  while (queue.size() > 1) {
    index++
    let cur = queue.dequeue()
    if (index % 3 !== 0) {
      queue.enqueue(cur)
    }
  }
  console.log(queue.head())
}

// var arr = [0,1,2,3,4,5,6,7,8,9,]
// del_ring(arr)

// 杨辉三角
function yanghui (n) {
  let queue = new Queue()
  queue.enqueue(1)
  for (let i = 1; i <= n; i++) {
    let line = ''
    let que = 0
    for (let j = 0; j < i; j ++) {
      let cur = queue.dequeue()
      let val = cur + que
      line += cur + "  "
      que = cur
      queue.enqueue(val)
    }
    queue.enqueue(1)
    console.log(line)
  }
}
// yanghui(5)

module.exports = Queue