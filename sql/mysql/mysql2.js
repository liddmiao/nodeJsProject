(async () => {
  const mysql = require('mysql2/promise')

  const cfg = {
    host: 'localhost',
    user: 'kaikeba',
    password: '!*&ldp537918',
    database: 'kaikeba'
  }

  const connection = await mysql.createConnection(cfg)

  let ret = await connection.execute(`
    CREATE TABLE IF NOT EXIST test_mysql2,
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(50) NULL,
    PRIMARY KEY (id)
  `)

  console.log('ret', ret)
})()