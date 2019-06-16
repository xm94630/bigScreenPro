<template>
  <div class="widgetBox" :style="myCss">
    <div class="widgetCon" :id="myConfig.id"></div>
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
  </div>
</template>


<script>
import bee from '@/src/tools/bee.js';
import echarts from "echarts";
import _ from "lodash";
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
        "show": false
			}
		}]
	}
}

//获取饼图option配置
function getNewOption(myConfig,apiData) {

  //数据源数据格式：[{占用率: 0.6}]
  let percent = apiData[0][Object.keys(apiData[0])[0]]
  //保留2位小数
  let d1 = Math.round(percent*10000)/100
  let d2 = Math.round(10000-percent*10000)/100

  let newOption = JSON.parse(JSON.stringify(defaultOption));  
  // color 配置
  newOption.color = myConfig.echartOption.color.split('|');
  // series 配置
  newOption.series = _.merge({},newOption.series,myConfig.echartOption.series);
  newOption.series.radius = newOption.series.radius.split('|');
  newOption.series.data = [{
    "value": d1,
  }, {
    "value": d2,
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
      myChart: null,
      diyCoreCode:'',
      apiData:[],
      store:store,
    };
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      return bee.objToCSS(bee.replaceKey(this.myConfig.css,map),"position:absolute;box-sizing:border-box;");
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




