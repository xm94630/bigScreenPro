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
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      return bee.objToCSS(bee.replaceKey(this.myConfig.css,map))
    },
    foldBtnText(){
      if(this.isShow){return "-"}else{return "+"}
    }
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
      for(let i=0;i<tableData.length;i++){tableData[i].bee_number = i+1} //增加一列“NO.”的数据
    },

    //更新items:对条件查询的组件集合做一些处理
    fun1:function(conditionArr){
      let map = {
        "0":"beeBlank",
        "10":"beeInput",
        "11":"beeInputRange",
        "20":"beeSelect",
        "21":"beeSelectSearch",
        "22":"beeSelectMultiple",
        "30":"beeDatePicker",
        "31":"beeDatePickerRange",
        "40":"beeDateTimePicker",
        "41":"beeDateTimePickerRange",
        "100":"beeDatePickerRange",
      }
      if(typeof(conditionArr)==='string' && conditionArr!==''){
        conditionArr = eval("("+conditionArr+")");
      }
      //添加typeName属性
      for(let i=0;i<conditionArr.length;i++){
        conditionArr[i].typeName = map[conditionArr[i].type]
      }
      //数据排序 
      this.items = _.orderBy(conditionArr,'queryIndex','asc')
    },
    
    //更新searchBtns
    fun2:function(searchBtns){
      searchBtns = typeof(searchBtns)==="string"?JSON.parse(searchBtns):searchBtns;
      //从接口获取“列的配置”
      let arr = [];
      for(let i=0;i<searchBtns.length;i++){
        arr[i] = new Promise((resolve) => {
          axios.get(searchBtns[i].initUrl+'?diyCoreCode='+searchBtns[i].diyCoreCode).then(response => {
            resolve(response);
          })
        })            
      }
      Promise.all(arr).then((values)=>{  
        //searchBtns中添加resultColumnList属性，并排序
        for(let k=0;k<searchBtns.length;k++){
          //增加一列 "No."
          let resultColumnList = values[k].data.data.resultColumnList
          resultColumnList = resultColumnList.concat({
            "columnName":"bee_number", //列的key   
            "displayName":"No.",       //列头名字  
            "columnIndex":-1,          //列的顺序
          })
          searchBtns[k].resultColumnList=_.orderBy(resultColumnList,'columnIndex','asc');
          this.searchBtns = searchBtns;
        }
      });
    },
  },

  watch:{
    "myConfig.initForView":{
      handler:function(v){this.fun1(v.conditionColumnList)},
      deep:true,
    },
    "myConfig.searchBtns":{
      handler:function(v){this.fun2(v)},
      deep:true,
    }
  },
  
  mounted(){
    this.fun1(this.myConfig.initForView.conditionColumnList);
    this.fun2(this.myConfig.searchBtns);
  }

};
</script>

<style lang="scss">
.beeTable {
  position:absolute;
  box-sizing:border-box;
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
