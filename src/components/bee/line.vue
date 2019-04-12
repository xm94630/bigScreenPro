<template>
  <div :style="'width:'+width+'px;height:'+height+'px;position:absolute;top:'+y+'px;left:'+x+'px;'">
    <div class="bingTuBox" :id="chartData.id"></div>
  </div>
</template>


<script>
import echarts from "echarts";

//获取饼图option配置
function getOption(data) {
  let option = {
    color: ["#fd9f82"],
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
      data: ["xxx","yyy","zzz","ooo"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        //data: data.seriesData,
        data: [100,200,50,10],
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
.bingTuBox {
  width: 100%;
  height: 100%;
}
</style>



