<template>
  <div class="widgetBox" :style="myCss">
    <div class="widgetCon" :id="myConfig.id"></div>
  </div>
</template>


<script>
import bee from '@/src/tools/bee.js';
import echarts from "echarts";
import _ from "lodash";

// 这个是echart实例的默认配置
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

// 结合数据源和默认echart数据，进行最新样式的组装。
function getNewOption(data) {

  // 获取数据源数据，固定格式为：
  // [{"出库单":1,"sku":4,"type":"JIT"},
  //  {"出库单":2,"sku":5,"type":"B2C"},
  //  {"出库单":3,"sku":6,"type":"B2B"}]
  let apiData = data.apiData;
  
  // 提取type的所有值为一个数组。例如["JIT"、"B2C"、"B2B"]
  let types = _.map(apiData,"type");
  
  // keys，例如['出库单','sku','type']
  let keys = _.keys(apiData && apiData[0]);
  
  // 有效的keys（排除type），例如['出库单','sku']
  let effectiveKeys = keys.slice(0);
  let index = effectiveKeys.indexOf('type');
  if (index > -1) {effectiveKeys.splice(index, 1)}

  // series 配置，例如 
  // [{name: '出库单',data: [1, 2, 3]},
  //  {name: 'sku',  data: [4, 5, 6]}]
  let series = []
  for(let i=0;i<effectiveKeys.length;i++){
    series.push({
      name:effectiveKeys[i],
      data:_.map(apiData,effectiveKeys[i]),
      type:"bar"
    })
  }
  // legend 配置
  let legend = Object.assign({},{"data":effectiveKeys},data.echartOption.legend)
  // xAxis、yAxis 配置
  let axisLabel = data.echartOption.axisLabel
  let xAxis = {
    "axisLabel":axisLabel,
    "data":types
  }
  let yAxis = {
    "axisLabel":axisLabel,
    "type": "value"
  }

  // 最新的配置
  let newOption = JSON.parse(JSON.stringify(defaultOption));
  newOption.color = data.echartOption.color;
  newOption.title = data.echartOption.title;
  newOption.series = series;
  newOption.legend = legend;
  newOption.xAxis = xAxis;
  newOption.yAxis = yAxis;

  return newOption;
}

export default {
  name: "bar",
  props: {
    percent: Number,
    myConfig: Object
  },
  data() {
    return {
      option: getNewOption(this.myConfig)
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



