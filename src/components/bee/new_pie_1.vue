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
	"color": ["#4f8ff9", "#38c3ec"],
	"series": {
    "name":"使用占比",
		"type": "pie",
		"radius": ["40%", "70%"],
		"labelLine": {
		"show": false
		},
		"label": {    
      "color": "red",
			"position": "center",
			"fontSize": 12,
			"formatter": "{a}\n{c}%"
		},
		"data": [{
			"value": 60,
		}, {
			"value": 40,
			"label":{
        "show":false
			}
		}]
	}
}



//获取饼图option配置
function getNewOption(myConfig,apiData) {

  apiData = [{a:60}];
  let percent = apiData[0][Object.keys(apiData[0])[0]]

  // 最新的配置
  let newOption = JSON.parse(JSON.stringify(defaultOption));
  newOption.color = myConfig.echartOption.color.split('|');
  newOption.series = JSON.parse(JSON.stringify(myConfig.echartOption.series));
  newOption.series.radius = newOption.series.radius.split('|');
  newOption.series.data = [{
    "value": percent,
  }, {
    "value": 100-percent,
    "label":{
      "show":false
    }
  }]

  return newOption;
}

export default {
  name: "pie",
  props: {
    myConfig: Object,
  },
  data() {
    return {
      bingTu_option: getNewOption(this.myConfig),
      myChart: null,
      diyCoreCode:'',
      apiData:[],
      store:store,
    };
  },
  mounted: function() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(
      document.getElementById(this.myConfig.id)
    );
    this.myChart.setOption(this.bingTu_option);
  },
  watch: {
    myConfig: {
      handler: function(val) {
        this.myChart.setOption(getNewOption(val));
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




