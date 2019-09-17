//import bee from "@/src/tools/bee";
// table中的子组件的配置模板
export default function(){
  return {
    "searchBtns":{
      "10":{
        "template":{
          "text":"查询",
          "dataUrl": "/epimetheus/api/diy/report/selectData",
          "initUrl": "/epimetheus/api_v1/diy/column/initForView",
          "diyCoreCode":"SkuHot",
          "resultColumnList":'{"日期":"date","名字":"name","地址哦":"address","年龄":"age"}',
        },
        "label":"查询按钮"
      }
    },

    "conditionInput":{
      "10":{
        "template":{
          "type": "10",
          "label": "普通输入框",
          "keyName": "name1",
          "placeholder": "请输入",
          "defaultValue": "",
          "queryIndex": 0,
          //"typeScribe": "beeInput",
          //"rule": "",
        },
        "label":"普通输入框"
      },

      "11":{
        "template":{
          "type": "11",
          "label": "范围输入框",
          "keyName": "name2",
          "placeholder": "请输入",
          "defaultValue": "",
          "queryIndex": 1,
          //"typeScribe": "beeInputRange",
          //"rule": "",
        },
        "label":"范围输入框"
      },

      "20":{
        "template":{
          "type": "20",
          "label": "普通下拉",
          "keyName": "love20",
          "placeholder": "请选择",
          "defaultValue": "",
          "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
          "referenceColumn": "playerNameValue",
          "referenceDisplayColumn": "playerName",
          "queryIndex": 2,
          //"typeScribe": "beeSelect",
          //"rule": "",
        },
        "label":"普通下拉"
      },

      "21":{
        "template":{
          "type": "21",
          "label": "下拉搜索",
          "keyName": "love21",
          "placeholder": "请选择",
          "defaultValue": "",
          "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
          "referenceColumn": "playerNameValue",
          "referenceDisplayColumn": "playerName",
          "queryIndex": 3,
          //"typeScribe": "beeSelect",
          //"rule": "",
        },
        "label":"下拉搜索"
      },

      "22":{
        "template":{
          "type": "22",
          "label": "多选下拉",
          "keyName": "love22",
          "placeholder": "请选择",
          "defaultValue": "",
          "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
          "referenceColumn": "playerNameValue",
          "referenceDisplayColumn": "playerName",
          "queryIndex": 3,
          //"typeScribe": "beeSelect",
          //"rule": "",
        },
        "label":"多选下拉"
      },

      "23":{
        "template":{
          "type": "23",
          "label": "多选下拉搜索",
          "keyName": "love23",
          "placeholder": "请选择",
          "defaultValue": "",
          "referenceUrl": "/epimetheus/api_v1/diy/xxx/xxx?code=",
          "referenceColumn": "playerNameValue",
          "referenceDisplayColumn": "playerName",
          "queryIndex": 3,
          //"typeScribe": "beeSelect",
          //"rule": "",
        },
        "label":"多选下拉搜索"
      },

      "30":{
        "template":{
          "type": "30",
          "label": "日期",
          "keyName": "date1",
          "placeholder": "请选择",
          "defaultValue": "",
          "queryIndex": 3,
          //"typeScribe": "beeDatePicker",
          //"rule": "",
        },
        "label":"日期"
      },

      "31":{
        "template":{
          "type": "31",
          "label": "日期（范围）",
          "keyName": "date2",
          "placeholder": ["开始", "结束"],
          "defaultValue": "",
          "queryIndex": 4,
          //"typeScribe": "beeDatePickerRange",
          //"rule": "",
        },
        "label":"日期（范围）"
      },

      "40":{
        "template":{
          "type": "40",
          "label": "日期时间",
          "keyName": "date3",
          "placeholder": "请选择",
          "defaultValue": "",
          "queryIndex": 6,
          //"typeScribe": "beeDateTimePicker",
          //"rule": "",
        },
        "label":"日期时间"
      },

      "41":{
        "template":{
          "type": "41",
          "label": "日期时间（范围）",
          "keyName": "date4",
          "placeholder": ["开始", "结束"],
          "defaultValue": "",
          "queryIndex": 5,
          //"typeScribe": "beeDateTimePickerRange",
          //"rule": "",
        },
        "label":"日期时间（范围）"
      },

      
    }

  }
}