/**
 * @description Cinema Controller
 * @create 2017/6/9
 * @author 陈海城
 */
const { sendData, cowrapObj, handleError } = require('../utils');
const Cinema = require('../models/cinema.model');
const Movie = require('../models/movie.model');

module.exports = cowrapObj({
  paramData,
  getCinDetailInfo
});

/**
 * @description 解析影院信息并保存进 paramData.cinema 中
 * @author 陈海城
 */
function* paramData(req, res, next, cin_id) {
  cin_id = cin_id || req.params.cin_id;
  let data;
  try {
    data = yield Cinema.getCinInfo(cin_id);
    if (!data.length) return sendData(req, res, 'ERROR', null, '影院不存在');
    req.paramData.cinema = data[0];
  } catch(err) {
    return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
  }
  return next();
}

/**
 * @description 获取影院信息
 * @author 陈海城
 */
function* getCinDetailInfo(req, res, next) {
  let { cin_id } = req.params;
  let cinema = req.paramData.cinema;
  let data = {};
  try {
    // 获取该影院的所有电影信息
    data.movies = yield Cinema.getMoviesByCinId(cin_id);
    let mov_ids = data.movies.map(item => item.mov_id);
    // 获取电影的导演、编剧、演员信息
    data.people = yield Movie.findMoviePeople(mov_ids);
    // 获取电影在该影院的播放厅信息
    data.vedio_hells = yield Movie.getMoviesVedioHellByCinId(cin_id, mov_ids);
    // 获取影院评论信息
    data.comments = yield Cinema. getCinComments(cin_id);
    cinema = _rebuild(cinema, data);
    return sendData(req, res, 'OK', cinema, '信息获取成功');
  } catch(err) {
    return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
  }

  function _rebuild(cinema, data) {
    cinema.movies = data.movies;
    cinema.comments = data.comments;
    // 整合导演、编剧、演员信息
    cinema.movies.directors = [];
		cinema.movies.scriptwriters = [];
		cinema.movies.actors = [];
		data.people.forEach(item => {
			if (item.director) {
				cinema.movies.directors.push({ name: item.director, id: item.director_id });
			} else if (item.scriptwriter) {
				cinema.movies.scriptwriters.push({ name: item.scriptwriter, id: item.scriptwriter_id });
			} else if (item.actor) {
				cinema.movies.actors.push({ name: item.actor, id: item.actor_id });
			}
    });
    // 整合播放厅信息
    // 1. 按照 mov_id 进行分类
    let temp = {};
    data.vedio_hells.forEach(vedio_hell => {
      if (temp[vedio_hell.mov_id] === undefined)
        temp[vedio_hell.mov_id] = [];
      temp[vedio_hell.mov_id].push(_removeProps(vedio_hell, 'mov_id'));
    });
    // 2. 组内按照日期分类
    let result = {};
    Object.keys(temp).forEach(key => {
      let temp2 = {};
      let str = '';
      temp[key].forEach(item => {
        str = _format(item.starttime);
        console.log(str);
        if (temp2[str] === undefined)
          temp2[str] = [];
        temp2[str].push(item);
      });
      result[key] = temp2;
    })
    cinema.vedio_hells = result;
    return cinema;

    function _removeProps(obj, ...props) {
      let result = {};
      let helper = {};
      props.forEach(prop => helper[prop] = true);
      Object.keys(obj).forEach(key => {
        if (helper[key]) return;
        result[key] = obj[key];
      })
      return result;
    }

    function _format(time) {
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    }
  }
}
