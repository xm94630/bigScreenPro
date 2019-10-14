<template>
  <div>
    组件使用指南
  <template>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="xxx"
        label="配置字段"
        width="180"> 
      </el-table-column>
      <el-table-column
        prop="yyy"
        label="说明">
      </el-table-column>
    </el-table>
  </template>
  123
  </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: [{
          xxx: '2016-05-02',
          yyy: '王小虎',
        },{
          xxx: '2016-05-02',
          yyy: '王小虎',
        },{
          xxx: '2016-05-02',
          yyy: '王小虎',
        }]
      }
    }
  }
</script>

<style scoped>
</style>
