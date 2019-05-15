<template>
  <div
    class="bingTuCon"
    :style="'width:'+width+'px;height:'+height+'px;top:'+y+'px;left:'+x+'px;border:'+border+';padding:'+padding+'px;background:'+background"
  >
    <div class="bingTuBox" :id="chartData.chartId"></div>
  </div>
</template>


<script>
import echarts from "echarts";

//获取饼图option配置
function getOption(data) {

  let urlData = data.urlData[0];
  let percent = 1;
  for(let key in urlData){
    percent = urlData[key];
    break;
  }

  var option = {
    color:data.color || ['#a6c87e','#fd9f82'],
    // 标题组件，包含主标题和副标题
    title: {
      show: true,
      text: data.title.text,
      x: "left",
      textStyle: {
        fontSize: data.title['font-size'],
        color: data.title['color'],
        //fontWeight:"bold",
      }
    },
    //  提示框组件
    tooltip: {
      //是否显示提示框组件，包括提示框浮层和 axisPointe
      show: false,
      // 触发类型: item:数据项触发，axis：坐标轴触发
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    // // 图例
    // legend: {
    //     orient: 'vertical',
    //     x: 'left',
    //     data:['完成率']
    // },

    // 系列列表。每个系列通过 type 决定自己的图表类型
    series: [
      {
        // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
        name: "任务进度",
        type: "pie",
        // 饼图的半径，数组的第一项是内半径，第二项是外半径
        radius: ["50%", "70%"],
        // 是否启用防止标签重叠策略，默认开启
        avoidLabelOverlap: false,
        hoverAnimation: false,
        // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            // 数据值
            value: 100 * percent,
            // 数据项名称
            name: data.title.text,
            //该数据项是否被选中
            selected: false,
            // 单个扇区的标签配置
            label: {
              normal: {
                // 是显示标签
                show: true,
                position: "center",
                fontSize: 14,
                // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                formatter: "{b}\n{d}%"
              }
            }
          },
          {
            value: 100 * (1 - percent),
            label: {
              normal: {
                show: false
              }
            }
          }
        ]
      }
    ]
  };
  return option;
}

export default {
  name: "pie",
  props: {
    chartData: Object,
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



