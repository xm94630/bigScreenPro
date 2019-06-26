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
import bus from '@/src/tools/bus.js';
import axios from "axios";
import reportShow from "../components/reportShow.vue";
import reportContion from "../components/reportCondition.vue";
import {baseUrl,path} from '@/bee.config';
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
    },
        //跳转到新的大屏
    goToNewScreen(){
      let linkScreenCode = "report-InventoryVolume";
      this.$router.push({ path: '/myReport', query: { diyViewCode: linkScreenCode }})
      this.globalConditionUpdateFun();
    },
    init(){
      //【重要】当路由发生变化的时候，这个init再次被执行，不同的是，此时 this.data.components 是有内容的。
      // 我们需要清空它，这样子组件就会完成一次刷新，把原来的渲染的组件清空了。
      if(this.data&&this.data.components){
        this.data.components=[];
      }

      let that = this;
      /**********************************************************
       * 这里是最初获取到大屏配置的地方，有很多重要的逻辑处理
       **********************************************************/

      //获取已经存在的数据
      let code = this.$route.query.diyViewCode;
      //axios.get(baseUrl + "/koa/getReportByCode?code="+code).then(response => {
      
      function xxx(d){
        //全局条件查询
        that.showGlobalContion = d.globalCondition;
        that.globalContion = d.globalCondition;

        //刷新页面
        let refreshTime = d.refreshTime;
        if(refreshTime){
          setInterval(() => {
            that.globalConditionUpdateFun();
          }, refreshTime);
        }

        //这里有一个把大批默认值配置到 store 的工作
        if(d.globalCondition){
          for(let i=0;i<d.globalCondition.length;i++){
            //是个时间组件
            if(d.globalCondition[i].dataType===997788){
              let v = d.globalCondition[i].defaultValue;
              if(v && v[0] && v[1]){
                that.defaultGlobalContion[d.globalCondition[i].keyName[0]]=new Date(v[0]).getTime();
                that.defaultGlobalContion[d.globalCondition[i].keyName[1]]=new Date(v[1]).getTime();
              }else{
                let a = new Date(new Date().toLocaleDateString()).getTime(); //今天0点开始的时间
                let b = new Date().getTime() //当前时间
                that.defaultGlobalContion[d.globalCondition[i].keyName[0]]=a;
                that.defaultGlobalContion[d.globalCondition[i].keyName[1]]=b;
              }
            }
          }
          //把默认的全局条件查询值，存到store
          store.dispatch("setGlobalContion",that.defaultGlobalContion);
        }

        //保存到全局store
        let labelPosition = d.canvas.formFormat && d.canvas.formFormat.labelPosition;
        let colSpan = d.canvas.formFormat && d.canvas.formFormat.colSpan;
        store.dispatch("setLabelPosition", labelPosition||'top');
        store.dispatch("setColSpan", colSpan||8);
        
        //兼容koa本地虚拟的数据（对象类型）、和来自后端那边的数据
        if(typeof(d)!=='object'){
          d = eval('(' + d + ')');
        }
        
        that.data = d;
      }

      let config = JSON.parse(localStorage.getItem("screenList"))[code];
      if(config){
        let canvas = config.json.canvas
        let components = config.json.components
        xxx({
          canvas,components
        })
      }else{
        axios.get(baseUrl + path + "/api_v1/diy/view/info?diyViewCode="+code).then(response => {
          let d = response.data.data.jsonData;
          d = typeof(d)=='string'?eval('(' + d + ')'):d;
          xxx(d);
        });
      }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route": "init"
  },
  mounted(){
    this.init();
    
    bus.$on('widgetEvent', ()=> {  
      this.goToNewScreen();
    }); 
  }
}
</script>

<style scoped>
.myReportBox{
  height:100%;
}
</style>
