/**
 * @description Movie book models
 */
const { queryDb } = require('../services/db');

module.exports = {
	findMovieList,
	findMovieById,
	findMoviePeople,
	findMovePlayingInfo,
	getNowMovies,
	getFetureMovies,
	getSumGoodMovies,
	searchMovie,
	getMoviesInfo,
	getMoviesVedioHellByCinId
}


function findMovieList(index, counts) {
	const sql = `
		SELECT mov_id, name
		FROM movie LIMIT ?, ?
		ORDER BY mov_id;
	`;
	return queryDb(sql, [ index, counts ]);
}


function findMovieById(mov_id) {
	const sql = `
		SELECT *
		FROM movie
		WHERE mov_id = ?;
	`;
	return queryDb(sql, [ mov_id ]);
}


function findMoviePeople(mov_ids) {
	mov_ids = Array.isArray(mov_ids) ? mov_ids : [ mov_ids ];
	const sql = `
		SELECT temp.mov_id, temp.director, temp.director_id, temp.scriptwriter, temp.scriptwriter_id, temp.actor, temp.actor_id
		FROM
			(SELECT mp.mov_id AS mov_id, pe.name, pe.peo_id, mp.flag,
					(SELECT pe.name
					 WHERE mp.flag = 3
					) AS director,
					(SELECT pe.peo_id
					 WHERE pe.name = director
					) AS director_id,
					(SELECT pe.name
					 WHERE mp.flag = 2
					) AS scriptwriter,
					(SELECT pe.peo_id
					 WHERE pe.name = scriptwriter
					) AS scriptwriter_id,
					(SELECT pe.name
					 WHERE mp.flag = 1
					) AS actor,
					(SELECT pe.peo_id
					 WHERE pe.name = actor
					) AS actor_id
			 FROM mov_peo mp, people pe
			 WHERE mp.mov_id IN (?) AND mp.flag != 0 AND mp.peo_id = pe.peo_id
			 ORDER BY mp.mov_id
			) AS temp
			ORDER BY temp.mov_id;
	`;
	return queryDb(sql, [ mov_ids ]);
}


function findMovePlayingInfo(mov_id) {
	const sql = `
		SELECT vm.vh_mov_id, vm.type, vm.starttime, vm.endtime, vm.price,
					 vh.vh_id, vh.name AS vh_name, cm.cin_id,
					 cm.name AS cin_name, cm.address
		FROM
		(
			SELECT *
			FROM video_movie 
			WHERE mov_id = ?
		) AS vm
		NATURAL JOIN video_hell vh
		LEFT JOIN cinema cm ON cm.cin_id = vh.cin_id;
	`;
	return queryDb(sql, [ mov_id ]);
}


function getNowMovies(sum) {
	const sql = `
		SELECT mov_id, name, grade, imgUrl
		FROM movie
		WHERE starttime <= NOW()
		ORDER BY starttime ASC
		LIMIT ?;
	`;
	return queryDb(sql, [ sum ]);
}


function getFetureMovies(sum) {
	const sql = `
		SELECT mov_id, name, grade, imgUrl
		FROM movie
		WHERE starttime > NOW()
		ORDER BY starttime ASC
		LIMIT ?;
	`;
	return queryDb(sql, [ sum ]);
}


function getSumGoodMovies(sum) {
	const sql = `
		SELECT mov_id, name, grade
		FROM movie
		ORDER BY grade DESC
		LIMIT ?;
	`;
	return queryDb(sql, [ sum ]);
}


function searchMovie(searchKey) {
	const sql = `
		SELECT name, mov_id FROM movie
		WHERE name LIKE ?;
	`;
	return queryDb(sql, [ '%' + searchKey + '%' ]);
}


function getMoviesInfo(mov_ids) {
	const sql = `
		SELECT * FROM movie WHERE mov_id in (?); 
	`;
	return queryDb(sql, [ mov_ids ]);
}


function getMoviesVedioHellByCinId(cin_id, mov_ids) {
	const sql = `
		SELECT vm.vh_mov_id, vm.mov_id, vm.type, vm.starttime, vm.price, vh.name
		FROM video_movie vm, video_hell vh
		WHERE vm.vh_id = vh.vh_id AND vh.cin_id = ? AND vm.mov_id in (?);
	`;
	return queryDb(sql, [ cin_id, mov_ids ]);
}
