<template>
  <div class="addBtn">
    +
    新建可视化
  </div>
</template>

<script>
export default {
  name: 'xm',
  props: {
    msg: String
  },
  data(){
    return{
        xxx:'大屏展示'
    }
  }
}
</script>

<style scoped>
.addBtn{
  width:150px;
  height:150px;
  background:#fff;
  line-height:150px;
  text-align:center;
  border:dashed 2px lightseagreen;
}
</style>
