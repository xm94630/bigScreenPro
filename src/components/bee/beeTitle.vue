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
      <div class="showPosition">100,100</div>
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
  position:relative;
  user-select:none;
  cursor:pointer;
}
.canControl{
  border:dashed 1px red;
  cursor:move;
  .miniDot{
    width:5px;
    height:5px;
    background:red;
    position:absolute;
  }
  .dot1{
    top:0px;
    left:0px;
    cursor:nwse-resize;
  }
  .dot2{
    top:0px;
    left:50%;
    cursor:ns-resize;
  }
  .dot3{
    top:0px;
    right:0px;
    cursor:nesw-resize;
  }
  .dot4{
    top:50%;
    left:0;
    cursor:ew-resize;
  }
  .dot6{
    top:50%;
    right:0px;
    cursor:ew-resize;
  }
  .dot7{
    bottom:0px;
    left:0px;
    cursor:nesw-resize;
  }
  .dot8{
    bottom:0px;
    left:50%;
    cursor:ns-resize;
  }
  .dot9{
    bottom:0px;
    right:0px;
    cursor:nwse-resize;
  }

  .showPosition{
    display:block;
  }
}
.wenzi{
  text-align:center;
  position:relative;
}

.showPosition{
  position:absolute;
  left:-60px;
  top:-20px;
  width:60px;
  height:20px;
  display:none;
  border-right:dashed 1px red;
  border-bottom:dashed 1px red;
  text-align:right;
  box-sizing:border-box;
  padding:2px 5px;
}



</style>
