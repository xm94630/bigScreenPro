<template>
  <div>

    <div>
      我是表格
      <el-button type= "primary" @click="exportFun">导出</el-button>
    </div>

    <el-table :data="myTableData" style="width: 100%">

      <template v-for="(one,index) in resultColumnList">
        <el-table-column
          :key = "index"
          :prop = one.columnName 
          :label= one.displayName
          width="300">
        </el-table-column>
      </template>

    </el-table>

    <el-pagination
      v-if="showPage"
      background
      layout = "prev, pager, next"
      :total = "totalPage"
      :current-page = "currentPage"
      :page-size = "pageSize"
      @current-change = pageChangeFun
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  name: "myTable",
  props: {
    "tableData":null,
    "currentSearchOptions":null,
    "currentUseCode":null,
    "currentUseUrl":null,
    
    "currentPage":null,
    "pageSize":null,
    "showPage":null,

    "resultColumnList":null,   //表头数据
    
    "totalPage":null,
  },
  data() {
    return {
      myTableData:this.tableData
    };
  },
  watch:{
    "tableData":function(newData){
      this.myTableData = newData;
      // console.log('表格组件接受数据===>更新')
      // console.log(this.tableData)
      // console.log(this.currentSearchOptions)
      // console.log(this.currentUseCode)
      // console.log(this.currentUseUrl)
    },
  },
  methods:{
    exportFun(){
      
    },
    pageChangeFun(currentPage){

      const body = {
        diyCoreCode:this.currentUseCode,
        abc:this.currentSearchOptions,
      }


      //如果需要显示分页，要带上这两个参数
      if(this.showPage){
        body.currentPage=currentPage
        body.pageSize=this.pageSize
        //根据点击分页，更新数据
        axios.post(this.currentUseUrl,body).then(response => {
          this.myTableData =  response.data.data.recordList;
        });
      }else{
        //根据点击分页，更新数据
        axios.post(this.currentUseUrl,body).then(response => {
          this.myTableData =  response.data.data;
        });
      }


    }
  },
  computed: {
  },
  mounted(){
    console.log('表格组件接受数据===>')
    console.log(this.tableData)
    console.log(this.resultColumnList)
    // console.log(this.currentSearchOptions)
    // console.log(this.currentUseCode)
    // console.log(this.currentUseUrl)
  },
};
</script>

<style lang="scss">
</style>
