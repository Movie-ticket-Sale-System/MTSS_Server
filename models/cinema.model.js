/**
 * @description Movie book models
 */
const { queryDb } = require('../services/db');

module.exports = {
  getCinInfo,
  getCinComments,
  getMoviesByCinId
}


function getCinInfo(cin_id) {
  const sql = `
    SELECT * FROM cinema WHERE cin_id = ?;
  `;

  return queryDb(sql, [ cin_id ]);
}


function getCinComments(cin_id) {
  const sql = `
    SELECT ur.user_id, ur.phone, ur.name, cc.description, cc.created_at
    FROM user ur, cinema_comment cc
    WHERE ur.user_id = cc.user_id AND cc.cin_id = ?;
  `;

  return queryDb(sql, [ cin_id ]);
}


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
