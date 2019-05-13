const router = require('koa-router')()

router.prefix('/2/api/diy/')


//数据源
router.post('/report/selectData', async (ctx, next) => {

  let code = ctx.request.body.diyCoreCode;
  let data = {}
  let totalPage;

  if(code==="InventoryReportByWarehouse"){
    data = [{"totalusevolume":500,"totalvolume":1000,"totalavailability":"50%"}]
  }else if(code==="InventoryReportByShelf"){
    data = [{
      date: '2016-05-02',
      name: '王小虎1：' + Math.random(10),
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎2：'+ Math.random(10),
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎3：'+ Math.random(10),
      address: '上海市普陀区金沙江路 1519 弄'
    }]
    totalPage = 60;
  }else if(code==="InventoryReportByBin"){
    data = [
      {
        date: '2016-05-02',
        name: '王小虎1：' + Math.random(10),
        address: '北京海淀1'
      }, {
        date: '2016-05-04',
        name: '王小虎2：'+ Math.random(10),
        address: '北京海淀2'
      }, {
        date: '2016-05-01',
        name: '王小虎3：'+ Math.random(10),
        address: '北京海淀3'
      }
    ]
    totalPage = 300;
  }else{
    data = {
      
    }
    totalPage = 200;
  }

  ctx.body = {
    data: data,
    totalPage: totalPage
  }
})











module.exports = router
