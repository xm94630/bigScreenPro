<template>
  <div class="widgetBox" :style="myCss">
    <div class="widgetCon" :id="myConfig.id"></div>
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}">
      <!-- {{myConfig.id}} -->
    </div>
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
  let series = [];
  for(let key in one){
    series.push({
      value:one[key],
      name:key,
    })
  }
 
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
  newOption.series[0].data = series;
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
      //组件基本样式数据
      let dataUrl = myConfig.dataUrl;
      let diyCoreCode = myConfig.diyCoreCode;
      this.diyCoreCode = diyCoreCode;
      let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
      //获取数据源
      axios.post(baseUrl + dataUrl,params).then(response => {
        let apiData = response.data.data;
        this.apiData = apiData;
        this.myEchart = echarts.init(document.getElementById(myConfig.id))
        this.myEchart.setOption(getNewOption(myConfig,this.apiData));
      });
    },
    updatedWidget:function(val){
      //组件基本样式数据
      let dataUrl = val.dataUrl;
      let diyCoreCode = val.diyCoreCode;
      //只有diyCoreCode发生改变的时候才调接口！
      if(this.diyCoreCode!==diyCoreCode){
        this.diyCoreCode=diyCoreCode
        let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
        //获取数据源
        axios.post(baseUrl + dataUrl,params).then(response => {
          let apiData = response.data.data;
          this.apiData = apiData;
          this.myEchart.setOption(getNewOption(val,this.apiData));
        });
      }else{
        this.myEchart.setOption(getNewOption(val,this.apiData));
      }

      //必须异步，随着外容器的改变，调整size
      setTimeout(()=>{
         this.myEchart.resize();
      },0)

    },
  },
  // 最近坑有点多，什么使用watch，什么时候用updated呢，主要看，props传入的是个对象时，如果你不是直接在模板中使用属性的话，
  // 外界的更新是不会触发组件的update的（虽然组件的中的那个对象已经发生了改变）。这个时候使用watch就比较合适
  watch:{
    "myConfig":{
      //注意，watch对这个myConfig对象的属性，无法做newVal、oldVal的区分，两者是一样的。
      //watch只有对一开始就存在的属性才能有效。
      handler:function(newVal,oldVal){
        console.log('watched!')
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

