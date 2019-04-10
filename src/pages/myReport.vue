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
    let code = this.$route.query.code;
    axios.get(baseUrl + "/koa/getReportByCode?code="+code).then(response => {
      console.log(response.data.data)
      this.data = response.data.data;
    });
  }
}
</script>

<style scoped>
</style>
