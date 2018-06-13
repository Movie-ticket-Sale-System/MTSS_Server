/*
 * 数据库服务
 * @create 2017/4/29
 */
const config = require('../config/config');
const mysql = require('mysql');
const Promise = require('bluebird');

Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

// const dbconf = Object.assign({ connectionLimit: 10 }, config.db);
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

/**
 * 在数据库连接池中申请连接
 */
function getDbConn() {
  return Pool.getConnectionAsync();
}
/**
 * 查询数据库
 * @param  {String}              sql      数据库查询语句
 * @param  {Array}               values   参数值
 * @param  {Object}              [conn]   数据库连接。传入时使用该连接，不传入的话直接用Pool
 * @return {Object|Object[]}              查询结果
 */
function queryDb(sql, values, conn) {
  // 若传入连接则使用该连接，否则默认使用连接池
  if (!conn) conn = Pool;
  return conn.queryAsync(sql, values);
}
