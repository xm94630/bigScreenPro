const router = require('koa-router')()
const send = require('koa-send')

router.prefix('/epimetheus/api_v1/diy/')

//const url = "http://172.16.28.85:8080";
const url = "";

//获取大屏位置配置信息(图表、表格)
router.get('/view/info', async (ctx, next) => {
  let code = ctx.request.query.diyViewCode;
  let jsonData = null;
  if ("yonghui1" == code) {
    //永辉大屏页面1的配置信息
    jsonData = {
      'code': 'yonghui1',
      'pageId': 'pageId-00001',
      'canvas': {
        'width': 1000,
        'height': 600,
        'background': '#d4e157',
        'zoom-type':1,  //不配置为默认正常显示，1全屏铺满，2等比缩放宽度铺满，3等比缩放高度铺满。
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
          'color': ['#db8460','blue'],
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
        //   'color': ['#db8460','blue'],
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
        }],
        
      },
    }
  }
  if ("yonghui2" == code) {
    //永辉大屏页面1的配置信息
    jsonData = {
      'code': 'yonghui2',
      'pageId': 'pageId-00001',
      'canvas': {
        'width': 1200,
        'height': 600,
        'background': '#1a237e',
      },
      'components': {
        'title': [{
          id: "componentId_00002",
          text: "模板页",
          x: 860,
          y: 20,
          width: 320,
          height: 100,
          padding: 0,
          "font-size": 70,
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
          'state':2,
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
          'height': 300,
          'border': 'none',
          'padding':10,
          'background':'#fff',
          'title': {
            'text': '拣货汇总',
            'color': '#000',
            'font-size': 12,
            'align': 'center',
          },
          'color': ['#db8460','blue'],
          'dataUrl': 'koaData/yonghui_line',
        },],
        'bar': [{
          'id': 'componentId_00003',
          'x': 440,
          'y': 130,
          'width': 410,
          'height': 220,
          'border': 'none',
          'padding':10,
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
          'border': 'none',
          'padding':10,
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
      
        'pie1':[{
          chartId:'pie111',
          'x': 860,
          'y': 130,
          'width': 320,
          'height': 230,
          'border': 'none',
          'padding':10,
          'background':'none',
          'title': {
            'text': '完成度',
            'color': 'red',
            'font-size': 20,
            'align': 'center',
          },
          'color': ['#83b5b9','#db8460'],
          dataUrl:'koaData/mingming_pie',
        },],
        'pie2':[{
          chartId:'pie222',
          'x': 860,
          'y': 360,
          'width': 320,
          'height': 220,
          'border': 'none',
          'padding':10,
          'background':'#fff',
          'title': {
            'text': '饼图',
            'color': '#666',
            'font-size': 16,
            'align': 'center',
          },
          'color': ['#83b5b9','#db8460'],
          dataUrl:'koaData/mingming_pie2',
        },],
        'dater': [{
          'id': 'id_00005',
          'x': 20,
          'y': 550,
          'width': 410,
          'height': 30,
          'border': 'none',
          'padding':5,
          'background':'none',
          'color': '#ffb300',
          'font-size': 20,
          'text-align': 'center',
        }],

      },
    }
  }
  if ("mingming" == code) {
    //永辉大屏页面1的配置信息
    jsonData = {
      'code': 'yonghui2',
      'pageId': 'pageId-00001',
      'canvas': {
        'width': 1200,
        'height': 600,
        'background': '#d4e157',
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
          chartId:'pie111',
          'x': 0,
          'y': 0,
          'width': 400,
          'height': 400,
          'border': 'none',
          'padding':5,
          'background':'none',
          'title': {
            'text': '明明哥饼图',
            'color': 'red',
            'font-size': 20,
            'align': 'center',
          },
          'color': ['#83b5b9','#db8460'],
          dataUrl:'koaData/mingming_pie',
        },],
        'pie2':[{
          chartId:'pie222',
          'x': 440,
          'y': 130,
          'width': 400,
          'height': 400,
          'border': 'none',
          'padding':5,
          'background':'none',
          'title': {
            'text': '饼图哦',
            'color': 'red',
            'font-size': 20,
            'align': 'center',
          },
          'color': ['#83b5b9','#db8460'],
          dataUrl:'koaData/mingming_pie2',
        },],

      },
    }
  }

  //雅思兰黛1
  if ("report-InventoryVolume" == code) {    
    jsonData = {
      "code": "report-InventoryVolume",
      "pageId": "pageId-00004",
      "canvas": {
        "zoom-type":0, 
        "width": 1200,
        "height": 1200,
        "background": "#d4e157"
      },
      "components": {
        "table": [{
          "id": "componentId_00003",
          "x": 0,
          "y": 50,
          "width": 1200,
          "height": 550,
          "padding": 10,
          "exported": true,
          "showIndexColumn":true,
          "currentPage":2,
          "pageSize":10,
          "showPage":true,
          "initTableUrl":url+"/epimetheus/api_v1/diy/column/initForView",
          "dataUrl": url+"/epimetheus/api/diy/report/selectData",
          "initUrl": url+"/epimetheus/api_v1/diy/column/initForView",
          "searchBtns":[{
            "text":"按货架查询",
            "dataUrl": url+"/epimetheus/api/diy/report/selectData",
            "initUrl": url+"/epimetheus/api_v1/diy/column/initForView",
            "diyCoreCode":"InventoryReportByShelf"
          },{
            "text":"按货位查询",
            "dataUrl": url+"/epimetheus/api/diy/report/selectData",
            "initUrl": url+"/epimetheus/api_v1/diy/column/initForView",
            "diyCoreCode":"InventoryReportByBin"
          }]
        }],
        "textBar":[{
          "id": "componentId_00002",
          "text": "库房总面积：10000 平米 | 总使用体积：5000平米 | 库房利用率：50%",
          "x": 0,
          "y": 0,
          "width": 1200,
          "height": 40,
          "padding": 5,
          "font-size": 20,
          "color": "yellow",
          "border": "none",
          "background": "green",
          "text-align": "left",
          "dataUrl": url+"/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"InventoryReportByWarehouse"
        }]
      }

    }

  }
  //雅思兰黛2
  if ("report-SkuHot" == code) {    
    jsonData = {
      "code": "report-SkuHot",
      "pageId": "pageId-00004",
      "canvas": {
        "zoom-type":0, 
        "width": 1200,
        "height": 1200,
        "background": "#d4e157"
      },
      "components": {
        "table": [{
          "id": "componentId_00003",
          "x": 0,
          "y": 50,
          "width": 1200,
          "height": 550,
          "padding": 10,
          "exported": true,
          "showIndexColumn":true,
          "currentPage":2,
          "pageSize":10,
          "showPage":true,
          "initTableUrl":url+"/epimetheus/api_v1/diy/column/initForView",
          "dataUrl": url+"/epimetheus/api/diy/report/selectData",
          "initUrl": url+"/epimetheus/api_v1/diy/column/initForView",
          "searchBtns":[{
            "text":"查询",
            "dataUrl": url+"/epimetheus/api/diy/report/selectData",
            "initUrl": url+"/epimetheus/api_v1/diy/column/initForView",
            "diyCoreCode":"SkuHot"
          }]
        }],
      }

    }

  }

  if ("lifeng-ReportScreen" == code) {
    //利丰
    jsonData = {
      "code": "lifeng-ReportScreen",
      "pageId": "pageId-00001",
      "canvas": {
        "width": 1400,
        "height": 800,
        "background": "#aaa",
        "zoom-type":1
      },
      "components": {
        "title": [{
          "id": "",
          "text": "基础数据",
          "x": 10,
          "y": 10,
          "width": 600,
          "height": 780,
          "padding": 0,
          "font-size": 26,
          "color": "#000",
          "border": "solid 1px #fff",
          "background": "#f3f3f3",
          "text-align": "center"
        },{
          "id": "",
          "text": "入库数据",
          "x": 620,
          "y": 10,
          "width": 770,
          "height": 150,
          "padding": 0,
          "font-size": 24,
          "color": "#000",
          "border": "solid 1px #fff",
          "background": "#f3f3f3",
          "text-align": "center"
        },{
          "id": "",
          "text": "出库数据",
          "x": 620,
          "y": 170,
          "width": 770,
          "height": 620,
          "padding": 0,
          "font-size": 24,
          "color": "#000",
          "border": "solid 1px #fff",
          "background": "#f3f3f3",
          "text-align": "center"
        }
      
        ,{
          "id": "",
          "text": "货位",
          "x": 50,
          "y": 25,
          "width": 50,
          "height": 50,
          "padding": 0,
          "font-size": 18,
          "color": "#666",
          "border": "none",
          "text-align": "center"
        },{
          "id": "",
          "text": "货架",
          "x": 50,
          "y": 275,
          "width": 50,
          "height": 50,
          "padding": 0,
          "font-size": 18,
          "color": "#666",
          "border": "none",
          "text-align": "center"
        },{
          "id": "",
          "text": "库存",
          "x": 50,
          "y": 525,
          "width": 50,
          "height": 50,
          "padding": 0,
          "font-size": 18,
          "color": "#666",
          "border": "none",
          "text-align": "center"
        },{
          "id": "",
          "text": "机器人",
          "x": 370,
          "y": 525,
          "width": 200,
          "height": 30,
          "padding": 0,
          "font-size": 18,
          "color": "#666",
          "border": "",
          "text-align": "left"
        }],
    
        "new_card": [{
          "title":"A类/鞋",
          "state":0,
          "x": 50,
          "y": 50,
          "width": 300,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#666",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-BinUseA"
        },{
          "title":"B类/衣服",
          "state":0,
          "x": 50,
          "y": 160,
          "width": 300,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#666",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-BinUseB"
        },{
          "title":"A类/鞋",
          "state":0,
          "x": 50,
          "y": 300,
          "width": 300,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#666",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ShelfUseA"
        },{
          "title":"B类/衣服",
          "state":0,
          "x": 50,
          "y": 410,
          "width": 300,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ShelfUseB"
        },
        
        {
          "title":"总库存",
          "state":0,
          "x": 50,
          "y": 550,
          "width": 300,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-InventoryPool",
          "keyOrder":["总数","已分配","已冻结","可用"]
        },{
          "title":"SKU",
          "state":0,
          "x": 50,
          "y": 660,
          "width": 300,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-SKUPool"
        },
      
        {
          "title":"入库单",
          "state":0,
          "x": 650,
          "y": 50,
          "width": 170,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ReceiptIn"
        },{
          "title":"已完成",
          "state":0,
          "x": 830,
          "y": 50,
          "width": 170,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ReceiptCopleted"
        },{
          "title":"作业中",
          "state":0,
          "x": 1010,
          "y": 50,
          "width": 170,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ReceiptWorking"
        },{
          "title":"未开始",
          "state":0,
          "x": 1190,
          "y": 50,
          "width": 170,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ReceiptNotStart"
        },
      
        {
          "title":"出库单",
          "state":0,
          "x": 650,
          "y": 210,
          "width": 170,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-OutOrderIn"
        },{
          "title":"已完成",
          "state":0,
          "x": 830,
          "y": 210,
          "width": 170,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-OutOrderComplete"
        },{
          "title":"已分配",
          "state":0,
          "x": 1010,
          "y": 210,
          "width": 170,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-OutOrderAllocated"
        },{
          "title":"系统报缺",
          "state":0,
          "x": 1190,
          "y": 210,
          "width": 170,
          "height": 100,
          "border": "solid 1px #333",
          "padding":20,
          "background":"#fff",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-OutOrderLack"
        }],
    
        "new_pie_1":[{
          "chartId":"pie111",
          "x": 350,
          "y": 20,
          "width": 200,
          "height": 150,
          "border": "none",
          "padding":10,
          "background":"none",
          "title": {
            "text":"使用占比"
          },
          "color": ["#83b5b9","#db8460"],
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-BinUseScaleA"
        },{
          "chartId":"pie222",
          "x": 350,
          "y": 140,
          "width": 200,
          "height": 150,
          "border": "none",
          "padding":10,
          "background":"none",
          "title": {
            "text":"使用占比"
          },
          "color": ["#83b5b9","#db8460"],
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-BinUseScaleB"
        },{
          "chartId":"pie333",
          "x": 350,
          "y": 270,
          "width": 200,
          "height": 150,
          "border": "none",
          "padding":10,
          "background":"none",
          "title": {
            "text":"使用占比"
          },
          "color": ["#83b5b9","#db8460"],
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ShelfUseScaleA"
        },{
          "chartId":"pie444",
          "x": 350,
          "y": 380,
          "width": 200,
          "height": 150,
          "border": "none",
          "padding":10,
          "background":"none",
          "title": {
            "text":"使用占比"
          },
          "color": ["#83b5b9","#db8460"],
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ShelfUseScaleB"
        }],
    
        "new_pie_2":[{
          "chartId":"piex",
          "x": 360,
          "y": 550,
          "width": 240,
          "height": 210,
          "border": "solid 1px #ccc",
          "padding":10,
          "background":"#fff",
          "title": {
            "text": "",
            "color": "#666",
            "font-size": 16,
            "align": "center"
          },
          "color": ["#83b5b9","#db8460","#9ec794","#eada80"],
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-robot"
        }],
    
    
        "new_bar": [{
          "id": "componentId_bar001",
          "x": 650,
          "y": 330,
          "width": 350,
          "height": 200,
          "border": "none",
          "padding":10,
          "background":"#fff",
          "title": {
            "text": "出库单",
            "color": "#000",
            "font-size": 16,
            "align": "center"
          },
          "color": ["#83b5b9","#db8460","#9ec794","#eada80"],
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-HistogramOutOrder"
        },{
          "id": "componentId_bar002",
          "x": 1010,
          "y": 330,
          "width": 350,
          "height": 200,
          "border": "none",
          "padding":10,
          "background":"#fff",
          "title": {
            "text": "已完成",
            "color": "#000",
            "font-size": 16,
            "align": "center"
          },
          "color": ["#83b5b9","#db8460","#9ec794","#eada80"],
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-HistogramOutOrderCompleted"
        },{
          "id": "componentId_bar003",
          "x": 650,
          "y": 540,
          "width": 350,
          "height": 200,
          "border": "none",
          "padding":10,
          "background":"#fff",
          "title": {
            "text": "已分配",
            "color": "#000",
            "font-size": 16,
            "align": "center"
          },
          "color": ["#83b5b9","#db8460","#9ec794","#eada80"],
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-HistogramOutOrderAllocated"
        },{
          "id": "componentId_bar004",
          "x": 1010,
          "y": 540,
          "width": 350,
          "height": 200,
          "border": "none",
          "padding":10,
          "background":"#fff",
          "title": {
            "text": "系统报缺",
            "color": "#000",
            "font-size": 16,
            "align": "center"
          },
          "color": ["#83b5b9","#db8460","#9ec794","#eada80"],
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-HistogramOutOrderLack"
        }],
    
        "new_info": [{
          "id": "",
          "template": "总数:{{data}}",
          "x": 380,
          "y": 560,
          "width": 100,
          "height": 20,
          "padding": 0,
          "font-size": 14,
          "color": "#000",
          "border": "none",
          "background": "none",
          "text-align": "left",
          "z-index":999,
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-robotTote"
        }]
      }
    }
    
    
  }

  ctx.body = {
    data: {jsonData}
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

//对于二维表而言，需要额外多请求一个接口，用来获取“查询条件”配置的初始化工作哦
router.get('/column/initForView', async (ctx, next) => {
  let code = ctx.request.query.diyCoreCode;
  let data = {};
  if("InventoryReportByShelf"==code){
    data = {
      //这部分是对table部分的配置
      "resultColumnList":[{
        "diyColumnId":190,
        "diyCoreCode":"print_label_1570",     //
        "diyCoreName":"yashilandai",
        "columnName":"date",   //列的key   
        "displayName":"日期哦",   //列头  [{"key":},]
        "dataType":1,   //数据类型 1字符串  
        "dataLength":0,
        "decimallength":0,
        "columnIndex":0,   //列的顺序
        "defaultValue":"",
        "isDiy":0,
        "isReadonly":0,
        "isResult":1,
        "isCondition":0,
        "queryType":0,
        "queryIndex":0,   
        "sortRule":0,
        "isCheck":0,
        "checkType":0,
        "isImport":0,
        "isExport":0,
        "isForeign":0,  //关联
        "referenceType":0,
        "referenceTable":"",
        "referenceColumn":"",
        "referenceCondition":"",
        "referenceDisplayColumn":"",
        "referenceUrl":"",
        "creator":"",
        "createTime":0,
        "updateUser":"",
        "updateTime":0
      },{
        "columnName":"name",   //列的key   
        "displayName":"姓名哦",   //列头名字  
        "columnIndex":3,   //列的顺序
      },{
        "columnName":"address",   //列的key   
        "displayName":"地址哦",   //列头名字  
        "columnIndex":1,   //列的顺序
      },{
        "columnName":"age",   //列的key   
        "displayName":"年龄",   //列头名字  
        "columnIndex":2,   //列的顺序
      }],
      //这个部分是对查询条件部分的配置
      "conditionColumnList":[{
        "diyColumnId":217,
        "diyCoreCode":"print_label_1570",
        "diyCoreName":"yashilandai",
        "columnName":"addr", //关联字段
        "displayName":"地址", //label名称
        "dataType":1,  //大类型
        "dataLength":0,
        "decimallength":0,
        "columnIndex":0,
        "defaultValue":"上海",  //输入框、查询框的默认值
        "isDiy":0,
        "isReadonly":0,
        "isResult":1,
        "isCondition":1,
        "queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        "queryIndex":0,  //顺序
        "sortRule":0,
        "isCheck":0,
        "checkType":0,
        "isImport":0,
        "isExport":0,
        "isForeign":0,   //是否关联（关联的是下拉）
        "referenceType":0,
        "referenceTable":"",
        "referenceColumn":"",
        "referenceCondition":"",
        "referenceDisplayColumn":"",
        "referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "creator":"",
        "createTime":0,
        "updateUser":"",
        "updateTime":0,
        "placeholder":"请输入"
      },{
        "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
        "dataType":1,    //大类型：1是字符串（普通输入框）
        "columnName":'name',  //关联字段
        "displayName":"姓名",    //label显示
        "defaultValue":"张三",      //默认值
        "placeholder":"请输入",    //placeholder
        //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "queryIndex":1,  //组件出现顺序
      },{
        "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
        "dataType":2,    //大类型：2是整数（整数输入框）
        "columnName":'car',  //关联字段
        "displayName":"汽车",    //label显示
        "defaultValue":"2",      //默认值
        "placeholder":"请输入",    //placeholder
        //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "queryIndex":2,  //组件出现顺序
      },{
        "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
        "dataType":3,    //大类型：3是日期（日期选择框）
        "columnName":'date',  //关联字段
        "displayName":"生日",    //label显示
        "defaultValue":"1987-08-01",      //默认值
        "placeholder":"请选择",    //placeholder
        //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "queryIndex":4,  //组件出现顺序
      },{
        "isForeign":1,   //是否关联 0不关联 1关联，关联的是下拉
        "dataType":0,    //大类型：3是日期（日期选择框）
        "columnName":'love',  //关联字段
        "displayName":"最爱",    //label显示
        "defaultValue":'',      //默认值
        "placeholder":"请选择",    //placeholder
        "referenceUrl":url+"/epimetheus/api_v1/diy/xxx/xxx", //关联URL
        "referenceColumn":"playerNameValue",  //下拉的值
        "referenceDisplayColumn":"playerName", //下拉显示
        //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "queryIndex":3,  //组件出现顺序
      }]
    }
  }else{
    data = {
      //这部分是对table部分的配置
      "resultColumnList":[{
        "diyColumnId":190,
        "diyCoreCode":"print_label_1570",     //
        "diyCoreName":"yashilandai",
        "columnName":"date",   //列的key   
        "displayName":"日期哦",   //列头  [{"key":},]
        "dataType":1,   //数据类型 1字符串  
        "dataLength":0,
        "decimallength":0,
        "columnIndex":0,   //列的顺序
        "defaultValue":"",
        "isDiy":0,
        "isReadonly":0,
        "isResult":1,
        "isCondition":0,
        "queryType":0,
        "queryIndex":0,   
        "sortRule":0,
        "isCheck":0,
        "checkType":0,
        "isImport":0,
        "isExport":0,
        "isForeign":0,  //关联
        "referenceType":0,
        "referenceTable":"",
        "referenceColumn":"",
        "referenceCondition":"",
        "referenceDisplayColumn":"",
        "referenceUrl":"",
        "creator":"",
        "createTime":0,
        "updateUser":"",
        "updateTime":0
      },{
        "columnName":"name",   //列的key   
        "displayName":"姓名哦",   //列头名字  
        "columnIndex":2,   //列的顺序
      },{
        "columnName":"address",   //列的key   
        "displayName":"最新的地址",   //列头名字  
        "columnIndex":3,   //列的顺序
      }],
      //这个部分是对查询条件部分的配置
      "conditionColumnList":[{
        "diyColumnId":217,
        "diyCoreCode":"print_label_1570",
        "diyCoreName":"yashilandai",
        "columnName":"addr", //关联字段
        "displayName":"地址", //label名称
        "dataType":1,  //大类型
        "dataLength":0,
        "decimallength":0,
        "columnIndex":0,
        "defaultValue":"上海",  //输入框、查询框的默认值
        "isDiy":0,
        "isReadonly":0,
        "isResult":1,
        "isCondition":1,
        "queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        "queryIndex":0,  //顺序
        "sortRule":0,
        "isCheck":0,
        "checkType":0,
        "isImport":0,
        "isExport":0,
        "isForeign":0,   //是否关联（关联的是下拉）
        "referenceType":0,
        "referenceTable":"",
        "referenceColumn":"",
        "referenceCondition":"",
        "referenceDisplayColumn":"",
        "referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "creator":"",
        "createTime":0,
        "updateUser":"",
        "updateTime":0,
        "placeholder":"请输入"
      },{
        "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
        "dataType":1,    //大类型：1是字符串（普通输入框）
        "columnName":'name',  //关联字段
        "displayName":"姓名",    //label显示
        "defaultValue":"张三",      //默认值
        "placeholder":"请输入",    //placeholder
        //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "queryIndex":1,  //组件出现顺序
      },{
        "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
        "dataType":2,    //大类型：2是整数（整数输入框）
        "columnName":'car',  //关联字段
        "displayName":"汽车",    //label显示
        "defaultValue":"2",      //默认值
        "placeholder":"请输入",    //placeholder
        //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "queryIndex":2,  //组件出现顺序
      },{
        "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
        "dataType":3,    //大类型：3是日期（日期选择框）
        "columnName":'date',  //关联字段
        "displayName":"生日",    //label显示
        "defaultValue":"1987-08-01",      //默认值
        "placeholder":"请选择",    //placeholder
        //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "queryIndex":4,  //组件出现顺序
      },{
        "isForeign":1,   //是否关联 0不关联 1关联，关联的是下拉
        "dataType":0,    //大类型：3是日期（日期选择框）
        "columnName":'love',  //关联字段
        "displayName":"最爱",    //label显示
        "defaultValue":'',      //默认值
        "placeholder":"请选择",    //placeholder
        "referenceUrl":url+"/epimetheus/api_v1/diy/xxx/xxx", //关联URL
        "referenceColumn":"playerNameValue",  //下拉的值
        "referenceDisplayColumn":"playerName", //下拉显示
        //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "queryIndex":3,  //组件出现顺序
      }]
    }
  }
  ctx.body = {
    data: data
  }
})

//关联U
//创建大屏配置
router.get('/xxx/xxx', async (ctx, next) => {
  ctx.body = {
    // data: {
    //   'aaa': ["孙悟空","猪八戒"],
    //   'bbb': [0,1],
    // }
    data:[
      {
        "playerName":"孙悟空",
        "playerNameValue":"1"
      },
      {
        "playerName":"沙和尚",
        "playerNameValue":"2"
      },
    ]
  }
})


//下载表格

router.get('/view/excel/export', async (ctx, next) => {
  
  // ctx.set('Content-Type', 'application/pdf')
  // ctx.set('Content-Disposition', contentDisposition('/aaa.pdf'))
  // ctx.body = {}

  const path = "download/1.txt";
  ctx.attachment(path);
  await send(ctx, path);


})









module.exports = router
