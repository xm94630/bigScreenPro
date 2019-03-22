<template>
  <div class="HeadTitle">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: 'HeadTitle',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.HeadTitle{
  line-height:60px;
}
</style>
