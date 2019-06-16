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
      "css":{
        "x": 20,
        "y": 20,
        "width": 500,
        "height": 300,
        "border": "none",
        "padding":10,
        "background":"#fff"
      },
      "echartOption":{
        "title": {
          "show": true,
          "text": "按周统计",
          "x": "left",
          "textStyle": {
            "fontSize": 16,
            "color": "#f8f4a0"
          }
        },
        "xAxis": {
          "type": "category",
          "boundaryGap": false,
          "data": ["周一","周二","周三","周四","周五","周六","周日"]
        },
        "color": ["#4f8ff9","#38c3ec","#a2fdff","#eada80"]
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"demo_line"
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
    }
    
  }
}

