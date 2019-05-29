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
import _ from "lodash";

//获取饼图option配置
function getOption(data) {

  // 数据格式转换：
  // let data = [
  //   {"出库单":1,"sku":4,"type":"JIT"},
  //   {"出库单":2,"sku":5,"type":"B2C"},
  //   {"出库单":3,"sku":6,"type":"B2B"}
  // ]

  // 从上面的格式，转变成下面的这种..

  // let xAxis = {
  //   "data":['JIT', 'B2C', 'B2B']
  // }
  // let legend = {
  //   "data":['出库单', 'SKU', ]
  // }
  // let series = [
  //   {
  //     name: '出库单',
  //     data: [1, 2, 3],
  //   },
  //   {
  //     name: 'SKU',
  //     data: [4, 5, 6],
  //   }
  // ]


  //组装数据
  let apiData = data.apiData;
  let keys = _.keys(apiData && apiData[0]);
  var index = keys.indexOf('type');
  if (index > -1) {
    keys.splice(index, 1);
  }
  
  let legend = {
    "data":keys,
    "textStyle": {
      "color": "#f8f4a0"
    }
  }
  let xAxis = {
    "data":_.map(apiData,'type'),
    axisLabel:data.axisLabel
  }
  
  let series = []
  for(let i=0;i<legend.data.length;i++){
    series.push({
      name:legend.data[i],
      data:_.map(apiData,legend.data[i]),
    })
  }


  //追加类型
  series.forEach(function(one) {
    one.type = "bar";
  });

  let option = {
    color: data.color || ["#83b5b9","#db8460","#9ec794","#eada80"],
    title: data.title,
    tooltip: {
      trigger: "axis"
    },
    legend: legend,
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
    xAxis: xAxis,
    yAxis: {
        type: 'value',
        axisLabel:data.axisLabel
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



