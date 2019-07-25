{
  "canvas": {
      "width": "1920",
      "height": "1080",
      "background": "#14224a",
      "zoom-type": 0,
      "grid": 10,
      "refreshTime": "600000",
      "linkScreen": {
          "linkScreenCode": "YH-1",
          "waitTime": -1,
          "eventWidgetName": "new_cardGroup"
      },
      "formFormat": {
          "labelPosition": "top",
          "colSpan": 8
      }
  },
  "components": {
      "beeCard": [{
          "id": "98de-e994",
          "type": "beeCard",
          "css": {
              "x": 20,
              "y": 20,
              "width": "615",
              "height": "80",
              "z-index": 9,
              "border": "solid 1px #1f3e7b",
              "padding": 0,
              "font-size": 12,
              "text-align": "left",
              "color": "#f8f4a0",
              "background": "#16244a",
              "border-radius":5
          },
          "widgetOption": {
              "cardStyle": "",
              "keyCss": {
                  "font-size": "20",
                  "color": "#3c8bd0",
                  "width": ""
              },
              "valueCss": {
                  "font-size": "60",
                  "color": "#3c8bd0",
                  "width": ""
              }
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode": "YH-PickContainerNum"
      }],
      "beeTitle": [{
          "id": "11df-284e",
          "type": "beeTitle",
          "css": {
              "x": "0",
              "y": "20",
              "width": "1920",
              "height": "50",
              "z-index": 9,
              "padding": 0,
              "font-size": "50",
              "font-weight": "bold",
              "color": "#e28c36",
              "border": "",
              "background": "",
              "text-align": "center"
          },
          "text": "上海会员物流"
      }, {
          "id": "6266-b836",
          "type": "beeTitle",
          "css": {
              "x": "1220",
              "y": 20,
              "width": 150,
              "height": 30,
              "z-index": 9,
              "padding": 0,
              "font-size": "16",
              "font-weight": "normal",
              "color": "#fff",
              "border": "",
              "background": "",
              "text-align": "left"
          },
          "text": "当前时间："
      }, {
          "id": "ceaa-5534",
          "type": "beeTitle",
          "css": {
              "x": "1520",
              "y": 20,
              "width": "120",
              "height": 30,
              "z-index": 10,
              "padding": 0,
              "font-size": "16",
              "font-weight": "normal",
              "color": "#fff",
              "border": "",
              "background": "",
              "text-align": "left"
          },
          "text": "统计范围：当天"
      }, {
          "id": "c959-653a",
          "type": "beeTitle",
          "css": {
              "x": "1720",
              "y": 20,
              "width": "300",
              "height": 30,
              "z-index": 11,
              "padding": 0,
              "font-size": "16",
              "font-weight": "normal",
              "color": "#fff",
              "border": "",
              "background": "",
              "text-align": "left"
          },
          "text": "刷新时间：1分钟"
      }],
      "dater": [{
          "id": "1828-4813",
          "type": "dater",
          "css": {
              "x": "1320",
              "y": "20",
              "width": "400",
              "height": 30,
              "z-index": 9,
              "padding": 0,
              "font-size": "16",
              "color": "#ffffff",
              "border": "",
              "background": "",
              "text-align": "left"
          }
      }],
      "new_cardGroup": [{
          "id": "76f7-46d9",
          "type": "new_cardGroup",
          "css": {
              "x": "0",
              "y": "140",
              "width": "1900",
              "height": "900",
              "z-index": 9,
              "border": "",
              "padding": 10,
              "background": "#142249",
              "color": "#f8f594"
          },
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "diyCoreCode": "YH-PickShopInfo"
      }],
      "beeImage": [{
          "id": "f395-f7fa",
          "type": "beeImage",
          "css": {
              "x": "740",
              "y": 20,
              "width": "60",
              "height": "80",
              "z-index": 9,
              "border": "",
              "padding": 0,
              "background": ""
          },
          "imageLink": "https://i.site.pictures/ppXSg.png"
      }]
  }
}