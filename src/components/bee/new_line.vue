<template>
  <div class="widgetBox" :style="myCss">
    <div class="widgetCon" :id="myConfig.id"></div>
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
  </div>
</template>



<script>
import bee from '@/src/tools/bee.js';
import echarts from "echarts";
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';
import { setTimeout } from 'timers';

// 这个是echart实例的默认配置
let defaultOption = {
	"color": ["#4f8ff9", "#38c3ec", "#a2fdff", "#eada80"],
	"title": {
		"text": "按周统计",
		"textStyle": {
			"fontSize": 16,
			"color": "#f8f4a0"
		}
	},
	"legend": {
		"data": ["出库单", "入库单"]
  },
	"xAxis": {
		"type": "category",
		"data": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
	},
	"yAxis": {
		"type": "value"
	},
	"series": [{
		"name": "出库单",
		"data": [120, 132, 101, 134, 90, 230, 210],
		"type": "line"
	}, {
		"name": "入库单",
		"data": [220, 182, 191, 234, 290, 330, 310],
		"type": "line"
  }],
  "tooltip": {"trigger": "axis"},
	"grid": {"left": "3%","right": "4%","bottom": "3%","containLabel": true},
	"toolbox": {"feature": {"saveAsImage": {}}},
}


// 结合数据源和默认echart数据，进行最新样式的组装。
function getNewOption(myConfig,apiData) {
  
  //接口数据格式：
  //[{name:'出库单',data:[120, 132, 101, 134, 90, 230, 210]},
  // {name:'入库单',data:[220, 182, 191, 234, 29, 330, 310]}]

  apiData = myConfig.apiData;

  // 获取keys，如：["出库单", "入库单"]
  let keys =["出库单", "入库单"]

  //追加类型
  let series = myConfig.apiData;
  series.forEach(function(one) {
    one.type = "line";
  });

  // legend 配置
  console.log(myConfig)
  let legend = {};
  legend.data = keys;
  // title 配置
  let title = myConfig.echartOption.title;
  // color 配置
  let color = myConfig.echartOption.color.split('|')

  // 最新的配置
  let newOption = JSON.parse(JSON.stringify(defaultOption));
  newOption.title = title;
  newOption.color = color;
  newOption.series = series;
  newOption.legend = legend;

  return newOption;
}

export default {
  name: "new_line", //注意，这个名字不能和浏览器默认的的标签相同，比如“line”
  props: {
    myConfig: Object
  },
  data() {
    return {
      myChart: null,
      diyCoreCode:'',
      apiData:[],
      store:store,
    };
  },
  mounted: function() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById(this.myConfig.id));
    this.myChart.setOption(getNewOption(this.myConfig));
    //this.myChart.setOption(defaultOption);
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      return bee.objToCSS(bee.replaceKey(this.myConfig.css,map));
    }
  },
  watch: {
    myConfig: {
      handler: function(myConfig) {
        this.myChart.setOption(getNewOption(myConfig));
        //this.myChart.setOption(defaultOption);
      },
      deep: true
    }
  }
};
</script>


<style lang="scss">
.selectBorder{
  position: absolute;
  top:0px;
  left:0px;
  width: 100%;
  height:100%;
  background: rgba(0,231,255,0.11);
  border: solid 1px rgba(0,231,255,0.3);
}
.widgetBox {
  position: absolute;
  box-sizing: border-box;
  .widgetCon {
    width: 100%;
    height: 100%;
  }
}
</style>




