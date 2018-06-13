/**
 * @description User model
 * @create 2017/4/29
 * @author 陈海城
 */
const { queryDb } = require('../services/db');

module.exports = {
	findRegisterByPhone,
	createOneRegisterRecord,
	updateRegisterTime,
	findUserByPhone,
	createUser,
	updatePayNum
}

/**
 * @description 根据 phone 查找注册码
 * @author 陈海城
 */
function findRegisterByPhone(phone) {
	const sql = `
		SELECT *
		FROM register
		WHERE phone = ?;
	`;
	return queryDb(sql, [ phone ]);
}

/*
 * @description 插入一条注册记录
 * @author 陈海城
 */
function createOneRegisterRecord(phone, code, create_at) {
	const sql = `
		INSERT INTO register
		SET ?;
	`;
	const values = { phone, code, create_at};
	return queryDb(sql, values);
}

/**
 * @description 更新注册记录时间
 * @author 陈海城
 */
function updateRegisterTime(phone, code, create_at) {
	const sql = `
		UPDATE register
		SET create_at = ?, code = ?
		WHERE phone = ?;
	`;
	return queryDb(sql, [ create_at, code, phone ]);
}

/**
 * @description 根据 phone 查找用户
 * @author 陈海城
 */
function findUserByPhone(phone) {
	const sql = `
		SELECT *
		FROM user
		WHERE phone = ?;
	`;
	return queryDb(sql, [ phone ]);
}

/**
 * @description 创建用户
 * @author 陈海城
 */
function createUser(phone, password, name = null, pay_num = null) {
	const sql = `
		INSERT INTO user
		SET ?;
	`;
	create_at = new Date(new Date().getTime())
	console.log('create User at:' + create_at)
	const values = { phone, password, name, pay_num , create_at};
	return queryDb(sql, values);
}

/**
 * @description 更新支付账号
 * @author 陈海城
 */
function updatePayNum(user_id, pay_num) {
	const sql = `
		UPDATE user SET pay_num = ? WHERE user_id = ?;
	`;
	return queryDb(sql, [ pay_num, user_id ]);
}
