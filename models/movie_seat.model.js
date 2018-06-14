/**
 * @description Movie book models
 */
const { queryDb } = require('../services/db');

module.exports = {
	findSeatsByVhId,
	isValid,
	setSeatStatus,
	findOneSeatInfo
}


function findSeatsByVhId(vh_id) {
	const sql = `
		SELECT seat_id, status, row_col
		FROM seat
		WHERE vh_id = ?
		ORDER BY seat_id;
	`;
	return queryDb(sql, [ vh_id ]);
}


function isValid(seats_id) {
	const sql = `
		SELECT seat_id, row_col
		FROM seat
		WHERE status = 0 AND seat_id in (?);
	`;
	return queryDb(sql, [ seats_id ]);
}


function setSeatStatus(seats_id, status, user_id = null) {
	const sql = `
		UPDATE seat
		SET status = ?, user_id = ?
		WHERE seat_id in (?);
	`;
	return queryDb(sql, [ status, user_id, seats_id ]);
}


function findOneSeatInfo(seat_id) {
	const sql = `
		SELECT *
		FROM seat
		WHERE seat_id = ?;
	`;
	return queryDb(sql, [ seat_id ]);
}
