const http = require('http')

const session = {}
http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.statusCode = 404
    res.end('')
    return
  }
  // cookie
  // console.log(req.headers.cookie)

  // res.setHeader('Set-Cookie', 'cookie1=abc')
  // res.end('hello cookie')
  const sessionKey = 'sid'
  const cookie = req.headers.cookie

  if (cookie && cookie.indexOf(sessionKey) > -1) {
    res.end('welcom back')
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
    const sid = pattern.exec(cookie)[1]
    console.log('session', session[sid])
  } else {
    // 第一次访问
    const sid = (Math.random()*99999999).toFixed()
    res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
    session[sid] = {
      name: 'laowang'
    }
    res.end('hello first')
  }
}).listen(3000)