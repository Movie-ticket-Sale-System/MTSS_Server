/**
 * @api {get} {url}/api/cinemas/:cin_id 获取影院相关信息
 * @apiName getCinDetailInfo
 * @apiGroup Cinema
 * 
 * @apiParamExample Request Example
 *      /api/cinemas/5
 * 
 * @apiSuccessExample OK
 *       {
 *         "status": "OK",
 *         "data": {
 *           "cin_id": 5,
 *           "name": "大学城聚爱影院",
 *           "address": "广东省广州市番禺区大学城中环西路232号广州大学商业中心2层",
 *           "phone": "020-31061505",
 *           "jobtime": "10:00-22:00",
 *           "description": null,
 *           "movies": [
 *             {
 *               "mov_id": 1,
 *               "name": "春娇救志明",
 *               "type": "剧情 / 喜剧 / 爱情",
 *               "length": 117,
 *               "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2456056900.webp"
 *             },
 *             {
 *               "mov_id": 2,
 *               "name": "记忆大师",
 *               "type": "剧情 / 悬疑 / 惊悚 / 犯罪",
 *               "length": 119,
 *               "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2455156816.webp"
 *             },
 *             {
 *               "mov_id": 5,
 *               "name": "釜山行",
 *               "type": "动作 / 惊悚 / 灾难",
 *               "length": 118,
 *               "imgUrl": "https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2360940399.webp"
 *             },
 *             {
 *               "mov_id": 6,
 *               "name": "美国队长3",
 *               "type": "动作 / 科幻 / 冒险",
 *               "length": 148,
 *               "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2332503406.webp"
 *             }
 *           ],
 *           "comments": [],
 *           "vedio_hells": {
 *             "1": {
 *               "2018-5-10": [
 *                 {
 *                   "vh_mov_id": 70,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T10:00:00.000Z",
 *                   "price": "39",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 207,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T10:00:00.000Z",
 *                   "price": "39",
 *                   "name": "3号厅"
 *                 }
 *               ],
 *               "2018-6-10": [
 *                 {
 *                   "vh_mov_id": 344,
 *                   "type": "2D",
 *                   "starttime": "2018-06-10T10:00:00.000Z",
 *                   "price": "39",
 *                   "name": "3号厅"
 *                 }
 *               ],
 *               "2018-8-10": [
 *                 {
 *                   "vh_mov_id": 486,
 *                   "type": "2D",
 *                   "starttime": "2018-08-10T10:00:00.000Z",
 *                   "price": "39",
 *                   "name": "3号厅"
 *                 }
 *               ]
 *             },
 *             "2": {
 *               "2018-5-10": [
 *                 {
 *                   "vh_mov_id": 68,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 69,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T08:00:00.000Z",
 *                   "price": "30",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 71,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "1号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 72,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "2号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 205,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 206,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T08:00:00.000Z",
 *                   "price": "30",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 208,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "1号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 209,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "2号厅"
 *                 }
 *               ],
 *               "2018-6-10": [
 *                 {
 *                   "vh_mov_id": 342,
 *                   "type": "2D",
 *                   "starttime": "2018-06-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 343,
 *                   "type": "2D",
 *                   "starttime": "2018-06-10T08:00:00.000Z",
 *                   "price": "30",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 345,
 *                   "type": "2D",
 *                   "starttime": "2018-06-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "1号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 346,
 *                   "type": "2D",
 *                   "starttime": "2018-06-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "2号厅"
 *                 }
 *               ],
 *               "2018-8-10": [
 *                 {
 *                   "vh_mov_id": 484,
 *                   "type": "2D",
 *                   "starttime": "2018-08-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 485,
 *                   "type": "2D",
 *                   "starttime": "2018-08-10T08:00:00.000Z",
 *                   "price": "30",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 487,
 *                   "type": "2D",
 *                   "starttime": "2018-08-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "1号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 488,
 *                   "type": "2D",
 *                   "starttime": "2018-08-10T06:00:00.000Z",
 *                   "price": "39",
 *                   "name": "2号厅"
 *                 }
 *               ]
 *             },
 *             "5": {
 *               "2018-5-10": [
 *                 {
 *                   "vh_mov_id": 66,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T02:00:00.000Z",
 *                   "price": "30",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 203,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T02:00:00.000Z",
 *                   "price": "30",
 *                   "name": "3号厅"
 *                 }
 *               ],
 *               "2018-6-10": [
 *                 {
 *                   "vh_mov_id": 340,
 *                   "type": "2D",
 *                   "starttime": "2018-06-10T02:00:00.000Z",
 *                   "price": "30",
 *                   "name": "3号厅"
 *                 }
 *               ],
 *               "2018-8-10": [
 *                 {
 *                   "vh_mov_id": 482,
 *                   "type": "2D",
 *                   "starttime": "2018-08-10T02:00:00.000Z",
 *                   "price": "30",
 *                   "name": "3号厅"
 *                 }
 *               ]
 *             },
 *             "6": {
 *               "2018-5-10": [
 *                 {
 *                   "vh_mov_id": 67,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T04:00:00.000Z",
 *                   "price": "35",
 *                   "name": "3号厅"
 *                 },
 *                 {
 *                   "vh_mov_id": 204,
 *                   "type": "2D",
 *                   "starttime": "2018-05-10T04:00:00.000Z",
 *                   "price": "35",
 *                   "name": "3号厅"
 *                 }
 *               ],
 *               "2018-6-10": [
 *                 {
 *                   "vh_mov_id": 341,
 *                   "type": "2D",
 *                   "starttime": "2018-06-10T04:00:00.000Z",
 *                   "price": "35",
 *                   "name": "3号厅"
 *                 }
 *               ],
 *               "2018-8-10": [
 *                 {
 *                   "vh_mov_id": 483,
 *                   "type": "2D",
 *                   "starttime": "2018-08-10T04:00:00.000Z",
 *                   "price": "35",
 *                   "name": "3号厅"
 *                 }
 *               ]
 *             }
 *           }
 *         },
 *         "time": "2018-06-09T13:34:47.423Z",
 *         "msg": "信息获取成功",
 *         "user": null
 *       }
 */