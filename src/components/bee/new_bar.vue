<template>
  <div
    class="bingTuCon"
    :style="myCss"
  >
    <div class="bingTuBox" :id="myConfig.id"></div>
  </div>
</template>


<script>
import bee from '@/src/tools/bee.js';
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
    myConfig: Object
  },
  data() {
    return {
      bingTu_option: getOption(this.myConfig),
      myChart: null,
    };
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.myConfig.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    }
  },
  mounted: function() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(
      document.getElementById(this.myConfig.id)
    );
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



