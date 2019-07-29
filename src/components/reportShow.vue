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
import beeX from './bee/beeX.vue';
import dater from './bee/dater.vue';
import new_bar from './bee/new_bar.vue';
import new_barLine from './bee/new_barLine.vue';
import new_card from './bee/new_card.vue';
import beeCard from './bee/beeCard.vue';
import new_cardGroup from './bee/new_cardGroup.vue';
import YH_lines from './bee/YH_lines.vue';
import new_info from './bee/new_info.vue';
import new_line from './bee/new_line.vue';
import new_pie_1 from './bee/new_pie_1.vue';
import new_pie_2 from './bee/new_pie_2.vue';
import beeTable from './bee/beeTable.vue';
import textBar from './bee/textBar.vue';
import beeTitle from './bee/beeTitle.vue';
import beeImage from './bee/beeImage.vue';

export default {
  name: "reportShow",
  props: {
    reportConfig: null
  },
  components: {
    beeX,
    dater,
    new_bar,
    new_barLine,
    new_card,
    beeCard,
    new_cardGroup,
    YH_lines,
    new_info,
    new_line,
    new_pie_1,
    new_pie_2,
    beeTable,
    textBar,
    beeTitle,
    beeImage,
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
