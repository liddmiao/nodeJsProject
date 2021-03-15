const mysql = require('mysql')

const cfg = {
  host: 'localhost',
  user: 'root',
  password: '!*&Ldp537918',
  database: 'kaikeba'
}

module.exports = {
  query: function(sql, val, callback) {
    const conn = mysql.createConnection(cfg)
    conn.connect()
    conn.query(sql, val, callback)
    conn.end()
  }
}