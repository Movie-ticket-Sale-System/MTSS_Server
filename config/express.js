/*
 *  配置express各种中间件
 */
const config = require('./config');

const express = require('express');

const path = require('path');

const favicon = require('serve-favicon');

const logger = require('morgan');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const sessionStore = new require('express-mysql-session')(config.db);

const { sendData } = require('../utils');

module.exports = () => {
  let app = express();
  setExpressMiddleWare(app);
  // setCrossDomainRequst(app);
  setExpressParamData(app);
  setExpressAuth(app);
  setExpressRoutes(app);
  return app;
}

/*
 * 设置常见中间件
 */
function setExpressMiddleWare(app) {
  app.use(logger('dev'));
  // 解析json请求
  app.use(bodyParser.json());
  // 解析form请求
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session(getSessionOptions()));
}

/*
 * 设置跨域访问
 */
function setCrossDomainRequst(app) {
  app.all('/*', function(req, res, next) {
    console.log(req.h)
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods","*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
}

/*
 * 初始化 paramData 用于存放数据
 * @param {[type]} app [description]
 */
function setExpressParamData(app) {
  app.all('/*', (req, res, next) => {
    req.paramData = {};
    next();
  });
}

/*
 * Session Option
 */
function getSessionOptions() {
  return {
    // 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 
    name: 'eMovie-System-id',
    // session 的存储方式，默认存放在内存中
    store: sessionStore,
    // 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    secret: 'chenhch8-eMovie-system',
    // 指每次请求都重新设置session cookie，默认为 true
    resave: false,
    // 指无论有没有session cookie，每次请求都设置个session cookie 
    saveUninitialized: true,
    // 设置存放 session id 的 cookie 的相关选项
    cookie: {
      path: '/',
      httpOnly: true,
      // 应用在https
      secure: false,
      // maxAge: 60*60*1000
    }
  }
}

function setExpressAuth(app) {
  const whiteList = [
    '/api/users/login',
    '/api/users/register',
    '/api/users/register/sms',
    '/api/movies',
    '/api/people',
    '/api/cinema'
  ];
  app.all('/*', function(req, res, next) {
    if (!req.session.user && !isWhiteList(req.path) && req.method === 'POST') {
      req.paramData.user = null;
      return sendData(req, res, 'NOT_AUTHORIZED', null, '未登录');
    } else {
      req.paramData.user = req.session.user;
      return next();
    }
  });
  function isWhiteList(path) {
    return whiteList.some(onepath => path === onepath)
  }
}

/*
 * 路由挂载
 */
function setExpressRoutes(app) {
  const routes = [
    'user',
    'movie',
    'people',
    'cinema'
  ];
  routes.forEach(route => require(config.root + '/routers/' + route + '.router.js')(app));
}
