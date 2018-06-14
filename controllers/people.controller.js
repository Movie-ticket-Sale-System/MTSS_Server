/**
 * @description Movie book controller
 */
const { sendData, cowrapObj, handleError } = require('../utils');
const People = require('../models/people.model');

module.exports = cowrapObj({
	paramData,
	getPeopleInfo
})


function* paramData(req, res, next, peo_id) {
	peo_id = peo_id || req.params.peo_id;
	let data;
	try {
		data = yield People.findPeopleById(peo_id);
		if (!data.length) return sendData(req, res, 'PARAM_ERROR', null, '人物不存在');
		req.paramData.people = data[0];
	} catch(err) {
		return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
	}
	return next();
}


function* getPeopleInfo(req, res, next) {
	return sendData(req, res, 'OK', req.paramData.people, '人物信息获取成功');
}
