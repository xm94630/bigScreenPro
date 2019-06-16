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
	"myConfig": {
		"id": "componentId_line001",
		"css": {
			"x": 20,
			"y": 20,
			"width": 500,
			"height": 300,
			"border": "none",
			"padding": 10,
			"background": "#fff"
		},
		"title": {
			"show": true,
			"text": "出库单",
			"x": "left",
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
		"color": ["#4f8ff9", "#38c3ec", "#a2fdff", "#eada80"],
		"dataUrl": "/epimetheus/api/diy/report/selectData",
		"diyCoreCode": "demo_line",
		"apiData": [{
			"name": "出库单",
			"data": [120, 132, 101, 134, 90, 230, 210]
		}, {
			"name": "入库单",
			"data": [220, 182, 191, 234, 290, 330, 310]
		}]
	}
}

// 结合数据源和默认echart数据，进行最新样式的组装。
function getNewOption(data) {

  //追加类型
  let series = data.apiData;
  series.forEach(function(one) {
    one.type = "line";
  });

  //构建option
  let option = {
    color: data.color,
    title: data.title,
    tooltip: {
      trigger: "axis"
    },
    legend: {
        data:['出库单','入库单']
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: data.xAxis,
    yAxis: {
      type: "value"
    },
    series: series
  };

  return option;
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




