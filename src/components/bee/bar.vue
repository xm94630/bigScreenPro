<template>
  <div
    class="bingTuCon"
    :style="'width:'+width+'px;height:'+height+'px;top:'+y+'px;left:'+x+'px;border:'+border+';padding:'+padding+'px;background:'+background"
  >
    <div class="bingTuBox" :id="chartData.id"></div>
  </div>
</template>


<script>
import echarts from "echarts";

//获取饼图option配置
function getOption(data) {
    //追加类型
  let series = data.series;
  series.forEach(function(one) {
    one.type = "bar";
  });

  let option = {
    //color: ["#6ddfe2"],
    title: {
      show: true,
      text: data.title.text,
      x: "left",
      textStyle: {
        fontSize: data.title['font-size'],
        color: "#666"
        //fontWeight:"bold",
      }
    },
    tooltip: {
      trigger: "axis"
    },
    legend: data.legend,
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
        type: 'value'
    },
    series: series
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
      background: this.chartData.background
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
.bingTuCon {
  position: absolute;
  box-sizing: border-box;
}
.bingTuBox {
  width: 100%;
  height: 100%;
}
</style>



