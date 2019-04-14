<template>
  <div class="bingTuBox" :id="this.chartData.chartId"></div>
</template>


<script>
import echarts from "echarts";

//获取饼图option配置
function getOption(data) {
  let option = {
    color: ["#a6c87e", "#ffd385", "#f49999"],
    title: {
      text: data.titleText,
      // subtext: '纯属虚构',
      // x:'center'
      textStyle: {
        fontSize: "18",
        color: "#666"
        //fontWeight:"bold",
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // legend: {
    //     orient: 'vertical',
    //     left: 'left',
    //     data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    // },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: data.seriesData
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
      myChart: null
    };
  },
  mounted: function() {
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
.bingTuBox {
  width: 100%;
  height: 100%;
}
</style>



