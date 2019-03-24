<template>
  <div class="beeTitle">
    <div @click="myFun" v-bind:class="{ 'canControl': isActive,'baseBox':true}">
      <div class="wenzi">我是标题</div>
      <div class="miniDot dot1"></div>
      <div class="miniDot dot2"></div>
      <div class="miniDot dot3"></div>
      <div class="miniDot dot4"></div>
      <div class="miniDot dot6"></div>
      <div class="miniDot dot7"></div>
      <div class="miniDot dot8"></div>
      <div class="miniDot dot9"></div>
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
        isActive:false
    }
  },
  methods: {
    myFun(){
      this.isActive = !this.isActive;
      console.log(this.isActive)
    }
  },
  
}
</script>

<style lang="scss">
.beeTitle{
  color:#fff;
}
.baseBox{
  width:100px;
  height:80px;
  border:dashed 1px #000;
  box-sizing:border-box;
  display:inline-block;
  cursor:move;
  position:relative;
}
.canControl{
  border:dashed 1px red;
  .miniDot{
    width:5px;
    height:5px;
    background:red;
    position:absolute;
  }
  .dot1{
    top:0px;
    left:0px;
  }
  .dot2{
    top:0px;
    left:50%;
  }
  .dot3{
    top:0px;
    right:0px;
  }
  .dot4{
    top:50%;
    left:0;
  }
  .dot6{
    top:50%;
    right:0px;
  }
  .dot7{
    bottom:0px;
    left:0px;
  }
  .dot8{
    bottom:0px;
    left:50%;
  }
  .dot9{
    bottom:0px;
    right:0px;
  }
}
.wenzi{
  text-align:center;
  position:relative;
}



</style>
