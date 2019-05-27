<template>
  <el-container>
    <el-header>
      <head-title msg="大屏配置-欢迎使用"/>
    </el-header>

    <el-container>
      
      <el-aside width="200px">
        <el-menu
          router
          :default-active = "$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="/index">
            <template slot="title">
              <i class="el-icon-view"></i>
              <span>我的可视化</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/bigscreen">我的大屏</el-menu-item>
              <el-menu-item index="/index/dashboard">我的面板</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>我的组件</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">我的组件包</el-menu-item>
              <el-menu-item index="2-2">组件中心教程</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        
        <router-view/>
                
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headTitle from "../components/HeadTitle.vue";

export default {
  name: "app",
  components: {
    headTitle,
  },
  data() {
    return {
      isCollapse: true,
      reportList: null
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  },
  mounted: function() {
  },
  computed:{
  }
};
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }

.el-container {
  height: 100%;
}

.el-header {
  background: lightseagreen;
  font-size: 20px;
  color: #fff;
}

.a {
  color: #111;
  .b {
    color: #bbb;
  }
}

.myReport {
  width: 150px;
  height: 150px;
  background: plum;
  border: solid 3px red;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
  padding: 20px;
  box-sizing: border-box;
  font-size: 20px;
}

.el-aside {
  background-color:  rgb(84, 92, 100);
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>
