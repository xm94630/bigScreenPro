<template>
  <div class="myReportBox">

    <!-- 大屏全局的条件查询 -->
    <reportContion 
      v-if = "showGlobalContion" 
      :globalContion = "globalContion"
      @globalConditionUpdate = "refreshFun"
    />

    <!-- 整个画面显示 -->
    <reportShow :reportConfig='data' v-if="hackReset"/>
    
  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';
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
      setTimeoutHolder:null,    //定时跳屏的句柄
      setIntervalHolder:null,   //定时刷新本页面的句柄
    }
  },
  methods:{

    //刷新操作
    refreshFun(){
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true
      })
    },

    //定时刷新本页面
    timingRefresh(d){
      let refreshTime = d.refreshTime;
      if(refreshTime>=3000){
        this.setIntervalHolder = setInterval(() => {
          this.refreshFun();
        }, refreshTime);
      }
    },

    //跳转到新的大屏
    goToNewScreen(info){
      console.log(info)
      //销毁跳转用的定时器
      clearTimeout(this.setTimeoutHolder);
      //清除定时刷新的定时器
      clearInterval(this.setIntervalHolder);
      this.$router.push({ path: '/myReport', query: { diyViewCode: this.data.linkScreen.linkScreenCode }})
    },

    //通过定时器触发跳屏
    timingJump(){
      let time = this.data.linkScreen && this.data.linkScreen.waitTime || 0;
      //只有时间间隔超过3秒才有效。
      if(time>=3000){
        this.setTimeoutHolder = window.setTimeout(()=>{
          this.goToNewScreen("定时器触发");
        },time);
      }
    },

    //对数据进行处理
    dealWithData(d){
      //全局条件查询
      this.showGlobalContion = d.globalCondition;
      this.globalContion = d.globalCondition;

      //这里有一个把大批默认值配置到 store 的工作
      if(d.globalCondition){
        for(let i=0;i<d.globalCondition.length;i++){
          //是个时间组件
          if(d.globalCondition[i].dataType===997788){
            let v = d.globalCondition[i].defaultValue;
            if(v && v[0] && v[1]){
              this.defaultGlobalContion[d.globalCondition[i].keyName[0]]=new Date(v[0]).getTime();
              this.defaultGlobalContion[d.globalCondition[i].keyName[1]]=new Date(v[1]).getTime();
            }else{
              let a = new Date(new Date().toLocaleDateString()).getTime(); //今天0点开始的时间
              let b = new Date().getTime() //当前时间
              this.defaultGlobalContion[d.globalCondition[i].keyName[0]]=a;
              this.defaultGlobalContion[d.globalCondition[i].keyName[1]]=b;
            }
          }
        }
        //把默认的全局条件查询值，存到store
        store.dispatch("setGlobalContion",this.defaultGlobalContion);
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
      
      this.data = d;
    },

    getDataAndRender(){

      //【重要】
      // 当路由发生变化的时候，这个"getDataAndRender"再次被执行，不同的是，此时 this.data.components 是有内容的。
      // 我们需要清空它，这样子组件就会完成一次刷新，把原来的渲染的组件清空了。
      if(this.data&&this.data.components){
        this.data.components=[];
        this.refreshFun();
      }

      //获取数据
      let code = this.$route.query.diyViewCode;      
      let config = JSON.parse(localStorage.getItem("screenList"))[code];
      if(config){
        let canvas = config.json.canvas
        let components = config.json.components
        let d = {canvas,components}
        this.dealWithData(d)
        this.timingJump();
        this.timingRefresh(d);
      }else{
        axios.get(baseUrl + path + "/api_v1/diy/view/info?diyViewCode="+code).then(response => {
          let d = response.data.data.jsonData;
          d = typeof(d)=='string'?eval('(' + d + ')'):d;
          this.dealWithData(d);
          this.timingJump();
          this.timingRefresh(d);
        });
      }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route": "getDataAndRender"
  },
  mounted(){
    this.getDataAndRender();

    //订阅事件，触发跳屏
    bus.$on('widgetEvent', (widgetName)=> {  
      //事件来自指定的组件
      if(this.data.linkScreen.eventWidgetName === widgetName){
        this.goToNewScreen("bus触发");
      }
    }); 

  },
  destroyed(){
    //销毁页面中的定时器、事件侦听等
    clearTimeout(this.setTimeoutHolder);
    clearInterval(this.setIntervalHolder);
    bus.$off('widgetEvent');
  }
  
  
}
</script>

<style scoped>
.myReportBox{
  height:100%;
}
</style>
