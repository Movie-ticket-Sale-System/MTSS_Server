/**
 * @description Movie book models
 */
const { queryDb } = require('../services/db');

module.exports = {
	findBookDataById,
  isSeatBelongToVideoHell,
	createTickes,
	changeTickesState,
	checkTicketsBelongToUser
}


function findBookDataById(vh_mov_id) {
	const sql = `
		SELECT ?, cm.name AS cin_name, cm.address, vh.name AS vh_name,
					 vm.price, vm.type, vm.starttime, vm.endtime
		FROM video_movie vm, cinema cm, video_hell vh
		WHERE vm.vh_mov_id = ? AND vh.vh_id = vm.vh_id AND vh.cin_id = cm.cin_id;
	`;
	return queryDb(sql, [ vh_mov_id, vh_mov_id ]);
}

function isSeatBelongToVideoHell(vh_mov_id, seats_id) {
  const sql = `
    SELECT st.seat_id, st.row_col
    FROM video_movie vm, seat st
    WHERE vm.vh_mov_id = ? AND vm.vh_id = st.vh_id AND st.seat_id in (?);
  `;
  return queryDb(sql, [ vh_mov_id, seats_id ]);
}


function createTickes(user_id, vh_mov_id, seats_id) {
	const sql = `
		INSERT INTO ticket (user_id, vh_mov_id, seat_id)
		VALUES ` + seats_id.map(id => `(${user_id}, ${vh_mov_id}, ${id})`).join(',') + ';';
	return queryDb(sql, []);
} 


function changeTickesState(tcks_id, status) {
	const sql = 'UPDATE ticket SET status = ? WHERE tck_id in (?);';
	return queryDb(sql, [ status, tcks_id ]);
}


function checkTicketsBelongToUser(tcks_id, user_id) {
	const sql = 'SELECT * FROM ticket WHERE user_id = ? AND tck_id IN (?);'
	return queryDb(sql, [ user_id, tcks_id ]);
}