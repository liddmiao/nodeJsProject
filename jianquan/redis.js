const redis = require('redis')

const client = redis.createClient(6397, 'localhost')
client.set('hello', 'this is kkb')
client.get('hello', (err, v) => {
  console.log(v)
})