const koa = require('koa')
const redisStore = require('koa-redis')
const redis = require('redis')
const wrapper = require('co-redis')
const session = require('koa-session')

const app = new koa()
app.keys = ['some sec']

// const SESS_CONFIG = {
//   key: 'kkb:sess',
//   maxAge: 86400000,
//   httpOnly: true,
//   signed: true
// }
// app.use(session(SESS_CONFIG, app))

const redisClient = redis.createClient(6397, 'localhost')
const client = wrapper(redisClient)
app.use(session({
  key: 'kkb:sess',
  store: redisStore({client})
}), app)


app.use(ctx => {
  if (ctx.path === '/favicon.ico') {
    return
  }
  let n = ctx.session.count || 0
  ctx.session.count = ++n
  ctx.body = `第${n}次访问`
})

app.listen(3000)
