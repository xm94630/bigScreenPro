<template>
  <div>
    我是表格
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
      background
      layout = "prev, pager, next"
      :total = "totalPages"
      :current-page = "currentPage"
      :page-size = "pageSize"
      @current-change = pageChangeFun
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "myTable",
  props: {
    "tableData":null,
    "currentSearchOptions":null,
    "currentUseCode":null,
    "currentUseUrl":null,
    "currentPage":null,
    "pageSize":null,
    "resultColumnList":null,
    "totalPages":null,
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
    }
  },
  methods:{
    pageChangeFun(currentPage){
      const body = {
        diyCoreCode:this.currentUseCode,
        abc:this.currentSearchOptions,
        currentPage:currentPage,
        pageSize:this.pageSize,
      }
      //根据点击分页，更新数据
      axios.post(this.currentUseUrl,body).then(response => {
        this.myTableData =  response.data.data;
      });
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
