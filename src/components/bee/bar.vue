<template>
  <div class="bingTuBox" :id="chartData.id"></div>
</template>


<script>
import echarts from "echarts";

//获取饼图option配置
function getOption(data) {
  let option = {
    // color: ["#6ddfe2"],
    // title: {
    //   show: true,
    //   text: data.titleText,
    //   x: "left",
    //   textStyle: {
    //     fontSize: "18",
    //     color: "#666"
    //     //fontWeight:"bold",
    //   }
    // },
    // xAxis: {
    //   type: "category",
    //   data: data.xAxisData
    // },
    // yAxis: {
    //   type: "value"
    // },
    // series: [
    //   {
    //     data: data.seriesData,
    //     type: "bar"
    //   }
    // ]

    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }]
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
      myChart: null
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



