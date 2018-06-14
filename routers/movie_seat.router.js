/**
 * @description Movie book routers
 */
let router = require('express').Router();
let msCtl = require('../controllers/movie_seat.controller');

module.exports = app => app.use('/:mov_id/seats', router);

router.get('/', msCtl.getSeatsInfo);