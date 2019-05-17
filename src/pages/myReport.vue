<template>
  <div class="myReportBox">
    <reportShow :reportConfig='data' />
  </div>
</template>

<script>
import axios from "axios";
import reportShow from "../components/reportShow.vue";
import {baseUrl,path} from '../../apiUrl.config';

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
    
    axios.get(baseUrl + path + "/api_v1/diy/view/info?diyViewCode="+code).then(response => {
      let d = response.data.data.jsonData;
      
      //兼容koa本地虚拟的数据（对象类型）、和来自后端那边的数据
      if(typeof(d)!=='object'){
        d = eval('(' + d + ')');
      }
      
      this.data = d;
    });
  }
}
</script>

<style scoped>
</style>
