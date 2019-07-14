<!-- 这个是对永辉大屏其中一部分定制化的组件，没有复用的价值 -->
<template>
  <!-- 外容器 -->
  <div class="widgetBox" :style="myCss" :name="myConfig.id" ref="cardGroupBox" @click="clickFun(myConfig.id)">
    <img
      :width="width"
      :height="height"
      :src="myConfig.imageLink">
    </img>
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';
import bus from '@/src/tools/bus.js';
import store from '@/src/store';

export default {
  name: "beeImage",
  components:{
  },
  props: {
    myConfig: null
  },
  data: function() {
    return {
      store,
      width:'100%',
      height:'100%',
    };
  },
  computed:{
    myCss() {
      let cssStr = bee.objToCSS(bee.replaceKey(this.myConfig.css,{"x":"left","y":"top"}))
      return cssStr;
    }
  },
  methods:{
    clickFun(widgetId){
      store.dispatch("setSelectWidgetId",widgetId);
      bus.$emit("widgetClick",widgetId);
    }
  },
  watch:{
    "myConfig":{
      handler:function(){
      },
      deep: true
    },
  },
  mounted: function() {
  },
  updated(){
  },
  destroyed(){
  }
    
};
</script>

<style scoded lang="scss">
.widgetBox{
  position:absolute;
  box-sizing:border-box;
  overflow: hidden;
  image{
    width: 100%;
    height: 100%;
  }
}
</style>