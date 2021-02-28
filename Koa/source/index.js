// const http = require('http')

// const app = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.end('hello kkb')
// })

// app.listen(3000)

const KKB = require('./kkb')
const Router = require('./router')
const static = require('./static')

const app = new KKB()
const router = new Router()

// app.use((req, res) => {
//   res.statusCode = 200
//   res.end('hello kkb 666')
// })

// app.use((ctx) => {
//   ctx.body = 'hello koa1'
// })

// app.use(async (ctx, next) => {
//   ctx.body = '1'
//   await next()
//   ctx.body += '3'
// })

// app.use(async (ctx, next) => {
//   ctx.body += '2'
// })

router.get('/home', async ctx => {
  ctx.body = 'home page'
})
router.get('/user', async ctx => {
  ctx.body = 'user page'
})
router.post('/index', async ctx => {
  ctx.body = 'index page'
})


app.use(router.routers())
app.use(static(__dirname + '/dist'))

app.listen(3000)