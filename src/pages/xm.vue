<template>
  <div id="app">
    lal
    <xm/>
    <HelloWorld msg="欢迎使用"/>
    <el-row :gutter="15" class="m-header">
      <el-col :span="8">
        111
      </el-col>
      <el-col :span="8">
        222
      </el-col>
      <el-col :span="8">
        3333
      </el-col>
    </el-row>
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
