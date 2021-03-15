const net = require('net')

const chatServer = net.createServer()

// 手机所有客户端
const clientList = []

chatServer.on('connection', client => {
  client.write('Hi!\n')
  clientList.push(client)
  client.on('data', data => {
    console.log('receive', data.toString())
    clientList.forEach(v => {
      v.write(data + '\n')
    })
  })
})

chatServer.listen(9000, () => {
  console.log('socket runing')
})