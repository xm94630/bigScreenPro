<template>
  <div class="cardGroupBox" :style="myCss" :name="myConfig.id">

    <template v-for="(one,index) in apiData">

        <div class="cardBox" :key="index">
            <template v-for="(value,key) in one">
              <div class="one" :key="key">
                <div class="flexBox">
                  <div class="top">{{value}}</div>
                  <div class="bottom">{{key}}</div>
                </div>
              </div>
            </template>
        </div>

    </template>
  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';

export default {
  name: "new_cardGroup",
  components:{
  },
  props: {
    myConfig: null
  },
  data: function() {
    return {
      diyCoreCode:'',
      apiData:[],
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
.cardGroupBox{
  overflow: auto;
  .cardBox{
    box-sizing: border-box;
    width:calc(33.33% - 20px);
    height:70px;
    background:#1b2140;
    color:#ee7b11;
    border:solid 1px #299ecb;
    border-radius: 5px;
    display: inline-block;
    margin:10px;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    .one{
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
</style>