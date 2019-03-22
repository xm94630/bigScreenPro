<template>
  <div id="app">
    lal
    <xm/>
    <HelloWorld msg="欢迎使用"/>
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import xm from '../components/xm.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    xm
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.a{
  color:#111;
  .b{
    color:#bbb
  }
}
</style>
