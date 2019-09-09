<template>
  <!-- 拖拽组件 -->
  <vue-draggable-resizable 
    :x="Number(myConfig.css.x)" :y="Number(myConfig.css.y)" :w="Number(myConfig.css.width)" :h="Number(myConfig.css.height)" 
    :grid="grid" :parent="false"
    v-on:dragging="onDrag" v-on:resizing="onResize" @activated="clickFun(myConfig.id)" 
    class="widgetBox" :style="myCss" :name="myConfig.id" @click="clickFun(myConfig.id)"
  >
  <div class="widgetCon">
    {{myConfig.text}}
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
  </div>
  </vue-draggable-resizable>
</template>

<script>
import bee from '@/src/tools/bee.js';
import bus from '@/src/tools/bus.js';
import store from '@/src/store';

export default {
  name: "bee_title",//不能使用title，以为这个已经被默认占用了
  props: {
    myConfig: null,
    canvasConfig: Object,
  },
  data() {
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
    }
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.myConfig.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    }
  }
};
</script>

<style lang="scss">
.widgetBox {
  position: absolute;
  box-sizing: border-box;
  .widgetCon {
    width: 100%;
    height: 100%;
  }
  .infoBox{
    color:#4f8ff9;
    font-size:12px;
    margin-top: 5px;
  }
}
</style>
