const Koa = require('koa')
const path = require('path')

console.log('resolve', path.resolve(__dirname, '/source/index.js'))

const app = new Koa()
app.use((ctx, next) => {
  ctx.body = 'hello koa'
})

app.listen(3000)