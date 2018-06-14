/**
 * @description Movie book models
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


function findRegisterByPhone(phone) {
	const sql = `
		SELECT *
		FROM register
		WHERE phone = ?;
	`;
	return queryDb(sql, [ phone ]);
}


function createOneRegisterRecord(phone, code, create_at) {
	const sql = `
		INSERT INTO register
		SET ?;
	`;
	const values = { phone, code, create_at};
	return queryDb(sql, values);
}


function updateRegisterTime(phone, code, create_at) {
	const sql = `
		UPDATE register
		SET create_at = ?, code = ?
		WHERE phone = ?;
	`;
	return queryDb(sql, [ create_at, code, phone ]);
}


function findUserByPhone(phone) {
	const sql = `
		SELECT *
		FROM user
		WHERE phone = ?;
	`;
	return queryDb(sql, [ phone ]);
}


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


function updatePayNum(user_id, pay_num) {
	const sql = `
		UPDATE user SET pay_num = ? WHERE user_id = ?;
	`;
	return queryDb(sql, [ pay_num, user_id ]);
}
