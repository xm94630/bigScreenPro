<template>
  <el-container>
    <el-header>
      <head-title msg="大屏配置-欢迎使用"/>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-view"></i>
              <span>我的可视化</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">我的大屏</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
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
        <router-link to="/myReport?code=">
          <div class="myReport">永辉大屏</div>
        </router-link>

        <router-link to="/createBigScreen">
          <add-btn></add-btn>
        </router-link>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headTitle from "../components/HeadTitle.vue";
import addBtn from "../components/addBtn.vue";
import axios from "axios";

let baseUrl = '';

export default {
  name: "app",
  components: {
    headTitle,
    addBtn
  },
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  },
  mounted: function() {
    //获取已经存在的数据
    axios
      .get(
        baseUrl +"/koa/getReportList"
      )
      .then(response => {
        this.total.E.total = response.data.data.total;
        this.total.E.finish = response.data.data.finish;
      });
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
</style>
