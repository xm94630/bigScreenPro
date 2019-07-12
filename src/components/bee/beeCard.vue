<template>
  <div class="widgetBox" :style="myCss" :name="myConfig.id">

    <div class="beeCardBox">
      <template v-for="(value,key) in apiData[0]">
        <div class="oneline" :key="key">
          <div class="valueCon">{{value}}</div>
          <div class="nameCon">{{key}}</div>
        </div>
      </template>
    </div>

  </div>
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
// .beeCardBox{
//   width: 100%;
//   height:100%;
//   padding:10px;
//   box-sizing: border-box;
//   display: flex;
//   justify-content:space-around;
//   text-align: center;
//   .oneline{
//     height:100%;
//     display: flex;
//     flex-direction: column;
//     justify-content:space-around;
//     .valueCon{
//       font-size: 30px;
//     }
//     .nameCon{
//        font-size: 12px;
//     }
//   }
// }

.beeCardBox{
  width: 100%;
  height:100%;
  padding:10px;
  box-sizing: border-box;
  display: flex;
  justify-content:space-around;
  text-align: center;
  flex-direction: column;
  .oneline{
    height:100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content:space-around;
    align-items:center;
    .valueCon{
      width:50%;
      font-size: 30px;
    }
    .nameCon{
      width:50%;
      font-size: 12px;
    }
  }
}

</style>
