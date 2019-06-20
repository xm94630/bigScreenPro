<template>
  <div class="beeTable" :style="myCss" :name="myConfig.id">

    <!-- 上面部分 -->
    <div class="top">
      <!-- 表格标题 -->
      <div class="tableTitle">{{myConfig.tableTitle}}</div>
      <div class="topCon">
        <!-- 折叠按钮 -->
        <div class="foldBtn" @click="foldBtnFun">{{foldBtnText}}</div>
        <!-- 条件查询部分 -->
        <searchCondition
          v-show = "isShow" 
          v-if = "hackReset"
          :items = "items" 
          :searchBtns = "searchBtns" 
          :resetBtnText = "myConfig.resetBtnText" 
          :currentPage = "myConfig.currentPage"
          :pageSize = "myConfig.pageSize"
          :showPage = "myConfig.showPage"
          :autoSearch = "myConfig.autoSearch"
          @reset = "resetFun"
          @tableDataOK = "tableDataOK"
        />
      </div>
    </div>

    <!-- 下面部分 -->
    <div class="bottom">
      <div class="bottomCon">
        <myTable 
          :tableData = "tableData"
          :currentSearchOptions = "currentSearchOptions"
          :currentUseCode = "currentUseCode"
          :currentUseUrl = "currentUseUrl"
          :resultColumnList = "resultColumnList"
          :tableColumnWidth = "myConfig.tableColumnWidth"
          :noDataInfo = "myConfig.noDataInfo"
          :totalPage = "totalPage"
          :currentPage = "myConfig.currentPage" 
          :pageSize = "myConfig.pageSize"
          :showPage = "myConfig.showPage"
        />
      </div>
    </div>

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
  components:{
    searchCondition,
    myTable,
  },
  props: {
    myConfig: Object
  },
  data() {
    return {
      isShow:!this.myConfig.foldSearchPanel, //面板是否折叠
      noDataInfo:this.myConfig.noDataInfo,   //表格无数据、未查询时候的文本提示
      
      items:[],                //条件查询组件集合
      currentSearchOptions:{}, //当前的条件查询的选项内容
      hackReset:true,          //控制显示与否，实现条件搜索大组件的重新加载，实现类似重置的效果
      searchBtns:[],           //搜索按钮配置
      currentUseCode:{},       //当前使用的数据源code，因为一个大table组件下，可以通过多个查询按钮（不同code）查询不同的数据
      currentUseUrl:{},        //当前使用的数据源url

      resultColumnList:[],     //列配置
      tableData:[],            //表数据
      totalPage:0,             //总页数
    };
  },
  methods:{
    foldBtnFun(){
      if(this.foldBtnText=='+'){this.isShow = true;}else{this.isShow = false}
    },
    resetFun(){      
      this.hackReset = false
      this.$nextTick(() => {this.hackReset = true})
    },
    //在点击查询按钮之后，会把所有数据准备好的数据传递过来
    tableDataOK(tableData,searchOptions,code,url,totalPage,resultColumnList){      
      this.tableData = tableData;
      this.currentSearchOptions = searchOptions;
      this.currentUseCode = code;
      this.currentUseUrl = url;
      this.totalPage = totalPage;
      this.resultColumnList = resultColumnList;
      for(let i=0;i<tableData.length;i++){tableData[i].ID = i+1} //增加一列“NO.”的数据
    },

    //对条件查询的组件集合做一些处理
    parseConditionArr(arr){
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
      //添加typeName属性
      for(let i=0;i<arr.length;i++){
        arr[i].typeName = map[arr[i].type]
      }
      //数据排序 
      return _.orderBy(arr,'queryIndex','asc')
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

  xxx:function(){

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
