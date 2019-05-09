const router = require('koa-router')()

router.prefix('/2/api/diy/')


//数据源
router.post('/report/selectData', async (ctx, next) => {

  let code = ctx.request.body.diyCoreCode;
  let data = {}

  if(code==="InventoryReportByWarehouse"){
    data = [{"totalusevolume":500,"totalvolume":1000,"totalavailability":"50%"}]
  }else{
    data = {
      
    }
  }

  ctx.body = {
    data: data
  }
})











module.exports = router
