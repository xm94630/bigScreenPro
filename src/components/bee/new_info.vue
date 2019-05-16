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

export default {
  name: "beeTitle",
  props: {
    myData: null
  },
  data() {
    return {
      template:this.myData.template,
      infoData:this.myData.apiData[0]
    };
  },
  computed: {
    showData(){
      let d='';
      for(let key in this.infoData){
        d = this.infoData[key];
      }
      let a = this.template.replace(/{{(\w)*}}/g,d);
      return a;
    },
    beeTitleStyle() {
      let str = "position:absolute;box-sizing:border-box;";
      str += "border:" + this.myData.border + ";" 
      str += "width:" + this.myData.width + "px;" 
      str += "height:" + this.myData.height + "px;" 
      str += "left:" + this.myData.x + "px;" 
      str +=  "top:" + this.myData.y + "px;"
      str += "color:"+ this.myData.color+";"
      str += "font-size:"+this.myData['font-size']+"px;"
      str += "text-align:"+this.myData['text-align']+";"
      str += "padding:"+this.myData['padding']+";"
      str += "background:"+this.myData['background']+";"
      str += "z-index:"+this.myData['z-index']+";"


      return str;
    }
  }
};
</script>

<style lang="scss">
.beeTitle {
  color: #000;
}
</style>
