<template>
  <div class="itermListBox">
    <template v-for="(value,key) in widget">
      <div :key="key" v-if="(key!=='alias')&&(key!=='customEventForUse')"><!-- 不显示“别名”、“可用事件” -->

        <template v-if="bee.isObject(value)">
          <div  :class="style">
            <div class="title">{{key}}</div>
            <!-- 递归 -->
            <list :widget="value" :index="n" :widgetConfigExplain="widgetConfigExplain[key]||{}" @moreConfigFun="configPlusFun"></list>
          </div>
        </template>

        <template v-else>
          <!-- 第 N 层级 -->
          <div  :class="style">
            <el-form-item :inline="true" :label="key">
              <el-input size="mini" v-model="widget[key]" 
                :disabled="(key==='searchBtns')||(key==='conditionColumnList')"
              >
              </el-input>
              <el-tooltip class="item" effect="light" :content="widgetConfigExplain[key]" placement="top" v-if="widgetConfigExplain[key]">
                <i class="el-icon-info tipsIcon"></i>
              </el-tooltip>
            </el-form-item>  
            <span class="textBtn" v-if="(key==='searchBtns')||(key==='conditionColumnList')" @click="configPlusFun">请在高级配置中完成此配置</span>
          </div>
        </template>

      </div>
    </template>
  </div>
</template>


<script>
import bee from "@/src/tools/bee";

export default {
  name: "List",
  props: {
    widget: null,
    index: Number,
    widgetConfigExplain:Object,
  },  
  data(){
    return{
      bee,
      n:this.index+1,
      // style:{
      //   "margin-left":"10px"
      //   ['_'+this.n+'thLine']:true
      // }
  }},
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

  .itermListBox{
    .tipsIcon{
      margin-left:10px;
    }
  }

    ._1thLine{
      background:#333;
      margin-left:0px;
    }
    ._2thLine{
      background:#444;
      margin-left:10px;
    }
    ._3thLine{
      background:#555;
      margin-left:10px;
    }
    ._4thLine{
      background:#666;
      margin-left:10px;
    }

    .title{
      height:52px;
      line-height:52px;
      width:100px;
      box-sizing: border-box;
      padding-right:10px;
      text-align: right;
    }

    .el-form-item {
      margin-bottom:0px;
      padding:5px 0;
      .el-form-item__label{
        color:unset;
      }
    }


  
</style>
