import bee from "@/src/tools/bee";

//用于可视化的默认配置。
export default {
  "new_bar":{
    "id": bee.guidGenerator(),
    "css":{
      "x": 20,
      "y": 20,
      "width": 400,
      "height": 300,
      "border": "none",
      "padding":10,
      "background":"#1e2647"
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
  }
}

