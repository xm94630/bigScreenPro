const router = require('koa-router')()

router.prefix('/koa')


//获取数据源url
router.get('/getDataUrl', async (ctx, next) => {
  let data = [{
    'id': 'urlId_00001',
    'url': 'http://www.xxx.com/data/pickingTaskTotal',
    'name': '当日拣货任务汇总',
    'describe': '这个是"当日拣货任务汇总"'
  }, {
    'id': 'urlId_00002',
    'url': 'http://www.xxx.com/data/pickingTaskManual',
    'name': '人工拣货每人拣货量',
    'describe': '这个是"人工拣货每人拣货量"'
  }, {
    'id': 'urlId_00003',
    'url': 'http://www.xxx.com/data/pickingTaskAGV',
    'name': 'AGV每工位拣货量',
    'describe': '这个是"AGV每工位拣货量"'
  }]
  ctx.body = {
    data: data
  }
})

//获取大屏位置配置信息
router.get('/getReportByCode', async (ctx, next) => {
  let code = ctx.request.query.code;
  let config = null;
  if ("yonghui1" == code) {
    //永辉大屏页面1的配置信息
    config = {
      'code': 'yonghui1',
      'pageId': 'pageId-00001',
      'canvas': {
        'width': 1000,
        'height': 600,
        'background': 'yellow',
      },
      'components': {
        'title': [{
          id: "componentId_00001",
          text: "上海会员物流拣货工作量",
          x: 200,
          y: 0,
          width: 400,
          height: 30,
          padding: 30,
          "font-size": 20,
          color: "yellow",
          border: "solid 2px blue",
          background: "green",
          "text-align": "center",
        },
        // {
        //   id: "componentId_00011",
        //   text: "我是个小标题目哈",
        //   x: 400,
        //   y: 400,
        //   width: 200,
        //   height: 50,
        //   padding: 2,
        //   "font-size": 20,
        //   color: "yellow",
        //   border: "solid 1px blue",
        //   background: "gray",
        //   "text-align": "center",
        // }
        ],
        'line': [{
          'id': 'componentId_00002',
          'x': 10,
          'y': 35,
          'width': 980,
          'height': 300,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'title': {
            'text': '当日拣货任务汇总',
            'color': '#000',
            'font-size': 12,
            'align': 'center',
          },
          'color': ['#fd9f82','blue'],
          'dataUrl': 'http://www.xxx.com/data/pickingTaskTotal',
        }],
        'bar': [{
          'id': 'componentId_00003',
          'x': 100,
          'y': 100,
          'width': 1000,
          'height': 800,
          'border': true,
          'title': {
            'text': '人工拣货每人拣货量',
            'color': '#000',
            'font-size': 12,
            'align': 'center',
          },
          'color': ['#666'],
          'dataUrl': 'http://www.xxx.com/data/pickingTaskManual',
        }, {
          'id': 'id_00004',
          'x': 100,
          'y': 100,
          'width': 1000,
          'height': 800,
          'border': true,
          'title': {
            'text': 'AGV每工位拣货量',
            'color': '#000',
            'font-size': 12,
            'align': 'center',
          },
          'color': ['#666'],
          'dataUrl': 'http://www.xxx.com/data/pickingTaskAGV',
        }],
        'timer': [{
          'id': 'id_00005',
          'x': 100,
          'y': 100,
          'width': 300,
          'height': 200,
          'color': '#000',
          'font-size': 12,
          'align': 'center',
        }]
      },
    }
  }
  if ("yonghui2" == code) {
    //永辉大屏页面1的配置信息
    config = {
      'code': 'yonghui2',
      'pageId': 'pageId-00001',
      'canvas': {
        'width': 1200,
        'height': 600,
        'background': 'yellow',
      },
      'components': {
        'title': [{
          id: "componentId_00002",
          text: "上海会员物流拣货工作量",
          x: 100,
          y: 100,
          width: 400,
          height: 200,
          padding: 20,
          "font-size": 50,
          color: "red",
          border: "solid 1px red",
          background: "orange",
          "text-align": "center",
        }],
        'line': [{
          'id': 'componentId_00002',
          'x': 100,
          'y': 100,
          'width': 1000,
          'height': 800,
          'border': true,
          'title': {
            'text': '当日拣货任务汇总',
            'color': '#000',
            'font-size': 12,
            'align': 'center',
          },
          'color': ['#666'],
          'dataUrl': 'http://www.xxx.com/data/pickingTaskTotal',
        }],
        'bar': [{
          'id': 'componentId_00003',
          'x': 100,
          'y': 100,
          'width': 1000,
          'height': 800,
          'border': true,
          'title': {
            'text': '人工拣货每人拣货量',
            'color': '#000',
            'font-size': 12,
            'align': 'center',
          },
          'color': ['#666'],
          'dataUrl': 'http://www.xxx.com/data/pickingTaskManual',
        }, {
          'id': 'id_00004',
          'x': 100,
          'y': 100,
          'width': 1000,
          'height': 800,
          'border': true,
          'title': {
            'text': 'AGV每工位拣货量',
            'color': '#000',
            'font-size': 12,
            'align': 'center',
          },
          'color': ['#666'],
          'dataUrl': 'http://www.xxx.com/data/pickingTaskAGV',
        }],
        'timer': [{
          'id': 'id_00005',
          'x': 100,
          'y': 100,
          'width': 300,
          'height': 200,
          'color': '#000',
          'font-size': 12,
          'align': 'center',
        }]
      },
    }
  }
  ctx.body = {
    data: config
  }
})

//创建大屏配置
router.get('/createReport', async (ctx, next) => {
  ctx.body = {
    data: {
      'info': '创建成功'
    }
  }
})

//该接口用来获取用户现有的全部报表页面
router.get('/getReportList', async (ctx, next) => {
  let data = [{
    code: "yonghui1",
    describe: '永辉大屏幕1'
  }, {
    code: "yonghui2",
    describe: '永辉大屏幕2'
  }]
  ctx.body = {
    data: data
  }
})










module.exports = router
