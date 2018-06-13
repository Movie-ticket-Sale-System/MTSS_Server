/**
 * @api {post} {url}/api/users/register/sms 获取短信验证码
 * @apiName sendSms
 * @apiGroup User
 *
 * @apiParam {String} phone 注册号码
 *
 * @apiParamExample Request Example
 *     {
 *     	"phone":"18819253766"
 *     }
 * 
 * @apiSuccessExample OK
 *     {
 *       "status": "OK",
 *       "data": null,
 *       "time": "2017-04-29T14:56:39.724Z",
 *       "msg": "验证码发送成功",
 *       "user": null
 *     }
 *
 * @apiErrorExample OPERATE_ERROR
 *     {
 *       "status": "OPERATE_ERROR",
 *       "data": null,
 *       "time": "2017-04-29T15:31:28.620Z",
 *       "msg": "验证码发送少于一分钟，发送失败",
 *       "user": null
 *     }
 *
 * @apiErrorExample USER_EXITS
 *     {
 *       "status": "USER_EXITS",
 *       "data": null,
 *       "time": "2017-04-29T15:31:28.620Z",
 *       "msg": "该号码已注册",
 *       "user": null
 *     }
 *
 * @apiErrorExample ERROR
 *     {
 *       "status": "ERROR",
 *       "data": null,
 *       "time": "2017-04-29T15:31:28.620Z",
 *       "msg": "验证码发送失败",
 *       "user": null
 *     }
 *
 * @apiErrorExample PARAM_ERROR
 *     {
 *       "status": "PARAM_ERROR",
 *       "data": null,
 *       "time": "2017-04-29T15:31:28.620Z",
 *       "msg": "参数错误",
 *       "user": null
 *     }
 */

/**
 * @api {post} {url}/api/users/register 用户注册
 * @apiName register
 * @apiGroup User
 *
 * @apiParam {String} phone 注册号码
 * @apiParam {String} password 密码
 * @apiParam {String} password2 重复密码
 * @apiParam {String} code 验证码
 *
 * @apiParamExample Request Example
 *     {
 *     	 "phone":"18819581710",
 *     	 "password":"123456789",
 *     	 "password2":"123456788",
 *     	 "code":"6818544"
 *     }
 * 
 * @apiSuccessExample OK
 *     {
 *       "status": "OK",
 *       "data": null,
 *       "time": "2017-04-29T16:41:05.182Z",
 *       "msg": "注册成功，请重新登录",
 *       "user": null
 *     }
 *
 * @apiErrorExample ERROR
 *     {
 *       "status": "ERROR",
 *       "data": null,
 *       "time": "2017-04-29T16:31:36.223Z",
 *       "msg": "验证码错误",
 *       "user": null
 *     }
 *
 * @apiErrorExample USER_EXITS
 *     {
 *       "status": "USER_EXITS",
 *       "data": null,
 *       "time": "2017-04-29T15:31:28.620Z",
 *       "msg": "该号码已注册",
 *       "user": null
 *     }
 *
 * @apiErrorExample PARAM_ERROR
 *     {
 *       "status": "PARAM_ERROR",
 *       "data": null,
 *       "time": "2017-04-29T15:31:28.620Z",
 *       "msg": "参数错误",
 *       "user": null
 *     }
 */

 /**
 * @api {post} {url}/api/users/login 用户登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} phone 登录号码
 * @apiParam {String} password 登录密码
 *
 * @apiParamExample Request Example
 *     {
 *     	 "phone":"18819581710",
 *     	 "password":"123456789"
 *     }
 * 
 * @apiSuccessExample OK
 *     {
 *       "status": "OK",
 *       "data": null,
 *       "time": "2017-04-29T17:38:20.152Z",
 *       "msg": "登录成功",
 *       "user": null
 *     }
 *
 * @apiErrorExample ERROR
 *     {
 *       "status": "ERROR",
 *       "data": null,
 *       "time": "2017-04-29T16:31:36.223Z",
 *       "msg": "账号或密码错误",
 *       "user": null
 *     }
 *
 * @apiErrorExample PARAM_ERROR
 *     {
 *       "status": "PARAM_ERROR",
 *       "data": null,
 *       "time": "2017-04-29T15:31:28.620Z",
 *       "msg": "参数错误",
 *       "user": null
 *     }
 */

 /**
 * @api {post} {url}/api/users/logout 用户注销
 * @apiName logout
 * @apiGroup User
 *
 * @apiParamExample Request API
 *    {url}/api/users/logout
 * 
 * @apiSuccessExample OK
 *     {
 *       "status": "OK",
 *       "data": null,
 *       "time": "2017-04-29T17:38:20.152Z",
 *       "msg": "注销成功",
 *       "user": null
 *     }
 */