/**
 * @description Movie book models
 */
const { queryDb } = require('../services/db');

module.exports = {
	findPeopleById
}


function findPeopleById(peo_id) {
	const sql = `
		SELECT * FROM people
		WHERE peo_id = ?;
	`;
	return queryDb(sql, [ peo_id ]);
}
