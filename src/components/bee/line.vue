<template>
  <div
    class="bingTuCon"
    :style="'width:'+width+'px;height:'+height+'px;top:'+y+'px;left:'+x+'px;border:'+border+';padding:'+padding+'px;background:'+background"
  >
    <div class="bingTuBox" :id="myConfig.id"></div>
  </div>
</template>


<script>
import echarts from "echarts";

//获取饼图option配置
function getOption(data) {
  //追加类型
  let series = data.series;
  series.forEach(function(one) {
    one.type = "line";
  });

  //构建option
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
      type: "value"
    },
    series: series
  };

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
      background: this.myConfig.background
    };
  },
  mounted: function() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById(this.myConfig.id));
    this.myChart.setOption(this.bingTu_option);
  },
  watch: {
    myConfig: {
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



