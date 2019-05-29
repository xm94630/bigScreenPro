<template>
  <div
    class="bingTuCon"
    :style="'width:'+width+'px;height:'+height+'px;top:'+y+'px;left:'+x+'px;border:'+border+';padding:'+padding+'px;background:'+background"
  >
    <div class="bingTuBox" :id="this.chartData.chartId"></div>
  </div>
</template>


<script>
import echarts from "echarts";

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
    title: {
      text: data.title.text,
      // subtext: '纯属虚构',
      // x:'center'
      textStyle: {
        fontSize: data.title['font-size'],
        color: data.title['color'],
        //fontWeight:"bold",
      }
    },
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

  return option;
}

export default {
  name: "pie",
  props: {
    percent: Number,
    chartData: Object
  },
  data() {
    return {
      bingTu_option: getOption(this.chartData),
      myChart: null,
      width: this.chartData.width,
      height: this.chartData.height,
      y: this.chartData.y,
      x: this.chartData.x,
      border: this.chartData.border,
      padding: this.chartData.padding,
      background: this.chartData.background,
    };
  },
  mounted: function() {
    //console.log(this.chartData)
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(
      document.getElementById(this.chartData.chartId)
    );
    this.myChart.setOption(this.bingTu_option);
  },
  watch: {
    chartData: {
      handler: function(val) {
        this.myChart.setOption(getOption(val));
      },
      deep: true
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



