<template>
  <div class="myReportBox">

    <!-- 大屏全局的条件查询 -->
    <reportContion 
      v-if = "showGlobalContion" 
      :globalContion = "globalContion"
      @globalConditionUpdate = "globalConditionUpdateFun"
    />

    <!-- 整个画面显示 -->
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
      globalContion:[],         //经过选择表单选择之后的结果
      defaultGlobalContion:[],  //这个是默认的条件结果，没有使用表单选择之前的使用。
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
    let that = this;

    /**********************************************************
     * 这里是最初获取到大屏配置的地方，有很多重要的逻辑处理
     **********************************************************/

    //获取已经存在的数据
    let code = this.$route.query.diyViewCode;
    //axios.get(baseUrl + "/koa/getReportByCode?code="+code).then(response => {
    
    axios.get(baseUrl + path + "/api_v1/diy/view/info?diyViewCode="+code).then(response => {

      let d = response.data.data.jsonData;
      d = typeof(d)=='string'?eval('(' + d + ')'):d;
      
      //全局条件查询
      this.showGlobalContion = d.globalCondition;
      this.globalContion = d.globalCondition;

      //刷新页面
      let refreshTime = d.refreshTime;
      if(refreshTime){
        setInterval(() => {
          that.globalConditionUpdateFun();
        }, refreshTime);
      }

      //这里有一个把大批默认值配置到 store 的工作
      for(let i=0;i<d.globalCondition.length;i++){
        //是个时间组件
        if(d.globalCondition[i].dataType===997788){
          let v = d.globalCondition[i].defaultValue;
          if(v && v[0] && v[1]){
            this.defaultGlobalContion[d.globalCondition[i].keyName[0]]=new Date(v[0]).getTime();
            this.defaultGlobalContion[d.globalCondition[i].keyName[1]]=new Date(v[1]).getTime();
          }else{
            this.defaultGlobalContion[d.globalCondition[i].keyName[0]]=1;
            this.defaultGlobalContion[d.globalCondition[i].keyName[1]]=2;
          }
        }
      }
      //把默认的全局条件查询值，存到store
      store.dispatch("setGlobalContion",this.defaultGlobalContion);

      //保存到全局store
      let labelPosition = d.canvas.formFormat && d.canvas.formFormat.labelPosition;
      let colSpan = d.canvas.formFormat && d.canvas.formFormat.colSpan;
      store.dispatch("setLabelPosition", labelPosition||'left');
      store.dispatch("setColSpan", colSpan||8);
      
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
