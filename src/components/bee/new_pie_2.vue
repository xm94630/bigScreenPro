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
		"data": [
      {"value": 800,"name": "工作中"}, 
      {"value": 300,"name": "异常"}, 
      {"value": 200,"name": "空闲"}, 
      {"value": 500,"name": "充电中"}
    ]
  }],
  "tooltip": {"trigger": "item","formatter": "{a} <br/>{b} : {c} ({d}%)"}
}


//获取饼图option配置
function getOption(data) {

  //兼容字符串形式
  let apiData = typeof(data.apiData)=='string'?eval('(' + data.apiData + ')'):data.apiData;
  
  //这个是接口的数据，还需要我们进行组装
  apiData = apiData[0];
  let legendData = {data:Object.keys(apiData)};
  let seriesData = [];
  for(let key in apiData){
    seriesData.push({
      value:apiData[key],
      name:key,
    })
  }

  //legend样式部分
  let legend = data.legend;

  //console.log(seriesData)

  let option = {
    color: data.color || ["#83b5b9","#db8460","#9ec794","#eada80"],
    title: data.title,
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: Object.assign({},legend,legendData),
    series: [
      {
        name: "访问来源",
        label:{
          //formatter: '{b}: {@2012} ({d}%)'
          formatter: '{@2012}'
        },
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: seriesData
        // itemStyle: {
        //     emphasis: {
        //         shadowBlur: 10,
        //         shadowOffsetX: 0,
        //         shadowColor: 'rgba(0, 0, 0, 0.5)'
        //     }
        // }
      }
    ]
  };

  console.log('==>')
  console.log(JSON.stringify(option))

  return option;
}

export default {
  name: "pie",
  props: {
    percent: Number,
    myConfig: Object
  },
  data() {
    return {
      bingTu_option: getOption(this.myConfig),
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
    //this.myChart.setOption(this.bingTu_option);
    this.myChart.setOption(defaultOption);
  },
  watch: {
    myConfig: {
      handler: function(val) {
        //this.myChart.setOption(getOption(val));
        this.myChart.setOption(defaultOption);
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



