<template>
  <div class="beeTitle" :style="myCss">
      <template v-for="(value, name) in myConfig.options">
        <span :key="name"> 
          {{value}}:{{myConfig.myData[0][name]}} | 
        </span>
      </template>
  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';

export default {
  name: "beeTitle",
  props: {
    myConfig: null
  },
  data() {
    return {};
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.myConfig.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    }
  },
  mounted(){
  }
};
</script>

<style lang="scss">
.beeTitle {
  color: #000;
}
</style>
