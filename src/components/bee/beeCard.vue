<template>
  <div class="widgetBox" :style="myCss" :name="myConfig.id">{{apiData}}</div>
</template>

<script>
import bee from '@/src/tools/bee.js';
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';

export default {
  name: "beeCard",
  props: {
    myConfig: null,
  },
  data() {
    return {
      apiData:[],
    };
  },
  computed: {
    myCss() {
      return bee.objToCSS(bee.replaceKey(this.myConfig.css,{"x":"left","y":"top"}));
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

<style scoped lang="scss">
.widgetBox {
  position:absolute;
  box-sizing:border-box;
}
</style>
