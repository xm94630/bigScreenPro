<template>
  <div class="Dater" :style="myCss">{{str}}</div>
</template>


<script>
import bee from '@/src/tools/bee.js';
import moment from "moment";

export default {
  name: "dater",
  props: {
    myConfig: null
  },
  data() {
    return {
      str: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.myConfig.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    }
  },
  mounted: function() {
    setInterval(() => {
      this.str = moment().format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
  }
};
</script>


<style lang="scss">
</style>

