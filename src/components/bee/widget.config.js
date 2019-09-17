import bee from "@/src/tools/bee";

//引入全部组件
import beeX from '@/src/components/bee/beeX.vue';
import dater from '@/src/components/bee/dater.vue';
import new_bar from '@/src/components/bee/new_bar.vue';
import new_barLine from '@/src/components/bee/new_barLine.vue';
import new_card from '@/src/components/bee/new_card.vue';
import beeCard from '@/src/components/bee/beeCard.vue';
import new_cardGroup from '@/src/components/bee/new_cardGroup.vue';
import YH_lines from '@/src/components/bee/YH_lines.vue';
import new_info from '@/src/components/bee/new_info.vue';
import new_line from '@/src/components/bee/new_line.vue';
import new_pie_1 from '@/src/components/bee/new_pie_1.vue';
import new_pie_2 from '@/src/components/bee/new_pie_2.vue';
import beeTable from '@/src/components/bee/beeTable.vue';
import beeTableCommon from '@/src/components/bee/beeTableCommon.vue';
import textBar from '@/src/components/bee/textBar.vue';
import beeTitle from '@/src/components/bee/beeTitle.vue';
import beeImage from '@/src/components/bee/beeImage.vue';
import DKN_beeCard from '@/src/components/bee/DKN_beeCard.vue';
import DSV_lines from '@/src/components/bee/DSV_lines.vue';

let allWidgets = {
    beeX, 
    dater,
    new_bar,
    new_barLine,
    new_card,
    beeCard,
    new_cardGroup,
    YH_lines,
    new_info,
    new_line,
    new_pie_1,
    new_pie_2,
    beeTable,
    beeTableCommon,
    textBar,
    beeTitle,
    beeImage,
    DKN_beeCard,
    DSV_lines,
}; 

//用于可视化的配置模板
function getWidgetConfig (){
  return {
    "new_bar":{
      "id": bee.guidGenerator(),
      "type":"new_bar",
      "alias":"柱状图",
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
    "new_barLine":{
      "id": bee.guidGenerator(),
      "alias":"柱状图折线图混合",
      "type":"new_barLine",
      "css":{
        "x": 20,
        "y": 20,
        "width": 800,
        "height": 600,
        "z-index": 9,
        "border": "none",
        "border-radius":0,
        "padding":5,
        "background":""
      },
      //"echartOption":{},
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"dkn_barLine"
    },
    "new_line":{
      "id": bee.guidGenerator(),
      "type":"new_line",
      "alias":"折线图",
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
      "alias":"环图",
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
      "alias":"饼图",
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
      "alias":"卡片_利丰风格",
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
      "keyOrder":"",
      "title":"A类/鞋",
      "state":0,
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"lifeng-BinUseA"
    },
    "beeTitle":{
      "id": bee.guidGenerator(),
      "type":"beeTitle",
      "alias":"纯文字",
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
      "alias":"时钟",
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
      "alias":"模板文字",
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
      "alias":"类表格文字",
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
      "alias":"报表",
      "css":{
        "x": 0,
        "y": 0,
        "width": 1200,
        "padding": 0
      },
      "formFormat":{
        "labelPosition":"top",
        "colSpan":8
      },
      "exportBtn": {
        "show":"true",
        "text":"导出",
      },
      "downloadColumn": {
        "show":"true",
        "downloadUrlKey":"",
        "downloadColumnText":"下载",
      },
      "noDataInfo":"No data",
      "exported": "true",
      "showIndexColumn":"true",
      "showPage":"true",
      "currentPage":1,
      "pageSize":10,
      "resetBtnText":"重置",
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      //"initUrl": "/epimetheus/api_v1/diy/column/initForView",

      //注意，这里字符串的多次转义。
      // eslint-disable-next-line no-useless-escape
      "searchBtns":'[{"text":"按货架查询","dataUrl":"/epimetheus/api/diy/report/selectData","diyCoreCode":"InventoryReportByShelf","resultColumnList":"{\\\"日期哦\\\":\\\"date\\\",\\\"这个列是名字哦\\\":\\\"name\\\",\\\"地址呀\\\":\\\"address\\\",\\\"年龄哦\\\":\\\"age\\\"}"},{"text":"按货位查询","dataUrl":"/epimetheus/api/diy/report/selectData","diyCoreCode":"InventoryReportByBin","resultColumnList":"{\\\"只有配置了名字这个列哦\\\":\\\"name\\\"}"}]',
      //"searchBtns":'[{"text":"按货架查询","dataUrl":"/epimetheus/api/diy/report/selectData","initUrl":"/epimetheus/api_v1/diy/column/initForView","diyCoreCode":"InventoryReportByShelf","resultColumnList":"{\\\"日期哦\\\":\\\"date\\\",\\\"这个列是名字哦\\\":\\\"name\\\",\\\"地址呀\\\":\\\"address\\\",\\\"年龄哦\\\":\\\"age\\\"}"},{"text":"按货位查询","dataUrl":"/epimetheus/api/diy/report/selectData","initUrl":"/epimetheus/api_v1/diy/column/initForView","diyCoreCode":"InventoryReportByBin","resultColumnList":"{\\\"只有配置了名字这个列哦\\\":\\\"name\\\"}"}]',
      
      "initForView":{
        "conditionColumnList":'[{"type":"10","label":"普通输入框","keyName":"name1","placeholder":"请输入","defaultValue":"","queryIndex":0,"id":"c73f-3601"}]'
      },
    },
    "beeTableCommon": {
      "id": bee.guidGenerator(),
      "type":"beeTableCommon",
      "alias":"普通表格",
      "css":{
        "x": 20,
        "y": 20,
        "width": 400,
        "height": 200,
        "z-index":9,
        "border": "none",
        "border-radius":0,
        "padding": 0,
        "font-size": 12,
        "text-align": "left",
        "color": "yellow",
        "background": "none"
      },
      "options":'{"日期":"date","名字":"name","地址":"address"}',
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"table"
    },
    //永辉大屏新增
    "new_cardGroup":{
      "id": bee.guidGenerator(),
      "type":"new_cardGroup",
      "alias":"卡片组_永辉专用",
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
      "alias":"卡片",
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
          "text-align": "left"
        },
        "valueCss":{
          "font-size":30,
          "color":"#3c8bd0",
          "width":"",
          "text-align": "center"
        }
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"YH-card" 
    },
    "YH_lines":{
      "id": bee.guidGenerator(),
      "type":"YH_lines",
      "alias":"线路组合_永辉专用",
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
    "beeImage":{
      "id": bee.guidGenerator(),
      "type":"beeImage",
      "alias":"图片",
      "css":{
        "x": 20,
        "y": 20,
        "width": 100,
        "height": 100,
        "z-index": 9,
        "border": "",
        "padding":0,
        "background":"",
      },
      "imageLink": "https://i.site.pictures/ppXSg.png",
    },
    //迪卡侬新增
    "DKN_beeCard":{
      "id": bee.guidGenerator(),
      "type":"DKN_beeCard",
      "alias":"卡片_迪卡侬风格",
      "title":"PCS/Hr",
      "css":{
        "x": 20,
        "y": 20,
        "width": 100,
        "height": 150,
        "z-index":9,
        "border": "",
        "border-radius":0,
        "padding": 5,
        "font-size": 12,
        "text-align": "left",
        "color": "#f8f4a0",
        "background": "rgba(255,255,255,0.1)",
      },
      "widgetOption":{
        "keyCss":{
          "font-size":12,
          "line-height":15,
          "font-weight":"bold",
          "color":"#ffffff",
          "width":"",
          "height":"50",
          "text-align":"left",
          "padding":"0",
          "margin":"-15px 0 0 5px",
        },
        "valueCss":{
          "font-size":30,
          "line-height":14,
          "font-weight":"bold",
          "color":"#ffffff",
          "width":"",
          "height":"",
          "text-align":"center",
          "padding":"0",
          "margin":"0",
        },
        "titleCss":{
          "font-size":12,
          "line-height":16,
          "font-weight":"bold",
          "color":"#ffffff",
          "width":"",
          "height":"",
          "text-align":"right",
          "padding":"2",
          "margin":"0",
        },
        "arrawCss":{
          "width":5,
          "height":5,
          "border-top":"none",
          "border-right":'none',
          "border-bottom":'solid 1px #fff',
          "border-left":"solid 1px #fff",
          "position": "absolute",
          "top":'',
          "right":'',
          "bottom":5,
          "left":5,
        }
      },
      "dataUrl": "/epimetheus/api/diy/report/selectData",
      "diyCoreCode":"dkn_card2" 
    },
    "DSV_lines": {
      "id": bee.guidGenerator(),
      "type":"DSV_lines",
      "alias":"组合_DSV专用",
      "options":'{"0":"data0","1":"data1","2":"data2","3":"data3","4":"data4","5":"data5","6":"data6","7":"data7","8":"data8","9":"data9","10":"data10"}',
      "css":{
        "x": 20,
        "y": 20,
        "width": 1860,
        "height": 960,
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
      "diyCoreCode":"DSV"
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
  getWidgetConfigExplain,
  allWidgets,
 }