<template>
  <div class="cardBox" :style="myCss" :name="myConfig.id">
    卡片组合
    <div class="xxx">
      <div class="yyy">
        <newCard :myConfig="newCardConfig"/>
      </div>
    </div>
  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';
import newCard from './new_card'

export default {
  name: "new_cardGroup",
  components:{
    newCard,
  },
  props: {
    myConfig: null
  },
  data: function() {
    return {
      newCardConfig:{
        "id": 22,
        "type":"new_card",
        "css":{
          "x": 20,
          "y": 20,
          "width": "90%",
          "height": 100,
          "z-index": 9,
          "border": "",
          "padding":10,
          "background":"#142a41",
          "color":"#f8f594"
        },
        "title":"A类/鞋",
        "state":0,
        "dataUrl": "/epimetheus/api/diy/report/selectData",
        "diyCoreCode":"lifeng-BinUseA"
      }
    };
  },
  computed:{
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.myConfig.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
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
  }
};
</script>

<style lang="scss">
.xxx{
  
  .yyy{
    
  }
}
</style>