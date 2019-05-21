<template>
  <div class="reportConditionBox">
    <div class="reportConditionBtn">
      <i class="el-icon-edit"></i>
    </div>
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
  },
}
</script>

<style scoped='scss'>
.reportConditionBox{
  position: absolute;
  top:0;
  left:0;
  z-index:1;
}
.reportConditionBtn{
  width: 50px;
  height:50px;
  line-height:50px;
  text-align: center;
  background: #db8460;
  cursor: pointer;
  color:#fff;
  font-size: 30px;
}
</style>
