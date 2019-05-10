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
import axios from "axios";

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
    },
    //将服务器的配置数据，转换成我组件所能使用的格式！
    async parseConditionArr(arr){

      console.log("条件配置数据===>")
      console.log(arr)

      let newArr = [];

      for(let i=0;i<arr.length;i++){
        let one = arr[i];
        let item = null;
        let isForeign = one.isForeign;
        let dataType = one.dataType;
        if(isForeign){

          let referenceUrl = one.referenceUrl;
          
          let getOptionsData = function() {
              return new Promise((resolve) => {

                axios.get(referenceUrl).then( async (response) => {
                  let d = response.data.data;
                  let referenceDisplayColumn = d[one.referenceDisplayColumn];
                  let referenceColumn = d[one.referenceColumn];
                  let options = [];
                  for(let i=0;i<referenceColumn.length;i++){
                    options.push({
                      value:referenceColumn[i],
                      label:referenceDisplayColumn[i],
                    })
                  }
                  resolve(options);
                })
              })
          }

          let options = await getOptionsData();

          //关联的是下拉列表
          item = {
            label: one.displayName,
            name: one.columnName,
            type: 'beeSelect',
            placeholder: one.placeholder,
            value: one.defaultValue,
            rule: {},
            options:options,
          }

        }else{
          //不关联的是其他类型
          item = {}
          if(dataType===1){
            //字符串：普通的文字输入框
            item.label = one.displayName;
            item.name = one.columnName;
            item.type = "beeInput";
            item.placeholder = one.placeholder;
            item.value = one.defaultValue;
            item.rule = {};
          }else if(dataType===2){
            //整数：整数输入框
            item.label = one.displayName;
            item.name = one.columnName;
            item.type = "beeInput";
            item.placeholder = one.placeholder;
            item.value = one.defaultValue;
            item.rule = {};
          }else if(dataType===3){
            //整数：整数输入框
            item.label = one.displayName;
            item.name = one.columnName;
            item.type = "beeDatePicker";
            item.placeholder = one.placeholder;
            item.value = one.defaultValue;
            item.rule = {};
          }else{
            //其他
            item = {
              label: "XXXX11",
              name: 'XXXX22',
              type: 'beeInput',
              placeholder: 'XXXX33',
              value: '',
              rule: {},
            }
          }

        }
        newArr.push(item);
      }
      return newArr;
    }
  },
  async mounted(){
    //console.log('===>')
    //console.log(this.myConfig);

    const conditionArr = this.myConfig.tableConfig.conditionColumnList;
    this.items = await this.parseConditionArr(conditionArr);

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
