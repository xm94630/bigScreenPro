<template>
  <div class="xxxBox">
    <template v-for="(one,key) in myData">
      <div :key="key" class="yyyBox">
        <div class="fish fish1">{{key}}</div>
          <template v-if="bee.isObject(one)">
            <!-- 递归 -->
            <xuming :key="key" :myData="one" :level="myLevel" ></xuming>
        </template>
        <template v-else>
          <div class="fish fish2" :style="{'width':'calc(100% - '+200*myLevel+'px)'}">{{one}}</div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import bee from "@/src/tools/bee";
export default {
  name: "xuming",
  props: {
    myData:null,
    level:Number,
  },  
  data(){
    return{
      bee,
      myLevel:this.level?Number(this.level+1):1,
    }
  },
  computed:{
    style(){
      let obj ={"margin-left":"10px"}
      obj['_'+this.n+'thLine']=true
      return obj
    }
  },
  methods:{
    configPlusFun(){
      this.$emit('moreConfigFun')
    }
  },
  mounted(){
    // console.log(this.n)
    // this.style['_'+this.n+'thLine'] = true;
    // console.log(this.style)
  }
};
</script>

<style  lang="scss">

  $borderColor: rgba(55, 224, 255, 0.8);
  $FontColor: rgba(55, 224, 255, 0.8);
  $FontColor2: #999;

  .xxxBox{
    width: 100%;
    overflow: hidden;
    color: $FontColor2;
    .yyyBox{
      width: 100%;
      display: -webkit-box;
      .fish1{
        width:200px;
        border-right:solid 1px $borderColor;
        border-bottom:solid 1px $borderColor;
        padding:5px;
        box-sizing: border-box;
        font-size: 20px;
        color:$FontColor;
        word-wrap:break-word;
      }
      .fish2{
        width:calc(100% - 200px);
        border-bottom:solid 1px $borderColor;
        padding:5px;
        box-sizing: border-box;
      }
    }
  }


</style>
