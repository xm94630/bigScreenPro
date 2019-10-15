<template>
  <div class="box">
    <template v-for="(one,key) in xxxxxx">
      <div :key="key" class="fish">
        <div class="fish1">{{key}}</div>
        <div class="fish2">{{one}}</div>
      </div>
    </template>
  </div>
</template>


<script>
import bee from "@/src/tools/bee";
import {getWidgetConfigExplain} from "@/src/components/bee/widget.config";


export default {
  name: "xuming",
  props: {
    widget: null,
    index: Number,
    widgetConfigExplain:Object,
  },  
  data(){
    return{
      bee,
      n:this.index+1,
      xxxxxx:JSON.parse(JSON.stringify(getWidgetConfigExplain())),
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

<style scoped lang="scss">
.box{
  .fish{
    display: -webkit-box;
    .fish1{
      width:100px;
      border-right:solid 5px red;
      border-bottom:solid 5px red;
    }
    .fish2{
      border-right:solid 5px red;
      border-bottom:solid 5px red;
    }
  }
}

</style>
