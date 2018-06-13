/**
 * @description Movie controller
 * @create at 2017/4/30
 * @author 陈海城
 */
const { sendData, cowrapObj, handleError } = require('../utils');
const Movie = require('../models/movie.model');

module.exports = cowrapObj({
	paramData,
	getMovieDetail,
	getMovieAndPlayingDetail,
	getMoviesList,
	searchMovie
})

/*
 * @description 解析 mov_id 并将结果保存至 req.paramData.movie 中
 * @author 陈海城
 */
function* paramData(req, res, next, mov_id) {
	// TODO 此处有bug，mov_id是undefined，先暂时这样，待调试
	mov_id = mov_id || req.params.mov_id;
	let data, movie;
	// 获取电影信息
	try {
		data = yield Movie.findMovieById(mov_id);
		if (!data.length) return sendData(req, res, 'PARAM_ERROR', null, '电影不存在');
		movie = data[0];
	} catch(err) {
		return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
	}
	// 获取电影导演/编剧/主演信息
	try {
		data = yield Movie.findMoviePeople(mov_id);
		movie.directors = [];
		movie.scriptwriters = [];
		movie.actors = [];
		data.forEach(item => {
			if (item.director) {
				movie.directors.push({ name: item.director, id: item.director_id });
			} else if (item.scriptwriter) {
				movie.scriptwriters.push({ name: item.scriptwriter, id: item.scriptwriter_id });
			} else if (item.actor) {
				movie.actors.push({ name: item.actor, id: item.actor_id });
			}
		});
	} catch(err) {
		return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
	}
	req.paramData.movie = movie;
	return next();
}

/*
 * @description 获取某部电影详细信息
 * @author 陈海城
 */
function* getMovieDetail(req, res, next) {
	return sendData(req, res, 'OK', req.paramData.movie, '电影信息获取成功');
}

/**
 * @description 获取 某部电影+播放 信息
 * @author 陈海城
 */
function* getMovieAndPlayingDetail(req, res, next) {
	const mov_id = req.params.mov_id;
	let movie = req.paramData.movie;
	let data;
	try {
		data = yield Movie.findMovePlayingInfo(mov_id);
		if (!data.length) {
			movie.play_cinemas = [];
		} else {
			movie.play_cinemas = _rebuild(data);
		}
		return sendData(req, res, 'OK', movie, '电影+播放信息获取成功');
	} catch(err) {
		return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
	}

	function _rebuild(data) {
		let result = [];
		let map = new Map();
		let ptr, date;
		// 根据 cin_id 分组
		let groups = [];
		data.forEach(item => {
			ptr = map[item.cin_id];
			if (ptr === undefined) {
				ptr = groups.length;
				map[item.cin_id] = ptr;
				groups.push([]);
			}
			groups[ptr].push(item);
		});
		// 分组结构化
		groups.forEach(group => {
			let item = {
				cin_id: group[0].cin_id,
				name: group[0].cin_name,
				address: group[0].address,
				detail: null
			};
			// 按照日期分组
			let temp = [];
			map = new Map();
			group.forEach(item => {
				date = _formatDate(item.starttime);
				ptr = map[date];
				if (ptr === undefined) {
					ptr = temp.length;
					map[date] = ptr;
					temp.push({ date: date, video_hell: [] });
				}
				temp[ptr].video_hell.push({
					vh_mov_id: item.vh_mov_id,
					vh_id: item.vh_id,
					name: item.vh_name,
					price: item.price,
					starttime: _checkTime(item.starttime.getHours()) + ':' + _checkTime(item.starttime.getMinutes()),
					endtime: _checkTime(item.endtime.getHours()) + ':' + _checkTime(item.endtime.getMinutes())
				});
			});
			item.detail = temp;
			result.push(item);
		});
		return result;
	}

	function _formatDate(date) {
		return date.getMonth()+1 + '月' + date.getDate() + '日';
	}

	function _checkTime(i) {
		if (i < 10) i = "0" + i;
	  return i;
	}
}

/**
 * @description 获取电影列表数据
 * @author 陈海城
 */
function* getMoviesList(req, res, next) {
	let data = {};
	try {
		data.now = yield Movie.getNowMovies(4);
		data.feature = yield Movie.getFetureMovies(4);
		data.rank = yield Movie.getSumGoodMovies(10);
	} catch(err) {
		return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
	}
	return sendData(req, res, 'OK', data, '数据获取成功');
}

/**
 * @description 搜索电影
 * @author 陈海城
 */
function* searchMovie(req, res, next) {
	let { name } = req.query;
	if (!name)
		return sendData(req, res, 'PARAM_ERROR', null, '参数错误');
	let data;
	try {
		data = yield Movie.searchMovie(name);
	} catch(err) {
		return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
	}
	return sendData(req, res, 'OK', data, '数据获取成功');
}
