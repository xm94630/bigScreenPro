const router = require('koa-router')()

router.prefix('/koaData')

//获取数据源url

//折线图数据格式
router.get('/yonghui_line', async (ctx) => {
  let data = {
    title: {
      text: '当日拣货任务汇总',
      subtext: ''
    },
    xAxis: {
      data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
    },
    legend: {
      data:['昨天','今天']
    },
    series: [
      {
        name: '今天',
        data: [10, 52, 200, 334, 390, 330, 220],
      },
      {
        name: '昨天',
        data: [5, 25, 100, 150, 200, 170, 110],
      }
    ]
  }
  ctx.body = {
    data: data
  }
})
router.get('/yonghui_line2', async (ctx) => {
  let data = {
    title: {
      text: '啦啦',
      subtext: ''
    },
    xAxis: {
      data: ['00:00', '01:00', '02:00', '03:00'],
    },
    legend: {
      data:['昨天','今天']
    },
    series: [
      {
        name: '今天',
        data: [10, 52, 200, 334],
      },
      {
        name: '昨天',
        data: [150, 200, 170, 110],
      }
    ]
  }
  ctx.body = {
    data: data
  }
})



//柱状图数据格式
router.get('/yonghui_bar1', async (ctx) => {
  let data = {
    title: {
      text: '啦啦',
      subtext: ''
    },
    xAxis: {
      data: ['甲', '乙', '丙', '丁'],
    },
    legend: {
      data:['昨天','今天']
    },
    series: [
      {
        name: '今天',
        data: [10, 52, 200, 334],
      },
      {
        name: '昨天',
        data: [150, 200, 170, 110],
      }
    ]
  }
  ctx.body = {
    data: data
  }
})
router.get('/yonghui_bar2', async (ctx) => {
  let data = {
    title: {
      text: '啦啦',
      subtext: ''
    },
    xAxis: {
      data: ['甲', '乙', '丙', '丁'],
    },
    series: [
      {
        name: '今天',
        data: [10, 52, 200, 334],
      }
    ]
  }
  ctx.body = {
    data: data
  }
})


//card数据格式
router.get('/yonghui_card1', async (ctx) => {
  let data = [222,888]
  ctx.body = {
    data: data
  }
})

router.get('/yonghui_card2', async (ctx) => {
  let data = [23,398]
  ctx.body = {
    data: data
  }
})
router.get('/yonghui_card3', async (ctx) => {
  let data = [1,198]
  ctx.body = {
    data: data
  }
})
router.get('/yonghui_card4', async (ctx) => {
  let data = [21,92]
  ctx.body = {
    data: data
  }
})
router.get('/yonghui_card5', async (ctx) => {
  let data = [6829,1088122]
  ctx.body = {
    data: data
  }
})

router.get('/mingming_pie', async (ctx) => {
  let data = {
    percent:0.75,
  }
  ctx.body = {
    data: data
  }
})

router.get('/mingming_pie2', async (ctx) => {
  let data = {
    legendData:['已完成','未完成','进行中'],
    seriesData:[
      {value:335, name:'已完成'},
      {value:310, name:'未完成'},
      {value:234, name:'进行中'},
    ],
  }
  ctx.body = {
    data: data
  }
})


//card新数据格式
router.get('/lifeng_card', async (ctx) => {
  let data = [{
    '总数':100000,
    '使用量':50000,
    '未使用':50000,
  }]
  ctx.body = {
    data: data
  }
})
router.get('/lifeng_card2', async (ctx) => {
  let data = [{
    '总数':10000,
    '可用':1000,
    '已分配':1000,
    '已冻结':1000,
  }]
  ctx.body = {
    data: data
  }
})
router.get('/lifeng_card3', async (ctx) => {
  let data = [{
    '入库单':10000,
    'SKU':1000,
  }]
  ctx.body = {
    data: data
  }
})
router.get('/lifeng_card4', async (ctx) => {
  let data = [{
    '出库单':9000,
    'SKU':999,
  }]
  ctx.body = {
    data: data
  }
})

//利丰 新pie数据格式
router.get('/lifeng_pie', async (ctx) => {
  let data = [{
    percent:0.55,
  }]
  ctx.body = {
    data: data
  }
})

//利丰 新pie数据格式
router.get('/lifeng_pie2', async (ctx) => {

  let data = [{
    '工作中':800,
    '异常':300,
    '空闲':200,
    '充电中':500,
  }]

  ctx.body = {
    data: data
  }
})

//利丰 新柱状图数据格式
router.get('/lifeng_bar', async (ctx) => {
  let data = {
    title: {
      text: '啦啦',
      subtext: ''
    },
    xAxis: {
      data: ['出库单', '已完成', '已分配', '系统报缺'],
    },
    legend: {
      data:['出库单','SKU']
    },
    series: [
      {
        name: '出库单',
        data: [10, 52, 200, 334],
      },
      {
        name: 'SKU',
        data: [150, 200, 170, 110],
      }
    ]
  }
  ctx.body = {
    data: data
  }
})



module.exports = router
