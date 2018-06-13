/**
 * @api {post} {url}/api/movies/:mov_id/order 点击确认选座后返回数据
 * @apiName getBookData
 * @apiGroup Movie
 *
 * @apiParam {Number} vh_mov_id 影厅-电影id
 * @apiParam {Number} seat_id   座位id
 *
 * @apiParamExample Request Example
 *      {
 *      	"vh_mov_id":1,
 *      	"seats_id": [1],
 *        "price": 36
 *      }
 *
 * @apiSuccessExample OK
 *      {
 *        "status": "OK",
 *        "data": {
 *          "cinema": {
 *            "name": "大地影院",
 *            "address": "广州天河区奥体南路12号高德美居中心家居馆3楼"
 *          },
 *          "video_hell": {
 *            "name": "3号厅"
 *          },
 *          "movie": {
 *            "name": "守护者：世纪战元",
 *            "language": "俄语",
 *            "type": "2D",
 *            "starttime": "2017-05-10T02:00:00.000Z",
 *            "endtime": "2017-05-10T02:00:00.000Z",
 *            "price": "39"
 *          },
 *          "seats": [
 *            {
 *              "seat_id": 4,
 *              "col_raw": "0排3列"
 *            },
 *            {
 *              "seat_id": 5,
 *              "col_raw": "0排4列"
 *            }
 *          ],
 *          "tcks_id": [
 *            6,
 *            7
 *          ],
 *          "user": {
 *            "phone": "123456789",
 *            "pay_num": "123456789"
 *          }
 *        },
 *        "time": "2017-06-08T03:20:22.773Z",
 *        "msg": "座位预定成功，请支付",
 *        "user": {
 *          "id": 3,
 *          "phone": "123456789",
 *          "name": null
 *        }
 *      }
 *
 * @apiErrorExample NOT_AUTHORIZED
 *      {
 *        "status": "NOT_AUTHORIZED",
 *        "data": null,
 *        "time": "2017-05-01T14:50:21.694Z",
 *        "msg": "未登录",
 *        "user": null
 *      }
 *
 * @apiErrorExample ERROR
 *      {
 *        "status": "ERROR",
 *        "data": {
 *          "seats_id": [  // 已经被预定的座位id
 *            4,
 *            5
 *          ]
 *        },
 *        "time": "2017-06-07T19:06:30.870Z",
 *        "msg": "所选座位已被预定，请重新选择",
 *        "user": {
 *          "id": 3,
 *          "phone": "123456789",
 *          "name": null
 *        }
 *      }
 * 
 * @apiErrorExample ERROR
 *      {
 *        "status": "ERROR",
 *        "data": null,
 *        "time": "2017-06-08T01:56:37.438Z",
 *        "msg": "价格错误，应为78元",
 *        "user": {
 *          "id": 3,
 *          "phone": "123456789",
 *          "name": null
 *        }
 *      }
 */

/**
 * @api {post} {url}/api/movies/:mov_id/cancle 取消未支付订单
 * @apiName cancleOrder
 * @apiGroup Movie
 *
 * @apiParam {Number} seat_id 座位id
 *
 * @apiParamExample Request Example
 *      {
 *        "seat_id":2
 *      }
 *
 * @apiSuccessExample OK
 *      {
 *        "status": "OK",
 *        "data": null,
 *        "time": "2017-05-01T17:29:24.572Z",
 *        "msg": "订单撤销成功",
 *        "user": {
 *          "phone": "18819632589",
 *          "name": null
 *        }
 *      }
 *
 * @apiErrorExample FAIL
 *     {
 *       "status": "FAIL",
 *       "data": null,
 *       "time": "2017-05-01T17:57:10.900Z",
 *       "msg": "座位已被预定或未被预定，撤销失败",
 *       "user": {
 *         "id": 1,
 *         "phone": "18819632589",
 *         "name": null
 *       }
 *     }
 *
 * @apiErrorExample FAIL
 *     {
 *       "status": "FAIL",
 *       "data": null,
 *       "time": "2017-05-01T17:57:10.900Z",
 *       "msg": "座位不存在，撤销失败",
 *       "user": {
 *         "id": 1,
 *         "phone": "18819632589",
 *         "name": null
 *       }
 *     }
 *
 * @apiErrorExample NO_PERMISSION
 *     {
 *       "status": "NO_PERMISSION",
 *       "data": null,
 *       "time": "2017-05-01T17:57:10.900Z",
 *       "msg": "撤销需本人权限",
 *       "user": {
 *         "id": 1,
 *         "phone": "18819632589",
 *         "name": null
 *       }
 *     }
 */

/**
 * @api {post} {url}/movies/:mov_id/order/makesure 确认订单支付
 * @apiName makeSureTicket
 * @apiGroup Movie
 * 
 * @apiParam {Array} tcks_id 订单id
 * @apiParam {String} pay_num 支付账号
 * @apiParam {String} pay_pwd 支付密码
 * @apiParam {Number} price 总票价
 * 
 * @apiParamExample Request Example
 *      {
 *      	"tcks_id":[1,2],
 *      	"pay_num":"123",
 *      	"pay_pwd":"123",
 *      	"price": 78
 *      }
 * 
 * @apiSuccessExample OK
 *      {
 *        "status": "OK",
 *        "data": null,
 *        "time": "2017-06-08T04:39:55.597Z",
 *        "msg": "支付成功",
 *        "user": {
 *          "id": 3,
 *          "phone": "123456789",
 *          "name": null
 *        }
 *      }
 * 
 * @apiErrorExample ERROR
 *      {
 *        "status": "ERROR",
 *        "data": null,
 *        "time": "2017-06-08T04:47:47.301Z",
 *        "msg": "价格错误，应为78元",
 *        "user": {
 *          "id": 3,
 *          "phone": "123456789",
 *          "name": null
 *        }
 *      }
 * 
 * @apiErrorExample PERSSION_ERROR
 *      {
 *        "status": "PERSSION_ERROR",
 *        "data": null,
 *        "time": "2017-06-08T04:50:38.295Z",
 *        "msg": "支付需订票者权限",
 *        "user": {
 *          "id": 2,
 *          "phone": "18819253767",
 *          "name": null
 *        }
 *      }
 */