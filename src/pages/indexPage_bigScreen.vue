<template>
  <div>

    <template v-for="(one) in reportList">
      <router-link :to="'/myReport?diyViewCode='+one.diyViewCode" :key="one.diyViewCode">
        <div class="myReport">{{one.viewName}}</div>
      </router-link>
    </template>

    <router-link to="/createBigScreen">
      <add-btn></add-btn>
    </router-link>

  </div>
</template>

<script>
import axios from "axios";
import {baseUrl,path} from '@/apiUrl.config';
import addBtn from "../components/addBtn.vue";


export default {
  name: "app",
  components: {
    addBtn
  },
  data() {
    return {
      isCollapse: true,
      reportList: null
    };
  },
  methods: {
  },
  mounted: function() {
    //获取已经存在的数据
    axios.get(baseUrl + path + "/api_v1/diy/view/template/list").then(response => {
      this.reportList = response.data.data;
    });
  },
  computed:{
  }
};
</script>

<style scoped>
</style>
