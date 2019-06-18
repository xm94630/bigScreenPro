<template>
  <div clas="">

    <template v-for="(one) in reportList">
      <router-link :to="'/myReport?diyViewCode='+one.diyViewCode" :key="one.diyViewCode">
        <div class="myReport">{{one.viewName}}</div>
      </router-link>
    </template>

    <template v-for="(one) in reportList2">
      <router-link :to="'/myReport?diyViewCode='+one.code" :key="one.code" ref="one.code">
        <div class="myReport2">
          {{one.name}}
          <div class="editScreenBtn">
            <router-link :to="'/createBigScreen2?modCode='+one.code">
              <i class="el-icon-edit"></i>
            </router-link>
            <a @click.prevent="copyScreenFun(one.code)"><i class="el-icon-star-on"></i></a>
            <a @click.prevent="deleteScreenFun(one.code)"><i class="el-icon-delete"></i></a>
          </div>
        </div>
      </router-link>
    </template>

    <!-- <router-link to="/createBigScreen">
      <add-btn></add-btn>
    </router-link> -->
    <router-link to="/createBigScreen2">
      <add-btn></add-btn>
    </router-link>

  </div>
</template>

<script>
import axios from "axios";
import {baseUrl,path} from '@/bee.config';
import addBtn from "../components/addBtn.vue";


export default {
  name: "app",
  components: {
    addBtn
  },
  data() {
    return {
      isCollapse: true,
      reportList: [],
      reportList2: []
    };
  },
  methods: {
    deleteScreenFun(code){

      this.$confirm('确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除逻辑
          let screenList = JSON.parse(localStorage.getItem('screenList'));
          delete screenList[code]
          localStorage.setItem("screenList",JSON.stringify(screenList))
          this.reportList2 = screenList;
          //提示
          this.$message({type: 'success',message: '删除成功!'});
        }).catch(() => {
          this.$message({type: 'info',message: '已取消删除'});          
        });
    },
    copyScreenFun(){
      alert(2)
    }
  },
  mounted: function() {
    //获取已经存在的数据
    axios.get(baseUrl + path + "/api_v1/diy/view/template/list").then(response => {
      this.reportList = response.data.data;
    });

    //从本地储存中获取
    let list = JSON.parse(localStorage.getItem('screenList'));
    this.reportList2 = list;
  },
  computed:{
  }
};
</script>

<style lang="scss">

  .myReport2{
    position: relative;
    .editScreenBtn{
      width: 25px;
      // height:25px;
      // background: red;
      position: absolute;
      top:0px;
      right:0px;
      cursor: pointer;
      font-size: 20px;
      color:#fff;
    }
  }


</style>
