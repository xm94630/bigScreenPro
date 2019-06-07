<template>
  <div class="bingTuCon" :style="myCss">
    <div class="bingTuBox" :id="chartData.id"></div>
  </div>
</template>


<script>
import bee from '@/src/tools/bee.js';
import echarts from "echarts";

//获取饼图option配置
function getOption(data) {





  //追加类型
  let series = data.apiData;
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
    legend: {
        data:['邮件营销','联盟广告']
    },
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
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
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
    chartData: Object
  },
  data() {
    return {
      bingTu_option: getOption(this.chartData),
      myChart: null,
    };
  },
  mounted: function() {
    console.log('==>')
    console.log(this.chartData)
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById(this.chartData.id));
    this.myChart.setOption(this.bingTu_option);
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.chartData.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    }
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



