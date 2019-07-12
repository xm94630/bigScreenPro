<template>
  <div class="beeTitle" :style="myCss" :name="myConfig.id" @click="clickFun(myConfig.id)">
    {{myConfig.text}}
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';
import bus from '@/src/tools/bus.js';
import store from '@/src/store';

export default {
  name: "bee_title",//不能使用title，以为这个已经被默认占用了
  props: {
    myConfig: null
  },
  data() {
    return {
      store
    };
  },
  methods:{
    clickFun(widgetId){
      store.dispatch("setSelectWidgetId",widgetId);
      bus.$emit("widgetClick",widgetId);
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
.beeTitle {
  color: #000;
}
</style>
