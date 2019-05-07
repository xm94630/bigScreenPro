<template>
  <div class="beeTable" :style="beeTableStyle">
    <div class="top">
      <div class="con">
        条件查询部分
      </div>
    </div>
    <div class="bottom">
      <div class="con">
        表格部分
      </div>
    </div>
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
// 'tableConfig':...,  //来自后端的配置
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
  mounted(){
    //console.log(this.myConfig);

    const conf = this.myConfig;
    const conditionArr = conf.tableConfig.conditionColumnList;
    conditionArr.forEach(function(oneCondition){
      console.log(oneCondition)
      const isForeign = oneCondition.oneCondition;
      const dataType = oneCondition.dataType;
      
      //是否关联，关联的是下拉列表，不关联的是其他类型
      if(isForeign){
        //下拉列表
      }else{
        //其他类型的表单组件，dataType的类型
        //1:字符串 3:日期
        if(dataType===1){
          //渲染input输入框
          console.log(dataType);
        }

      }
    })







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
  background: #fff;
  box-sizing: border-box;
  .top{
    box-sizing: border-box;
    width:100%;
    background: #fff;
    padding: 20px;
    .con{
      box-sizing: border-box;
      width:100%;
      background: #fff;
      padding: 20px;
      border: solid 1px #aaa;
    }
  }
  .bottom{
    box-sizing: border-box;
    width:100%;
    background: #fff;
    margin-top:-20px;
    padding: 20px;
    .con{
      box-sizing: border-box;
      width:100%;
      background: #fff;
      padding: 20px;
      border: solid 1px #aaa;
    }
  }
}
</style>
