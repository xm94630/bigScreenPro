import bee from "@/src/tools/bee";

//用于可视化的默认配置。
export default function(){
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
        "width": 300,
        "height": 200,
        "z-index": 9,
        "border": "none",
        "padding":5,
        "background":"#142a41"
      },
      "echartOption":{
        "color": "#4f8ff9|#38c3ec|#a2fdff|#eada80",
        "title": {
          "text": "周统计",
          "textStyle": {
            "fontSize": 16,
            "color": "#f8f4a0"
          }
        },
        "xAxis": {
          "data": "周一|周二|周三|周四|周五|周六|周日"
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
        "padding":10,
        "background":"#142a41",
        "color":"#f8f594"
      },
      "title":"A类/鞋",
      "state":0,
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"lifeng-BinUseA"
    },
    "title":{
      "id": bee.guidGenerator(),
      "type":"title",
      "css":{
        "x": 20,
        "y": 20,
        "width": 150,
        "height": 30,
        "z-index": 9,
        "padding": 0,
        "font-size": 24,
        "color": "#f8f4a0",
        "border": "",
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
        "padding": 0,
        "font-size": 12,
        "text-align": "left",
        "color": "yellow",
        "background": "none"
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"InventoryReportByWarehouse"
    }
  }
}

