<template>
  <div class="widgetBox" :style="myCss" :name="myConfig.id" @click="clickFun(myConfig.id)">
    <div class="widgetCon" :id="myConfig.id"></div>
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';
import bus from '@/src/tools/bus.js';
import echarts from "echarts";
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';
import { setTimeout } from 'timers';

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
function getNewOption(myConfig,apiData) {

  // 接口的数据格式为：[{"工作中":800,"异常":300,"空闲":200,"充电中":500}]
  apiData = typeof(apiData)=='string'?eval('(' + apiData + ')'):apiData;
  
  // 获取一条数据
  let one = apiData[0];
  // 获取keys，如：["工作中", "异常", "空闲", "充电中"]
  let keys = Object.keys(one)

  // series配置
  let seriesData = [];
  for(let key in one){
    seriesData.push({
      value:one[key],
      name:key,
    })
  }
  let series = JSON.parse(JSON.stringify(myConfig.echartOption.series));
  series.data = seriesData;
  series.type = "pie";
  series.center = series.center.split('|');

  // legend 配置
  let legend = JSON.parse(JSON.stringify(myConfig.echartOption.legend));
  legend.data = keys;
  // title 配置
  let title = myConfig.echartOption.title;
  // color 配置
  let color = myConfig.echartOption.color.split('|')

  // 最新的配置
  let newOption = JSON.parse(JSON.stringify(defaultOption));
  newOption.title = title;
  newOption.color = color;
  newOption.series[0] = series;
  newOption.legend = legend;

  return newOption;
}

export default {
  name: "new_pie_2",
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
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      return bee.objToCSS(bee.replaceKey(this.myConfig.css,map));
    }
  },
  methods:{
    initWidget:function(myConfig){
      let dataUrl = myConfig.dataUrl;
      let diyCoreCode = myConfig.diyCoreCode;
      this.diyCoreCode = diyCoreCode;
      let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
      //获取数据源
      axios.post(baseUrl + dataUrl,params).then(response => {
        let apiData = response.data.data;
        this.apiData = apiData;
        this.myChart = echarts.init(document.getElementById(myConfig.id))
        this.myChart.setOption(getNewOption(myConfig,this.apiData));
      });
    },
    updatedWidget:function(val){
      let diyCoreCode = val.diyCoreCode;
      //只有diyCoreCode发生改变的时候才调接口！
      if(this.diyCoreCode!==diyCoreCode){
        let dataUrl = val.dataUrl;
        this.diyCoreCode=diyCoreCode;
        let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
        //获取数据源
        axios.post(baseUrl + dataUrl,params).then(response => {
          let apiData = response.data.data;
          this.apiData = apiData;
          this.myChart.setOption(getNewOption(val,this.apiData));
        });
      }else{
        this.myChart.setOption(getNewOption(val,this.apiData));
      }

      setTimeout(()=>{
         this.myChart.resize();
      },0)
    },
    clickFun(widgetId){
      store.dispatch("setSelectWidgetId",widgetId);
      bus.$emit("widgetClick",widgetId);
    }
  },
  watch:{
    "myConfig":{
      handler:function(newVal,oldVal){
        this.updatedWidget(newVal,oldVal)
      },
      deep: true
    },
    
  },
  mounted: function() {
    this.initWidget(this.myConfig);
  },
  updated(){
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

