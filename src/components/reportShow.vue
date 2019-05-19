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
import { setInterval } from 'timers';
import {baseUrl,path} from '@/apiUrl.config';


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
    //五分钟刷新，这个方法很简陋，有空优化
    setInterval(()=>{
      window.location.reload()
    },1000*60*5)
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

        let conf = this.reportConfig.components.table;
        let len = conf.length;

        for (let i = 0; i < len; i++) {

          //来自前端自己的配置
          let myConfig = conf[i];
          let searchBtns = myConfig.searchBtns

          //请求各个小表的“初始配置数据”
          let arr = [];
          for(let j=0;j<searchBtns.length;j++){
            arr[j] = new Promise((resolve) => {
                axios.get(searchBtns[j].initUrl+'?diyCoreCode='+searchBtns[j].diyCoreCode).then(response => {
                  resolve(response);
                })
            })            
          }
          
          //完成所有异步动作之后，拿到数据之后，就可以做实例化。
          Promise.all(arr).then(function(values) {
            
            //resultColumnList属性，对应的放回searchBtns中
            for(let k=0;k<searchBtns.length;k++){
              searchBtns[k].resultColumnList=values[k].data.data.resultColumnList;
            }
         
            myConfig.initTableConfig = values[0].data.data; //来自接口的配置(用于条件查询)，不同小表都共用它！   
            myConfig.searchBtns = searchBtns;               //更新searchBtns，包含了表头的配置！
            let propsConfig = {
              myConfig: myConfig
            };
            import("../components/bee/table.vue").then(cmp => {
              mountCmp(
                cmp,
                propsConfig,
                document.querySelector(".myReportCanvas")
              );
            });

          });


        
        }

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
            propsConfig.chartData.urlData = response.data.data;
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

      //渲染全部的“new_info”组件进行渲染
      if ("new_info" == key) {
        let myData = this.reportConfig.components.new_info;
        let len = myData.length;
        for (let i = 0; i < len; i++) {
 
          //组件基本样式数据
          let propsConfig = {
            myData: myData[i]
          };
          let dataUrl = myData[i].dataUrl;
          let diyCoreCode = myData[i].diyCoreCode;

          //获取数据源
          axios.post(baseUrl + dataUrl,{
            diyCoreCode:diyCoreCode
          }).then(response => {


            propsConfig.myData.apiData = response.data.data;

            import("../components/bee/new_info.vue").then(cmp => {
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
