<template>
  <div class="beeTitle" :style="beeTitleStyle">
      <template v-for="(value, name) in myConfig.options">
        <span :key="name"> 
          {{value}}:{{myConfig.myData[0][name]}} | 
        </span>
      </template>
  </div>
</template>

<script>

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
