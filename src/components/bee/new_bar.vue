<template>
  <div class="widgetBox" :style="myCss">
    <div class="widgetCon" :id="myConfig.id"></div>
  </div>
</template>


<script>
import bee from '@/src/tools/bee.js';
import echarts from "echarts";
import _ from "lodash";


// 这个是本组件对外配置的默认值。
let widgetOption = {
  "id": "bar"+Math.random(),
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
    "color": ["#4f8ff9","#38c3ec","#a2fdff","#eada80"],
    "title": {
      "text": "出库单",
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
    "legend":{
      "show": true,
      "textStyle": {
        "color": "#f8f4a0"
      }
    },
  },
  "dataUrl": "/epimetheus/api/diy/report/selectData",
  "diyCoreCode":"lifeng-HistogramOutOrder"
}


// 这个是echart的默认配置。
let defaultOption = {
  "color": ["#4f8ff9", "#38c3ec", "#a2fdff", "#eada80"],
	"title": {
		"text": "出库单",
		"textStyle": {
			"fontSize": 16,
			"color": "#f8f4a0"
		}
	},
	"legend": {
		"data": ["出库单", "sku"],
		"textStyle": {
			"color": "#f8f4a0"
		}
	},
	"xAxis": {
		"data": ["JIT", "B2C", "B2B"],
		"axisLabel": {
			"show": true,
			"textStyle": {
				"color": "#f8f4a0"
			}
		}
	},
	"yAxis": {
		"type": "value",
		"axisLabel": {
			"show": true,
			"textStyle": {
				"color": "#f8f4a0"
			}
		}
	},
	"series": [{
		"name": "出库单",
		"data": [1, 2, 3],
		"type": "bar"
	}, {
		"name": "sku",
		"data": [4, 5, 6],
		"type": "bar"
  }],
  "tooltip": {"trigger": "axis"}, 
  "toolbox": {"feature": {"saveAsImage": {}}},
  "grid": {"left": "3%","right": "4%","bottom": "3%","containLabel": true},
}


/************************************* 
数据格式转换：
let data = [
  {"出库单":1,"sku":4,"type":"JIT"},
  {"出库单":2,"sku":5,"type":"B2C"},
  {"出库单":3,"sku":6,"type":"B2B"}
]

从上面的格式，转变成下面的这种..

let xAxis = {
  "data":['JIT', 'B2C', 'B2B']
}
let legend = {
  "data":['出库单', 'SKU', ]
}
let series = [
  {
    name: '出库单',
    data: [1, 2, 3],
  },
  {
    name: 'SKU',
    data: [4, 5, 6],
  }
]
**************************************/

//获取饼图option配置
function getOption(data) {

  


  //组装数据
  let apiData = data.apiData;
  let keys = _.keys(apiData && apiData[0]);
  var index = keys.indexOf('type');
  if (index > -1) {
    keys.splice(index, 1);
  }
  

  let legend = Object.assign({},{"data":keys},data.echartOption.legend)


  let xAxis = {
    "data":_.map(apiData,'type'),
    axisLabel:data.echartOption.axisLabel
  }

  let yAxis = {
        type: 'value',
        axisLabel:data.echartOption.axisLabel
  }
  
  let series = []
  for(let i=0;i<legend.data.length;i++){
    series.push({
      name:legend.data[i],
      data:_.map(apiData,legend.data[i]),
    })
  }


  //追加类型
  series.forEach(function(one) {
    one.type = "bar";
  });


  defaultOption.color = data.echartOption.color;
  defaultOption.title = data.echartOption.title;
  defaultOption.legend = legend;
  defaultOption.xAxis = xAxis;
  defaultOption.yAxis = yAxis;
  defaultOption.series = series;

  return defaultOption;
}


export default {
  name: "bar",
  props: {
    percent: Number,
    myConfig: Object
  },
  data() {
    return {
      option: getOption(this.myConfig)
    };
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      return bee.objToCSS( bee.replaceKey(this.myConfig.css,map) );
    }
  },
  mounted: function() {
    echarts
      .init(document.getElementById(this.myConfig.id))
      .setOption(this.option);
  },
};
</script>


<style lang="scss">
.widgetBox {
  position: absolute;
  box-sizing: border-box;
  .widgetCon {
    width: 100%;
    height: 100%;
  }
}
</style>



