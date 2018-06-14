/**
 * @description Movie book routers
 */
const router = require('express').Router();
const usrCtrl = require('../controllers/user.controller');

module.exports = app => app.use('/api/users', router);

router.post('/register', usrCtrl.register);

router.post('/register/sms', usrCtrl.sendSms);

router.post('/login', usrCtrl.login);

router.post('/logout', usrCtrl.logout);