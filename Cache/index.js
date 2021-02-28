const http = require('http')
const crypto = require('crypto')

function updateTime() {
  this.timer = this.timer || setInterval(() => this.time = new Date().toUTCString(), 5000);
  return this.time
}

http.createServer((req, res) => {
  const {url} = req
  if('/' === url) {
    res.end(`
      <html>
        html update time ${updateTime()}
        <script src="main.js"></script>
      </html>
    `)
  } else if ('/main.js' === url) {
    const content = `document.writeln('<br>js update time ${updateTime()}')`

    // 设置强缓存，10s更新一次资源
    // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
    // 1.1中,强缓存发生了变化，优先级高于1.0
    // res.setHeader('Cache-control', 'max-age=20')

    // 协商缓存
    // 以时间为判断基准
    // res.setHeader('Cache-control', 'no-cache')
    // res.setHeader('last-modified', new Date().toUTCString())
    // if (new Date(req.headers['if-modified-since']).getTime() + 10 * 1000 > Date.now()) {
    //   res.statusCode = 304
    //   res.end('')
    //   return
    // }

    // 以内容为判断基准，给内容生成一段hash，通过比对hash判断内容是否变化
    res.setHeader('Cache-control', 'no-cache')
    const hash = crypto.createHash('sha1').update(content).digest('hex')
    res.setHeader('Etag', hash)
    if (req.headers['if-none-match'] === hash) {
      res.statusCode = 304
      res.end('')
      return
    }

    res.statusCode = 200
    res.end(content)
  } else {
    res.end('')
  }
})
.listen(3000, () => {
  console.log('runing!')
})