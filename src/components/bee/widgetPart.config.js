// table中的子组件的配置模板
export default function(){
  return {
    "searchBtns":{
      "searchBtn":{
        "template":{
          "text":"查询",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "initUrl": "/epimetheus/api_v1/diy/column/initForView",
          "diyCoreCode":"SkuHot"
        },
        "label":"查询按钮"
      }
    },

    "conditionInput":{
      "10":{
        "template":{
          "label": "普通输入框 (type:10)",
          "keyName": "name1",
          "type": "10",
          "typeScribe": "beeInput",
          "placeholder": "请输入",
          "defaultValue": "",
          "rule": {},
          "queryIndex": 0
        },
        "label":"普通输入框"
      },

      "11":{
        "template":{
          "label": "范围输入框 (type:11)",
          "keyName": "name2",
          "type": "11",
          "typeScribe": "beeInputRange",
          "placeholder": "请输入",
          "defaultValue": "",
          "rule": {},
          "queryIndex": 1
        },
        "label":"范围输入框"
      },

      "20":{
        "template":{
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
        "label":"普通下拉"
      },

      "30":{
        "template":{
          "label": "日期 (type:30)",
          "keyName": "date1",
          "type": "30",
          "typeScribe": "beeDatePicker",
          "placeholder": "请选择",
          "defaultValue": "",
          "rule": {},
          "queryIndex": 3
        },
        "label":"日期"
      },

      "31":{
        "template":{
          "label": "日期（范围） (type:31)",
          "keyName": "date2",
          "type": "31",
          "typeScribe": "beeDatePickerRange",
          "placeholder": ["开始", "结束"],
          "defaultValue": "",
          "rule": {},
          "queryIndex": 4
        },
        "label":"日期（范围）"
      },

      "40":{
        "template":{
          "label": "日期时间 (type:40)",
          "keyName": "date3",
          "type": "40",
          "typeScribe": "beeDateTimePicker",
          "placeholder": "请选择",
          "defaultValue": "",
          "rule": {},
          "queryIndex": 6
        },
        "label":"日期时间"
      },

      "41":{
        "template":{
          "label": "日期时间（范围） (type:41)",
          "keyName": "date4",
          "type": "41",
          "typeScribe": "beeDateTimePickerRange",
          "placeholder": ["开始", "结束"],
          "defaultValue": "",
          "rule": {},
          "queryIndex": 5
        },
        "label":"日期时间（范围）"
      },

      
    }

  }
}