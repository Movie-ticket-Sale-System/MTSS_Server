/**
 * @description Movie book routers
 */
const router = require('express').Router();
const peCtrl = require('../controllers/people.controller');

module.exports = app => app.use('/api/people', router);

router.param('peo_id', peCtrl.paramData);

router.get('/:peo_id', peCtrl.getPeopleInfo);