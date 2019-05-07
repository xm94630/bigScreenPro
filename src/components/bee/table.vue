<template>
  <div class="beeTable" :style="beeTableStyle">
    我是table哦
  </div>
</template>

<script>
// myConfig 数据格式
// {
// 'id': "componentId_00003",
// 'x': 0,
// 'y': 0,
// 'width': 1200,
// 'height': 600,
// 'padding': 0,
// 'exported': true,
// 'showIndexColumn':true,
//   ....
// }

export default {
  name: "beeTable",
  props: {
    myConfig: null
  },
  data() {
    return {};
  },
  computed: {
    beeTableStyle() {
      let str = "position:absolute;box-sizing:border-box;";
      str += "border:" + this.myConfig.border + ";" 
      str += "width:" + this.myConfig.width + "px;" 
      str += "height:" + this.myConfig.height + "px;" 
      str += "left:" + this.myConfig.x + "px;" 
      str +=  "top:" + this.myConfig.y + "px;"
      str += "color:"+ this.myConfig.color+";"
      str += "font-size:"+this.myConfig['font-size']+"px;"
      str += "text-align:"+this.myConfig['text-align']+";"
      str += "padding:"+this.myConfig['padding']+";"
      str += "background:"+this.myConfig['background']+";"
      return str;
    }
  }
};
</script>

<style lang="scss">
.beeTable {
  color: #000;
}
</style>
