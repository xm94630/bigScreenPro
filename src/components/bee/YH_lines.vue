<template>
  <!-- 外容器 -->
  <div class="widgetBox" :style="myCss" :name="myConfig.id" ref="cardGroupBox" @click="clickFun(myConfig.id)">
   
    <!-- 内容区 -->
    <div class="conBox" ref="conBox">
      <template v-for="(one,index) in apiData">
        <div class="card" :key="index" >
          <template v-for="(value,key) in one">
            <div class="con" :key="key">
              <div class="flexBox" :key="key">
                <div class="top">{{value}}</div>
                <div class="bottom">{{key}}</div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>

    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';
import bus from '@/src/tools/bus.js';
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';

export default {
  name: "YH_lines",
  components:{
  },
  props: {
    myConfig: null
  },
  data: function() {
    return {
      diyCoreCode:'',
      apiData:[],
      store,
    };
  },
  computed:{
    myCss() {
      let cssStr = bee.objToCSS(bee.replaceKey(this.myConfig.css,{"x":"left","y":"top"}))
      return cssStr;
    }
  },
  methods:{
    initWidget:function(myConfig){
      this.diyCoreCode = myConfig.diyCoreCode;
      let params = Object.assign({},{diyCoreCode:myConfig.diyCoreCode},store.state.store_globalContion);
      //获取数据源
      axios.post(baseUrl + myConfig.dataUrl,params).then(response => {
        let apiData = response.data.data;
        this.apiData = apiData;
      });
    },
    updatedWidget:function(val){
      let diyCoreCode = val.diyCoreCode;
      //只有diyCoreCode发生改变的时候才调接口！
      if(this.diyCoreCode!==diyCoreCode){
        let dataUrl = val.dataUrl;
        this.diyCoreCode=diyCoreCode;
        let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
        //获取数据源
        axios.post(baseUrl + dataUrl,params).then(response => {
          let apiData = response.data.data;
          this.apiData = apiData;
        });
      }
    },
    clickFun(widgetId){
      store.dispatch("setSelectWidgetId",widgetId);
      bus.$emit("widgetClick",widgetId);
    }
  },
  watch:{
    "myConfig":{
      handler:function(newVal,oldVal){
        this.updatedWidget(newVal,oldVal)
      },
      deep: true
    },
  },
  mounted: function() {
    this.initWidget(this.myConfig);
  },
  updated(){
  },
  destroyed(){
  }
    
};
</script>

<style scoded lang="scss">
.widgetBox{
  position:absolute;
  box-sizing:border-box;
  .conBox{
    width:100%;
    position: absolute;
    .card{
      box-sizing: border-box;
      width:calc(33.33% - 20px);
      height:70px;
      background:#16244a;
      color:#3c8bd0;
      border:solid 1px #1f3e7b;
      border-radius: 5px;
      display: inline-block;
      margin:10px;
      overflow: hidden;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      .con{
        box-sizing: border-box;
        display: inline-block;
        height: 100%;
        width: 25%;
        .flexBox{
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>