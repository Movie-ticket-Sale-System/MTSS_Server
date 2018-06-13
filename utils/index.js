/*
 * 常用工具模块
 */

const config = require('../config/config');
// const Rx = require('rx');
const co = require('co');

exports = module.exports = {
  sendData,
  handleError,
  // toObservable
  cowrap,
  cowrapObj
}

function sendData(req, res, status, data, msg) {
  let time = new Date();
  let user = getParamData(req);
  return res.json({
    status,
    data,
    time,
    msg,
    user
  });
}

function getParamData(req) {
  const user = req.paramData.user;
  return user && {
    id: user.user_id,
    phone: user.phone,
    name: user.name
  } || null;
}

// function toObservable(fn, that) {
//   return Rx.Observable.fromNodeCallback(fn, that);
//   // return Rx.Observable.fromPromise(fn);
// }

function cowrap(gen) {
  let fn = co.wrap(gen);
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  }
}

function cowrapObj(obj) {
  let result = {};
  Object.keys(obj).forEach(key => {
    result[key] = cowrap(obj[key]);
  })
  return result;
}

function handleError(req, res, status, err, msg) {
  let time = new Date();
  if (err) console.error(err);
  else
    throw new Error('handleError 传入的 err 为 null');
  let data = null;
  let stack = err.stack;
  if (process.env.NODE_ENV === 'production') {
    stack = undefined;
  }
  res.json({
    status,
    data,
    time,
    msg,
    stack
  });
}