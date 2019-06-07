<template>
  <div class="beeTitle" :style="myCss">{{myConfig.text}}</div>
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
  }
};
</script>

<style lang="scss">
.beeTitle {
  color: #000;
}
</style>
