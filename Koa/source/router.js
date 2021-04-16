class Router {
  constructor() {
    this.routeStack = []
  }
  register(path, method, middleware) {
    let route = { path, method, middleware }
    this.routeStack.push(route)
  }
  get(path, middleware) {
    this.register(path, 'get', middleware)
  }
  post(path, middleware) {
    this.register(path, 'post', middleware)
  }
  // 返回每个url需要执行的handle
  routers() {
    const stack = this.routeStack
    return async function (ctx, next) {
      let path = ctx.url
      console.log(path)
      let route
      // 遍历stack，找到当前对应的handle
      for (let i = 0; i < stack.length; i++) {
        if (path === stack[i].path && ctx.method.indexOf(stack[i].method) > -1) {
          route = stack[i].middleware
          break
        }
      }
      if (typeof route === 'function') {
        route(ctx, next)
        return
      }
      await next()
    }
  }
}

module.exports = Router