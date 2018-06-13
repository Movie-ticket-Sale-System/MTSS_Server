/*
 * @description Move seat controller
 * @create 2017/6/8
 * @author 陈海城
 */
const { sendData, cowrapObj, handleError } = require('../utils');
const MovieSeat = require('../models/movie_seat.model');

module.exports = cowrapObj({
  getSeatsInfo
})

/**
 * @description 获取某个影院的所有座位信息
 * @author 陈海城
 */
function *getSeatsInfo(req, res, next) {
	let { vh_id } = req.query;
	if (vh_id === undefined)
		return sendData(req, res, 'PARAM_ERROR', null, '参数错误');
	let data;
	try {
		data = yield MovieSeat.findSeatsByVhId(vh_id);
		let seats = data.map(item => {
			return {
				seat_id: item.seat_id,
				valid: !item.status && true || false,
				row_col: item.row_col
			};
		});
		return sendData(req, res, 'OK', { seats }, '数据获取成功');
	} catch (err) {
		return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
	}
}
