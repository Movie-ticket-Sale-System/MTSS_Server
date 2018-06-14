/**
 * @description Movie book routers
 */
const router = require('express').Router();
const cmCtrl = require('../controllers/cinema.controller');

module.exports = app => app.use('/api/cinemas', router);

router.param('cin_id', cmCtrl.paramData);

router.get('/:cin_id', cmCtrl.getCinDetailInfo);