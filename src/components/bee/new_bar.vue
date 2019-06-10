<template>
  <div class="widgetBox" :style="myCss">
    <div class="widgetCon" :id="myConfig.id"></div>
  </div>
</template>


<script>
import bee from '@/src/tools/bee.js';
import echarts from "echarts";
import _ from "lodash";
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';



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
function getNewOption(myConfig,apiData) {

  // 获取数据源数据，固定格式为：
  // [{"出库单":1,"sku":4,"type":"JIT"},
  //  {"出库单":2,"sku":5,"type":"B2C"},
  //  {"出库单":3,"sku":6,"type":"B2B"}]
  let data = myConfig;
  
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
  //将字符串转成布尔
  legend.show = legend.show==="false"?false:true;
  // xAxis、yAxis 配置
  let axisLabel = Object.assign({},data.echartOption.axisLabel);
  axisLabel.show = JSON.parse(axisLabel.show); //将字符串转成布尔
  let xAxis = {
    "axisLabel":axisLabel,
    "data":types
  }
  let yAxis = {
    "axisLabel":axisLabel,
    "type": "value"
  }

  // color 配置
  let color = data.echartOption.color.split('|')

  // 最新的配置
  let newOption = JSON.parse(JSON.stringify(defaultOption));
  newOption.title = data.echartOption.title;
  newOption.color = color;
  newOption.series = series;
  newOption.legend = legend;
  newOption.xAxis = xAxis;
  newOption.yAxis = yAxis;

  console.log(newOption)

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
      myEchart:null,
    };
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      return bee.objToCSS( bee.replaceKey(this.myConfig.css,map) );
    }
  },
  watch:{
    "myConfig":{
      handler:function(val){
        this.myEchart.setOption( getNewOption(val) );
      },
      deep: true
    },
    
  },
  mounted: function() {

    //组件基本样式数据
    let dataUrl = this.myConfig.dataUrl;
    let diyCoreCode = this.myConfig.diyCoreCode;
    let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
    //获取数据源
    axios.post(baseUrl + dataUrl,params).then(response => {
      let apiData = response.data.data;
      this.myEchart = echarts.init(document.getElementById(this.myConfig.id))
      this.myEchart.setOption(getNewOption(this.myConfig,apiData));
    });

  },
  updated(){
    //组件基本样式数据
    let dataUrl = this.myConfig.dataUrl;
    let diyCoreCode = this.myConfig.diyCoreCode;
    let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
    //获取数据源
    axios.post(baseUrl + dataUrl,params).then(response => {
      let apiData = response.data.data;
      this.myEchart = echarts.init(document.getElementById(this.myConfig.id))
      this.myEchart.setOption(getNewOption(this.myConfig,apiData));
    });
  }
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



