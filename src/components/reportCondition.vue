<template>
  <div class="reportConditionBox">
 
    <div class="reportConditionBtn" @click="clickFun">
      <i class="el-icon-edit"></i>
    </div>

    <div v-if="showCon" class="reportConditionCon">
      <div class="reportConditionBtn" @click="clickFun2">
        <i class="el-icon-close"></i>
      </div>
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
      showCon:false,
    }
  },
  methods:{
    clickFun(){
      this.showCon = true;
    },
    clickFun2(){
      this.showCon = false;
    }
  }
}
</script>

<style scoped='scss'>
.reportConditionBox{
  position: absolute;
  top:0;
  left:0;
  z-index:1;
  width: 100%;
  height: 100%;
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
.reportConditionCon{
  width: 100%;
  height:100%;
  background-color:rgba(0,0,0,0.8);
  position: absolute;
  top:0;
}
</style>
