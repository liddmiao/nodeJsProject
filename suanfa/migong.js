/**
 * 1、初始化地图的每一个点，变为{x: x, y: y, step: step}
 * 2、创建队列 queue
 * 3、获取开始节点周围的四个节点 getposition
 * 4、开始寻路 while
 *    1、节点的位置等于end，结束while，返回step
 *    2、节点值为0，能通过，入队，并标记step，为1则跳过
 * 5、根据step反向寻找start，记录经过的点位
 */

const Queue = require('./queue.js')

// Position类,将（x, y）转化为{x:x, y:y}
// class Position{
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }
// }

// 节点类, 添加step属性
class Node {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.step = 0
  }
}

// 寻找当前节点位置的上下左右节点
function getPosition (pos, maz) {
  let posArr = []
  let x = pos.x
  let y = pos.y
  let maxX = maz.length
  let maxY = maz[x].length
  // 同时过滤掉值为1的情况以及step不为0的节点,这里不能过滤step大于0的节点，反向寻路的时候还需要
  if (x - 1 > -1 && maze_array[x - 1][y] === 0) {
    posArr.push(maz[x - 1][y])
  }
  if (x + 1 < maxX && maze_array[x + 1][y] === 0) {
    posArr.push(maz[x + 1][y])
  }
  if (y - 1 > -1 && maze_array[x][y - 1] === 0) {
    posArr.push(maz[x][y - 1])
  }
  if (y + 1 < maxY && maze_array[x][y + 1] === 0) {
    posArr.push(maz[x][y + 1])
  }
  return posArr
}

function find_path(maz, start, end) {
  // 初始化地图信息
  const maz_arr = []
  for(let i = 0; i < maz.length; i++) {
    let mazcarr = []
    for(let j = 0; j < maz[i].length; j++) {
      mazcarr.push(new Node(i, j))
    }
    maz_arr.push(mazcarr)
  }

  let findEnd = false
  let endStep = 0
  let mazQueue = new Queue()
  mazQueue.enqueue(start)
  while(!findEnd) {
    let curNode = mazQueue.dequeue()
    let posArr = getPosition(curNode, maz_arr)
    for (let i = 0; i < posArr.length; i++) {
      let curPos = posArr[i]
      if (curPos.x === end.x && curPos.y === end.y) {
        findEnd = true
        endStep = curNode.step
        break;
      }

      // 如果是起始节点，不入队
      if (curPos.x === start.x && curPos.y === start.y) {
        continue
      }

      if(curPos.step > 0) {
        continue
      }

      // 这里要修改maz_arr中对应的step，方便反向寻路
      let curMaz = maz_arr[curPos.x][curPos.y]
      let prevMaz = maz_arr[curNode.x][curNode.y]
      curMaz.step = prevMaz.step + 1
      mazQueue.enqueue(curMaz)
    }
    // 需要判断下队列空的情况
    if (mazQueue.size === 0) {
      break;
    }
  }

  if(!findEnd) {
    console.log('there is no way')
    return false
  }

  // 开始反向寻路
  let path = [
    {
      x: end.x,
      y: end.y
    }
  ]
  let curStepNode = end
  while(endStep > 0) {
    let posArr = getPosition(curStepNode, maz_arr)
    for (let i = 0; i < posArr.length; i ++) {
      let curPos = posArr[i]
      if (curPos.step === endStep) {
        path.push({
          x: curPos.x,
          y: curPos.y
        })
        curStepNode = curPos
        endStep --
        break
      }
    }
  }
  path.push({
    x: start.x,
    y: start.y
  })
  console.log(path.reverse())
}

const maze_array = [
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0]
]
const start_pos = new Node(0, 1)
const end_pos = new Node(0, 6)

find_path(maze_array, start_pos, end_pos)