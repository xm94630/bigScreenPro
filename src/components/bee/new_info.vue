<template>
  <div class="beeTitle" :style="beeTitleStyle">{{showData}}</div>
</template>

<script>
// myData 数据格式
// {
//   id: undefined,
//   text: "默认文字",
//   x: 0,
//   y: 0,
//   width: 100,
//   height: 12,
//   color: "#000",
//   "font-size": 12,
//   border:"solid 1px red",
//   align: "center"
//   ....
// }
import bee from '@/src/tools/bee.js';

export default {
  name: "beeTitle",
  props: {
    myData: null
  },
  data() {
    return {
      template:this.myData.template,
    };
  },
  computed: {
    showData(){
      let d='';
      //兼容字符串数据
      let infoData = typeof(this.myData.apiData)=='string'?eval('('+this.myData.apiData+')')[0]:this.myData.apiData[0]
      for(let key in infoData){
        d = infoData[key];
      }
      let a = this.template.replace(/{{(\w)*}}/g,d);
      return a;
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
.beeTitle {
  color: #000;
}
</style>
