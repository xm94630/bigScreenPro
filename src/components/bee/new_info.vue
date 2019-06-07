<template>
  <div class="beeTitle" :style="beeTitleStyle">{{showData}}</div>
</template>

<script>
import bee from '@/src/tools/bee.js';
export default {
  name: "beeTitle",
  props: {
    myData: null
  },
  data() {
    return {};
  },
  computed: {
    showData(){
      //兼容字符串数据
      let infoData = typeof(this.myData.apiData)=='string'?eval('('+this.myData.apiData+')')[0]:this.myData.apiData[0]
      return this.myData.template.replace(/{{(\w)*}}/g, Object.keys(infoData)[0]);
    },
    beeTitleStyle() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.myData.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    }
  }
};
</script>

<style lang="scss">
.beeTitle {}
</style>
