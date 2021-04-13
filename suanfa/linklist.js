class LinkList {
  constructor (data) {
    // 头节点
    this.head = null
    // 尾节点
    this.tail = null
    // 链表长度
    this.length = 0
  }
  // 添加节点
  append (data) {
    const node = new Node(data)
    if (this.head === null) {
      this.head = node
      this.tail = this.head
    } else {
      this.tail.next = node
      this.tail = node
    }
    this.length += 1
  }
  prepend (data) {
    const node = new Node(data)
    node.next = this.head
    this.head = node
    this.length += 1
  }
  // 插入节点到指定位置
  insert (idx, data) {
    if (idx > this.length || idx < 0) {
      return false
    }
    if (idx === this.length) {
      this.append(data)
      return true
    }
    if (idx === 0) {
      this.prepend(data)
      return true
    }
    const newNode = new Node(data) 
    const targetNode = this.getNode(idx)
    const preNode = this.getNode(idx -1)
    preNode.next = newNode
    newNode.next = targetNode
    this.length += 1
    return true
  }
  // 删除
  removeByIdx (idx) {
    const targetNode = this.getNode(idx)
    if (!targetNode) {
      return false
    }
    const nextNode = this.getNode(idx + 1)
    const preNode = this.getNode(idx - 1)
    if (!preNode) {
      this.removeHead()
      return true
    }
    preNode.next = nextNode
    this.length -= 1
    return true
  }
  removeByData (data) {
    const idx = this.indexOf(data)
    if (idx === -1) {
      return false
    }
    this.removeByIdx(idx)
    return true
  }
  removeAllData (data) {
    const succ = this.removeByData(data)
    if (!succ) {
      return
    } else {
      this.removeAllData(data)
    }
  }
  removeHead () {
    this.head = this.head.next
    this.length -= 1
    return true
  }
  removeTail () {
    this.removeByIdx(this.length - 1)
  }
  // 根据data获取index
  indexOf (data) {
    let idx = 0
    let curNode = this.head
    while (curNode && curNode.data !== data) {
      curNode = curNode.next
      idx += 1
    }
    return curNode ? idx : -1
  }
  // 根据idx获取节点
  getNode (idx) {
    if (idx < 0 || idx > this.length) {
      return null
    }
    let curNode = this.head
    while (idx-- > 0) {
      curNode = curNode.next
    }
    return curNode
  }
  // 打印链表, 从head节点开始遍历，直到遍历到尾节点，将链表以 a -> b -> c的形式打印出来
  print () {
    let curNode = this.head
    let linkStr = ''
    while (curNode) {
      linkStr += curNode.data.toString() + ' -> '
      curNode = curNode.next
    }
    linkStr += 'null'
    console.log(linkStr)
  }
}
class Node {
  constructor (data) {
    this.data = data
    this.next = null
  } 
}

// const arr = ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', 'a']
// let linkList = new LinkList()
// for (let i in arr) {
//   linkList.append(arr[i])
// }
// linkList.print()
// linkList.insert(-1, 1)
// linkList.print()
// linkList.insert(1, 'g')
// linkList.print()
// const index = linkList.indexOf('d')
// console.log(index)
// console.log(linkList.length)
// linkList.removeAllData('a')
// linkList.print()

module.exports = LinkList