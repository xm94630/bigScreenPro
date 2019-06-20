<template>
  <div class="reportShow">
    <!-- <template v-if="reportConfig==null">数据有误，无法渲染</template> -->
    <template v-if="reportConfig==null"><div class="loadingCanvas">Loading...</div></template>
    <template v-else>
      <div class="myReportCanvas" :style="canvasStyle"></div>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import {baseUrl} from '@/bee.config';
import _ from "lodash";
import store from '@/src/store';


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
      if(type==="1"){
        ele.style.transform = 'scale('+scaleW+','+scaleH+')';
        ele.style.top = (show_height - h)/2 + "px";
        if(show_width<w){
          ele.style.left = (show_width - w)/2 + "px";
        }
      }else if(type==="2"){
        ele.style.transform = 'scale('+scaleW+','+scaleW+')';
        ele.style.top = (h*scaleW - h)/2 + "px";
        if(show_width<w){
          ele.style.left = (show_width - w)/2 + "px";
        }
      }else if(type==="3"){
        ele.style.transform = 'scale('+scaleH+','+scaleH+')';
        ele.style.top = (show_height - h)/2 + "px";
        if(show_width<w){
          ele.style.left = (show_width - w)/2 + "px";
        }
      }
    },

    loadAll(){
      
      if(this.reportConfig){


        let lang = this.reportConfig.lang;
        if(lang){
          import('element-ui/lib/locale/lang/'+lang).then((lang)=>{
            import('element-ui/lib/locale').then((locale)=>{
              locale.default.use(lang.default)
            })
          })
        }

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
        //原来这里有一大堆的代码，是因为把组件获取数据的逻辑也放在这里了，之前在组件内部做好了。现在简化到只有几行代码。
        for (let typeName in this.reportConfig.components) {
          let widgets = this.reportConfig.components[typeName];
          for (let i = 0; i < widgets.length; i++) {
            import("../components/bee/"+typeName+".vue").then(cmp => {
              mountCmp(
                cmp,
                {myConfig: widgets[i]},
                document.querySelector(".myReportCanvas")
              );
            });
          }
        }
    
      }

    }

  },
  updated(){
    this.loadAll();
    //五分钟刷新，这个方法很简陋，有空优化
    // setInterval(()=>{
    //   window.location.reload()
    // },1000*60*5)
  },
  mounted() {
    this.loadAll();
  }
};
</script>

<style lang="scss">
.myReportCanvas {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.reportShow{
  height:100%;
  .loadingCanvas{
    height:100%;
    display: flex;
    justify-content:center;
    align-items:center;
  }
}

</style>
