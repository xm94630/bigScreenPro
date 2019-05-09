<template>
  <div class="myReportBox">
    <reportShow :reportConfig='data' />
  </div>
</template>

<script>
import axios from "axios";
import reportShow from "../components/reportShow.vue";


let baseUrl='';

export default {
  name: 'myReport',
  components:{
    reportShow
  },
  props: {
  },
  data(){
    return{
      data:null
    }
  },
  mounted(){
    //获取已经存在的数据
    let code = this.$route.query.diyViewCode;
    //axios.get(baseUrl + "/koa/getReportByCode?code="+code).then(response => {
    axios.get(baseUrl + "/2/api_v1/diy/view/info?diyViewCode="+code).then(response => {
      this.data = response.data.data.config;
    });
  }
}
</script>

<style scoped>
</style>
