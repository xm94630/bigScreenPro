<template>
  <div class="cardBox" v-bind:class="classObject" :style="myCss" :name="myConfig.id">
    <div class="cardBoxT">{{myConfig.title}}</div>
    <div class="dataBox">
      <template v-for="(one,key) in data">
        <div :key="key">
          <div class="top">{{one}}</div>
          <div class="bottom">{{key}}</div>
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
  name: "new_card",
  props: {
    myConfig: null
  },
  data: function() {
    return {
      cardData: this.myConfig,
      apiData:[],
    };
  },
  computed:{
    data(){
      return this.orderFun(this.apiData)[0]
    },
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.myConfig.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    },
    classObject:function(){
      return {
        green: this.myConfig.state == 1 ? true : false,
        orange: this.myConfig.state == 2 ? true : false,
        red: this.myConfig.state == 3 ? true : false
      }
    }
  },
  methods:{
    //对数据进行排序，排序的顺序可以在json中配置。
    //这个方法还不是很完美，先这样子实现。
    orderFun(data){
      let keyOrder = this.myConfig.keyOrder?this.myConfig.keyOrder.split('|'):false;
      let orderData = {};
      if(keyOrder&&data[0]){
        keyOrder.forEach(function(key){
          if(key!==''){
            orderData[key] = data[0][key]?data[0][key]:'-'
          }
        })
        return [orderData];
      }else{
        return data;
      }
    },
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
//卡片的全部样式
.cardBox {
  position:absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  box-sizing: border-box;
  padding: 5px;
  //background: #fff;
  border-radius: 5px;
  border: solid 1px #c0c0c0;
  overflow: hidden;
  .cardBoxT {
    height: 30%;
    font-size: 16px;
    font-weight: normal;
    text-align: left;
    margin-left: 18px;
  }


  .dataBox{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .top{
      font-size: 20px;
    }
    .bottom{
      font-size: 12px;
    }
  }

}


.cardBox.green {
  border: solid 1px #1a9d14;
  .cardBoxT {
    color: #1a9d14;
  }
}
.cardBox.orange {
  border: solid 1px #ff7200;
  .cardBoxT {
    color: #ff7200;
  }
}
.cardBox.red {
  border: solid 1px #e42525;
  .cardBoxT {
    color: #e42525;
  }
}

</style>