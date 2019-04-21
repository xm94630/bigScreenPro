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
          x: 300,
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
          'dataUrl': 'koaData/yonghui_line',
        },
        // {
        //   'id': 'componentId_00002_2',
        //   'x': 10,
        //   'y': 340,
        //   'width': 400,
        //   'height': 250,
        //   'border': 'solid 1px #333',
        //   'padding':20,
        //   'background':'#fff',
        //   'title': {
        //     'text': '我也是折线图',
        //     'color': '#000',
        //     'font-size': 12,
        //     'align': 'center',
        //   },
        //   'color': ['#fd9f82','blue'],
        //   'dataUrl': 'koaData/yonghui_line2',
        // }
      ],
        'bar': [{
          'id': 'componentId_00003',
          'x': 10,
          'y': 345,
          'width': 480,
          'height': 240,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'title': {
            'text': '人工拣货每人拣货量',
            'color': '#000',
            'font-size': 16,
            'align': 'center',
          },
          'color': ['#666'],
          'dataUrl': 'koaData/yonghui_bar1',
        },{
          'id': 'componentId_00003_2',
          'x': 500,
          'y': 345,
          'width': 490,
          'height': 240,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'title': {
            'text': 'AGV每工位拣货量',
            'color': '#000',
            'font-size': 16,
            'align': 'center',
          },
          'color': ['#666'],
          'dataUrl': 'koaData/yonghui_bar2',
        }],
        'dater': [{
          'id': 'id_00005',
          'x': 800,
          'y': 10,
          'width': 180,
          'height': 14,
          'border': 'none',
          'padding':0,
          'background':'#fff',
          'color': '#000',
          'font-size': 14,
          'text-align': 'center',
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
          x: 860,
          y: 20,
          width: 320,
          height: 150,
          padding: 20,
          "font-size": 50,
          color: "red",
          border: "solid 1px red",
          background: "orange",
          "text-align": "center",
        }],
        'card': [{
          'title':'任务总量',
          'text1':'SKU',
          'text2':'E数',
          'state':0,
          'x': 20,
          'y': 20,
          'width': 200,
          'height': 100,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'dataUrl': 'koaData/yonghui_card1',
        },{
          'title':'已完成',
          'text1':'SKU',
          'text2':'E数',
          'state':1,
          'x': 230,
          'y': 20,
          'width': 200,
          'height': 100,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'dataUrl': 'koaData/yonghui_card2',
        },{
          'title':'进行中',
          'text1':'SKU',
          'text2':'E数',
          'state':1,
          'x': 440,
          'y': 20,
          'width': 200,
          'height': 100,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'dataUrl': 'koaData/yonghui_card3',
        },{
          'title':'未完成',
          'text1':'SKU',
          'text2':'E数',
          'state':3,
          'x': 650,
          'y': 20,
          'width': 200,
          'height': 100,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'dataUrl': 'koaData/yonghui_card4',
        },{
          'title':'上海永辉门店数统计信息',
          'text1':'已经完成',
          'text2':'未完成',
          'state':0,
          'x': 20,
          'y': 130,
          'width': 410,
          'height': 100,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'dataUrl': 'koaData/yonghui_card5',
        }],

        'line': [{
          'id': 'componentId_00002',
          'x': 20,
          'y': 240,
          'width': 410,
          'height': 340,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'title': {
            'text': '拣货汇总',
            'color': '#000',
            'font-size': 12,
            'align': 'center',
          },
          'color': ['#fd9f82','blue'],
          'dataUrl': 'koaData/yonghui_line',
        },],
        'bar': [{
          'id': 'componentId_00003',
          'x': 440,
          'y': 130,
          'width': 410,
          'height': 220,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'title': {
            'text': '柱状图',
            'color': '#000',
            'font-size': 16,
            'align': 'center',
          },
          'color': ['#666'],
          'dataUrl': 'koaData/yonghui_bar1',
        },{
          'id': 'componentId_00009',
          'x': 440,
          'y': 360,
          'width': 410,
          'height': 220,
          'border': 'solid 1px #333',
          'padding':20,
          'background':'#fff',
          'title': {
            'text': '人工拣货每人拣货量',
            'color': '#000',
            'font-size': 16,
            'align': 'center',
          },
          'color': ['#666'],
          'dataUrl': 'koaData/yonghui_bar2',
        }],
      
      },
    }
  }
  if ("mingming" == code) {
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
          x: 860,
          y: 20,
          width: 320,
          height: 150,
          padding: 20,
          "font-size": 50,
          color: "red",
          border: "solid 1px red",
          background: "orange",
          "text-align": "center",
        }],
        'pie1':[{
          titleText:'明明哥饼图1',
          chartId:'pie111',
          dataUrl:'koaData/mingming_pie'
        },],

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
  }, {
    code: "mingming",
    describe: '明明哥的大屏'
  }]
  ctx.body = {
    data: data
  }
})










module.exports = router
