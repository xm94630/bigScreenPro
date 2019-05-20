<template>
  <div>
    <router-view></router-view>
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
  created(){
    console.log('------>')
    console.log(this.$store)
  }
}
</script>

<style scoped>
</style>
