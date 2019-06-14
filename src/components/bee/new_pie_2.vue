<template>
  <div
    class="bingTuCon"
    :style="myCss"
  >
    <div class="bingTuBox" :id="this.myConfig.chartId"></div>
  </div>
</template>


<script>
import bee from '@/src/tools/bee.js';
import echarts from "echarts";



// 这个是echart实例的默认配置
let defaultOption = {
	"color": ["#4f8ff9", "#38c3ec", "#a2fdff", "#c0f8ff"],
	"title": {
    "text": "机器人",
    "textStyle": {
			"fontSize": 16,
			"color": "#f8f4a0"
		}
  },
  "legend": {
    "orient": "vertical",
    "left": "right",
    "data": ["工作中", "异常", "空闲", "充电中"],
		"textStyle": {
			"color": "#f8f4a0"
		}
	},
	"series": [{
		"name": "机器人",
    "type": "pie",
    "radius" : "55%",
    "center": ["50%", "60%"],
		"data": [
      {"value": 800,"name": "工作中"}, 
      {"value": 300,"name": "异常"}, 
      {"value": 200,"name": "空闲"}, 
      {"value": 500,"name": "充电中"}
    ]
  }],
  "tooltip": {"trigger": "item","formatter": "{a} <br/>{b} : {c} ({d}%)"}
}


// 结合数据源和默认echart数据，进行最新样式的组装。
function getNewOption(myConfig) {

  // 接口的数据格式为：[{"工作中":800,"异常":300,"空闲":200,"充电中":500}]
  let apiData = typeof(myConfig.apiData)=='string'?eval('(' + myConfig.apiData + ')'):myConfig.apiData;
  
  // 获取一条数据
  let one = apiData[0];
  // 获取keys，如：["工作中", "异常", "空闲", "充电中"]
  let keys = Object.keys(one)

  // series配置
  let series = [];
  for(let key in one){
    series.push({
      value:one[key],
      name:key,
    })
  }
 
  // legend 配置
  let legend = myConfig.echartOption.legend;
  legend.data = keys;
  // title 配置
  let title = myConfig.echartOption.title;
  // color 配置
  let color = myConfig.echartOption.color.split('|')

  // 最新的配置
  let newOption = JSON.parse(JSON.stringify(defaultOption));
  newOption.title = title;
  newOption.color = color;
  newOption.series[0].data = series;
  newOption.legend = legend;

  return newOption;
}

export default {
  name: "pie",
  props: {
    percent: Number,
    myConfig: Object
  },
  data() {
    return {
      bingTu_option: getNewOption(this.myConfig),
      myChart: null,
      width: this.myConfig.width,
      height: this.myConfig.height,
      y: this.myConfig.y,
      x: this.myConfig.x,
      border: this.myConfig.border,
      padding: this.myConfig.padding,
      background: this.myConfig.background,
    };
  },
  mounted: function() {
    //console.log(this.myConfig)
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(
      document.getElementById(this.myConfig.chartId)
    );
    this.myChart.setOption(this.bingTu_option);
    //this.myChart.setOption(defaultOption);
  },
  watch: {
    myConfig: {
      handler: function(val) {
        this.myChart.setOption(getNewOption(val));
        //this.myChart.setOption(defaultOption);
      },
      deep: true
    }
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.myConfig.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    }
  }
};
</script>


<style scoped>
.bingTuCon {
  position: absolute;
  box-sizing: border-box;
}
.bingTuBox {
  width: 100%;
  height: 100%;
}
</style>



