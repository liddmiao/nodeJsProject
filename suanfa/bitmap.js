/**
 * 一个整数占四字节，32位，即是 00000000 00000000 00000000 00000000，可以使用将对应位设置为1的方式，来存储0-31的数字是否存在
 */

/**
 * 前置
 * 0 | 1 = 1
 * 0 & 1 = 0
 * 1 << 3 = 1000 左移
 */

class BitMap {
  constructor (size) {
    // 创建包含size个整数的数组用于存放数据，初始值为0， 00000000 00000000 00000000 00000000
    this.bitArr = new Array(size).fill(0)
  }
  addMember (num) {
    // 使用移位，将1移动到num对应的位置，并和bitArr中对应的整数进行或操作，就能将整数存进bitArr中了
    const idx = Math.floor(num / 32) // 应该操作bitArr中的哪个数字
    const pos = num % 32 // 操作对应数字的哪一位
    const cur_num = 1 << pos // 将1左移，得到我们需要的数字
    this.bitArr[idx] = this.bitArr[idx] | cur_num
  }
  // 判断是否存在
  isExist (num) {
    const idx = Math.floor(num / 32) // 应该操作bitArr中的哪个数字
    const pos = num % 32 // 操作对应数字的哪一位
    const cur_num = 1 << pos // 将1左移，得到我们需要的数字

    // 由于只有两个值都为1的时候，&的结果才是1，所以使用&判断对应位上是否有这个数
    return (this.bitArr[idx] & cur_num) !== 0
  }
}

const arr = [0, 14, 55, 28, 47, 96, 99, 73, 82]
// 将这个arr依次存入bitmap中，最大数是99，所以需要Math.floor(100 / 32) = 4个整数来存这个数组
const bitMap = new BitMap(4)
console.log(bitMap)
for (let i = 0; i < arr.length; i ++) {
  bitMap.addMember(arr[i])
}

// console.log(bitMap.isExist(1))
// console.log(bitMap.isExist(99))
// console.log(bitMap.isExist(33))
// console.log(bitMap.isExist(47))

// 对arr进行排序
const sortArr = []
for (let i = 0; i < 100; i++ ) {
  if (bitMap.isExist(i)) {
    sortArr.push(i)
  }
}
console.log(sortArr)

