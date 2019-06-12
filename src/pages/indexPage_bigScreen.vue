<template>
  <div>

    <template v-for="(one) in reportList">
      <router-link :to="'/myReport?diyViewCode='+one.diyViewCode" :key="one.diyViewCode">
        <div class="myReport">{{one.viewName}}</div>
      </router-link>
    </template>

    <template v-for="(one) in reportList2">
      <router-link :to="'/myReport?diyViewCode='+one.code" :key="one.code">
        <div class="myReport2">{{one.name}}</div>
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
  },
  mounted: function() {
    //获取已经存在的数据
    axios.get(baseUrl + path + "/api_v1/diy/view/template/list").then(response => {
      this.reportList = response.data.data;
    });

    //从本地储存中获取
    let list = JSON.parse(localStorage.getItem('screenList'));
    for(let key in list){
      list[key] = JSON.parse(list[key]);
    }
    this.reportList2 = list;
  },
  computed:{
  }
};
</script>

<style scoped>
</style>
