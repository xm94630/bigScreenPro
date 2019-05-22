<template>
  <div class="myReportBox">
    <reportContion 
      v-if = "showGlobalContion" 
      :globalContion = "globalContion"
      @globalConditionUpdate = "globalConditionUpdateFun"
    />
    <reportShow :reportConfig='data' v-if="hackReset"/>
  </div>
</template>

<script>
import axios from "axios";
import reportShow from "../components/reportShow.vue";
import reportContion from "../components/reportCondition.vue";
import {baseUrl,path} from '@/apiUrl.config';
import store from '@/src/store';



export default {
  name: 'myReport',
  components:{
    reportShow,
    reportContion,
  },
  props: {
  },
  data(){
    return{
      data:null,
      showGlobalContion:false,
      globalContion:[],
      hackReset:true,
    }
  },
  methods:{
    globalConditionUpdateFun(){
      //刷新大屏
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true
      })
    }
  },
  mounted(){

    //获取已经存在的数据
    let code = this.$route.query.diyViewCode;
    //axios.get(baseUrl + "/koa/getReportByCode?code="+code).then(response => {
    
    axios.get(baseUrl + path + "/api_v1/diy/view/info?diyViewCode="+code).then(response => {

      let d = response.data.data.jsonData;
      d = typeof(d)=='string'?eval('(' + d + ')'):d;
      
      //全局条件查询
      this.showGlobalContion = d.globalCondition;
      this.globalContion = d.globalCondition;

      //保存到全局store
      let labelPosition = d.canvas.formFormat && d.canvas.formFormat.labelPosition;
      store.dispatch("setLabelPosition", labelPosition||'left');
      
      //兼容koa本地虚拟的数据（对象类型）、和来自后端那边的数据
      if(typeof(d)!=='object'){
        d = eval('(' + d + ')');
      }
      
      this.data = d;
    });

  },
}
</script>

<style scoped>
</style>
