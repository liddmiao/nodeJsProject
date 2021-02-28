const fs = require('fs')
const path = require('path')

module.exports = dirpath => {
  return async (ctx, next) => {
    // 判断文件是否在dist文件夹下，如果不是，则直接等待下一个中间件
    if (ctx.url.indexOf('/dist') > -1) {
      // 获取绝对路径，从上下文的url中取出绝对路径
      const url = path.resolve(__dirname, dirpath)
      const filePath = url + ctx.url.replace('/dist', '')
      // 检查filepath是文件还是文件夹，如果报错代表文件不存在，返回404
      try {
        const stats = fs.statSync(filePath)
        // 如果filepath指向文件夹，则生成文件夹目录
        if (stats.isDirectory()) {
          // 读取文件夹下的所有文件
          const fileList = fs.readdirSync(filePath)
          let resHtml = '<div>'
          fileList.forEach(name => {
            resHtml += `<div>
                          <a href='${ctx.url}/${name}'>${name}</a>
                        </div>`
          })
          resHtml += '</div>'
          ctx.body = resHtml
        } else {
          const content = fs.readFileSync(filePath)
          ctx.body = content
        }
      } catch (err) {
        ctx.body = '<h1>404 ERROR !!!</h1>'
      }
    } else {
      await next()
    }
  }
}