import bee from "@/src/tools/bee";

//用于可视化的配置模板
function getWidgetConfig (){
  return {
    "new_bar":{
      "id": bee.guidGenerator(),
      "type":"new_bar",
      "css":{
        "x": 20,
        "y": 20,
        "width": 250,
        "height": 200,
        "z-index": 9,
        "border": "none",
        "border-radius":0,
        "padding":5,
        "background":"#142a41"
      },
      "echartOption":{
        "color": "#4f8ff9|#38c3ec|#a2fdff|#eada80",
        "title": {
          "text": "出库单",
          "textStyle": {
            "fontSize": 16,
            "color": "#f8f4a0"
          }
        },
        "axisLabel": {
          "show": "true",
          "textStyle": {
            "color": "#f8f4a0"
          }
        },
        "legend":{
          "show": "true",
          "textStyle": {
            "color": "#f8f4a0"
          }
        }
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"lifeng-HistogramOutOrder"
    },
    "new_line":{
      "id": bee.guidGenerator(),
      "type":"new_line",
      "css":{
        "x": 20,
        "y": 20,
        "width": 250,
        "height": 200,
        "z-index": 9,
        "border": "none",
        "border-radius":0,
        "padding":5,
        "background":"#142a41"
      },
      "echartOption":{
        "color": "#4f8ff9|#38c3ec|#a2fdff|#eada80",
        "title": {
          "text": "出库单",
          "textStyle": {
            "fontSize": 16,
            "color": "#f8f4a0"
          }
        },
        "axisLabel": {
          "show": "true",
          "textStyle": {
            "color": "#f8f4a0"
          }
        },
        "legend":{
          "show": "true",
          "textStyle": {
            "color": "#f8f4a0"
          }
        }
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"demo_line"
    },
    "new_pie_1":{
      "id": bee.guidGenerator(),
      "type":"new_pie_1",
      "css":{
        "x": 20,
        "y": 20,
        "width": 200,
        "height": 200,
        "z-index": 9,
        "border": "none",
        "border-radius":0,
        "padding":5,
        "background":"#142a41"
      },
      "echartOption":{
        "color": "#4f8ff9|#38c3ec|#a2fdff|#c0f8ff",
        "series": {
          "name":"使用占比",
          "radius": "35%|50%",
          "label": {    
            "color": "#f8f4a0",
            "fontSize": 12,
            "formatter": "{a}\n{c}%"
          }
        }
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"lifeng-BinUseScaleA"
    },
    "new_pie_2":{
      "id": bee.guidGenerator(),
      "type":"new_pie_2",
      "css":{
        "x": 20,
        "y": 20,
        "width": 250,
        "height": 200,
        "z-index": 9,
        "border": "none",
        "border-radius":0,
        "padding":5,
        "background":"#142a41"
      },
      "echartOption":{
        "color": "#4f8ff9|#38c3ec|#a2fdff|#c0f8ff",
        "title": {
          "text": "饼图2",
          "textStyle": {
            "fontSize": 16,
            "color": "#f8f4a0"
          }
        },
        "legend": {
          "show": "true",
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
      "diyCoreCode":"lifeng-robot2"
    },
    "new_card":{
      "id": bee.guidGenerator(),
      "type":"new_card",
      "css":{
        "x": 20,
        "y": 20,
        "width": 300,
        "height": 100,
        "z-index": 9,
        "border": "",
        "border-radius":0,
        "padding":10,
        "background":"#142a41",
        "color":"#f8f594"
      },
      "title":"A类/鞋",
      "state":0,
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"lifeng-BinUseA"
    },
    "beeTitle":{
      "id": bee.guidGenerator(),
      "type":"beeTitle",
      "css":{
        "x": 20,
        "y": 20,
        "width": 150,
        "height": 30,
        "z-index": 9,
        "padding": 0,
        "font-size": 24,
        "font-weight":"normal",
        "color": "#f8f4a0",
        "border": "",
        "border-radius":0,
        "background": "",
        "text-align": "left"
      },
      "text": "大屏DEMO"
    },
    "dater":{
      "id": bee.guidGenerator(),
      "type":"dater",
      "css":{
        "x": 20,
        "y": 20,
        "width": 150,
        "height": 30,
        "z-index": 9,
        "padding": 0,
        "font-size": 12,
        "color": "red",
        "border": "",
        "border-radius":0,
        "background": "",
        "text-align": "left"
      }
    },
    "new_info":{
      "id": bee.guidGenerator(),
      "type":"new_info",
      "css":{
        "x": 20,
        "y": 20,
        "width": 300,
        "height": 20,
        "z-index":9,
        "border": "none",
        "border-radius":0,
        "padding": 0,
        "font-size": 12,
        "text-align": "left",
        "color": "#f8f4a0",
        "background": "none"
      },
      "template": "目前完成的订单总数为“{{data}}”，继续努力！",
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"lifeng-robotTote" 
    },
    "textBar":{
      "id": bee.guidGenerator(),
      "type":"textBar",
      "options":{
        "TotalVolume":"TotalVolume",
        "TotalUseVolume":"TotalUseVolume",
        "TotalAvailability":"TotalAvailability",
      },
      "css":{
        "x": 20,
        "y": 20,
        "width": 400,
        "height": 20,
        "z-index":9,
        "border": "none",
        "border-radius":0,
        "padding": 0,
        "font-size": 12,
        "text-align": "left",
        "color": "yellow",
        "background": "none"
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"InventoryReportByWarehouse"
    },
    "beeTable": {
      "id": bee.guidGenerator(),
      "type":"beeTable",
      "css":{
        "x": 0,
        "y": 0,
        "width": 1200,
        "padding": 10
      },
      "formFormat":{
        "labelPosition":"top",
        "colSpan":8
      },
      "exportBtn": {
        "show":"false",
        "text":"导出",
      },
      "downloadColumn": {
        "show":"false",
        "columnKey":"",
      },
      "noDataInfo":"No data",
      "exported": "true",
      "showIndexColumn":"true",
      "showPage":"true",
      "currentPage":1,
      "pageSize":10,
      "resetBtnText":"重置",
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "initUrl": "/epimetheus/api_v1/diy/column/initForView",

      "searchBtns":'[{"text":"按货架查询","dataUrl":"/epimetheus/api/diy/report/selectData","initUrl":"/epimetheus/api_v1/diy/column/initForView","diyCoreCode":"InventoryReportByShelf"},{"text":"按货位查询","dataUrl":"/epimetheus/api/diy/report/selectData","initUrl":"/epimetheus/api_v1/diy/column/initForView","diyCoreCode":"InventoryReportByBin"}]',
      "initForView":{
        "conditionColumnList":""
      },
    },
    //永辉大屏新增
    "new_cardGroup":{
      "id": bee.guidGenerator(),
      "type":"new_cardGroup",
      "css":{
        "x": 20,
        "y": 20,
        "width": 1000,
        "height": 400,
        "z-index": 9,
        "border": "solid 1px #f8f594",
        "padding":10,
        "background":"#142a41",
        "color":"#f8f594"
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"yonghui_shops"
    },
    "beeCard":{
      "id": bee.guidGenerator(),
      "type":"beeCard",
      "css":{
        "x": 20,
        "y": 20,
        "width": 300,
        "height": 100,
        "z-index":9,
        "border": "solid 1px #1f3e7b",
        "border-radius":0,
        "padding": 0,
        "font-size": 12,
        "text-align": "left",
        "color": "#f8f4a0",
        "background": "#16244a"
      },
      "widgetOption":{
        "cardStyle":1,
        "keyCss":{
          "font-size":12,
          "color":"#3c8bd0",
          "width":"",
        },
        "valueCss":{
          "font-size":30,
          "color":"#3c8bd0",
          "width":"",
        }
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"YH-card" 
    },
    "YH_lines":{
      "id": bee.guidGenerator(),
      "type":"YH_lines",
      "css":{
        "x": 20,
        "y": 20,
        "width": 600,
        "height": 500,
        "z-index": 9,
        "border": "",
        "padding":0,
        "background":"#142a41",
        "color":"#f8f594"
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"YH-PickLineInfo"
    },
  }
}

 function getWidgetConfigExplain (){
  return {
    "new_bar":{
      "id": "该组件的id，系统默认生成，无需配置",
      "type":"该组件的类型，系统默认生成，无需配置",
      "css":{
        // "x": "x轴的坐标", //也支持不配置哦
        // "y": "y轴的坐标",
        "width": "宽度",
        "height": "高度",
        "z-index": "组件叠放顺序，数值大的在上层",
        "border": "边框设置，具体写法参照css的写法，例如：solid 1px red",
        "padding": "边距",
        "background":"背景色"
      },
      "echartOption":{
        "color": "组件配色，多个颜色用竖线分割",
        "title": {
          "text": "标题",
          "textStyle": {
            "fontSize": "标题字号",
            "color": "标题颜色"
          }
        },
        "axisLabel": {
          "show": "标签是否显示，不显示用false",
          "textStyle": {
            "color": "标签颜色"
          }
        },
        "legend":{
          "show": "说明文字是否显示",
          "textStyle": {
            "color": "说明文字颜色"
          }
        }
      },
      "dataUrl": "数据源Url，通常情况下，默认的就可以",
      "diyCoreCode":"数据源code，系统会用此码获取对应图标的数据，请联系数据方。"
    }
  }
 }

 export {
  getWidgetConfig,
  getWidgetConfigExplain
 }