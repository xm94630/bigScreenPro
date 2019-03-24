<template>
  <div class="beeTitle">
    <div @click="myFun" v-bind:class="{ 'canControl': isActive,'baseBox':true}">
      我是标题
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

<style scoped>
.beeTitle{
  color:#fff;
}
.baseBox{
  border:dashed 1px #000;
  box-sizing:border-box;
  display:inline-block;
  cursor:move;
}
.canControl{
  border:dashed 1px red;
}
</style>
