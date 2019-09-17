<template>
  <el-container class="indexPageBox"> 
    <el-header height="40px" class="headBar">
      自定义大屏-欢迎使用
      <span>{{version}}</span>
    </el-header>

    <el-container>
      
      <el-aside width="200px">
        <el-menu
          router
          :default-active = "$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          
          background-color="#333"
          text-color="#999"
          active-text-color="#409EFF"
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
              <el-menu-item index="/index/test">我的练习</el-menu-item>
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
import {version} from '@/bee.config';
export default {
  name: "app",
  components: {
  },
  data() {
    return {
      isCollapse: true,
      reportList: null,
      version:version,
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

.appBox{
  .el-main{
    background: #25292d;
    color:#fff;
  }
}

.indexPageBox{
  .headBar{
    line-height: 40px;
    background: #25292d;
    font-size: 16px;
    border-bottom:solid 1px #555; 
    text-align: right;
    span{
      color:#00baff;
      font-weight: bold;
      margin-left: 10px;
    }
  }
}


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

.el-main{
  a{
    color: #409EFF;
    //color: #fff;
  }
}

.myReport {
  width: 150px;
  height: 150px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
  margin-bottom:20px;
  padding: 20px;
  box-sizing: border-box;

  border: 1px solid #00baff;
  font-size: 14px;
  color: #8eeeff;
  background-image: linear-gradient(-90deg,rgba(0,222,255,.39) 0,rgba(0,174,255,.19) 100%);
  box-shadow: 0 0 10px 0 rgba(55,224,255,.3);
}
.myReport2 {
  width: 150px;
  height: 150px;
  border: solid 3px red;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
  margin-bottom:20px;
  padding: 20px;
  box-sizing: border-box;
  font-size: 20px;

  border: 1px solid #00baff;
  font-size: 14px;
  color: #8eeeff;
  background-image: linear-gradient(-90deg,rgba(0,222,255,.39) 0,rgba(0,174,255,.19) 100%);
  box-shadow: 0 0 10px 0 rgba(55,224,255,.3);
}

.el-aside {
  background-color:  #1b1e25;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>
