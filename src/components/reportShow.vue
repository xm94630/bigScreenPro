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
  methods:{
    adjustShow(w,h,show_width,show_height,type){
      const scaleW = show_width / w;
      const scaleH = show_height / h;
      const ele = document.querySelector('.myReportCanvas')
      if(type===1){
        ele.style.transform = 'scale('+scaleW+','+scaleH+')';
        ele.style.top = (show_height - h)/2 + "px";
        if(show_width<w){
          ele.style.left = (show_width - w)/2 + "px";
        }
      }else if(type===2){
        ele.style.transform = 'scale('+scaleW+','+scaleW+')';
        ele.style.top = (h*scaleW - h)/2 + "px";
        if(show_width<w){
          ele.style.left = (show_width - w)/2 + "px";
        }
      }else if(type===3){
        ele.style.transform = 'scale('+scaleH+','+scaleH+')';
        ele.style.top = (show_height - h)/2 + "px";
        if(show_width<w){
          ele.style.left = (show_width - w)/2 + "px";
        }
      }

    },
  },
  mounted(){
  },
  updated() {

    //获取画布的缩放形式
    const zoomType = this.reportConfig.canvas['zoom-type'];
    const w = this.reportConfig.canvas['width'];
    const h = this.reportConfig.canvas['height'];
    const show_width = document.documentElement.clientWidth;
    const show_height = document.documentElement.clientHeight;
    const adjustShow = this.adjustShow;

    adjustShow(w,h,show_width,show_height,zoomType);
    window.onresize = function(){
      const show_width = document.documentElement.clientWidth;
      const show_height = document.documentElement.clientHeight;
      adjustShow(w,h,show_width,show_height,zoomType);
    }


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

      //渲染全部的“table”组件进行渲染
      if ("table" == key) {

          //获取table的配置项目
          axios.get(baseUrl + '/2/api_v1/diy/column/initForView?diyCoreCode=InventoryReportByShelf').then(response => {
            
            //来自接口的配置
            let tableConfig = response.data.data;

            //来自前端自己的配置
            let conf = this.reportConfig.components.table;
            let len = conf.length;
            for (let i = 0; i < len; i++) {
              
              //将配置合并到一起，通过 myConfig 传入。
              let x = conf[i];
              x.tableConfig = tableConfig;
              let propsConfig = {
                myConfig: x
              };
              import("../components/bee/table.vue").then(cmp => {
                mountCmp(
                  cmp,
                  propsConfig,
                  document.querySelector(".myReportCanvas")
                );
              });
            }

          });

      }

      //渲染全部的“ textBar ”组件进行渲染
      if ("textBar" == key) {
        let data = this.reportConfig.components.textBar;
        let len = data.length;
        for (let i = 0; i < len; i++) {

          const dataUrl = data[i].dataUrl;
          const diyCoreCode = data[i].diyCoreCode;
          const body = {
            diyCoreCode
          }

          //获取数据源
          axios.post(dataUrl,body).then(response => {

            let propsConfig = {
              myConfig: data[i]
            };
            propsConfig.myConfig.myData=response.data.data;

            //构建组件
            import("../components/bee/textBar.vue").then(cmp => {
              mountCmp(
                cmp,
                propsConfig,
                document.querySelector(".myReportCanvas")
              );
            });
          });

        }
      }

      //渲染全部的“ new_card ”组件进行渲染
      if ("new_card" == key) {

        let data = this.reportConfig.components.new_card;
        let len = data.length;
        for (let i = 0; i < len; i++) {
          //组件基本样式数据
          let propsConfig = {
            chartData: data[i]
          };
          let dataUrl = data[i].dataUrl;
          let diyCoreCode = data[i].diyCoreCode;

          //获取数据源
          axios.post(baseUrl + dataUrl,{
            diyCoreCode:diyCoreCode
          }).then(response => {

            //propsConfig.chartData.data1 = response.data.data[0];
            //propsConfig.chartData.data2 = response.data.data[1];

            propsConfig.chartData.data = response.data.data[0];

            //构建组件
            import("../components/bee/new_card.vue").then(cmp => {
              mountCmp(
                cmp,
                propsConfig,
                document.querySelector(".myReportCanvas")
              );
            });
          });
        }
      }

      //渲染全部的“ new_pie_1 ”组件进行渲染
      if ("new_pie_1" == key) {
        let data = this.reportConfig.components.new_pie_1;
        let len = data.length;
        for (let i = 0; i < len; i++) {

          //组件基本样式数据
          let propsConfig = {
            chartData: data[i]
          };
          let dataUrl = data[i].dataUrl;
          let diyCoreCode = data[i].diyCoreCode;

          //获取数据源
          axios.post(baseUrl + dataUrl,{
            diyCoreCode:diyCoreCode
          }).then(response => {
            propsConfig.chartData.percent = response.data.data[0].percent;
            //构建组件
            import("../components/bee/new_pie_1.vue").then(cmp => {
              mountCmp(
                cmp,
                propsConfig,
                document.querySelector(".myReportCanvas")
              );
            });
          });
        }
      }

      //渲染全部的“ new_pie_2 ”组件进行渲染
      if ("new_pie_2" == key) {
        let data = this.reportConfig.components.new_pie_2;
        let len = data.length;
        for (let i = 0; i < len; i++) {
          //组件基本样式数据
          let propsConfig = {
            chartData: data[i]
          };
          let dataUrl = data[i].dataUrl;
          let diyCoreCode = data[i].diyCoreCode;

          //获取数据源
          axios.post(baseUrl + dataUrl,{
            diyCoreCode:diyCoreCode
          }).then(response => {

            propsConfig.chartData.apiData = response.data.data;

            //构建组件
            import("../components/bee/new_pie_2.vue").then(cmp => {
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
      if ("new_bar" == key) {
        let data = this.reportConfig.components.new_bar;
        let len = data.length;
        for (let i = 0; i < len; i++) {
          //组件基本样式数据
          let propsConfig = {
            chartData: data[i]
          };
          let dataUrl = data[i].dataUrl;
          let diyCoreCode = data[i].diyCoreCode;

          //获取数据源
          axios.post(baseUrl + dataUrl,{
            diyCoreCode:diyCoreCode
          }).then(response => {

            //propsConfig.chartData.xAxis = response.data.data.xAxis;
            //propsConfig.chartData.series = response.data.data.series;
            //propsConfig.chartData.legend = response.data.data.legend;
            propsConfig.chartData.apiData = response.data.data;
            
            //构建组件
            import("../components/bee/new_bar.vue").then(cmp => {
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
  overflow: hidden;
  box-sizing: border-box;
}
</style>
