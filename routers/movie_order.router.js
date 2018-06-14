/**
 * @description Movie book routers
 */
const router = require('express').Router();
const mdCtrl = require('../controllers/movie_order.controller');

module.exports = app => app.use('/:mov_id/order', router);

router.post('/', mdCtrl.getBookData);

router.post('/cancel', mdCtrl.cancleOrder);

router.post('/makesure', mdCtrl.makeSureTicket);