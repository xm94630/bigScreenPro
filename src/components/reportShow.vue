<template>
  <div>
    <template v-if="reportConfig==null">数据有误，无法渲染</template>
    <template v-else>
      <div class="myReportCanvas" :style="canvasStyle"></div>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

let baseUrl = "";

function mountCmp(cmp, props, parent) {
  if (cmp.default) {
    cmp = cmp.default;
  }
  cmp = Vue.extend(cmp);
  let node = document.createElement("div");
  parent.appendChild(node);
  new cmp({
    // eslint-disable-line
    el: node,
    propsData: props,
    parent: this
  });
}

export default {
  name: "reportShow",
  props: {
    reportConfig: null
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    canvasStyle() {
      let str = "margin:0 auto;";
      str +=
        "background:" +
        this.reportConfig.canvas.background +
        ";" +
        "height:" +
        this.reportConfig.canvas.height +
        "px;" +
        "width:" +
        this.reportConfig.canvas.width +
        "px;";
      return str;
    }
  },
  updated() {
    //对配置的的全部组件进行渲染
    for (let key in this.reportConfig.components) {
      //渲染全部的“title”组件进行渲染
      if ("title" == key) {
        let titleData = this.reportConfig.components.title;
        let len = titleData.length;
        for (let i = 0; i < len; i++) {
          let propsConfig = {
            myConfig: titleData[i]
          };
          import("../components/bee/title.vue").then(cmp => {
            mountCmp(
              cmp,
              propsConfig,
              document.querySelector(".myReportCanvas")
            );
          });
        }
      }
      //渲染全部的“ dater ”组件进行渲染
      if ("dater" == key) {
        let data = this.reportConfig.components.dater;
        let len = data.length;
        for (let i = 0; i < len; i++) {
          let propsConfig = {
            myConfig: data[i]
          };
          import("../components/bee/dater.vue").then(cmp => {
            mountCmp(
              cmp,
              propsConfig,
              document.querySelector(".myReportCanvas")
            );
          });
        }
      }
      //渲染全部的“line”组件进行渲染
      if ("line" == key) {
        let data = this.reportConfig.components.line;
        let len = data.length;
        for (let i = 0; i < len; i++) {
          //组件基本样式数据
          let propsConfig = {
            chartData: data[i]
          };
          let dataUrl = data[i].dataUrl;

          //获取数据源
          axios.get(baseUrl + dataUrl).then(response => {
            this.reportList = response.data.data;
            propsConfig.chartData.xAxis = response.data.data.xAxis;
            propsConfig.chartData.series = response.data.data.series;
            propsConfig.chartData.legend = response.data.data.legend;

            //构建组件
            import("../components/bee/line.vue").then(cmp => {
              mountCmp(
                cmp,
                propsConfig,
                document.querySelector(".myReportCanvas")
              );
            });
          });
        }
      }
      //渲染全部的“bar”组件进行渲染
      if ("bar" == key) {
        let data = this.reportConfig.components.bar;
        let len = data.length;
        for (let i = 0; i < len; i++) {
          //组件基本样式数据
          let propsConfig = {
            chartData: data[i]
          };
          let dataUrl = data[i].dataUrl;

          //获取数据源
          axios.get(baseUrl + dataUrl).then(response => {
            this.reportList = response.data.data;
            propsConfig.chartData.xAxis = response.data.data.xAxis;
            propsConfig.chartData.series = response.data.data.series;
            propsConfig.chartData.legend = response.data.data.legend;

            //构建组件
            import("../components/bee/bar.vue").then(cmp => {
              mountCmp(
                cmp,
                propsConfig,
                document.querySelector(".myReportCanvas")
              );
            });
          });
        }
      }
      //渲染全部的“ card ”组件进行渲染
      if ("card" == key) {
        let data = this.reportConfig.components.card;
        let len = data.length;
        for (let i = 0; i < len; i++) {
          //组件基本样式数据
          let propsConfig = {
            chartData: data[i]
          };
          let dataUrl = data[i].dataUrl;

          //获取数据源
          axios.get(baseUrl + dataUrl).then(response => {

            propsConfig.chartData.data1 = response.data.data[0];
            propsConfig.chartData.data2 = response.data.data[1];


            console.log(propsConfig)

            //构建组件
            import("../components/bee/card.vue").then(cmp => {
              mountCmp(
                cmp,
                propsConfig,
                document.querySelector(".myReportCanvas")
              );
            });
          });
        }
      }
      
      //渲染全部的“ pie1 ”组件进行渲染
      if ("pie1" == key) {
        let data = this.reportConfig.components.pie1;
        let len = data.length;
        for (let i = 0; i < len; i++) {
          //组件基本样式数据
          let propsConfig = {
            chartData: data[i]
          };
          let dataUrl = data[i].dataUrl;

          //获取数据源
          axios.get(baseUrl + dataUrl).then(response => {
            propsConfig.chartData.percent = response.data.data.percent;
            //构建组件
            import("../components/bee/pie1.vue").then(cmp => {
              mountCmp(
                cmp,
                propsConfig,
                document.querySelector(".myReportCanvas")
              );
            });
          });
        }
      }

      //渲染全部的“ pie1 ”组件进行渲染
      if ("pie2" == key) {
        console.log('++>')
        let data = this.reportConfig.components.pie2;
        let len = data.length;
        for (let i = 0; i < len; i++) {
          //组件基本样式数据
          let propsConfig = {
            chartData: data[i]
          };
          let dataUrl = data[i].dataUrl;

          //获取数据源
          axios.get(baseUrl + dataUrl).then(response => {
            propsConfig.chartData.seriesData = response.data.data.seriesData;
            propsConfig.chartData.legendData = response.data.data.legendData;
            //构建组件
            import("../components/bee/pie2.vue").then(cmp => {
              mountCmp(
                cmp,
                propsConfig,
                document.querySelector(".myReportCanvas")
              );
            });
          });
        }
      }


    }
  }
};
</script>

<style scoped>
.myReportCanvas {
  position: relative;
}
</style>
