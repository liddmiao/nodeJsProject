const Queue = require('./queue.js')
const maze_array = [
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0]
]

// Position类,将（x, y）转化为{x:x, y:y}
class Position{
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

// 节点类, 添加step属性
class Node {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.step = 0
  }
}

// 寻找当前节点位置的上下左右节点
function getPosition (pos) {

}

function find_path(maz, start, end) {
  // 初始化地图信息
  const 
}


var start_pos = new Position(2, 1)
var end_pos = new Position(3, 5)

find_path(maze_array, start_pos, end_pos)