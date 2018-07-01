/**
 * @description Movie book services
 */
const config = require('../config/config');

const mysql = require('mysql');

const Promise = require('bluebird');

Promise.promisifyAll(require('mysql/lib/Connection').prototype);

Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const dbconf = {
	host : config.db.host,   
	port : config.db.port,   
	database : config.db.database,   
  user : config.db.user,   
  password : config.db.password,
  connectionLimit: 10
}
const Pool = mysql.createPool(dbconf);

exports = module.exports = {
  getDbConn,
  queryDb
};


function getDbConn() {
  return Pool.getConnectionAsync();
}

function queryDb(sql, values, conn) {
  // 若传入连接则使用该连接，否则默认使用连接池
  if (!conn) conn = Pool;
  return conn.queryAsync(sql, values);
}
