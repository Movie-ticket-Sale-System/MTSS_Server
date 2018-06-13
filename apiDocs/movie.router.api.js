/**
 * @api {get} {url}/api/movie/:mov_id 获取具体某部电影的信息
 * @apiName getMovieDetail
 * @apiGroup Movie
 *
 * @apiParamExample Request API
 *      /api/movies/2 // 获取 id 为2的电影信息
 *
 * @apiSuccessExample OK
 *      {
 *        "status": "OK",
 *        "data": {
 *          "mov_id": 2,
 *          "name": "记忆大师",
 *          "grade": 7.4,
 *          "starttime": "2017-04-27T16:00:00.000Z",
 *          "type": "剧情 / 悬疑 / 惊悚 / 犯罪",
 *          "place": "中国大陆",
 *          "language": "汉语普通话",
 *          "length": 119,
 *          "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2455156816.webp",
 *          "prevueUrl": null,
 *          "description": "<span property=\"v:summary\" class=\"\">\n\n                                　　故事发生在2025年，因为和妻子张代晨（徐静蕾 饰）婚姻破裂，男主角江丰（黄渤 饰）走进记忆大师医疗中心接受手术，却不料手术失误记忆被错误重载，他莫名其妙变成了“杀人凶手”。警官沈汉强（段奕宏 饰）的穷追不舍让他逐渐发现，自己脑内的错误记忆不仅是破案的关键，更是救赎自己的唯一希望。与此同时，妻子身边出现的女人陈姗姗（杨子姗 饰）、记忆中浮现出的神秘女子（许玮甯 饰），似乎也和真相有着千丝万缕的联系，一场记忆烧脑战也随之开始。\n\n                        </span>",
 *          "directors": [
 *            {
 *              "name": "陈正道",
 *              "id": 9
 *            }
 *          ],
 *          "scriptwriters": [
 *            {
 *              "name": "任鹏",
 *              "id": 10
 *            }
 *          ],
 *          "actors": [
 *            {
 *              "name": "段奕宏",
 *              "id": 13
 *            },
 *            {
 *              "name": "杨子姗",
 *              "id": 14
 *            },
 *            {
 *              "name": "黄渤",
 *              "id": 11
 *            },
 *            {
 *              "name": "徐静蕾",
 *              "id": 12
 *            }
 *          ]
 *        },
 *        "time": "2017-04-30T12:29:45.916Z",
 *        "msg": "电影信息获取成功",
 *        "user": null
 *      }
 *
 * @apiErrorExample PARAM_ERROR
 *      {
 *        "status": "PARAM_ERROR",
 *        "data": null,
 *        "time": "2017-04-30T12:39:24.443Z",
 *        "msg": "电影不存在",
 *        "user": null
 *      }
 */

/**
 * @api {get} {url}/api/movies/:mov_id/cinemas 获取具体某部电影+播放该电影的影院-影厅信息
 * @apiName getMovieAndPlayingDetail
 * @apiGroup Movie
 *
 * @apiParamExample Request API
 *      api/movies/4/cinemas // 获取 id 为 4 的电影以及播放该电影的影院-影厅信息
 *
 * @apiSuccessExample OK
 *      {
 *        "status": "OK",
 *        "data": {
 *          "mov_id": 5,
 *          "name": "釜山行",
 *          "grade": 8.2,
 *          "starttime": "2016-07-19T16:00:00.000Z",
 *          "type": "动作 / 惊悚 / 灾难",
 *          "region": "韩国",
 *          "language": "韩语",
 *          "length": 118,
 *          "imgUrl": "https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2360940399.webp",
 *          "prevueUrl": null,
 *          "description": "<span property=\"v:summary\" class=\"\">\n\n                                　　证券公司基金管理人石宇（孔侑 饰）光鲜精干，却也是个重利轻义之徒。妻子为此与之决裂，女儿秀安（金秀安 饰）则对如此自私的父亲越来越失望，决定前往釜山和母亲生活。在秀安生日这天，石宇抽出时间陪伴女儿登上开往釜山的特快列车。而与此同时，城市四处出现了极为可疑的暴动事件。政府极力洗白无法掩盖丧尸肆虐的事实，即便懵然无知的列车乘客也因为不速之客的到来而堕入恐慌绝望的地狱中。开车的刹那，一名感染者冲入车厢，而她很快尸变并对目光所及之处的健康人展开血腥屠杀。未过多久，丧尸便呈几何数爆发性地增长。石宇被迫和幸存者的乘客们在逼仄的空间中奋力求生。\n\n                                    <br>\n                                　　通往釜山的遥遥旅途布满杀机，危难时刻每个幸存者的人性也承受巨大的考验……\n\n                        </span>",
 *          "directors": [
 *            {
 *              "name": "延尚昊",
 *              "id": 22
 *            }
 *          ],
 *          "scriptwriters": [
 *            {
 *              "name": "延尚昊",
 *              "id": 22
 *            }
 *          ],
 *          "actors": [
 *            {
 *              "name": "金秀安",
 *              "id": 26
 *            },
 *            {
 *              "name": "孔侑",
 *              "id": 23
 *            },
 *            {
 *              "name": "郑有美",
 *              "id": 24
 *            },
 *            {
 *              "name": "马东锡",
 *              "id": 25
 *            }
 *          ],
 *          "play_cinemas": [
 *            {
 *              "cin_id": 1,
 *              "name": "大地影院",
 *              "address": "广州天河区奥体南路12号高德美居中心家居馆3楼",
 *              "detail": [
 *                {
 *                  "date": "4月10日",
 *                  "video_hell": [
 *                    {
 *                      "vh_mov_id": 5,
 *                      "vh_id": 1,
 *                      "name": "3号厅",
 *                      "price": "40",
 *                      "starttime": "18:00",
 *                      "endtime": "19:30"
 *                    },
 *                    {
 *                      "vh_mov_id": 10,
 *                      "vh_id": 2,
 *                      "name": "2号厅",
 *                      "price": "39",
 *                      "starttime": "12:40",
 *                      "endtime": "13:30"
 *                    },
 *                    {
 *                      "vh_mov_id": 142,
 *                      "vh_id": 1,
 *                      "name": "3号厅",
 *                      "price": "40",
 *                      "starttime": "18:00",
 *                      "endtime": "19:30"
 *                    },
 *                    {
 *                      "vh_mov_id": 147,
 *                      "vh_id": 2,
 *                      "name": "2号厅",
 *                      "price": "39",
 *                      "starttime": "12:40",
 *                      "endtime": "13:30"
 *                    }
 *                  ]
 *                },
 *                {
 *                  "date": "5月10日",
 *                  "video_hell": [
 *                    {
 *                      "vh_mov_id": 279,
 *                      "vh_id": 1,
 *                      "name": "3号厅",
 *                      "price": "40",
 *                      "starttime": "18:00",
 *                      "endtime": "19:30"
 *                    },
 *                    {
 *                      "vh_mov_id": 284,
 *                      "vh_id": 2,
 *                      "name": "2号厅",
 *                      "price": "39",
 *                      "starttime": "12:40",
 *                      "endtime": "13:30"
 *                    }
 *                  ]
 *                }
 *              ]
 *            },
 *            ......
 *            {
 *              "cin_id": 10,
 *              "name": "天幕新彩云国际影城",
 *              "address": "\n\n北京市海淀区北三环中路67号中视云投大厦1F-3F 天幕新彩云影城",
 *              "detail": [
 *                {
 *                  "date": "4月10日",
 *                  "video_hell": [
 *                    {
 *                      "vh_mov_id": 114,
 *                      "vh_id": 39,
 *                      "name": "1号厅",
 *                      "price": "32",
 *                      "starttime": "18:00",
 *                      "endtime": "19:30"
 *                    }
 *                  ]
 *                },
 *                {
 *                  "date": "5月10日",
 *                  "video_hell": [
 *                    {
 *                      "vh_mov_id": 388,
 *                      "vh_id": 39,
 *                      "name": "1号厅",
 *                      "price": "32",
 *                      "starttime": "18:00",
 *                      "endtime": "19:30"
 *                    }
 *                  ]
 *                },
 *                {
 *                  "date": "8月10日",
 *                  "video_hell": [
 *                    {
 *                      "vh_mov_id": 530,
 *                      "vh_id": 39,
 *                      "name": "1号厅",
 *                      "price": "32",
 *                      "starttime": "18:00",
 *                      "endtime": "19:30"
 *                    }
 *                  ]
 *                }
 *              ]
 *            }
 *          ]
 *        },
 *        "time": "2017-06-09T15:26:17.157Z",
 *        "msg": "电影+播放信息获取成功",
 *        "user": null
 *      }
 *
 * @apiErrorExample PARAM_ERROR
 *      {
 *        "status": "PARAM_ERROR",
 *        "data": null,
 *        "time": "2017-04-30T12:39:24.443Z",
 *        "msg": "电影不存在",
 *        "user": null
 *      }
 */

/**
 * @api {get} {url}api/movies/ 获取电影列表
 * @apiName getMoviesList
 * @apiGroup Movie
 * 
 * @apiParamExample Request Example
 *        /api/movies/
 * 
 * @apiSuccessExample OK
 *       {
 *         "status": "OK",
 *         "data": {
 *           "now": [
 *             {
 *               "mov_id": 1,
 *               "name": "春娇救志明",
 *               "grade": 7.7,
 *               "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2456056900.webp"
 *             },
 *             {
 *               "mov_id": 2,
 *               "name": "记忆大师",
 *               "grade": 7.4,
 *               "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2455156816.webp"
 *             },
 *             {
 *               "mov_id": 3,
 *               "name": "速度与激情8",
 *               "grade": 7.2,
 *               "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2444256500.webp"
 *             },
 *             {
 *               "mov_id": 4,
 *               "name": "守护者：世纪战元",
 *               "grade": 4,
 *               "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2437307414.webp"
 *             }
 *           ],
 *           "feature": [
 *             {
 *               "mov_id": 11,
 *               "name": "在这世界的角落",
 *               "grade": 7.7,
 *               "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2384601603.webp"
 *             },
 *             {
 *               "mov_id": 13,
 *               "name": "非凡任务",
 *               "grade": 6.4,
 *               "imgUrl": "https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2453197648.webp"
 *             },
 *             {
 *               "mov_id": 12,
 *               "name": "声之形 聲の形",
 *               "grade": 7.8,
 *               "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2399176645.webp"
 *             },
 *             {
 *               "mov_id": 14,
 *               "name": "战争机器",
 *               "grade": 6,
 *               "imgUrl": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2458748574.webp"
 *             }
 *           ],
 *           "rank": [
 *             {
 *               "mov_id": 10,
 *               "name": "摔跤吧！爸爸 Dangal",
 *               "grade": 9.2
 *             },
 *             {
 *               "mov_id": 5,
 *               "name": "釜山行",
 *               "grade": 8.2
 *             },
 *             {
 *               "mov_id": 12,
 *               "name": "声之形 聲の形",
 *               "grade": 7.8
 *             },
 *             {
 *               "mov_id": 1,
 *               "name": "春娇救志明",
 *               "grade": 7.7
 *             },
 *             {
 *               "mov_id": 6,
 *               "name": "美国队长3",
 *               "grade": 7.7
 *             },
 *             {
 *               "mov_id": 11,
 *               "name": "在这世界的角落",
 *               "grade": 7.7
 *             },
 *             {
 *               "mov_id": 2,
 *               "name": "记忆大师",
 *               "grade": 7.4
 *             },
 *             {
 *               "mov_id": 8,
 *               "name": "加勒比海盗5：死无对证",
 *               "grade": 7.4
 *             },
 *             {
 *               "mov_id": 7,
 *               "name": "神奇女侠 Wonder Woman",
 *               "grade": 7.3
 *             },
 *             {
 *               "mov_id": 3,
 *               "name": "速度与激情8",
 *               "grade": 7.2
 *             }
 *           ]
 *         },
 *         "time": "2017-06-08T13:12:53.751Z",
 *         "msg": "数据获取成功",
 *         "user": null
 *       }
 * 
 */

/**
 * @api {get} {url}/api/movies/search?name={...} 搜索影片
 * @apiName searchMovie
 * @apiGroup Movie
 * 
 * @apiParamExample Request Example
 *     /api/movies/search?name=神奇
 * 
 * @apiSuccessExample OK
 *      {
 *        "status": "OK",
 *        "data": [
 *          {
 *            "name": "神奇女侠 Wonder Woman",
 *            "mov_id": 7
 *          }
 *        ],
 *        "time": "2017-06-08T17:09:07.990Z",
 *        "msg": "数据获取成功",
 *        "user": null
 *      }
 */