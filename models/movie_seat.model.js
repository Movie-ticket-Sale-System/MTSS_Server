/**
 * @description Movie seat model
 * @create 2017/5/1
 * @author 陈海城
 */
const { queryDb } = require('../services/db');

module.exports = {
	findSeatsByVhId,
	isValid,
	setSeatStatus,
	findOneSeatInfo
}

/**
 * @description 获取某个放映厅的所有座位
 * @author 陈海城
 */
function findSeatsByVhId(vh_id) {
	const sql = `
		SELECT seat_id, status, row_col
		FROM seat
		WHERE vh_id = ?
		ORDER BY seat_id;
	`;
	return queryDb(sql, [ vh_id ]);
}

/**
 * @description 批量判断指定座位是否空闲
 * @author 陈海城
 */
function isValid(seats_id) {
	const sql = `
		SELECT seat_id, row_col
		FROM seat
		WHERE status = 0 AND seat_id in (?);
	`;
	return queryDb(sql, [ seats_id ]);
}

/**
 * @description 批量修改座状态
 * @author 陈海城
 */
function setSeatStatus(seats_id, status, user_id = null) {
	const sql = `
		UPDATE seat
		SET status = ?, user_id = ?
		WHERE seat_id in (?);
	`;
	return queryDb(sql, [ status, user_id, seats_id ]);
}

/**
 * @description 获取某个座位信息
 * @author 陈海城
 */
function findOneSeatInfo(seat_id) {
	const sql = `
		SELECT *
		FROM seat
		WHERE seat_id = ?;
	`;
	return queryDb(sql, [ seat_id ]);
}
