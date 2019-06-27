const router = require('koa-router')()
const send = require('koa-send')

router.prefix('/epimetheus/api_v1/diy/')

//const url = "http://172.16.28.85:8080";
const url = "";

//获取大屏位置配置信息(图表、表格)
router.get('/view/info', async (ctx, next) => {
  let code = ctx.request.query.diyViewCode;
  let jsonData = null;
  
  //Demo
  if ("Demo" == code) {
    jsonData = {
      "refreshTime":"600000",
      "version":"20190529",
      "code": "lifeng-ReportScreen",
      "pageId": "pageId-00001",
      "linkScreen":{
        "linkScreenCode":"asyncExport",
        "waitTime":3000,
        "eventWidgetName":"new_cardGroup"
        //"eventWidgetName":""
      },
      "canvas": {
        "width": 1400,
        "height": 800,
        "background": "#f3f3f3",
        "zoom-type":0,
        "formFormat":{
          "labelPosition":"left",
          "colSpan":8
        }
      },
      "components": {
        "dater":[{
          "css":{
            "color":"red"
          }
        }],
        // "new_line":[{
        //   "id": "componentId_line001",
        //   "css":{
        //     "x": 20,
        //     "y": 20,
        //     "width": 300,
        //     "height": 200,
        //     "z-index": 9,
        //     "border": "none",
        //     "padding":5,
        //     "background":"#142a41"
        //   },
        //   "echartOption":{
        //     "color": "#4f8ff9|#38c3ec|#a2fdff|#eada80",
        //     "title": {
        //       "text": "周统计",
        //       "textStyle": {
        //         "fontSize": 16,
        //         "color": "#f8f4a0"
        //       }
        //     },
        //     "xAxis": {
        //       "data": "周一|周二|周三|周四|周五|周六|周日"
        //     },
        //     "axisLabel": {
        //       "show": "true",
        //       "textStyle": {
        //         "color": "#f8f4a0"
        //       }
        //     },
        //     "legend":{
        //       "show": "true",
        //       "textStyle": {
        //         "color": "#f8f4a0"
        //       }
        //     }
        //   },
        //   "dataUrl": "/epimetheus/api/diy/report/selectData",
        //   "diyCoreCode":"demo_line"
        // }],
        // "new_bar":[{
        //   "id": "xxx",
        //   "type":"new_bar",
        //   "css":{
        //     "x": 550,
        //     "y": 20,
        //     "width": 250,
        //     "height": 200,
        //     "z-index": 9,
        //     "border": "none",
        //     "padding":5,
        //     "background":"#142a41"
        //   },
        //   "echartOption":{
        //     "color": "#4f8ff9|#38c3ec|#a2fdff|#eada80",
        //     "title": {
        //       "text": "出库单",
        //       "textStyle": {
        //         "fontSize": 16,
        //         "color": "#f8f4a0"
        //       }
        //     },
        //     "axisLabel": {
        //       "show": "true",
        //       "textStyle": {
        //         "color": "#f8f4a0"
        //       }
        //     },
        //     "legend":{
        //       "show": "true",
        //       "textStyle": {
        //         "color": "#f8f4a0"
        //       }
        //     }
        //   },
        //   "dataUrl": "/epimetheus/api/diy/report/selectData",
        //   "diyCoreCode":"lifeng-HistogramOutOrder"
        // }],
        "new_cardGroup":[{
          "id": 'new_cardGroup_001',
          "type":"new_cardGroup",
          "css":{
            "x": 20,
            "y": 100,
            "width": 1350,
            "height": 300,
            "z-index": 9,
            "border": "",
            "padding":10,
            "background":"#142a41",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"yonghui_shops"
        }]
      }
    }
  }

  //雅诗兰黛1
  if ("report-InventoryVolume" == code) {    
    jsonData = {
      "version":"20190523",
      "code": "report-InventoryVolume",
      "pageId": "pageId-00004",
      "canvas": {
        "zoom-type":0, 
        "width": 1200,
        "height": 1200,
        "background": "#f3f3f3",
        "formFormat":{
          "labelPosition":"top",
          "colSpan":8
        }
      },
      "components": {
        "table": [{
          "noDataInfo":"No data",
          "id": "componentId_00003",
          "css":{
            "x": 0,
            "y": 50,
            "width": 1200,
            "padding": 10
          },
          "showIndexColumn":true,
          "currentPage":1,
          "pageSize":10,
          "showPage":true,
          "initTableUrl":"/epimetheus/api_v1/diy/column/initForView",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "initUrl": "/epimetheus/api_v1/diy/column/initForView",
          "resetBtnText":"重置",
          "searchBtns":[{
            "text":"按货架查询",
            "dataUrl": "/epimetheus/api/diy/report/selectData",
            "initUrl": "/epimetheus/api_v1/diy/column/initForView",
            "diyCoreCode":"InventoryReportByShelf"
          },{
            "text":"按货位查询",
            "dataUrl": "/epimetheus/api/diy/report/selectData",
            "initUrl": "/epimetheus/api_v1/diy/column/initForView",
            "diyCoreCode":"InventoryReportByBin"
          }],
          "exportBtn": {
            "show":true,
            "text":"导出",
          },
          "downloadColumn": {
            "show":false,
            "columnKey":"",
          },
          "initForView":{
            "conditionColumnList": [
            {
              "label": "普通输入框 (type:10)",
              "keyName": "name1",
              "type": "10",
              "typeScribe": "beeInput",
              "placeholder": "请输入",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 0
            }, {
              "label": "范围输入框 (type:11)",
              "keyName": "name2",
              "type": "11",
              "typeScribe": "beeInputRange",
              "placeholder": "请输入",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 1
            }, 
            {
              "label": "普通下拉 (type:20)",
              "keyName": "love",
              "type": "20",
              "typeScribe": "beeSelect",
              "placeholder": "请选择",
              "defaultValue": "2",
              "rule": {},
              "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
              "referenceColumn": "playerNameValue",
              "referenceDisplayColumn": "playerName",
              "queryIndex": 2
            }, 
            {
              "label": "下拉搜索 (type:21)",
              "keyName": "love2",
              "type": "21",
              "typeScribe": "beeSelectSearch",
              "placeholder": "请选择",
              "defaultValue": "",
              "rule": {},
              "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
              "referenceColumn": "playerNameValue",
              "referenceDisplayColumn": "playerName",
              "queryIndex": 3
            },
            {
              "type": "0",
              "typeScribe": "占位，什么也不渲染",
              "queryIndex": 4
            },
             {
              "label": "日期 (type:30)",
              "keyName": "date1",
              "type": "30",
              "typeScribe": "beeDatePicker",
              "placeholder": "请选择",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 5
            }, {
              "label": "日期（范围） (type:31)",
              "keyName": "date2",
              "type": "31",
              "typeScribe": "beeDatePickerRange",
              "placeholder": ["开始", "结束"],
              "defaultValue": ["2019-01-01","2019-01-02"],
              "rule": {},
              "queryIndex": 6
            }, {
              "label": "日期时间 (type:40)",
              "keyName": "date3",
              "type": "40",
              "typeScribe": "beeDateTimePicker",
              "placeholder": "请选择",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 7
            }, {
              "label": "日期时间（范围） (type:41)",
              "keyName": "date4",
              "type": "41",
              "typeScribe": "beeDateTimePickerRange",
              "placeholder": ["开始", "结束"],
              "defaultValue": "",
              "rule": {},
              "queryIndex": 8
            }, {
              "label": "多选下拉",
              "keyName": "love3",
              "type": "22",
              "typeScribe": "beeSelectMultiple",
              "placeholder": "请选择",
              "defaultValue": [],
              "rule": {},
              "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
              "referenceColumn": "playerNameValue",
              "referenceDisplayColumn": "playerName",
              "queryIndex": 9
            }, ],
            "resultColumnList": [{
              "bbb": 222
            }]
          }
        }],
        "textBar":[{
          "id": "componentId_00002",
          "options":{
            "TotalVolume":"TotalVolume哦",
            "TotalUseVolume":"TotalUseVolume",
            "TotalAvailability":"TotalAvailability",
          },
          "css":{
            "x": 0,
            "y": 0,
            "width": 1200,
            "height": 40,
            "padding": 5,
            "font-size": 20,
            "color": "yellow",
            "border": "none",
            "background": "#409EFF",
            "text-align": "left",
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"InventoryReportByWarehouse"
        }]
      }

    }

  }
  //雅诗兰黛2
  if ("report-SkuHot" == code) {    
    jsonData = {
      "version":"20190523",
      "code": "report-SkuHot",
      "pageId": "pageId-00004",
      "canvas": {
        "zoom-type":0, 
        "width": 1200,
        "height": 1200,
        "background": "#f3f3f3",
        "formFormat":{
          "labelPosition":"top",
          "colSpan":8
        }
      },
      "components": {
        "table": [{
          "noDataInfo":"No data",
          "id": "componentId_00003",
          "css":{
            "x": 0,
            "y": 0,
            "width": 1200,
            "padding": 10
          },
          "showIndexColumn":true,
          "currentPage":1,
          "pageSize":10,
          "showPage":true,
          "initTableUrl":"/epimetheus/api_v1/diy/column/initForView",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "initUrl": "/epimetheus/api_v1/diy/column/initForView",
          "resetBtnText":"重置",
          "searchBtns":[{
            "text":"查询",
            "dataUrl": "/epimetheus/api/diy/report/selectData",
            "initUrl": "/epimetheus/api_v1/diy/column/initForView",
            "diyCoreCode":"SkuHot"
          }],
          "exportBtn": {
            "show":true,
            "text":"导出",
          },
          "downloadColumn": {
            "show":false,
            "columnKey":"",
          },
          "initForView":{
            "conditionColumnList": [{
              "label": "普通输入框 (type:10)",
              "keyName": "name1",
              "type": "10",
              "typeScribe": "beeInput",
              "placeholder": "请输入",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 0
            }, {
              "label": "范围输入框 (type:11)",
              "keyName": "name2",
              "type": "11",
              "typeScribe": "beeInputRange",
              "placeholder": "请输入",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 1
            }, {
              "label": "普通下拉 (type:20)",
              "keyName": "love",
              "type": "20",
              "typeScribe": "beeSelect",
              "placeholder": "请选择",
              "defaultValue": "2",
              "rule": {},
              "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
              "referenceColumn": "playerNameValue",
              "referenceDisplayColumn": "playerName",
              "queryIndex": 2
            }, {
              "label": "日期 (type:30)",
              "keyName": "date1",
              "type": "30",
              "typeScribe": "beeDatePicker",
              "placeholder": "请选择",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 3
            }, {
              "label": "日期（范围） (type:31)",
              "keyName": "date2",
              "type": "31",
              "typeScribe": "beeDatePickerRange",
              "placeholder": ["开始", "结束"],
              "defaultValue": "",
              "rule": {},
              "queryIndex": 4
            }, {
              "label": "日期时间 (type:40)",
              "keyName": "date3",
              "type": "40",
              "typeScribe": "beeDateTimePicker",
              "placeholder": "请选择",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 6
            }, {
              "label": "日期时间（范围） (type:41)",
              "keyName": "date4",
              "type": "41",
              "typeScribe": "beeDateTimePickerRange",
              "placeholder": ["开始", "结束"],
              "defaultValue": "",
              "rule": {},
              "queryIndex": 5
            }],
            "resultColumnList": [{
              "bbb": 222
            }]
          }
        }]
      }

    }

  }

  //异步导出
  if ("asyncExport" == code) {    
    jsonData = {
      "version":"20190523",
      "code": "report-SkuHot",
      "pageId": "pageId-00004",
      "linkScreen":{
        "linkScreenCode":"Demo",
        "waitTime":-1,
        "eventWidgetName":"new_cardGroup"
      },
      "canvas": {
        "zoom-type":0, 
        "width": 1400,
        "height": 1400,
        "background": "#f3f3f3",
        "formFormat":{
          "labelPosition":"top",
          "colSpan":8
        }
      },
      "components": {
        "table": [{
          "noDataInfo":"No data",
          "id": "componentId_00003",
          "css":{
            "x": 0,
            "y": 0,
            "width": 1400,
            "padding": 10
          },
          "showIndexColumn":true,
          "currentPage":1,
          "pageSize":10,
          "showPage":true,
          "initTableUrl":"/epimetheus/api_v1/diy/column/initForView",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "initUrl": "/epimetheus/api_v1/diy/column/initForView",
          "resetBtnText":"重置",
          "searchBtns":[{
            "text":"查询",
            "dataUrl": "/epimetheus/api/diy/report/selectData",
            "initUrl": "/epimetheus/api_v1/diy/column/initForView",
            "diyCoreCode":"asyncExport"
          }],
          "exportBtn": {
            "show":false,
            "text":"导出",
          },
          "downloadColumn": {
            "show":true,
            "columnKey":"downloadUrl",
          },
          "initForView":{
            "conditionColumnList": [{
              "label": "仓库",
              "keyName": "warehouseCodeList",
              "type": "22",
              "typeScribe": "多选",
              "placeholder": "请选择",
              "defaultValue": [],
              "rule": {},
              "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
              "referenceColumn": "playerNameValue",
              "referenceDisplayColumn": "playerName",
              "queryIndex": 1
            }, {
              "label": "导出类型",
              "keyName": "fileNameList",
              "type": "22",
              "typeScribe": "多选",
              "placeholder": "请选择",
              "defaultValue": [],
              "rule": {},
              "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
              "referenceColumn": "playerNameValue",
              "referenceDisplayColumn": "playerName",
              "queryIndex": 2
            },{
              "label": "导出任务编号",
              "keyName": "exportBatchCode",
              "type": "10",
              "typeScribe": "beeInput",
              "placeholder": "请输入",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 3
            },{
              "label": "状态",
              "keyName": "exportStatus",
              "type": "22",
              "typeScribe": "多选",
              "placeholder": "请选择",
              "defaultValue": [],
              "rule": {},
              "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
              "referenceColumn": "playerNameValue",
              "referenceDisplayColumn": "playerName",
              "queryIndex": 4
            },{
              "label": "导出开始时间",
              "keyName": "exportTimeBeginByQuery",
              "type": "41",
              "typeScribe": "beeDateTimePickerRange",
              "placeholder": ["开始", "结束"],
              "defaultValue": "",
              "rule": {},
              "queryIndex": 5
            },{
              "label": "导出结束时间",
              "keyName": "exportTimeEndByQuery",
              "type": "41",
              "typeScribe": "beeDateTimePickerRange",
              "placeholder": ["开始", "结束"],
              "defaultValue": "",
              "rule": {},
              "queryIndex": 6
            }],
            "resultColumnList": [{
              "bbb": 222
            }]
          }
        }]
      }

    }

  }

  //利丰
  if ("lifeng-ReportScreen" == code) {
    
    jsonData = {
      "refreshTime":"600000",
      "version":"20190529",
      "globalCondition":[{
        "dataType":997788,
        "keyName":["startTime","endTime"],
        "defaultValue":["",""],
        "label":"时间",
        "queryIndex":1,
        "placeholder":["开始时间","结束时间"]
      }],
      "code": "lifeng-ReportScreen",
      "pageId": "pageId-00001",
      "canvas": {
        "width": 1400,
        "height": 800,
        "background": "#000",
        "zoom-type":1,
        "formFormat":{
          "labelPosition":"left",
          "colSpan":8
        }
      },
      "components": {
        "title": [{
          "id": "",
          "text": "基础数据",
          "css":{
            "x": 10,
            "y": 10,
            "width": 600,
            "height": 780,
            "padding": 0,
            "font-size": 26,
            "color": "#f8f594",
            "border": "solid 1px #fff",
            "background": "#1e264a",
            "text-align": "center"
          }
        },{
          "id": "",
          "text": "入库数据",
          "css":{
            "x": 620,
            "y": 10,
            "width": 770,
            "height": 150,
            "padding": 0,
            "font-size": 24,
            "color": "#f8f594",
            "border": "solid 1px #fff",
            "background": "#1e264a",
            "text-align": "center"
          }
        },{
          "id": "",
          "text": "出库数据",
          "css":{
            "x": 620,
            "y": 170,
            "width": 770,
            "height": 620,
            "padding": 0,
            "font-size": 24,
            "color": "#f8f594",
            "border": "solid 1px #fff",
            "background": "#1e264a",
            "text-align": "center"
          }
        }
      
        ,{
          "id": "",
          "text": "货位",
          "css":{
            "x": 50,
            "y": 25,
            "width": 50,
            "height": 50,
            "padding": 0,
            "font-size": 18,
            "color": "#f8f594",
            "border": "none",
            "text-align": "center"
          }
        },{
          "id": "",
          "text": "货架",
          "css":{
            "x": 50,
            "y": 275,
            "width": 50,
            "height": 50,
            "padding": 0,
            "font-size": 18,
            "color": "#f8f594",
            "border": "none",
            "text-align": "center"
          }
        },{
          "id": "",
          "text": "库存",
          "css":{
            "x": 50,
            "y": 525,
            "width": 50,
            "height": 50,
            "padding": 0,
            "font-size": 18,
            "color": "#f8f594",
            "border": "none",
            "text-align": "center"
          }
        },{
          "id": "",
          "text": "机器人",
          "css":{
            "x": 370,
            "y": 525,
            "width": 200,
            "height": 30,
            "padding": 0,
            "font-size": 18,
            "color": "#f8f594",
            "border": "",
            "text-align": "left"
          }
        }],
    
        "new_card": [{
          "title":"A类/鞋",
          "state":0,
          "css":{
            "x": 50,
            "y": 50,
            "width": 300,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-BinUseA"
        },{
          "title":"B类/衣服",
          "state":0,
          "css":{
            "x": 50,
            "y": 160,
            "width": 300,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-BinUseB"
        },{
          "title":"A类/鞋",
          "state":0,
          "css":{
            "x": 50,
            "y": 300,
            "width": 300,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ShelfUseA"
        },{
          "title":"B类/衣服",
          "state":0,
          "css":{
            "x": 50,
            "y": 410,
            "width": 300,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ShelfUseB"
        },
        
        {
          "title":"总库存",
          "state":0,
          "css":{
            "x": 50,
            "y": 550,
            "width": 300,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-InventoryPool",
          "keyOrder":["总数","已分配","已冻结","可用"]
        },{
          "title":"SKU",
          "state":0,
          "css":{
            "x": 50,
            "y": 660,
            "width": 300,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-SKUPool"
        },
      
        {
          "title":"入库单",
          "state":0,
          "css":{
            "x": 650,
            "y": 50,
            "width": 170,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ReceiptIn"
        },{
          "title":"已完成",
          "state":0,
          "css":{
            "x": 830,
            "y": 50,
            "width": 170,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ReceiptCopleted"
        },{
          "title":"作业中",
          "state":0,
          "css":{
            "x": 1010,
            "y": 50,
            "width": 170,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ReceiptWorking"
        },{
          "title":"未开始",
          "state":0,
          "css":{
            "x": 1190,
            "y": 50,
            "width": 170,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ReceiptNotStart"
        },
      
        {
          "title":"出库单",
          "state":0,
          "css":{
            "x": 650,
            "y": 210,
            "width": 170,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-OutOrderIn"
        },{
          "title":"已完成",
          "state":0,
          "css":{
            "x": 830,
            "y": 210,
            "width": 170,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-OutOrderComplete"
        },{
          "title":"已分配",
          "state":0,
          "css":{
            "x": 1010,
            "y": 210,
            "width": 170,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-OutOrderAllocated"
        },{
          "title":"系统报缺",
          "state":0,
          "css":{
            "x": 1190,
            "y": 210,
            "width": 170,
            "height": 100,
            "border": "solid 1px #fff",
            "padding":20,
            "background":"#1e2647",
            "color":"#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-OutOrderLack"
        }],
    
        "new_pie_1":[{
          "id":"pie111",
          "type":"new_pie_1",
          "css":{
            "x": 380,
            "y": 50,
            "width": 200,
            "height": 100,
            "z-index": 9,
            "border": "none",
            "padding":5,
            "background":"#142a41"
          },
          "echartOption":{
            "color": "#4f8ff9|#38c3ec|#a2fdff|#c0f8ff",
            "series": {
              "name":"使用占比",
              "type": "pie",
              "radius": "65%|100%",
              "label": {    
                "color": "#f8f594",
                "fontSize": 12,
                "position": "center",
                "formatter": "{a}\n{c}%"
              }
            }
          },    
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-BinUseScaleA"
        },{
          "id":"pie222",
          "type":"new_pie_1",
          "css":{
            "x": 380,
            "y": 170,
            "width": 200,
            "height": 100,
            "z-index": 9,
            "border": "none",
            "padding":5,
            "background":"#142a41"
          },
          "echartOption":{
            "color": "#4f8ff9|#38c3ec|#a2fdff|#c0f8ff",
            "series": {
              "name":"使用占比",
              "type": "pie",
              "radius": "65%|100%",
              "label": {    
                "color": "#f8f594",
                "fontSize": 12,
                "position": "center",
                "formatter": "{a}\n{c}%"
              }
            }
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-BinUseScaleB"
        },{
          "id":"pie333",
          "type":"new_pie_1",
          "css":{
            "x": 380,
            "y": 300,
            "width": 200,
            "height": 100,
            "z-index": 9,
            "border": "none",
            "padding":5,
            "background":"#142a41"
          },
          "echartOption":{
            "color": "#4f8ff9|#38c3ec|#a2fdff|#c0f8ff",
            "series": {
              "name":"使用占比",
              "type": "pie",
              "radius": "65%|100%",
              "label": {    
                "color": "#f8f594",
                "fontSize": 12,
                "position": "center",
                "formatter": "{a}\n{c}%"
              }
            }
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ShelfUseScaleA"
        },{
          "id":"pie444",
          "type":"new_pie_1",
          "css":{
            "x": 380,
            "y": 410,
            "width": 200,
            "height": 100,
            "z-index": 9,
            "border": "none",
            "padding":5,
            "background":"#142a41"
          },
          "echartOption":{
            "color": "#4f8ff9|#38c3ec|#a2fdff|#c0f8ff",
            "series": {
              "name":"使用占比",
              "type": "pie",
              "radius": "65%|100%",
              "label": {    
                "color": "#f8f594",
                "fontSize": 12,
                "position": "center",
                "formatter": "{a}\n{c}%"
              }
            }
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-ShelfUseScaleB"
        }],
    
        "new_pie_2":[{
          "id":"piex",
          "type":"new_pie_2",
          "css":{
            "x": 360,
            "y": 550,
            "width": 240,
            "height": 210,
            "z-index": 9,
            "border": "none",
            "padding":5,
            "background":"#142a41"
          },
          "echartOption":{
            "color": "#4f8ff9|#38c3ec|#a2fdff|#c0f8ff",
            "title": {
              "text": "",
              "textStyle": {
                "fontSize": 16,
                "color": "#f8f4a0"
              }
            },
            "legend": {
              "orient": "vertical",
              "left": "right",
              "textStyle": {
                "color": "#f8f4a0"
              }
            },
            "series": {
              "name": "机器人",
              "radius" : "50%",
              "center": "50%|55%",
            }
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-robot"
        }],
    
    
        "new_bar": [{
          "id": "componentId_bar001",
          "css":{
            "x": 650,
            "y": 330,
            "width": 350,
            "height": 200,
            "border": "none",
            "padding":10,
            "background":"#1e2647"
          },
          "echartOption":{
            "title": {
              "show": true,
              "text": "出库单",
              "x": "left",
              "textStyle": {
                "fontSize": 16,
                "color": "#f8f4a0"
              }
            },
            "axisLabel": {
              "show": true,
              "textStyle": {
                "color": "#f8f4a0"
              }
            },
            "color":  "#4f8ff9|#38c3ec|#a2fdff|#eada80",
            "legend":{
              "show": true,
              "textStyle": {
                "color": "#f8f4a0"
              }
            }
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-HistogramOutOrder"
        },{
          "id": "componentId_bar002",
          "css":{
            "x": 1010,
            "y": 330,
            "width": 350,
            "height": 200,
            "border": "none",
            "padding":10,
            "background":"#1e2647",
          },
          "echartOption":{
            "title": {
              "show": true,
              "text": "已完成",
              "x": "left",
              "textStyle": {
                "fontSize": 16,
                "color": "#f8f4a0"
              }
            },
            "axisLabel": {
              "show": true,
              "textStyle": {
                "color": "#f8f4a0"
              }
            },
            "color": "#4f8ff9|#38c3ec|#a2fdff|#eada80",
            "legend":{
              "show": true,
              "textStyle": {
                "color": "#f8f4a0"
              }
            }
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-HistogramOutOrderCompleted"
        },{
          "id": "componentId_bar003",
          "css":{
            "x": 650,
            "y": 540,
            "width": 350,
            "height": 200,
            "border": "none",
            "padding":10,
            "background":"#1e2647"
          },
          "echartOption":{
            "title": {
              "show": true,
              "text": "已分配",
              "x": "left",
              "textStyle": {
                "fontSize": 16,
                "color": "#f8f4a0"
              }
            },
            "axisLabel": {
              "show": true,
              "textStyle": {
                "color": "#f8f4a0"
              }
            },
            "color": "#4f8ff9|#38c3ec|#a2fdff|#eada80",
            "legend":{
              "show": true,
              "textStyle": {
                "color": "#f8f4a0"
              }
            }
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-HistogramOutOrderAllocated"
        },{
          "id": "componentId_bar004",
          "css":{
            "x": 1010,
            "y": 540,
            "width": 350,
            "height": 200,
            "border": "none",
            "padding":10,
            "background":"#1e2647"
          },
          "echartOption":{
            "title": {
              "show": true,
              "text": "系统报缺",
              "x": "left",
              "textStyle": {
                "fontSize": 16,
                "color": "#f8f4a0"
              }
            },
            "axisLabel": {
              "show": true,
              "textStyle": {
                "color": "#f8f4a0"
              }
            },
            "color": "#4f8ff9|#38c3ec|#a2fdff|#eada80",
            "legend":{
              "show": true,
              "textStyle": {
                "color": "#f8f4a0"
              }
            }
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-HistogramOutOrderLack"
        }],
    
        "new_info": [{
          "id": "",
          "template": "总数:{{data}}",
          "css":{
            "x": 380,
            "y": 560,
            "width": 100,
            "height": 20,
            "padding": 0,
            "font-size": 14,
            "color": "#f8f4a0",
            "border": "none",
            "background": "none",
            "text-align": "left",
            "z-index":999,
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode":"lifeng-robotTote"
        }]
      }
    }
    
    
  }

  //香奈儿1
  if ("chanel-InboundEfficiency" == code) {    
    jsonData = {
      "version":"20190523",
      "code": "chanel-InboundEfficiency",
      "pageId": "pageId-00004",
      "lang":"en",
      "canvas": {
        "zoom-type":0, 
        "width": 1300,
        "height": 2000,
        "background": "#dfdfdf",
        "formFormat":{
          "labelPosition":"top",
          "colSpan":8
        }
      },
      "components": {
        "table": [{
          "foldSearchPanel":true,
          "autoSearch":true,
          "noDataInfo":"No data",
          "tableTitle":"我是表的名字哦1",
          "tableColumnWidth":300,
          "id": "componentId_00003",
          "css":{
            "x": 0,
            "y": 0,
            "width": 1300,
            "padding": 10
          },
          "exported": true,
          "showIndexColumn":true,
          "currentPage":1,
          "pageSize":10,
          "showPage":true,
          "initTableUrl":"/epimetheus/api_v1/diy/column/initForView",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "initUrl": "/epimetheus/api_v1/diy/column/initForView",
          "resetBtnText":"重置",
          "searchBtns":[{
            "text":"查询",
            "dataUrl": "/epimetheus/api/diy/report/selectData",
            "initUrl": "/epimetheus/api_v1/diy/column/initForView",
            "diyCoreCode":"chanel-InboundEfficiency"
          }],
          "exportBtn": {
            "show":true,
            "text":"导出",
          },
          "downloadColumn": {
            "show":false,
            "columnKey":"",
          },
          "initForView":{
            "conditionColumnList": [{
              "label": "普通输入框 (type:10)",
              "keyName": "name1",
              "type": "10",
              "typeScribe": "beeInput",
              "placeholder": "请输入",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 0
            }, {
              "label": "范围输入框 (type:11)",
              "keyName": "name2",
              "type": "11",
              "typeScribe": "beeInputRange",
              "placeholder": "请输入",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 1
            }, {
              "label": "普通下拉 (type:20)",
              "keyName": "love",
              "type": "20",
              "typeScribe": "beeSelect",
              "placeholder": "请选择",
              "defaultValue": "",
              "rule": {},
              "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
              "referenceColumn": "playerNameValue",
              "referenceDisplayColumn": "playerName",
              "queryIndex": 2
            }, {
              "label": "日期 (type:30)",
              "keyName": "date1",
              "type": "30",
              "typeScribe": "beeDatePicker",
              "placeholder": "请选择",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 3
            }, {
              "label": "日期（范围） (type:31)",
              "keyName": "date2",
              "type": "31",
              "typeScribe": "beeDatePickerRange",
              "placeholder": ["开始", "结束"],
              "defaultValue": "",
              "rule": {},
              "queryIndex": 4
            }, {
              "label": "日期时间 (type:40)",
              "keyName": "date3",
              "type": "40",
              "typeScribe": "beeDateTimePicker",
              "placeholder": "请选择",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 6
            }, {
              "label": "日期时间（范围） (type:41)",
              "keyName": "date4",
              "type": "41",
              "typeScribe": "beeDateTimePickerRange",
              "placeholder": ["开始", "结束"],
              "defaultValue": "",
              "rule": {},
              "queryIndex": 5
            }],
            "resultColumnList": [{
              "bbb": 222
            }]
          }
        }]
      }

    }

  }

  //香奈儿2
  if ("chanel-OutboundEfficiency" == code) {    
    jsonData = {
      "version":"20190523",
      "code": "chanel-OutboundEfficiency",
      "pageId": "pageId-004",
      "lang":"en",
      "canvas": {
        "zoom-type":0, 
        "width": 1300,
        "height": 2000,
        "background": "#dfdfdf",
        "formFormat":{
          "labelPosition":"top",
          "colSpan":8
        }
      },
      "components": {
        "table": [{
          "foldSearchPanel":true,
          "autoSearch":true,
          "noDataInfo":"No data",
          "tableTitle":"我是表的名字哦2",
          "id": "componentId_001",
          "css":{
            "x": 0,
            "y": 0,
            "width": 1300,
            "padding": 10
          },
          "showIndexColumn":true,
          "currentPage":1,
          "pageSize":10,
          "showPage":true,
          "initTableUrl":"/epimetheus/api_v1/diy/column/initForView",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "initUrl": "/epimetheus/api_v1/diy/column/initForView",
          "resetBtnText":"重置",
          "searchBtns":[{
            "text":"查询",
            "dataUrl": "/epimetheus/api/diy/report/selectData",
            "initUrl": "/epimetheus/api_v1/diy/column/initForView",
            "diyCoreCode":"chanel-OutboundEfficiency"
          }],
          "exportBtn": {
            "show":true,
            "text":"导出",
          },
          "downloadColumn": {
            "show":false,
            "columnKey":"",
          },
          "initForView":{
            "conditionColumnList": [{
              "label": "普通输入框 (type:10)",
              "keyName": "name1",
              "type": "10",
              "typeScribe": "beeInput",
              "placeholder": "请输入",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 0
            }, {
              "label": "范围输入框 (type:11)",
              "keyName": "name2",
              "type": "11",
              "typeScribe": "beeInputRange",
              "placeholder": "请输入",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 1
            }, {
              "label": "普通下拉 (type:20)",
              "keyName": "love",
              "type": "20",
              "typeScribe": "beeSelect",
              "placeholder": "请选择",
              "defaultValue": "2",
              "rule": {},
              "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
              "referenceColumn": "playerNameValue",
              "referenceDisplayColumn": "playerName",
              "queryIndex": 2
            }, {
              "label": "日期 (type:30)",
              "keyName": "date1",
              "type": "30",
              "typeScribe": "beeDatePicker",
              "placeholder": "请选择",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 3
            }, {
              "label": "日期（范围） (type:31)",
              "keyName": "date2",
              "type": "31",
              "typeScribe": "beeDatePickerRange",
              "placeholder": ["开始", "结束"],
              "defaultValue": "",
              "rule": {},
              "queryIndex": 4
            }, {
              "label": "日期时间 (type:40)",
              "keyName": "date3",
              "type": "40",
              "typeScribe": "beeDateTimePicker",
              "placeholder": "请选择",
              "defaultValue": "",
              "rule": {},
              "queryIndex": 6
            }, {
              "label": "日期时间（范围） (type:41)",
              "keyName": "date4",
              "type": "41",
              "typeScribe": "beeDateTimePickerRange",
              "placeholder": ["开始", "结束"],
              "defaultValue": "",
              "rule": {},
              "queryIndex": 5
            }],
            "resultColumnList": [{
              "bbb": 222
            }]
          }
        }]
      }

    }

  }



  ctx.body = {
    data: {jsonData}
  }
})

//获取大屏列表
router.get('/view/template/list', async (ctx, next) => {

  // businessType: 3
  // createTime: 0
  // creator: "1"
  // diyCoreCode: "print_label_1570"
  // diyCoreName: "yashilandai"
  // diyViewCode: "leave"
  // diyViewId: 7
  // jsonData: "function formatTimeESTEELAUDER(timestamp) {↵			if (timestamp) {↵			var timestamp = parseInt(timestamp);↵			var t = new Date(timestamp);↵			var date =↵			((t.getHours()) < 10 ? "0" + t.getHours() : t.getHours()) + ":" +↵			((t.getMinutes()) < 10 ? "0" + t.getMinutes() : t.getMinutes()) + ":" +↵			((t.getSeconds()) < 10 ? "0" + t.getSeconds() : t.getSeconds()) + " " +↵			((t.getDate()) < 10 ? "0" + t.getDate() : t.getDate()) + "." +↵			((t.getMonth() + 1) < 10 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1)) + "." +↵			t.getFullYear();↵			return date;↵			} else {↵			return '';↵			}↵			};↵			LODOP.SET_PRINT_PAGESIZE(1, 1000, 1500, "10x15cm");↵			LODOP.SET_PRINT_MODE("PRINT_NOCOLLATE", 1);↵			LODOP.ADD_PRINT_RECT(7, 4, 360, 440, 0, 1);↵			LODOP.ADD_PRINT_LINE(96, 4, 95, 364, 0, 1);↵			LODOP.ADD_PRINT_LINE(216, 4, 215, 364, 0, 1);↵			LODOP.ADD_PRINT_LINE(332, 4, 331, 364, 0, 1);↵			LODOP.ADD_PRINT_LINE(95, 171, 7, 172, 0, 1);↵			LODOP.ADD_PRINT_LINE(447, 200, 95, 201, 0, 1);↵			LODOP.ADD_PRINT_SHAPE(4, 109, 200, 163, 19, 0, 1, "#000000");↵			LODOP.ADD_PRINT_SHAPE(4, 308, 308, 56, 23, 0, 1, "#000000");↵			LODOP.ADD_PRINT_BARCODE(134, 207, 149, 76, "128Auto", data.reservation8); //"SORT HK003"↵			LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);↵			LODOP.ADD_PRINT_BARCODE(476, 8, 347, 71, "128Auto", data.outOrderCode);//"(00)200050507097206944"↵			LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);↵			LODOP.ADD_PRINT_TEXT(453, 8, 355, 20, data.outOrderCode);//"(00)200050507097206944"↵			LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);↵			LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);↵			LODOP.ADD_PRINT_TEXT(550, 26, 323, 15, formatTimeESTEELAUDER(new Date().getTime()));//14:27:43 24.01.2019↵			LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);↵			LODOP.ADD_PRINT_TEXT(11, 8, 162, 84, "FROM:\n" + data.consignorAddress);↵			LODOP.ADD_PRINT_TEXT(9, 170, 194, 85, "Delivery Instructions:\n"+ data.consigneeRemark);↵			LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);↵			LODOP.ADD_PRINT_TEXT(96, 8, 191, 116, "TO:\n\n"+ data.consigneeAddress);↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);↵			LODOP.ADD_PRINT_TEXT(113, 201, 162, 14, "SORT "+data.reservation8); //"SORT HK003"↵			LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FFFFFF");↵			LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);↵			LODOP.ADD_PRINT_TEXT(313, 311, 52, 14, "END");↵			LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);↵			LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FFFFFF");↵			LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);↵			LODOP.ADD_PRINT_TEXT(218, 7, 66, 116, "CUST PO#:\n\n\n\nBRAND:\n\n\n\nCASE:");↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);↵			LODOP.ADD_PRINT_TEXT(334, 8, 76, 107, "\n\nWS:\n\n\n\n\n\nRDD:");//"START ZONE:\nWAVE #:\nWS:\n\n\n\n\n\nRDD:"↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);↵			LODOP.ADD_PRINT_TEXT(430, 83, 119, 15, data.reservation5);↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);↵			LODOP.ADD_PRINT_TEXT(333, 203, 159, 107, "");//"END ZONE: 123123133"↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);↵			LODOP.ADD_PRINT_TEXT(218, 82, 119, 49, data.reservation11);↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);↵			LODOP.ADD_PRINT_TEXT(266, 83, 119, 42, data.reservation10);↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);↵			LODOP.ADD_PRINT_TEXT(314, 83, 119, 15, data.dict.containerTypeMap[data.designatedContainerType]);↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);↵			LODOP.ADD_PRINT_TEXT(334, 84, 114, 94, "\n\n"+data.reservation7);↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);↵			LODOP.ADD_PRINT_TEXT(218, 202, 66, 116, "DELIVERY:\n\nROUTE:\n\nCARTON:");↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);↵			LODOP.ADD_PRINT_TEXT(218, 268, 93, 116, data.outWaveCode+"\n\n"+data.carrierLineCode+"\n\n"+data.reservation9);↵			LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -5);"
  // remark: ""
  // updateTime: 20190510160447
  // updateUser: ""
  // url: ""
  // viewName: "print_label_1570"

  let data = [
  {
    diyViewCode: "Demo",
    viewName: 'Demo'
  },
  {
    diyViewCode: "report-InventoryVolume",
    viewName: '雅诗兰黛1'
  }, {
    diyViewCode: "report-SkuHot",
    viewName: '雅诗兰黛2'
  }, {
    diyViewCode: "lifeng-ReportScreen",
    viewName: '利丰大屏'
  }, {
    diyViewCode: "chanel-InboundEfficiency",
    viewName: '香奈儿-入库效率'
  }, {
    diyViewCode: "chanel-OutboundEfficiency",
    viewName: '香奈儿-出库效率'
  },{
    diyViewCode: "asyncExport",
    viewName: '异步导出'
  }, ]
  ctx.body = {
    data: data
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
        "dataType":1,   //数据类型 1字符串 2整型 3日期 4小数 50字典 
        "dataLength":0,
        "decimallength":0,
        "columnIndex":0,   //列的顺序
        "defaultValue":"",
        "isDiy":0,
        "isReadonly":0,
        "isResult":1,
        "isCondition":0,
        "queryType":0,   // 1大于 2等于 3小于 4大于等于 5小于等于 6包含 7范围 8不等于 9模糊 10不包含
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
        "defaultValue":"",      //默认值
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
        "referenceUrl":url+"/epimetheus/api_v1/diy/xxx/xxx?code=", //关联URL
        "referenceColumn":"playerNameValue",  //下拉的值
        "referenceDisplayColumn":"playerName", //下拉显示
        //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "queryIndex":3,  //组件出现顺序
      }]
    }
  }else if("InventoryReportByBin"==code){
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
        "defaultValue":"",      //默认值
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
        "referenceUrl":url+"/epimetheus/api_v1/diy/xxx/xxx?code=", //关联URL
        "referenceColumn":"playerNameValue",  //下拉的值
        "referenceDisplayColumn":"playerName", //下拉显示
        //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
        //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
        "queryIndex":3,  //组件出现顺序
      }]
    }
  }else if("SkuHot"==code){
    data = {
      //这部分是对table部分的配置
      "resultColumnList":[{
        "columnName":"date",   //列的key   
        "displayName":"访问地球时间",   //列头[{"key":},]
        "columnIndex":0,   //列的顺序
      },{
        "columnName":"name",   //列的key   
        "displayName":"奥特曼",   //列头名字  
        "columnIndex":2,   //列的顺序
      },{
        "columnName":"address",   //列的key   
        "displayName":"星云",   //列头名字  
        "columnIndex":3,   //列的顺序
      }],
      //这个部分是对查询条件部分的配置
      "conditionColumnList":[
        {
          "isForeign":1,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":0,    //大类型：3是日期（日期选择框）
          "columnName":'customerCode',  //关联字段
          "displayName":"Owner",    //label显示
          "defaultValue":'1',      //默认值
          "placeholder":"请选择",    //placeholder
          "referenceUrl":url+"/epimetheus/api_v1/diy/yyy/yyy", //关联URL
          "referenceColumn":"playerNameValue",  //下拉的值
          "referenceDisplayColumn":"playerName", //下拉显示
          //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":0,  //组件出现顺序
        },
        {
          "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":3,    //大类型：3是日期（日期选择框）
          "columnName":'completedTime',  //关联字段
          "displayName":"OutDate",    //label显示
          "defaultValue":"",      //默认值
          "placeholder":"请选择",    //placeholder
          //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":1,  //组件出现顺序
        },

        {
          "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":1,    //大类型：1是字符串（普通输入框）
          "columnName":'skuCode',  //关联字段
          "displayName":"SKU",    //label显示
          "defaultValue":"",      //默认值
          "placeholder":"请输入",    //placeholder
          //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":2,  //组件出现顺序
        },

        {
          "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":1,    //大类型：1是字符串（普通输入框）
          "columnName":'outBatchCode',  //关联字段
          "displayName":"OutBatchCode",    //label显示
          "defaultValue":"",      //默认值
          "placeholder":"请输入",    //placeholder
          //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":3,  //组件出现顺序
        },

        {
          "isForeign":1,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":0,    //大类型：3是日期（日期选择框）
          "columnName":'binCode',  //关联字段
          "displayName":"BinCode",    //label显示
          "defaultValue":'',      //默认值
          "placeholder":"请选择",    //placeholder
          "referenceUrl":url+"/epimetheus/api_v1/diy/yyy/yyy", //关联URL
          "referenceColumn":"playerNameValue",  //下拉的值
          "referenceDisplayColumn":"playerName", //下拉显示
          //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":4,  //组件出现顺序
        },

        {
          "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":2,    //大类型：1是字符串（普通输入框） 2整形
          "columnName":'hitTimes',  //关联字段
          "displayName":"HitTimes",    //label显示
          "defaultValue":"1-200",      //默认值
          "placeholder":"请输入",    //placeholder
          "queryType":7,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":5,  //组件出现顺序
        },

        {
          "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":2,    //大类型：1是字符串（普通输入框） 2整形
          "columnName":'hitAmount',  //关联字段
          "displayName":"HitAmount",    //label显示
          "defaultValue":"",      //默认值
          "placeholder":"请输入",    //placeholder
          "queryType":7,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":5,  //组件出现顺序
        },
      
      ]


    }
  }else if("chanel-OutboundEfficiency"==code){
    data = {
      //这部分是对table部分的配置
      "resultColumnList":[{
        "columnName":"date",   //列的key   
        "displayName":"香奈儿出库日期",   //列头[{"key":},]
        "columnIndex":0,   //列的顺序
      },{
        "columnName":"name",   //列的key   
        "displayName":"货主",   //列头名字  
        "columnIndex":2,   //列的顺序
      },{
        "columnName":"address",   //列的key   
        "displayName":"工作站",   //列头名字  
        "columnIndex":3,   //列的顺序
      }],
      //这个部分是对查询条件部分的配置
      "conditionColumnList":[
        {
          "isForeign":1,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":0,    //大类型：3是日期（日期选择框）
          "columnName":'customerCode',  //关联字段
          "displayName":"香奈儿1 货主",    //label显示
          "defaultValue":'1',      //默认值
          "placeholder":"请选择",    //placeholder
          "referenceUrl":url+"/epimetheus/api_v1/diy/yyy/yyy", //关联URL
          "referenceColumn":"playerNameValue",  //下拉的值
          "referenceDisplayColumn":"playerName", //下拉显示
          //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":0,  //组件出现顺序
        },

        {
          "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":1,    //大类型：1是字符串（普通输入框）
          "columnName":'skuCode',  //关联字段
          "displayName":"操作人",    //label显示
          "defaultValue":"",      //默认值
          "placeholder":"请输入",    //placeholder
          //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":2,  //组件出现顺序
        },

        {
          "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":3,    //大类型：3是日期（日期选择框）
          "columnName":'date',  //关联字段
          "displayName":"时间范围",    //label显示
          "defaultValue":"",      //默认值
          "placeholder":["开始","结束"],    //placeholder
          "queryType":7,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":4,  //组件出现顺序
        },
      
      ]


    }
  }else if("chanel-InboundEfficiency"==code){
    data = {
      //这部分是对table部分的配置
      "resultColumnList":[{
        "columnName":"date",   //列的key   
        "displayName":"香奈儿出库日期",   //列头[{"key":},]
        "columnIndex":0,   //列的顺序
      },{
        "columnName":"name",   //列的key   
        "displayName":"货主",   //列头名字  
        "columnIndex":2,   //列的顺序
      },{
        "columnName":"address",   //列的key   
        "displayName":"工作站",   //列头名字  
        "columnIndex":3,   //列的顺序
      }],
      //这个部分是对查询条件部分的配置
      "conditionColumnList":[
        {
          "isForeign":1,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":0,    //大类型：3是日期（日期选择框）
          "columnName":'customerCode',  //关联字段
          "displayName":"香奈儿2 货主",    //label显示
          "defaultValue":'1',      //默认值
          "placeholder":"请选择",    //placeholder
          "referenceUrl":url+"/epimetheus/api_v1/diy/yyy/yyy", //关联URL
          "referenceColumn":"playerNameValue",  //下拉的值
          "referenceDisplayColumn":"playerName", //下拉显示
          //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":0,  //组件出现顺序
        },

        {
          "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":1,    //大类型：1是字符串（普通输入框）
          "columnName":'skuCode',  //关联字段
          "displayName":"操作人",    //label显示
          "defaultValue":"",      //默认值
          "placeholder":"请输入",    //placeholder
          //"queryType":0,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":2,  //组件出现顺序
        },

        {
          "isForeign":0,   //是否关联 0不关联 1关联，关联的是下拉
          "dataType":3,    //大类型：3是日期（日期选择框）
          "columnName":'date',  //关联字段
          "displayName":"时间范围",    //label显示
          "defaultValue":"",      //默认值
          "placeholder":["开始","结束"],    //placeholder
          "queryType":7,   //查询类型  等值（1个）、范围（2个，数据用“-”分割）、大于小于包含（用逗号分割）
          //"referenceUrl":"",   //关联的url 数据源，这个会得到多个数据，但我们只要其中2个， referenceDisplayColumn 下拉显示，  referenceColumn 下来的组件的值。
          "queryIndex":4,  //组件出现顺序
        },
      
      ]


    }
  }else if("asyncExport"==code){
    data = {
      "resultColumnList":[{
        "columnName":"a",
        "displayName":"仓库",
        "columnIndex":1,
      },{
        "columnName":"b",
        "displayName":"导出类型",
        "columnIndex":2,
      },{
        "columnName":"c",
        "displayName":"状态",
        "columnIndex":3,
      },{
        "columnName":"d",
        "displayName":"导出任务编号",
        "columnIndex":3,
      },{
        "columnName":"e",
        "displayName":"导出开始时间",
        "columnIndex":3,
      },{
        "columnName":"f",
        "displayName":"导出结束时间",
        "columnIndex":3,
      },{
        "columnName":"creator_user",
        "displayName":"创建人",
        "columnIndex":3,
      }],
      "conditionColumnList":[],
    }
  }
  ctx.body = {
    data: data
  }
})

//关联U
//创建大屏配置
router.get('/xxx/xxx', async (ctx, next) => {

  let code = ctx.query.code;
  
  ctx.body = {
    data:[
      {
        "playerName":"孙悟空"+code,
        "playerName2":"兰陵王"+code,
        "playerNameValue":"1"
      },
      {
        "playerName":"沙和尚"+code,
        "playerName2":"程咬金"+code,
        "playerNameValue":"2"
      },
    ]
  }
  


})
router.get('/yyy/yyy', async (ctx, next) => {
  ctx.body = {
    data:[
      {
        "playerName":"观世音",
        "playerNameValue":"1"
      },
      {
        "playerName":"红孩儿",
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
