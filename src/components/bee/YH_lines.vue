<template>
  <!-- 外容器 -->
  <div class="widgetBox" :style="myCss" :name="myConfig.id" ref="cardGroupBox" @click="clickFun(myConfig.id)">
   
    <!-- 内容区 -->
    <div class="conBox">
      <template v-for="(one,index) in apiData">
        <div class="oneLine" :key="index">
          <div class="lineName">线路{{101-one['线路']}}</div>
          <div class="lineCon">
            <div class="lineConT">
              <div>
                <div>{{one["进度 (SKU)"]}}</div>
                <div>进度 (SKU)</div>
              </div>
              <div>
                <div>{{one["E数 (已完成 / 总数)"]}}</div>
                <div>E数 (已完成 / 总数)</div>
              </div>
              <div>
                <div>{{one["SKU (已完成 / 总数)"]}}</div>
                <div>SKU (已完成 / 总数)</div>
              </div>
              <div>
                <div>{{one["门店数 (已完成 / 总数)"]}}</div>
                <div>门店数 (已完成 / 总数)</div>
              </div>
            </div>
            <div class="lineConB">
              <template v-for="(shop,index) in one.shops">
                <div :key="index" class="shopBtn" :class="shop.type">{{shop.name}}</div>
              </template>
            </div>
          </div>
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
    parseData(data){
      let arr = data.slice(0,3);
      for(let i=0;i<arr.length;i=i+1){
        let shopArr = arr[i]['门店列表'].split(',');
        arr[i].shops = [];
        for(let j=0;j<shopArr.length;j++){
          if(j<16){
            arr[i].shops.push({
              name : shopArr[j].substr(0,shopArr[j].length-1),
              type : shopArr[j].substr(-1),
            });
          }
        }
      }
      return arr;
    },
    initWidget:function(myConfig){
      this.diyCoreCode = myConfig.diyCoreCode;
      let params = Object.assign({},{diyCoreCode:myConfig.diyCoreCode},store.state.store_globalContion);
      //获取数据源
      axios.post(baseUrl + myConfig.dataUrl,params).then(response => {
        let apiData = response.data.data;
        // 假数据
        // apiData =  [{
        //   "门店列表": "北京上海店A,jjB,uuC,ttC,rrC,eeC,kkC,hhA,jjB,uuC,ttC,rrC,eeC,kkC,hhA,jjB,uuC,ttC,rrC,eeC,kkC",
        //   "进度 (SKU)": "1.00",
        //   "E数 (已完成 / 总数)": "272707 / 286055",
        //   "线路": 0,
        //   "SKU (已完成 / 总数)": "3013 / 3013",
        //   "门店数 (已完成 / 总数)": "7 / 7"
        // },{
        //   "门店列表": "hhA,jjB,uuC,ttC,rrC,eeC,kkC,hhA,jjB,uuC,ttC,rrC,eeC,kkC,hhA,jjB,uuC,ttC,rrC,eeC,kkC",
        //   "进度 (SKU)": "1.00",
        //   "E数 (已完成 / 总数)": "272707 / 286055",
        //   "线路": 0,
        //   "SKU (已完成 / 总数)": "3013 / 3013",
        //   "门店数 (已完成 / 总数)": "7 / 7"
        // },{
        //   "门店列表": "hhA,jjB,uuC,ttC,rrC,eeC,kkC,hhA,jjB,uuC,ttC,rrC,eeC,kkC,hhA,jjB,uuC,ttC,rrC,eeC,kkC",
        //   "进度 (SKU)": "1.00",
        //   "E数 (已完成 / 总数)": "272707 / 286055",
        //   "线路": 0,
        //   "SKU (已完成 / 总数)": "3013 / 3013",
        //   "门店数 (已完成 / 总数)": "7 / 7"
        // },{
        //   "门店列表": "hhA,jjB,uuC,ttC,rrC,eeC,kkC,hhA,jjB,uuC,ttC,rrC,eeC,kkC,hhA,jjB,uuC,ttC,rrC,eeC,kkC",
        //   "进度 (SKU)": "1.00",
        //   "E数 (已完成 / 总数)": "272707 / 286055",
        //   "线路": 0,
        //   "SKU (已完成 / 总数)": "3013 / 3013",
        //   "门店数 (已完成 / 总数)": "7 / 7"
        // }]
        this.apiData = this.parseData(apiData);
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
          this.apiData = this.parseData(apiData);
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
  overflow: hidden;
  .conBox{
    width:100%;
    position: absolute;
    .oneLine{
      border:solid 1px #1f3e7b;
      width:100%;
      height:150px;
      margin-bottom: 10px;
      color:#3c8bd0;
      display: flex;
      flex-direction: row;
      justify-content:space-around;
      .lineName{
        color:#e28b36;
        width:24px;
        padding:20px;
        text-align: center;
        height:100%;
      }
      .lineCon{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width:90%;
        text-align: center;
        .lineConT{
          display:flex;
          justify-content:space-around;
          div{
            padding:2px;
          }
        }
        .lineConB{
          text-align: left;
          .shopBtn{
            font-size: 12px;
            display: inline-block;
            width:50px;
            height: 20px;
            line-height: 20px;
            margin-right:10px;
            margin-bottom:10px;
            overflow: hidden;
            border-radius: 5px;
            text-align: center;
          }
          .C{
            color:r#4fcf97;
            border:solid 1px #4fcf97;
          }
          .B{
            color:#e7b970;
            border:solid 1px #e7b970;
          }
          .A{
            color:#3c8bd0;
            border:solid 1px #3c8bd0;
          }
        }
      }
    }
  }
}
</style>