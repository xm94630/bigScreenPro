const router = require('koa-router')()

router.prefix('/2/api_v1/diy/')

//const url = "http://172.16.28.85:8080";
const url = "";

//获取大屏位置配置信息
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
          'color': ['#fd9f82','blue'],
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
          'color': ['#a6c87e','#fd9f82'],
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
          'color': ['#a6c87e','#fd9f82'],
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
          'color': ['#a6c87e','#fd9f82'],
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
          'color': ['#a6c87e','#fd9f82'],
          dataUrl:'koaData/mingming_pie2',
        },],

      },
    }
  }
  if ("test1" == code) {
    //永辉大屏页面1的配置信息
    
    jsonData = {
      "code": "test1",
      "pageId": "pageId-00004",
      "canvas": {
        "zoom-type":0, 
        "width": 1200,
        "height": 600,
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
          "currentPage":1,
          "pageSize":10,
          "initTableUrl":url+"/2/api_v1/diy/column/initForView",
          "dataUrl": url+"/2/api/diy/report/selectData",
          "searchBtns":[{
            "text":"按货架查询",
            "dataUrl": url+"/2/api/diy/report/selectData",
            "diyCoreCode":"InventoryReportByShelf"
          },{
            "text":"按货位查询",
            "dataUrl": url+"/2/api/diy/report/selectData",
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
          "dataUrl": url+"/2/api/diy/report/selectData",
          "diyCoreCode":"InventoryReportByWarehouse"
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
  let data = {
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
      "columnIndex":0,   //列的顺序
    },{
      "columnName":"address",   //列的key   
      "displayName":"地址哦",   //列头名字  
      "columnIndex":0,   //列的顺序
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
      "queryIndex":2,  //顺序
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
      //"queryIndex":0,  //组件出现顺序
    },{
      "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
      "dataType":2,    //大类型：2是整数（整数输入框）
      "columnName":'car',  //关联字段
      "displayName":"汽车",    //label显示
      "defaultValue":"2",      //默认值
      "placeholder":"请输入",    //placeholder
      //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
      //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
      //"queryIndex":0,  //组件出现顺序
    },{
      "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
      "dataType":3,    //大类型：3是日期（日期选择框）
      "columnName":'date',  //关联字段
      "displayName":"生日",    //label显示
      "defaultValue":"1987-08-01",      //默认值
      "placeholder":"请选择",    //placeholder
      //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
      //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
      //"queryIndex":0,  //组件出现顺序
    },{
      "isForeign":1,   //是否关联 0不关联 1关联，关联的是下拉
      "dataType":0,    //大类型：3是日期（日期选择框）
      "columnName":'love',  //关联字段
      "displayName":"最爱",    //label显示
      "defaultValue":1,      //默认值
      "placeholder":"请选择",    //placeholder
      "referenceUrl":url+"/2/api_v1/diy/xxx/xxx", //关联URL
      "referenceColumn":"bbb",  //下拉的值
      "referenceDisplayColumn":"aaa", //下拉显示
      //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
      //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
      //"queryIndex":0,  //组件出现顺序
    }]
  }
  ctx.body = {
    data: data
  }
})

//关联U
//创建大屏配置
router.get('/xxx/xxx', async (ctx, next) => {
  ctx.body = {
    data: {
      'aaa': ["孙悟空","猪八戒"],
      'bbb': [0,1],
      'ccc': ["一年级","二年级"],
    }
  }
})










module.exports = router
