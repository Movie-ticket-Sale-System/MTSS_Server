/*
 * User controller
 * @create 2017/4/29
 * @author 陈海城
 */
const config = require('../config/config');
const { sendData, cowrapObj, handleError } = require('../utils');
const User = require('../models/user.model');
const { smsSend, getCode } = require('../services/sms');
const MD5 = require('md5');

module.exports = Object.assign({ logout }, 
  cowrapObj({
    sendSms,
    register,
    login
  })
)

/*
 * @description 发送短信验证码
 * @author 陈海城
 */
function* sendSms(req, res, next) {
  const { phone } = req.body;

  if (!phone)
    return sendData(req, res, 'PARAM_ERROR', null, '参数错误');

  let data, code, now;
  let isFirst = true;
  try {
    data = yield User.findUserByPhone(phone);
    if (data.length) return sendData(req, res, 'USER_EXITS', null, '该号码已注册');
    data = yield User.findRegisterByPhone(phone);
    if (data.length) { // 已经发过验证码
      isFirst = false;
      now = new Date();
      let before = new Date(now.getTime() - 1000 * 60); // 一分钟前
      if (before.getTime() < data[0].create_at.getTime()) { // 发送时间少于1分钟
        return sendData(req, res, 'OPERATE_ERROR', null, '验证码发送少于一分钟，发送失败');
      }
      // 判断是否过了十分钟，决定是否更新 code
      before = new Date(now.getTime() - 1000 * 60 * 10);
      code = data[0].code;
      if (before.getTime() > data[0].create_at.getTime())
        code = getCode();
    } else { // 未发过验证码
      code = getCode();
    }

    data = yield smsSend(phone, code);
    // console.log(data);
    if (true) {
      now = new Date(new Date().getTime())
      if (isFirst) 
        yield User.createOneRegisterRecord(phone, code, now);
      else
        yield User.updateRegisterTime(phone, code, now);
      return sendData(req, res, 'OK', null, '验证码发送成功');
    } else {
      return sendData(req, res, 'ERROR', null, '验证码发送失败');
    }

  } catch (err) {
    return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
  }
}

/*
 * @description 注册
 * @author 陈海城
 */
function* register(req, res, next) {
  const { phone, password, password2, code } = req.body;

  if (!phone || !password || !password2 || !code)
    return sendData(req, res, 'PARAM_ERROR', null, '参数错误');
  if (password !== password2)
    return sendData(req, res, 'PARAM_ERROR', null, '密码不一致');

  let data;
  try {
    data = yield User.findRegisterByPhone(phone);
    if (!data.length) return sendData(req, res, 'ERROR', null, '未经过短信验证码校验');
    if (data[0].code !== code) return sendData(req, res, 'ERROR', null, '验证码错误');
    // 判断验证码是否失效（10分钟为限）
    const now = new Date();
    const before = new Date(now.getTime() - 1000 * 60 * 10);
    if (before > data[0].create_at) return sendData(req, res, 'ERROR', null, '验证码已失效');

    data = yield User.findUserByPhone(phone);
    if (data.length) return sendData(req, res, 'USER_EXITS', null, '该号码已注册');

    yield User.createUser(phone, MD5(password + config.md5Key));
    return sendData(req, res, 'OK', null, '注册成功，请重新登录');
  } catch(err) {
    return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
  }
}

/*
 * @description 用户登录
 * @author 陈海城
 */
function* login(req, res, next) {
  const { phone, password } = req.body;
  if (!phone || !password)
    return sendData(req, res, 'PARAM_ERROR', null, '参数错误');

  if (req.session.user)
    return sendData(req, res, 'OK', null, '已经登录，无法重复登录');
  
  let data;
  try {
    data = yield User.findUserByPhone(phone);
    if (!data.length || data[0].password !== MD5(password + config.md5Key))
      return sendData(req, res, 'ERROR', null, '账号或密码错误');
    req.session.user = {
      user_id: data[0].user_id,
      phone: data[0].phone,
      pay_num: data[0].pay_num,
      name: data[0].name,
      create_at: data[0].create_at
    };
    return sendData(req, res, 'OK', null, '登录成功');
  } catch(err) {
    return handleError(req, res, 'DB_ERROR', err, '数据库查询错误');
  }
}

/*
 * @description 用户注销
 * @author 陈海城
 */
function logout(req, res, next) {
  if (req.session.hasOwnProperty('user')) {
    req.session.user = null;
    req.paramData.user = null;
  }
  return sendData(req, res, 'OK', null, '注销成功');
}
