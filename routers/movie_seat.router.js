/**
 * @description Movie seat Router
 * @create 2017/6/8
 * @author 陈海城
 */
let router = require('express').Router();
let msCtl = require('../controllers/movie_seat.controller');

module.exports = app => app.use('/:mov_id/seats', router);

router.get('/', msCtl.getSeatsInfo);