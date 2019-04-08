const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

//获取数据源url
router.get('/getDataUrl', async (ctx, next) => {
  let data = [{
    'id':'urlId_00001',
    'url':'http://www.xxx.com/data/pickingTaskTotal',
    'name':'当日拣货任务汇总',
    'describe':'这个是"当日拣货任务汇总"'
  },{
    'id':'urlId_00002',
    'url':'http://www.xxx.com/data/pickingTaskManual',
    'name':'人工拣货每人拣货量',
    'describe':'这个是"人工拣货每人拣货量"'
  },{
    'id':'urlId_00003',
    'url':'http://www.xxx.com/data/pickingTaskAGV',
    'name':'AGV每工位拣货量',
    'describe':'这个是"AGV每工位拣货量"'
  }]
  ctx.body = {
    data: data
  }
})

//获取大屏位置配置信息
router.get('/getStyleConfigByCode', async (ctx, next) => {
  let code = ctx.request.query.code;
  let config = null;
  if ("yonghui1" == code) {
    //永辉大屏页面1的配置信息
    config = {
      'code':'yonghui1',
      'pageId':'pageId-00001',
      'canvas':{
        'width':1000,
        'height':800,
        'background':'darkseagreen',
      },
      'components':{
        'title':[{
          'id':'componentId_00001',
          'text':'上海会员物流拣货工作量',
          'x':100,
          'y':100,
          'width':300,
          'height':200,
          'color':'#000',
          'font-size':12,
          'align':'center',
        }],
        'line':[{
          'id':'componentId_00002',
          'x':100,
          'y':100,
          'width':1000,
          'height':800,
          'border':true,
          'title':{
            'text':'当日拣货任务汇总',
            'color':'#000',
            'font-size':12,
            'align':'center',
          },
          'color':['#666'],
          'dataUrl':'http://www.xxx.com/data/pickingTaskTotal',
        }],
        'bar':[{
          'id':'componentId_00003',
          'x':100,
          'y':100,
          'width':1000,
          'height':800,
          'border':true,
          'title':{
            'text':'人工拣货每人拣货量',
            'color':'#000',
            'font-size':12,
            'align':'center',
          },
          'color':['#666'],
          'dataUrl':'http://www.xxx.com/data/pickingTaskManual',
        },{
          'id':'id_00004',
          'x':100,
          'y':100,
          'width':1000,
          'height':800,
          'border':true,
          'title':{
            'text':'AGV每工位拣货量',
            'color':'#000',
            'font-size':12,
            'align':'center',
          },
          'color':['#666'],
          'dataUrl':'http://www.xxx.com/data/pickingTaskAGV',
        }],
        'timer':[{
          'id':'id_00005',
          'x':100,
          'y':100,
          'width':300,
          'height':200,
          'color':'#000',
          'font-size':12,
          'align':'center',
        }]
      },
    }
  }
  ctx.body = {
    data: config
  }
})

module.exports = router
