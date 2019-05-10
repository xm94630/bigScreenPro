<template>
  <div>我是表格</div>
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
    // console.log(this.currentSearchOptions)
    // console.log(this.currentUseCode)
    // console.log(this.currentUseUrl)
  },
};
</script>

<style lang="scss">
</style>
