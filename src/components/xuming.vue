<template>
  <div class="box">
    <div class="xxxBox">
      <template v-for="(one,key) in myConfig">
        <div :key="key" class="yyyBox">
          <div class="fish fish1">{{key}}</div>
            <template v-if="bee.isObject(one)">
              <!-- 递归 -->
              <xuming :key="key" :myConfig="one"></xuming>
          </template>
          <template v-else>
            <div class="fish fish2">{{one}}</div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>


<script>
import bee from "@/src/tools/bee";



export default {
  name: "xuming",
  props: {
    myConfig:null,
    widget: null,
    index: Number,
    widgetConfigExplain:Object,
  },  
  data(){
    return{
      bee,
      n:this.index+1,
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
.box{
  width: 100%;
  .xxxBox{
    overflow: hidden;
    .yyyBox{
      width: 100%;
      display: -webkit-box;
      .fish1{
        width:200px;
        border-right:solid 1px red;
        border-bottom:solid 1px red;
        padding:5px;
        box-sizing: border-box;
        font-size: 20px;
        color:red;
        word-wrap:break-word;
      }
      .fish2{
        width:100%;
        border-bottom:solid 1px red;
        padding:5px;
        box-sizing: border-box;
      }
    }
  }
}

</style>
