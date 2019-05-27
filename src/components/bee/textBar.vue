<template>
  <div class="beeTitle" :style="beeTitleStyle">
    <template v-for="(one,index) in myConfig.myData">
      <div :key="index"> 
        库房整体积：{{one.totalvolume}} | 
        总体使用体积：{{one.totalusevolume}} | 
        库房利用率：{{one.totalavailability}}
      </div>
    </template>
  </div>
</template>

<script>
// myConfig 数据格式
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

export default {
  name: "beeTitle",
  props: {
    myConfig: null
  },
  data() {
    return {};
  },
  computed: {
    beeTitleStyle() {
      let str = "position:absolute;box-sizing:border-box;";
      str += "border:" + this.myConfig.border + ";" 
      str += "width:" + this.myConfig.width + "px;" 
      str += "height:" + this.myConfig.height + "px;" 
      str += "left:" + this.myConfig.x + "px;" 
      str +=  "top:" + this.myConfig.y + "px;"
      str += "color:"+ this.myConfig.color+";"
      str += "font-size:"+this.myConfig['font-size']+"px;"
      str += "text-align:"+this.myConfig['text-align']+";"
      str += "padding:"+this.myConfig['padding']+"px;"
      str += "background:"+this.myConfig['background']+";"
      return str;
    }
  },
  mounted(){
    //console.log(this.myConfig)
  }
};
</script>

<style lang="scss">
.beeTitle {
  color: #000;
}
</style>
