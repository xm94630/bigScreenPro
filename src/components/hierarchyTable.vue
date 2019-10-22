<template>
  <div class="hierarchyTableBox" :style="{'background':myConfig.tableBg}">
    <template v-for="(one,key) in newData">
      <div :key="key" class="hierarchyTableLine">
        <div class="leftCon" :style="{'width':myConfig.titleWidth,'color':myConfig.titleCss.color,'fontSize':myConfig.titleCss['font-size'],'fontWeight':myConfig.titleCss['font-weight'],'border-right':myConfig.border,'border-bottom':myConfig.border}">{{key}}</div>
          <template v-if="bee.isObject(one)">
            <!-- 递归 -->
            <hierarchyTable :key="key" :myData="one" :myConfig="myConfig" :level="myLevel" ></hierarchyTable>
        </template>
        <template v-else>
          <div class="rightCon" :style="{'width':'calc(100% - '+200*myLevel+'px)','color':myConfig.textCss.color,'fontSize':myConfig.textCss['font-size'],'fontWeight':myConfig.textCss['font-weight'],'border-right':myConfig.border,'border-bottom':myConfig.border}">
            <template v-if="key==='-'">
              <img :src="one">
            </template>
            <template v-else>
              {{one}}
            </template>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
// 配置
// myConfig:{
//   tableBg:"#25292d",
//   titleWidth:"200px",
//   border:"solid 1px gray",
//   titleCss:{
//     "color":"gray",
//     "font-size":"12px",
//     "font-weight":"bold",
//   },
//   textCss:{
//     "color":"gray",
//     "font-size":"12px",
//     "font-weight":"normal",
//   },
// }

import bee from "@/src/tools/bee";
export default {
  name: "hierarchyTable",
  props: {
    myData:null,
    myConfig:null,
    level:Number,
  },  
  data(){
    return{
      bee,
      myLevel:this.level?Number(this.level+1):1,
      newData:this.myData,
    }
  },
  computed:{    
  },
  methods:{
  },
  mounted(){
  }
};
</script>

<style  lang="scss">
$borderColor: rgba(55, 224, 255, 0.8);
$FontColor: rgba(55, 224, 255, 0.8);
$FontColor2: #999;

.hierarchyTableBox{
  width: 100%;
  overflow: hidden;
  color: $FontColor2;
  .hierarchyTableLine{
    display: -webkit-box;
    .leftCon{
      width:200px;
      border-right:solid 1px $borderColor;
      border-bottom:solid 1px $borderColor;
      padding:5px;
      box-sizing: border-box;
      font-size: 20px;
      color:$FontColor;
      word-wrap:break-word;
    }
    .rightCon{
      border-bottom:solid 1px $borderColor;
      padding:5px;
      box-sizing: border-box;
    }
  }
}
</style>
