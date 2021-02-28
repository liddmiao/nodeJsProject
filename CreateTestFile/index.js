const path = require('path')
const fs = require('fs')

module.exports = class TestFile {

  /**
   * 生成测试文件名
   * @param {*} filename 测试文件名
   */
  getTestFileName (filename) {
    const dir = path.dirname(filename)
    const base = path.basename(filename)
    const ext = path.extname(filename)
    const testName = base.replace(ext, `.spec${ext}`)

    return path.format({
      root: dir + '/__test__/',
      base: testName
    })
  }

  /**
   * 生成测试代码
   * @param {*} methodname 方法名称
   * @param {*} classfile 文件名称
   * @param {*} isclass 是否class
   */
  getTestCode (methodname, classfile, isclass = false) {
    return `
test('TEST ${methodname}', () => {
  const ${isclass ? '{' + methodname + '}' : methodname} = require('../${classfile}')
  const result = ${methodname}()
  //expect(result).toBe('')
})
  `
  }

  /**
   * 生成测试文件夹
   * @param {*} filePath 文件所在的路径
   */
  createJestFile (filePath = path.resolve('./')) {
    const testPath = `${filePath}/__test__`
    // 判断测试文件夹是否存在，不存在就新建一个
    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath)
    }

    // 遍历代码文件，这里面可能有文件夹、文件以及.spec文件
    let fileList = fs.readdirSync(filePath)

    // 添加完整的路径,过滤文件夹、.spec文件，然后去生成测试文件和代码
    fileList.map(v => `${filePath}/${v}`)
            .filter(v => fs.statSync(v).isFile() && v.indexOf('.spec') === -1)
            .forEach(v => this.createTestFile(v))
  }
  /**
   * 生成对应的测试文件
   * @param {*} fileName 文件的完整路径
   */
  createTestFile (fileName) {
    const testFileName = this.getTestFileName(fileName)
    // 判断文件是否存在

    if (fs.existsSync(testFileName)) {
      console.log('文件已存在')
      return
    }

    let modules = require(fileName)
    let source

    if (typeof modules === 'object') {
      source = Object.keys(modules)
                      .map(v => this.getTestCode(v, path.basename(fileName), true))
                      .join('\n')
    } else if (typeof modules === 'function') {
      const baseName = path.basename(fileName)
      source = this.getTestCode(baseName.replace('.js', ''), baseName)
    }
    fs.writeFileSync(testFileName, source)
  }
}