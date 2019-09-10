<template>
  <!-- 拖拽组件 -->
  <vue-draggable-resizable 
    :x="Number(myConfig.css.x)" :y="Number(myConfig.css.y)" :w="Number(myConfig.css.width)" :h="Number(myConfig.css.height)" 
    :grid="grid" :parent="false"
    v-on:dragging="onDrag" v-on:resizing="onResize" @activated="clickFun(myConfig.id)" 
    class="widgetBox" :style="myCss" :name="myConfig.id" @click="clickFun(myConfig.id)"
  >
    <!-- 外容器 -->
    <div class="widgetCon">
      <img
        :width="width"
        :height="height"
        :src="myConfig.imageLink" />
    </div>

    <!-- 选中框 -->
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
  </vue-draggable-resizable>
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

      //用于控制拖拽组件的初始定位
      x: this.myConfig.css.x,
      y: this.myConfig.css.y,
      width: this.myConfig.css.width,
      height: this.myConfig.css.height,
      //初始的栅格
      grid:(this.canvasConfig&&this.canvasConfig.grid)?[this.canvasConfig.grid,this.canvasConfig.grid]:[1,1]
    };
  },
  computed:{
    myCss() {
      let cssStr = bee.objToCSS(bee.replaceKey(this.myConfig.css,{"x":"left","y":"top"}))
      return cssStr;
    }
  },
  methods:{
    onResize: function (x, y, width, height) {
      this.myConfig.css.x = this.x = x
      this.myConfig.css.y = this.y = y
      this.myConfig.css.width =this.width = width
      this.myConfig.css.height = this.height = height
    },
    onDrag: function (x, y) {
      this.myConfig.css.x = this.x = x
      this.myConfig.css.y = this.y = y   
    },
    clickFun(widgetId){
      //只有在编辑页面，这个点击才有效
      if(this.$el.parentElement.id==="editCanvas"){
        store.dispatch("setSelectWidgetId",widgetId);
        bus.$emit("widgetClick",widgetId);
      }
    },

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
.widgetBox {
  position: absolute;
  box-sizing: border-box;
  .widgetCon {
    width: 100%;
    height: 100%;
  }
}

image{
  width: 100%;
  height: 100%;
}
</style>