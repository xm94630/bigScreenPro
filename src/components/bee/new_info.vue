<template>
  <div class="beeTitle" :style="myCss" :name="myConfig.id">{{showData}}</div>
</template>

<script>
import bee from '@/src/tools/bee.js';
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';
import { setTimeout } from 'timers';

export default {
  name: "new_info",
  props: {
    myConfig: null,
  },
  data() {
    return {
      apiData:[],
      showData:'',
    };
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.myConfig.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    }
  },
  methods:{
    initWidget:function(myConfig){
      let dataUrl = myConfig.dataUrl;
      let diyCoreCode = myConfig.diyCoreCode;
      this.diyCoreCode = diyCoreCode;
      let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
      //获取数据源
      axios.post(baseUrl + dataUrl,params).then(response => {
        let apiData = bee.safeData(response.data.data);
        this.apiData = apiData;

        //数据格式：[{"总数":999}]，提取数据，填充模板
        let v = apiData[0][Object.keys(apiData[0])[0]];
        this.showData = this.myConfig.template.replace(/{{(\w)*}}/g, v);
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
          let apiData = bee.safeData(response.data.data);
          this.apiData = apiData;

          //数据格式：[{"总数":999}]，提取数据，填充模板
          let v = apiData[0][Object.keys(apiData[0])[0]];
          this.showData = this.myConfig.template.replace(/{{(\w)*}}/g, v);
        });
      }

      //数据格式：[{"总数":999}]，提取数据，填充模板
      let v = this.apiData[0][Object.keys(this.apiData[0])[0]];
      this.showData = this.myConfig.template.replace(/{{(\w)*}}/g, v);
    },
  },
  watch:{
    "myConfig":{
      handler:function(newVal,oldVal){
        this.updatedWidget(newVal,oldVal);
      },
      deep: true
    },
    
  },
  mounted: function() {
    this.initWidget(this.myConfig);
  },
  updated(){
  }
};
</script>

<style lang="scss">
.beeTitle {}
</style>
