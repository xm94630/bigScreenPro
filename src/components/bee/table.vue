<template>
  <div class="beeTable" :style="beeTableStyle">
    <div class="top">
      <div class="topCon">
        <!-- 条件查询部分 -->
        <searchCondition 
        :items="items" 
        :searchBtns="myConfig.searchBtns" 
        :currentPage="myConfig.currentPage"
        :pageSize="myConfig.pageSize"
        @search="handleSearch"
        />
      </div>
    </div>
    <div class="bottom">
      <div class="bottomCon">
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

import searchCondition from "./table/searchCondition.vue"

export default {
  name: "beeTable",
  props: {
    myConfig: null
  },
  data() {
    return {
      items:[{
        span: 12,
        label: "姓名",
        name: '这个是用来绑定的',
        type: 'beeInput',
        placeholder: '请输入',
        value: '',
        rule: {},
      },{
        span: 12,
        label: "喜爱",
        name: '这个是用来绑定的',
        type: 'beeSelect',
        placeholder: '请输入',
        value: '',
        rule: {},
      },{
        span: 12,
        label: "选择日期",
        name: '这个是用来绑定的',
        type: 'beeDatePicker',
        placeholder: '日期选择',
        value: '',
        rule: {},
      },],

    };
  },
  components:{
    searchCondition,
  },
  methods:{
    handleSearch(res){
      console.log(res)
    }
  },
  mounted(){
    //console.log(this.myConfig);

    const conf = this.myConfig;
    const conditionArr = conf.tableConfig.conditionColumnList;
    conditionArr.forEach(function(oneCondition){
    
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
    .topCon{
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
    .bottomCon{
      box-sizing: border-box;
      width:100%;
      background: #fff;
      padding: 20px;
      border: solid 1px #aaa;
    }
  }
}
</style>
