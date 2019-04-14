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

module.exports = router
