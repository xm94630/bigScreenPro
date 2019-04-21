<template>
    <div
    class="bingTuCon"
    :style="'width:'+width+'px;height:'+height+'px;top:'+y+'px;left:'+x+'px;border:'+border+';padding:'+padding+'px;background:'+background+';font-size:'+fontSize+'px;text-align:'+textAlign+';color:'+color+';'"
  >
      <div class="Dater">{{str}}</div>
  </div>
</template>


<script>
import moment from "moment";

export default {
  name: "dater",
  props: {
    myConfig: null
  },
  data() {
    return {
      str: moment().format("YYYY-MM-DD HH:mm:ss"),


      width: this.myConfig.width,
      height: this.myConfig.height,
      y: this.myConfig.y,
      x: this.myConfig.x,
      border: this.myConfig.border,
      padding: this.myConfig.padding,
      background: this.myConfig.background,
      fontSize:this.myConfig['font-size'],
      textAlign:this.myConfig['text-align'],
      color:this.myConfig['color'],
    };
  },
  mounted: function() {
    setInterval(() => {
      this.str = moment().format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
  }
};
</script>


<style scoped>
.Dater {
}
.bingTuCon {
  position: absolute;
  box-sizing: border-box;
}
.bingTuBox {
  width: 100%;
  height: 100%;
}
</style>



