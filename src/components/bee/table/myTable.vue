<template>
  <div>
    我是表格
    <el-table :data="tableData" style="width: 100%">

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
      layout="prev, pager, next"
      :total="totalPages"
      :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
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

    };
  },
  watch:{
    "tableData":function(){
      // console.log('表格组件接受数据===>更新')
      // console.log(this.tableData)
      // console.log(this.currentSearchOptions)
      // console.log(this.currentUseCode)
      // console.log(this.currentUseUrl)
    }
  },
  methods:{
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
