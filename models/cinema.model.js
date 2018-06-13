/**
 * @description Cinema Model
 * @create 2017/6/9
 * @author 陈海城
 */
const { queryDb } = require('../services/db');

module.exports = {
  getCinInfo,
  getCinComments,
  getMoviesByCinId
}

/**
 * @description 查找指定影院信息
 * @author 陈海城
 */
function getCinInfo(cin_id) {
  const sql = `
    SELECT * FROM cinema WHERE cin_id = ?;
  `;
  return queryDb(sql, [ cin_id ]);
}

/**
 * @description 查找指定影院的评论信息
 * @author 陈海城
 */
function getCinComments(cin_id) {
  const sql = `
    SELECT ur.user_id, ur.phone, ur.name, cc.description, cc.created_at
    FROM user ur, cinema_comment cc
    WHERE ur.user_id = cc.user_id AND cc.cin_id = ?;
  `;
  return queryDb(sql, [ cin_id ]);
}

/**
 * @description 查找指定影院播放的所有电影
 * @author 陈海城
 */
function getMoviesByCinId(cin_id) {
  const sql = `
    SELECT mv.mov_id, mv.name, mv.type, mv.length, mv.imgUrl
    FROM (
      SELECT DISTINCT(vm.mov_id)
      FROM video_movie vm, video_hell vh
      WHERE vm.vh_id = vh.vh_id AND vh.cin_id = ?
    ) AS temp, movie mv
    WHERE temp.mov_id = mv.mov_id;
  `;
  return queryDb(sql, [ cin_id ]);
}
