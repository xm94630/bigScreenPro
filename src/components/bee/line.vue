<template>
  <div class="bingTuCon" :style="'width:'+width+'px;height:'+height+'px;top:'+y+'px;left:'+x+'px;border:'+border+';padding:'+padding+'px;background:'+background">
    <div class="bingTuBox" :id="chartData.id"></div>
  </div>
</template>


<script>
import echarts from "echarts";

//获取饼图option配置
function getOption(data) {
  let option = {
    color: data.color,
    title: {
      show: true,
      text: data.title.text,
      x: "left",
      textStyle: {
        fontSize: "18",
        color: "#666"
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      //data: data.xAxisData
      data: ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        //data: data.seriesData,
        data: [100,200,120,200,210,250,120,350,200],
        type: "line",
        areaStyle: {}
      }
    ]
  };

  return option;
}

export default {
  name: "pie",
  props: {
    percent: Number,
    chartData: Object,
  },
  data() {
    return {
      bingTu_option: getOption(this.chartData),
      myChart: null,
      width:this.chartData.width,
      height:this.chartData.height,
      y:this.chartData.y,
      x:this.chartData.x,
      border:this.chartData.border,
      padding:this.chartData.padding,
      background:this.chartData.background,
    };
  },
  mounted: function() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(
      document.getElementById(this.chartData.id)
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
.bingTuCon{
  position:absolute;
  box-sizing: border-box;
}
.bingTuBox {
  width: 100%;
  height: 100%;
}
</style>



