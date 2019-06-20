<template>
  <div class="beeTable" :style="myCss" :name="myConfig.id">
        
    <div class="top">
      
      <div class="tableTitle">{{myConfig.tableTitle}}</div>

      <div class="topCon">
        <div class="foldBtn" @click="foldBtnFun">{{foldBtnText}}</div>
        <!-- 条件查询部分 -->
        <searchCondition
        v-show="isShow" 
        v-if="hackReset"
        :items="items" 
        :searchBtns="searchBtns" 
        :resetBtnText="myConfig.resetBtnText" 
        :currentPage="myConfig.currentPage"
        :pageSize="myConfig.pageSize"
        :showPage="myConfig.showPage"
        :autoSearch="myConfig.autoSearch"
        @reset = "resetFun"
        @tableDataOK = "tableDataOK"
        />
      </div>
    </div>


    <!-- <div v-if="tableData.length"> -->
      <div class="bottom">
        <div class="bottomCon">
            <myTable 
              :tableData = "tableData"
              :currentSearchOptions = "currentSearchOptions"
              :currentUseCode = "currentUseCode"
              :currentUseUrl = "currentUseUrl"

              :currentPage = "myConfig.currentPage"
              :pageSize = "myConfig.pageSize"
              :totalPage = "totalPage"
              :showPage = "myConfig.showPage"
              
              :tableColumnWidth = "myConfig.tableColumnWidth"

              :resultColumnList = "resultColumnList"
              
              :noDataInfo = "myConfig.noDataInfo"
            />
        </div>
      </div>
    <!-- </div> -->
 

  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';
import axios from "axios";
import _ from "lodash";
import searchCondition from "./table/searchCondition.vue"
import myTable from "./table/myTable.vue"


export default {
  name: "beeTable",
  props: {
    myConfig: null
  },
  data() {
    return {
      tableTitle:"xxx",
      isShow:!this.myConfig.foldSearchPanel,
      resultColumnList:[], 
      //重置用
      //通过子组件发送事件，在本组件中，控制v-if来显示隐藏的变化，从而完成组件的重新加载！1
      hackReset:true,
      items:[],
      tableData:[],
      currentSearchOptions:{},
      currentUseCode:{},
      currentUseUrl:{},
      totalPage:0,
      noDataInfo:this.myConfig.noDataInfo,
      searchBtns:[],
    };
  },
  components:{
    searchCondition,
    myTable,
  },
  methods:{
    foldBtnFun(){
      if(this.foldBtnText=='+'){
        this.isShow = true;
      }else{
        this.isShow = false;
      }
    },
    resetFun(){      
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    tableDataOK(tableData,searchOptions,code,url,totalPage,resultColumnList){
      //console.log('==table数据就绪==')
      //console.log(tableData)
      
      //增加一列ID的数据
      for(let i=0;i<tableData.length;i++){
        tableData[i].ID = i+1;
      }
      this.tableData = tableData;
      this.currentSearchOptions = searchOptions;
      this.currentUseCode = code;
      this.currentUseUrl = url;
      this.totalPage = totalPage;
      this.resultColumnList = resultColumnList;
    },


    parseConditionArr(arr){
      arr = arr || [];
      for(let i=0;i<arr.length;i++){
        let map = {
          "0":"beeBlank",
          "10":"beeInput",
          "11":"beeInputRange",
          "20":"beeSelect",
          "21":"beeSelectSearch",
          "30":"beeDatePicker",
          "31":"beeDatePickerRange",
          "40":"beeDateTimePicker",
          "41":"beeDateTimePickerRange",
          "100":"beeDatePickerRange",
        }
        arr[i].typeName = map[arr[i].type];
      }
      arr = _.orderBy(arr,'queryIndex','asc');  
      return arr;
    },
        //这里完成对按钮们添加新的属性（来自后端的，用于初始化表头的，没有他可渲染不了table）
    getResultColumnList(searchBtns){
      
      //请求各个小表的“初始配置数据”
      let arr = [];
      for(let j=0;j<searchBtns.length;j++){
        arr[j] = new Promise((resolve) => {
            axios.get(searchBtns[j].initUrl+'?diyCoreCode='+searchBtns[j].diyCoreCode).then(response => {
              resolve(response);
            })
        })            
      }
      let that = this;

      //完成所有异步动作之后，拿到数据之后，就可以做实例化。
      Promise.all(arr).then(function(values) {  
        //resultColumnList属性，对应的放回searchBtns中
        for(let k=0;k<searchBtns.length;k++){
          //增加一列
          let resultColumnList = values[k].data.data.resultColumnList
          resultColumnList = resultColumnList.concat({
            "columnName":"ID",   //列的key   
            "displayName":"ID",   //列头名字  
            "columnIndex":-1,   //列的顺序
          })
          //表头排序
          searchBtns[k].resultColumnList=_.orderBy(resultColumnList,'columnIndex','asc');
          that.searchBtns = searchBtns;
        }
      });


    }
  },

  watch:{
    "myConfig.initForView":{
      handler:function(initForView){
        //更新items
        let conditionArr = initForView.conditionColumnList;
        if(typeof(conditionArr)==='string' && conditionArr!==''){
          conditionArr = eval("("+conditionArr+")");
        }
        this.items = this.parseConditionArr(conditionArr);
        //console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++===>')
        //console.log(this.items)
      },
      deep:true,
    },
    "myConfig.searchBtns":{
      handler:function(searchBtns){
        //更新btns
        this.searchBtns = typeof(searchBtns)==="string"?JSON.parse(searchBtns):searchBtns;
        this.getResultColumnList(this.searchBtns);
      },
      deep:true,
    }
  },
  mounted(){
    //更新items
    let conditionArr = this.myConfig.initForView.conditionColumnList;
    if(typeof(conditionArr)==='string' && conditionArr!==''){
      conditionArr = eval("("+conditionArr+")");
    }
    this.items = this.parseConditionArr(conditionArr);
    //更新btns
    this.searchBtns = typeof(this.myConfig.searchBtns)==="string"?JSON.parse(this.myConfig.searchBtns):this.myConfig.searchBtns;
    this.getResultColumnList(this.searchBtns);
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.myConfig.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    },
    foldBtnText(){
      if(this.isShow){
        return "-"
      }else{
        return "+"
      }

    }

  },

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
    .tableTitle{
      font-size: 20px;
      margin-bottom:5px;
    }
    .topCon{
      position: relative;
      box-sizing: border-box;
      width:100%;
      background: #fff;
      padding: 20px;
      border: solid 1px #aaa;
        .foldBtn{
          z-index: 33;
          color:#fff;
          font-size: 40px;
          text-align: center;
          line-height: 30px;
          position:absolute;
          top:0px;
          right:0px;
          width: 40px;
          height:40px;
          background: #409EFF;
          cursor:pointer;
        }
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
