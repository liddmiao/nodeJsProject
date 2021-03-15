const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')

const app = new Koa()

app.use(cors({
  credentials: true
}))

app.keys = ['some-secret']

app.use(static(__dirname + '/'))
app.use(bodyParser())
app.use(session(app))

app.use((ctx, next) => {
  // 鉴权
  if (ctx.url.indexOf('login') > -1) {
    next()
  } else {
    console.log('未登录')
    if (!ctx.session.userinfo) {
      ctx.body = {
        message: '未登录'
      }
    } else {
      next()
    }
  }
})

router.post('/users/login', async ctx => {
  const { body } = ctx.request
  // 验证登录信息，账号密码，正常就赋权
  ctx.session.userinfo = body.username
  ctx.body = {
    message: '登录成功'
  }
})

router.post('/users/logout', async ctx => {
  delete ctx.session.userinfo
  ctx.body = {
    message: '登出成功'
  }
})

router.get('/users/getUser', async ctx => {
  ctx.body = {
    message: '获取信息成功',
    userinfo: ctx.session.userinfo
  }
})

app.use(router.routes())

app.listen(3000)