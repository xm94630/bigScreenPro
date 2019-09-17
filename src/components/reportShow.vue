<template>
  <div class="reportShow">
    <template v-if="reportConfig==null"><div class="loadingCanvas">Loading...</div></template>
    <template v-else>
      <div class="myReportCanvas" :style="myCss" id="showCanvas">
        <!-- 各个组件渲染 -->
        <template v-for="(arr, key) in this.reportConfig.components">
          <template v-for="(item) in arr">
            <component
              :key = "item.id"
              :is = "key"
              :myConfig= "item"
            ></component>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';
//加载全部可用组件
import {allWidgets} from "@/src/components/bee/widget.config"

export default {
  name: "reportShow",
  props: {
    reportConfig: null
  },
  components: {
    ...allWidgets,
  },
  data() {
    return {};
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      return bee.objToCSS(bee.replaceKey(this.reportConfig.canvas,map),"margin:0 auto;");
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
      }
    }

  },
  updated(){
    this.loadAll();
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
