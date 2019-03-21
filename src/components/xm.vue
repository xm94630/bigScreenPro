<template>
  <div>
    大屏展示-{{xxx}}
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
</style>
