const fs = require('fs')
const readline = require('readline')

function set(key, value) {
  fs.readFile('./db.json', (err, data) => {
    const json = data ? JSON.parse(data) : {}
    json[key] = value

    fs.writeFile('./db.json', JSON.stringify(json), err => {
      if (err) {
        console.log(err)
      }
      console.log('写入成功')
    })
  })
}

function get(key) {
  fs.readFile('./db.json', (err, data) => {
    const json = JSON.parse(data)
    console.log(json[key])
  })
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', input => {
  const [op, key, value] = input.split(' ')
  if (op === 'get') {
    get(key)
  } else if (op === 'set') {
    set(key,value)
  } else if (op === 'quit') {
    rl.close()
  } else {
    console.log('no such a function')
  }
})

rl.on('close', () => {
  console.log('close process')
  process.exit(0)
})