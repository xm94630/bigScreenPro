<template>
  <!-- 外容器 -->
  <div class="cardGroupBox" :style="myCss" :name="myConfig.id" ref="cardGroupBox" @click="clickFun(myConfig.id)">
   
    <!-- 内容区 -->
    <div class="conBox" ref="conBox">
      <template v-for="(one,index) in apiData">
        <div class="card" :key="index" >
          <template v-for="(value,key,myIndex) in one">
            <div class="con" :class="getClass('childBox',myIndex)" :key="key">
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
      inLifeCirle:true,
      store,
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
    parseData(data){
      return bee.arraySortByGivenKeys(data,["门店名","门店代码","周转箱数","进度"],'-');
    },
    initWidget:function(myConfig,cb){
      this.diyCoreCode = myConfig.diyCoreCode;
      let params = Object.assign({},{diyCoreCode:myConfig.diyCoreCode},store.state.store_globalContion);
      //获取数据源
      axios.post(baseUrl + myConfig.dataUrl,params).then(response => {
        let apiData = response.data.data;
        this.apiData = this.parseData(apiData);
        cb();
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
    //从底部开始滚到结束看不到
    // scrollFun(cb){
    //   let that = this;
    //   let containerHeight = this.$refs.cardGroupBox.clientHeight;
    //   let element = this.$refs.conBox;
    //   let start = null;
    //   element.style.top = this.myConfig.css.height+'px'
    //   this.$nextTick( () =>{
    //     let contentHeight = element.clientHeight;
    //     function step(timestamp) {
    //       //只在生命周期中执行，这样改组件销毁之后，事件就不会再触发。
    //       if(that.inLifeCirle){
    //         if (!start) start = timestamp;
    //         var s = (timestamp - start) / 20;
    //         element.style.transform = 'translateY(' +  (-s) + 'px)';
    //         if (s < contentHeight+containerHeight ) {
    //           window.requestAnimationFrame(step);
    //         }else{
    //           cb();
    //         }
    //       }
    //     }
    //     window.requestAnimationFrame(step);
    //   })

    //从全部展示滚到看不到
    scrollFun(cb){
      let that = this;
      let element = this.$refs.conBox;
      let start = null;
      element.style.top = '0px'
      this.$nextTick( () =>{
        let contentHeight = element.clientHeight;
        function step(timestamp) {
          //只在生命周期中执行，这样改组件销毁之后，事件就不会再触发。
          if(that.inLifeCirle){
            if (!start) start = timestamp;
            var s = (timestamp - start) / 20;
            element.style.transform = 'translateY(' +  (-s) + 'px)';
            if (s < contentHeight + 350 ) { //这里的100 是继续向上偏移100，形成一定的停顿，这里差不多有5秒
              window.requestAnimationFrame(step);
            }else{
              cb();
            }
          }
        }
        window.requestAnimationFrame(step);
      })
    },
    clickFun(widgetId){
      store.dispatch("setSelectWidgetId",widgetId);
      bus.$emit("widgetClick",widgetId);
    },
    getClass(className,index){
      return className+index;
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
    //this.pageCode = bee.getUrlParam('diyViewCode');
    this.initWidget(this.myConfig,()=>{
      let t = 10000; //延时效果
      window.setTimeout(()=>{
        //滚动效果
        this.scrollFun(()=>{
          console.log('滚动完毕');
          //滚动完成传递事件
          //bus.$emit("widgetEvent",this.$options.name,this.pageCode);
          bus.$emit("widgetEvent",this.$options.name);
        });
      },t)

    });
  },
  updated(){
  },
  destroyed(){
    this.inLifeCirle=false;
    console.log('card_group 销毁啦');
  }
    
};
</script>

<style lang="scss">
.cardGroupBox{
  overflow: auto;
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
        .flexBox{
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .con.childBox0{
        width: 40%;
      }
      .con.childBox1{
        width: 20%;
      }
      .con.childBox2{
        width: 20%;
      }
      .con.childBox3{
        width: 20%;
      }
    }
  }
}
</style>