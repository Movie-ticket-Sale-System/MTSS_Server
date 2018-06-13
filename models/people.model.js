/*
 * @description People model
 * @create 2017/4/30
 * @author 陈海城
 */
const { queryDb } = require('../services/db');

module.exports = {
	findPeopleById
}

/*
 * @description 获取人物信息
 * @author 陈海城
 */
function findPeopleById(peo_id) {
	const sql = `
		SELECT * FROM people
		WHERE peo_id = ?;
	`;
	return queryDb(sql, [ peo_id ]);
}
