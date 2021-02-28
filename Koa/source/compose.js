function compose(middlewares) {
  return function () {
    return dispatch(0)
    function dispatch(i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}

async function fn1(next) {
  console.log('fn1')
  await next()
  console.log('fn5')
}
async function fn2(next) {
  console.log('fn1')
  await delay()
  await next()
  console.log('fn4')
}
async function fn3(next) {
  console.log('fn3')
}
function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

const middlewares = [fn1, fn2, fn3]
const fn = compose(middlewares)

console.log(fn())