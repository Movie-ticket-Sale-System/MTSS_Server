## 项目运行
在项目跟目录下运行`node server.js`即可启动项目

## api文档生成
在项目跟目录下运行`sudo apidoc -i apiDocs/ -o docs/`，即可在`docs/`文件夹下生成API文档

## ctags使用
`ctags -R -f .tags`在项目目录下生成`.tags`文件，然后
```js
ctrl+t   ctrl+t   //鼠标在函数出执行，跳到函数处  
ctrl+t   ctrl+b  //调回函数
```

## 数据库表格

### register表

|     字段     |     类型      |  空   |  默认  |  注释   |
| :--------: | :---------: | :--: | :--: | :---: |
| **reg_id** | bigint(20)  |  No  |      | 注册id  |
|   phone    | varchar(64) |  No  |      | 注册号码  |
|    code    |  char(32)   |  No  |      | 注册验证码 |

### user表

|     字段      |      类型      |  空   |        默认         |   注释    |
| :---------: | :----------: | :--: | :---------------: | :-----: |
| **user_id** |  bigint(20)  |  No  |                   |  用户id   |
|    phone    | varchar(64)  |  No  |                   |  电话号码   |
|  password   |   char(32)   |  No  |                   | 密码，加密保存 |
|    name     | varchar(128) | Yes  |       NULL        |   用户名   |
|   pay_num   | varchar(64)  | Yes  |       NULL        |  支付账号   |
|  create_at  |   datetime   | Yes  | CURRENT_TIMESTAMP |  注册时间   |

### movie表

|     字段      |      类型      |  空   |  默认  |   注释   |
| :---------: | :----------: | :--: | :--: | :----: |
| **mov_id**  |  bigint(20)  |  No  |      |  电影id  |
|    name     | varchar(128) |  No  |      |  电影名   |
|    grade    |    float     | Yes  |  0   |   评分   |
|  starttime  |   datetime   |  No  |      |  上映时间  |
|    type     |     text     | Yes  | NULL |  影片类型  |
|   region    |     text     | Yes  | NULL | 国家/地区  |
|  language   |   char(32)   |  No  |      |   语言   |
|   length    |  tinyint(3)  |  No  |      |   片长   |
|   imgUrl    |     text     | Yes  | NULL | 海报url  |
|  prevueUrl  |     text     | Yes  | NULL | 预告片url |
| description |     text     | Yes  | NULL |  电影简介  |

### mov_peo表（电影与主演/编剧/导演关系表）

|       字段       |     类型     |  空   |  默认  |          注释           |
| :------------: | :--------: | :--: | :--: | :-------------------: |
| **mov_peo_id** | bigint(20) |  No  |      |        电影-主演id        |
|     mov_id     | bigint(20) |  No  |      |         电影id          |
|     peo_id     | bigint(20) |  No  |      |         主演id          |
|      flag      | tinyint(1) | Yes  |  0   | 0是未定义，1是演员，2是编剧, 3是导演 |

### people表(用于存放演员/导演/编剧信息)

|     字段      |      类型      |  空   |  默认  |     注释     |
| :---------: | :----------: | :--: | :--: | :--------: |
| **peo_id**  |  bigint(20)  |  No  |      |            |
|    name     | varchar(128) |  No  |      |     名字     |
|   gender    |  tinyint(1)  |  No  |      | 性别,0为女，1为男 |
|     job     |   tinytext   | Yes  | NULL |     工作     |
|  birthday   |   datetime   | Yes  | NULL |    出生日期    |
| description |     text     | Yes  | NULL |     简介     |

### cinema表

|     字段      |      类型      |  空   |      默认       |  注释  |
| :---------: | :----------: | :--: | :-----------: | :--: |
| **cin_id**  |  bigint(20)  |  No  |               | 影院id |
|    name     | varchar(128) |  No  |               | 影院名  |
|   address   |     text     |  No  |               | 影院地址 |
| description |     text     | Yes  |               | 影院介绍 |
|    phone    | varchar(64)  | Yes  |     NULL      | 影院电话 |
|   jobtime   |     text     | Yes  | "09:00-23:30" | 上班时间 |

### video_hell表

|     字段      |      类型      |  空   |  默认  |  注释   |
| :---------: | :----------: | :--: | :--: | :---: |
|  **vh_id**  |  bigint(20)  |  No  |      | 放映厅id |
|   cin_id    |  bigint(20)  |  No  |      | 影院id  |
|    name     | varchar(128) | Yes  | NULL |  影厅名  |
|   number    |   char(32)   |  No  |      | 影厅编号  |
| screen_size |   char(32)   |  No  |      | 屏幕尺寸  |

### video_movie表

|      字段       |        类型        |  空   |  默认  |    注释    |
| :-----------: | :--------------: | :--: | :--: | :------: |
| **vh_mov_id** |    bigint(20)    |  No  |      | 放映厅-电影id |
|     vh_id     |    bigint(20)    |  No  |      |  放映厅id   |
|    mov_id     |    bigint(20)    |  No  |      |   电影id   |
|     type      | enum("3D", "2D") | Yes  | "2D" |   影片效果   |
|   starttime   |     datetime     |  No  |      |   播放时间   |
|    endtime    |     datetime     |  No  |      |   结束时间   |
|     price     |       text       |  No  |      |    票价    |

### seat表

|     字段      |     类型     |  空   |  默认  |          注释           |
| :---------: | :--------: | :--: | :--: | :-------------------: |
| **seat_id** | bigint(20) |  No  |      |         座位id          |
|    vh_id    | bigint(20) |  No  |      |         放映厅id         |
|   status    |  Boolean   | Yes  |  0   | 座位状态，0-有效，1-待支付，2-已预定 |
|   row_col   |   String   |  No  |      |      表示该座位是几排几座       |
|   user_id   | bigint(20) | Yes  | NULL |    座位预定者（无时为null）     |

### ticket表

|     字段     |     类型     |  空   |        默认         |        注释         |
| :--------: | :--------: | :--: | :---------------: | :---------------: |
| **tkt_id** | bigint(20) |  No  |                   |       订票id        |
|  user_id   | bigint(20) |  No  |                   |       用户id        |
| vh_mov_id  | bigint(20) |  No  |                   |   放映厅-电影-播放时间id   |
|  seat_id   | bigint(20) |  No  |                   |       座位id        |
|   status   |  Boolean   | Yes  |         0         | 0——订单未支付，1——订单已支付 |
| create_at  |  datetime  | Yes  | CURRENT_TIMESTAMP |      订单创建时间       |

### cinema_comment表（影院评论表）

|     字段      |     类型     |  空   |        默认         |  注释   |
| :---------: | :--------: | :--: | :---------------: | :---: |
| **com_id**  | bigint(20) |  No  |                   | 评论id  |
|   cin_id    | bigint(20) |  No  |                   | 影院id  |
|   user_id   | bigint(20) |  No  |                   | 评论者id |
| description |    text    |  No  |                   | 评论内容  |
|  create_at  |  datetime  | Yes  | CURRENT_TIMESTAMP | 创建时间  |

## 数据交互格式

#### 电影信息+播放该电影的影院-影厅信息
```js
{
  "mov_id":,     // 电影id
  "starttime",   // 上映时间
  "grade":,      // 电影评分
  "directors": [ // 导游
    {
      "name",    // 名字
      "peo_id"   // 人物id
    }
  ],
  "scriptswriters": [ // 编剧
    {
      "name":,
      "peo_id":
    }
  ]
  "actors": [    // 主演
    {
      "name":,
      "peo_id"：
    }
  ],
  "type":,         // 电影类型
  "region":,       // 拍摄地点
  "language":,     // 语言
  "description":,  // 简介
  "play_cinema": [ // 影院
    {
      "cin_id":,   // 影院id
      "name":,     // 电影院名
      "address":,  // 影院地址
      "detail": [
        "data":,   // 播放日期，如1月10日
        "video_hell": [ // 播放影厅
          {
            "vh_mov_id":,   // 影厅-电影id
            "name":,    // 影厅名
            "price":,    // 票价
            "starttime":,    // 播放时间，如9:30
            "endtime":  // 结束时间
          }
        ]
      ]
    }
  ]
}
```

#### 支付页面展示数据
```js
{
  "vh_mov_id":,     // 影厅-电影id
  "cinema": {       // 电影名
    "name":,
    "address":
  },
  "video_hell": {   // 电影放映厅
    "name":
  },
  "movie": {
    "name":,
    "language":,
    "type":,
    "starttime":,　//　播放时间
    "endtime":,    // 结束时间
    "price":,      // 票价
  },
  "seat": {          // 选定座位
    "seat_id":,
    "row_col":,
  },
  "user": {
    "phone":,
    "pay_num":
  }
}
```

#### 订票时向后台发送的数据
```js
{
  "vh_mov_id":, // 影厅-电影id
  "seat_id":,   // 选定座位id
}
```

#### 影院信息页面展示数据
```js
// 待定
```
