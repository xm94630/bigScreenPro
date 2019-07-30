<template>
  <!-- 拖拽组件 -->
  <vue-draggable-resizable 
    :x="Number(myConfig.css.x)" 
    :y="Number(myConfig.css.y)" 
    :w="Number(myConfig.css.width)" 
    :h="Number(myConfig.css.height)" 
    :grid="grid" 
    :parent="false"
    v-on:dragging="onDrag" 
    v-on:resizing="onResize" 
    @activated="clickFun(myConfig.id)" 
    class="widgetBox" :style="myCss" :name="myConfig.id" @click="clickFun(myConfig.id)"
  >
    <div :class="myConfig.widgetOption.cardStyle==1?'style1':'style2'">
      <template v-for="(value,key) in apiData[0]">
        <div class="oneline" :key="key">
          <div class="valueCon" :style="valueStyle">{{value}}</div>
          <div class="nameCon" :style="keyStyle">{{key}}</div>
        </div>
      </template>
    </div>
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
    </vue-draggable-resizable>
</template>

<script>
import bee from '@/src/tools/bee.js';
import bus from '@/src/tools/bus.js';
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';

export default {
  name: "beeCard",
  props: {
    myConfig: null,
    canvasConfig: Object,
  },
  data() {
    return {
      apiData:[],
      store,
      grid:(this.canvasConfig&&this.canvasConfig.grid)?[this.canvasConfig.grid,this.canvasConfig.grid]:[1,1]
    };
  },
  computed: {
    myCss() {return bee.objToCSS(bee.replaceKey(this.myConfig.css,{"x":"left","y":"top"}));},
    keyStyle() {return bee.objToCSS(bee.replaceKey(this.myConfig.widgetOption.keyCss,{"x":"left","y":"top"}));},
    valueStyle() {return bee.objToCSS(bee.replaceKey(this.myConfig.widgetOption.valueCss,{"x":"left","y":"top"}));}
  },
  methods:{
    
    onResize: function (x, y, width, height) {
      this.myConfig.css.x = this.x = x
      this.myConfig.css.y = this.y = y
      this.myConfig.css.width =this.width = width
      this.myConfig.css.height = this.height = height
    },
    onDrag: function (x, y) {
      this.myConfig.css.x = this.x = x
      this.myConfig.css.y = this.y = y   
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
    clickFun(widgetId){
      //只有在编辑页面，这个点击才有效
      if(this.$el.parentElement.id==="editCanvas"){
        store.dispatch("setSelectWidgetId",widgetId);
        bus.$emit("widgetClick",widgetId);
      }
    }
  },
  watch:{
    "myConfig":{
      handler:function(newVal,oldVal){
        this.updatedWidget(newVal,oldVal);
      },
      deep: true
    },
    "canvasConfig.grid":function(v){
      this.grid=[v,v];
    }
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

.style1{
  width: 100%;
  height:100%;
  box-sizing: border-box;
  display: flex;
  justify-content:space-around;
  text-align: center;
  .oneline{
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    .valueCon{
      font-size: 30px;
    }
    .nameCon{
       font-size: 12px;
    }
  }
}

.style2{
  width: 100%;
  height:100%;
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
      width:60%;
      font-size: 30px;
    }
    .nameCon{
      width:40%;
      font-size: 12px;
    }
  }
}

</style>
