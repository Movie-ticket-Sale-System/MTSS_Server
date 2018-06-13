/**
 * @description Movie book controller
 * @create 2017/5/1
 * @author 陈海城
 */
const { sendData, cowrapObj, handleError } = require('../utils');
const MovieOrder = require('../models/movie_order.model');
const MovieSeat = require('../models/movie_seat.model');
const User = require('../models/user.model');

module.exports = cowrapObj({
	getBookData,
	cancleOrder,
	makeSureTicket
})

/**
 * @description 点击确认选座后返回数据
 * @author 陈海城
 */
function* getBookData(req, res, next) {
	const { vh_mov_id, seats_id, price } = req.body;
	if (!vh_mov_id || !seats_id || price === undefined)
		return sendData(req, res, 'PARAM_ERROR', null, '参数错误');
	let data, seat;
	try {
		// 判断座位是否空闲
		data = yield MovieSeat.isValid(seats_id);
		if (data.length != seats_id.length) {
			let temp = Object.assign(
				{}, ...(data.map(item => {
					return JSON.parse(`{"${item.seat_id}":true}`);
				}))
			);
			return sendData(req, res, 'ERROR', 
				{
					seats_id: seats_id.filter(id => temp[id] === undefined)
				},
				'所选座位已被预定，请重新选择');
		}
		// 判断座位是否属于该放映厅
		data = yield MovieOrder.isSeatBelongToVideoHell(vh_mov_id, seats_id);
		if (data.length != seats_id.length)
			return sendData(req, res, 'ERROR', { seats_id: data.map(item => item.seat_id) }, '所选座位不属于该放映厅');
		seats = data;
		// 获取支付页面所需数据
		data = yield MovieOrder.findBookDataById(vh_mov_id)
		if (!data.length)
			return sendData(req, res, 'ERROR', null, '该放映厅不播放该电影');
		if (price != data[0].price * seats_id.length)
			return sendData(req, res, 'ERROR', null, `价格错误，应为${data[0].price * seats_id.length}元`);
		// 设置座位状态
		yield MovieSeat.setSeatStatus(seats_id, 1, req.paramData.user.user_id);
		// 生成订单
		let tcks = yield MovieOrder.createTickes(req.paramData.user
		.user_id, vh_mov_id, seats_id);
		data = _rebuild(data[0], seats, req.paramData.movie);
		data.tcks_id = [];
		for (let i = 0; i < tcks.affectedRows; ++i)
			data.tcks_id.push(tcks.insertId + i);
		data.user = {
			phone: req.session.user.phone,
			pay_num: req.session.user.phone
		};
		return sendData(req, res, 'OK', data, '座位预定成功，请支付');
	} catch(err) {
		return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
	}

	function _rebuild(data, seats, movie) {
		let result = {};
		result.vh_mov_id = data.vh_mov_id;
		result.cinema = {
			name: data.cin_name,
			address: data.address
		};
		result.video_hell = {
			name: data.vh_name
		};
		result.movie = {
			name: movie.name,
			language: movie.language,
			type: data.type,
			starttime: data.starttime,
			endtime: data.starttime,
			price: data.price
		};
		result.seats = seats.map(item => { 
			return {
				seat_id: item.seat_id,
				col_raw: item.row_col
			}
		});
		return result;
	}
}

/**
 * @description 撤销未支付订单
 * @author 陈海城
 */
function* cancleOrder(req, res, next) {
	const { seat_id } = req.body;
	if (!seat_id)
		return sendData(req, res, 'PARAM_ERROR', null, '参数错误');
	let data;
	try {
		data = yield MovieSeat.findOneSeatInfo(seat_id);
		if (!data.length)
			return sendData(req, res, 'FAIL', null, '座位不存在，撤销失败');
		if (data[0].status != 1)
			return sendData(req, res, 'FAIL', null, '座位已被预定或未被预定，撤销失败');
		if (req.paramData.user.user_id != data[0].user_id)
			return sendData(req, res, 'NO_PERMISSION', null, '撤销需本人权限');
		yield MovieSeat.setSeatStatus(seat_id, 0);
		return sendData(req, res, 'OK', null, '订单撤销成功');
	} catch(err) {
		return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
	}
}

/**
 * @description 批量确认支付订单
 * @author 陈海城
 */
function* makeSureTicket(req, res, next) {
	let { tcks_id, pay_num, pay_pwd, price } = req.body;
	if (!tcks_id || !pay_num || !pay_pwd || price === undefined)
		return sendData(req, res, 'PARAM_ERROR', null, '参数错误');
	let data;
	try {
		// 判断tcks_id的持有者是否为用户本人
		data = yield MovieOrder.checkTicketsBelongToUser(tcks_id, req.paramData.user.user_id);
		if (data.length != tcks_id.length)
			return sendData(req, res, 'PERSSION_ERROR', null, '支付需订票者权限');
		// 更新支付账号
		yield User.updatePayNum(req.paramData.user.user_id, pay_num);
		// TODO 支付逻辑
		// 票价校验
		data = yield MovieOrder.findBookDataById(data[0].vh_mov_id);
		if (price != data[0].price * tcks_id.length)
			return sendData(req, res, 'ERROR', null, `价格错误，应为${data[0].price * tcks_id.length}元`);
		yield MovieOrder.changeTickesState(tcks_id, 1);
		return sendData(req, res, 'OK', null, '支付成功');
} catch(err) {
		return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
	}
}