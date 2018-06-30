/**
 * @api {get} {url}/api/movies/:mov_id/seats?vh_id={...} 获取选定影厅的座位状态信息
 * @apiName getSeatsInfo
 * @apiGroup Movie
 * 
 * @apiParam {Number} vh_id 影厅id
 * 
 * @apiParamExample Request Example
 *      /api/movies/4/seats?vh_id=1
 * 
 * @apiSuccessExample OK
 *      {
 *        "status": "OK",
 *        "data": {
 *          "seats": [
 *            {
 *              "seat_id": 1,
 *              "valid": true,
 *              "row_col": "0排0列"
 *            },
 *            {
 *              "seat_id": 2,
 *              "valid": false,
 *              "row_col": "0排1列"
 *            },
 *            {
 *              "seat_id": 3,
 *              "valid": trur,
 *              "row_col": "0排2列"
 *            },
 *            {
 *              "seat_id": 4,
 *              "valid": false,
 *              "row_col": "0排3列"
 *            },
 *            ......
 *            {
 *              "seat_id": 72,
 *              "valid": false,
 *              "row_col": "7排8列"
 *            }
 *          ]
 *        },
 *        "time": "2018-06-07T19:19:01.783Z",
 *        "msg": "数据获取成功",
 *        "user": {
 *          "id": 3,
 *          "phone": "123456789",
 *          "name": null
 *        }
 *      }
 * 
 * @apiErrorExample PARAM_ERROR
 *      {
 *        "status": "PARAM_ERROR",
 *        "data": null,
 *        "time": "2018-06-07T19:24:26.754Z",
 *        "msg": "参数错误",
 *        "user": {
 *          "id": 3,
 *          "phone": "123456789",
 *          "name": null
 *        }
 *      }
 */