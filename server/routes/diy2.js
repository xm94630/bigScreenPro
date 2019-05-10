const router = require('koa-router')()

router.prefix('/2/api/diy/')


//数据源
router.post('/report/selectData', async (ctx, next) => {

  let code = ctx.request.body.diyCoreCode;
  let data = {}

  if(code==="InventoryReportByWarehouse"){
    data = [{"totalusevolume":500,"totalvolume":1000,"totalavailability":"50%"}]
  }else if(code==="InventoryReportByShelf"){
    data = [
      {
        "birthday": null,
        "password": "96e79218965eb72c92a549dd5a330112",
        "external": "",
        "gender": null,
        "department_id": null,
        "telephone": "",
        "company": "",
        "remark": null,
        "id": 1,
        "username": "admin",
        "realname": "管理员",
        "status": 1
      }
    ]
  }else if(code==="InventoryReportByBin"){
    data = [
      {
        "birthday": null,
        "password": "96e79218965eb72c92a549dd5a330112",
        "external": "",
        "gender": null,
        "department_id": null,
        "telephone": "",
        "company": "",
        "remark": null,
        "id": 1,
        "username": "admin",
        "realname": "管理员",
        "status": 1
      }
    ]
  }else{
    data = {
      
    }
  }

  ctx.body = {
    data: data
  }
})











module.exports = router
