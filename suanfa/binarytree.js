const Stack = require('./stack.js')

class BinaryTree {
  constructor (str) {
    // 初始化一个空的根节点
    this.root = null
    this.initTree(str)
    this.treeArr = []
  }
  // 根据广义表初始化二叉树
  initTree (str) {
    /**
     * 1、遍历str，遇到#代表结束，跳出循环；
     * 2、遇到左括号，当前节点入栈，k = 1
     * 3、遇到逗号，k = 2
     * 4、遇到右括号，节点出栈
     * 5、如果是正常值，则新建node，root为空，则root = node
     */
    let k = 1 // k = 1代表当前节点是左节点，等于2代表当前节点是右节点
    const stack = new Stack()
    let cur_node = null // 保存当前的node
    for (let i = 0; i < str.length; i++) {
      var chac = str[i]
      if(chac === '#') {
        break;
      }
      if (chac === '(') {
        stack.push(cur_node)
        k = 1
      } else if (chac === ')') {
        stack.pop()
      } else if (chac === ',') {
        k = 2
      } else {
        cur_node = new TreeNode(chac)
        if (this.root === null) {
          this.root = cur_node
        } else if (k === 1) {
          // 从stack中取出栈顶元素，将当前节点作为栈顶元素的子节点
          let parentNode = stack.top()
          parentNode.leftChild = cur_node
          cur_node.parentNode = parentNode
        } else if (k === 2) {
          let parentNode = stack.top()
          parentNode.rightChild = cur_node
          cur_node.parentNode = parentNode
        }
      }
    }
  }

  /**
   * 遍历
   * 前序： 父 -> 左 -> 右
   * 中序： 左    父    右
   * 后序： 左    右    父
   */
  preOrder (node) {
    if (node === null) {
      return
    }
    if (!node) {
      node = this.root
    }
    console.log(node.data)
    this.preOrder(node.leftChild)
    this.preOrder(node.rightChild)
  }
  midOrder (node) {
    if (node === null) {
      return
    }
    if (!node) {
      node = this.root
    }
    this.midOrder(node.leftChild)
    console.log(node.data)
    this.midOrder(node.rightChild)
  }
  backOrder (node) {
    if (node === null) {
      return
    }
    if (!node) {
      node = this.root
    }
    this.backOrder(node.leftChild)
    this.backOrder(node.rightChild)
    console.log(node.data)
  }

  // 非递归方式遍历
  preOrder1() {
    let cur_node = this.root
    const stack = new Stack()
    // 前序遍历，先打印自己的值，然后先接着打印左子树的值，然后将右子树入栈，左子树遍历完成，执行出栈
    while(cur_node) {
      console.log(cur_node.data)
      if (cur_node.rightChild) {
        stack.push(cur_node.rightChild)
      }
      if (cur_node.leftChild) {
        cur_node = cur_node.leftChild
      } else {
        cur_node = stack.pop()
      }
    }
  }
  midOrder1() {
    let cur_node = this.root
    const stack = new Stack()
    // 中序遍历，先遍历左子树，当前节点入栈，这样，所有左子树的节点包括根节点都在栈中了
    while(true) {
      while(cur_node) {
        stack.push(cur_node)
        cur_node = cur_node.leftChild
      }
      cur_node = stack.pop()
      console.log(cur_node.data)
      cur_node = cur_node.rightChild
      if (!cur_node && stack.size() === 0) {
        break
      }
    }
  }
  backOrder1 () {
    let cur_node = this.root
    const stack = new Stack()
    // 后序遍历，先遍历左子树，进行入栈，但是由于顺序是左右中，便需要告诉每次pop出来的节点，自己的右节点是不是遍历过了，如果没有就得遍历右节点
    while(true) {
      while(cur_node && cur_node.state === undefined) {
        tag(cur_node, 0)
        stack.push(cur_node)
        cur_node = cur_node.leftChild
      }
      cur_node = stack.pop()
      if(!cur_node && stack.size() === 0) {
        break;
      }
      if (cur_node.rightChild && cur_node.state === 0) {
        cur_node.state = 1
        stack.push(cur_node)
        cur_node = cur_node.rightChild
      } else {
        console.log(cur_node.data)
      }
    }
    function tag (node, state) {
      node.state = state
    }
  }

  // 返回树的节点数
  size () {
    return nodeCount(this.root)
  }
  // 返回树的高度
  height() {
    return nodeHeight(this.root)
  }

  // 根据data找节点
  getNode(data) {
    return findNode(this.root, data)
  }

  // 树的镜像, 左右互换
  mirror(node) {
    // 先递归，后替换左右，相当于从最深处开始交换
    if (node === null) {
      return null
    }
    if (!node) {
      node = this.root
    }
    let leftChild = this.mirror(node.leftChild)
    let rightChild = this.mirror(node.rightChild)
    
    node.leftChild = rightChild
    node.rightChild = leftChild
    return node
  }
  mirror2(node) {
    // 先交换，后递归，相当于从根节点的子节点开始交换
    if (node === null) {
      return
    }
    if (!node) {
      node = this.root
    }
    let tempNode = null
    tempNode = node.leftChild
    node.leftChild = node.rightChild
    node.rightChild = tempNode
    this.mirror2(node.leftChild)
    this.mirror2(node.rightChild)
  }
}

class TreeNode {
  constructor (data) {
    this.data = data
    this.parentNode = null
    this.leftChild = null
    this.rightChild = null
  }
}

function nodeCount (node) {
  if (node === null) {
    return 0
  }
  let leftCount = nodeCount(node.leftChild)
  let rightCount = nodeCount(node.rightChild)
  return (leftCount + rightCount + 1) // 1代表自己
}

function nodeHeight (node) {
  if (node === null) {
    return 0
  }
  let leftHeight = nodeHeight(node.leftChild)
  let rightHeight = nodeHeight(node.rightChild)
  return (Math.max(leftHeight, rightHeight) + 1) // 1代表自己
}

function findNode (node, data) {
  if (node === null) {
    return null
  }
  if (node.data === data) {
    return node
  }
  let res = findNode(node.leftChild, data)
  if(res) {
    return res
  }
  return findNode(node.rightChild, data)
}

const str = 'A(B(D,E(G,)),C(,F))#'
const tree = new BinaryTree(str)
// tree.preOrder()
// console.log('\n')
// tree.preOrder1()
// console.log('\n')
// tree.midOrder()
// console.log('\n')
// tree.midOrder1()
// console.log('\n')
tree.backOrder()
console.log('\n')
tree.backOrder1()


// const size = tree.size()
// console.log(size)

// const height = tree.height()
// console.log(height)

// console.log(tree.getNode('E'))

// tree.mirror()
// tree.midOrder()

// console.log('\n')

// tree.mirror2()
// tree.midOrder()