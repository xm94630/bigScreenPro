const router = require('koa-router')()

router.prefix('/epimetheus/api/diy/')


//数据源
router.post('/report/selectData', async (ctx, next) => {

  let code = ctx.request.body.diyCoreCode;
  let pageSize = ctx.request.body.pageSize;
  let data = {}

  //雅诗兰黛 二维表
  if(code==="InventoryReportByWarehouse"){
    data = [{"TotalUseVolume":510,"TotalVolume":1000,"TotalAvailability":"51%"}]
  }else if(code==="InventoryReportByShelf"){
    if(pageSize){
      data = {
        "recordList":[{
          date: '2016-05-02',
          name: '王小虎1：' + Math.random(10),
          address: '上海市普陀区金沙江路 1518 弄',
          age:12
        }, {
          date: '2016-05-04',
          name: '王小虎2：'+ Math.random(10),
          address: '上海市普陀区金沙江路 1517 弄',
          age:13
        }],
        "recordCount": 60
      }
    }else{
      data = [{
        date: '2016-05-02',
        name: '王小虎1：' + Math.random(10),
        address: '上海市普陀区金沙江路 1518 弄',
        age:12,
      }, {
        date: '2016-05-04',
        name: '王小虎2：'+ Math.random(10),
        address: '上海市普陀区金沙江路 1517 弄',
        age:13
      }]
    }
  }else if(code==="InventoryReportByBin"){
    if(pageSize){
      data = {
        "recordList":[{
          date: '2016-05-02',
          name: '王小虎1：' + Math.random(10),
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎2：'+ Math.random(10),
          address: '上海市普陀区金沙江路 1517 弄'
        }],
        "recordCount": 600
      }
    }else{
      data = [{
        date: '2016-05-02',
        name: '王小虎1：' + Math.random(10),
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎2：'+ Math.random(10),
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  }else if(code==="SkuHot"){
    if(pageSize){
      data = {
        "recordList":[{
          date: '2016-05-02',
          name: '雷欧：' + Math.random(10),
          address: 'M77'
        }, {
          date: '2016-05-04',
          name: '爱迪：'+ Math.random(10),
          address: 'M87'
        }],
        "recordCount": 600
      }
    }else{
      data = [{
        date: '2016-05-02',
        name: '雷欧：' + Math.random(10),
        address: 'M77'
      }, {
        date: '2016-05-04',
        name: '爱迪：'+ Math.random(10),
        address: 'M87'
      }]
    }
  }else{
    if(pageSize){
      data = {
        "recordList":[{
          date: '2016-05-02',
          name: '王小虎1：' + Math.random(10),
          address: "Without you?I'd be a soul without a purpose.Without you?I'd be an emotion without a heartI'm a face without expression,A heart with no beat."
        }, {
          date: '2016-05-04',
          name: '王小虎2：'+ Math.random(10),
          address: '上海市普陀区金沙江路 1517 弄'
        }],
        "recordCount": 600
      }
    }else{
      data = [{
        date: '2016-05-02',
        name: '王小虎1：' + Math.random(10),
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎2：'+ Math.random(10),
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  }

  //利丰大屏幕 - 卡片
  if(
    code==="lifeng-BinUseA" ||
    code==="lifeng-BinUseB" ||
    code==="lifeng-ShelfUseA" ||
    code==="lifeng-ShelfUseB" 
  ){
    data = [{
      '总数':100000,
      '使用量':50000,
      '未使用':50000,
    }]
  }
  if(code==="lifeng-BinUseA2"){
    data = [{
      '身高':43,
      '体重':20,
      '飞行':30,
      '奔跑':90,
      '年龄':60,
      '攻击力':99,
    }]
  }

  if(code==="lifeng-InventoryPool"){
    data = [{
      '总数':10000,
      '可用':1000,
      '已分配':1000,
      '已冻结':1000,
    }]
  }
  if(code==="lifeng-SKUPool"){
    data = [{
      '总数':9999999,
    }]
  }


  if(
    code==="lifeng-ReceiptIn" ||
    code==="lifeng-ReceiptCopleted" ||
    code==="lifeng-ReceiptWorking" ||
    code==="lifeng-ReceiptNotStart" 
  ){
    data = [{
      '入库单':10000,
      'SKU':1000,
    }]
  }
  if(
    code==="lifeng-OutOrderIn" ||
    code==="lifeng-OutOrderComplete" ||
    code==="lifeng-OutOrderAllocated" ||
    code==="lifeng-OutOrderLack" 
  ){
    data = [{
      '出库单':9000,
      'SKU':999,
    }]
  }

  //利丰大屏幕 - 饼图
  if(
    code==="lifeng-BinUseScaleA" ||
    code==="lifeng-BinUseScaleB" ||
    code==="lifeng-ShelfUseScaleA" ||
    code==="lifeng-ShelfUseScaleB" 
  ){
    // data = [{
    //   percent:0.55,
    // }]
    data = [{占用率: 0.6}]
  }
  if(code==="lifeng-BinUseScaleA2"){
    data = [{占用率: 0.131415}]
  }



  if(code==="lifeng-robot"){
    data = [{
      '工作中':900,
      '异常':100,
      '空闲':100,
      '充电中':100,
    }]
  }
  if(code==="lifeng-robot2"){
    data = [{
      '已完成':200,
      '未完成':100
    }]
  }

  //利丰大屏幕 - 柱状图
  if(
    code==="lifeng-HistogramOutOrder" ||
    code==="lifeng-HistogramOutOrderCompleted" ||
    code==="lifeng-HistogramOutOrderAllocated" ||
    code==="lifeng-HistogramOutOrderLack" 
  ){
    data = data = [
      {"出库单":1,"sku":4,"type":"JIT"},
      {"出库单":2,"sku":5,"type":"B2C"},
      {"出库单":3,"sku":6,"type":"B2B"}
    ]
  }

  //new_bar 的测试用的 code数据。
  if(code==="lifeng-HistogramOutOrder2"){
    data = [
      {"出库单":1,"sku":4,"入库单":4,"type":"JIT"},
      {"出库单":2,"sku":5,"入库单":4,"type":"B2C"},
      {"出库单":3,"sku":6,"入库单":4,"type":"B2B"}
    ]
  }
  if(code==="lifeng-HistogramOutOrder3"){
    data = [
      {"出库单":1,"sku":4,"入库单":4,"bin":2,"type":"JIT"},
      {"出库单":2,"sku":5,"入库单":2,"bin":1,"type":"B2C"},
      {"出库单":3,"sku":6,"入库单":4,"bin":2,"type":"B2B"}
    ]
  }

  if(code==="lifeng-robotTote"){
    data = [{
      '总数':999,
    }]
  }

  //注意，这个line组件的数据，还尚未和后端确定，所以就这个格式走，未来有调整再说。
  if(code==="demo_line2"){
    data=[{
        name:'出库单',
        data:[120, 132, 101, 134, 90, 230, 210]
    },
    {
        name:'入库单',
        data:[220, 182, 191, 234, 290, 330, 310]
    }]
  }
  if(code==="demo_line"){
    data=[{
        name:'南京仓',
        data:[1,2,3,2,5,6]
    }]
  }

  ctx.body = {
    data: data,
  }
})











module.exports = router
