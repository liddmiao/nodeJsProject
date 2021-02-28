const fs = require('fs')
const path = require('path')

test('Integration test', () => {
  // 删除已生成的测试文件夹
  const filePath = path.resolve(__dirname, '..')
  fs.rmdirSync(filePath + '/utils/__test__', {
    recursive: true
  })

  const testFile = new (require('../index'))()
  testFile.createJestFile(filePath + '/utils')
})

// test('create file name', () => {
//   const testFile = new (require('../index'))()
//   const result = testFile.getTestFileName('./abc/index.js')
//   console.log(result)

//   expect(result).toBe('./abc/__test__/index.spec.js')
// })

// test('create test code', () => {
//   const testFile = new (require('../index'))()
//   const result = testFile.getTestCode('fun', 'abc')
//   console.log(result)
  
//   expect(result).toBe(`
// test('TEST fun', () => {
//   const fun = reuqire('../abc')
//   const resule = fun()
//   //expect(result).toBe('')
// })
//   `)
// })
