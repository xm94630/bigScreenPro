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
    <div style="height:100%;display:flex;flex-direction: column;justify-content:space-around;">
      <div class="style1">
        <template v-for="(value,key) in apiData[0]">
          <div class="oneline" :key="key">
            <div class="nameCon" :style="keyStyle">{{key}}</div>
            <div class="valueCon" :style="valueStyle">{{value}}</div>
          </div>
        </template>
      </div>
      <div class="titleCon" :style="titleStyle">{{myConfig.title}}</div>
    </div>

    <div :style="arrawStyle"></div>

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
    valueStyle() {return bee.objToCSS(bee.replaceKey(this.myConfig.widgetOption.valueCss,{"x":"left","y":"top"}));},
    titleStyle() {return bee.objToCSS(bee.replaceKey(this.myConfig.widgetOption.titleCss,{"x":"left","y":"top"}));},
    arrawStyle() {return bee.objToCSS(bee.replaceKey(this.myConfig.widgetOption.arrawCss,{"x":"left","y":"top"}));},
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

.titleCon{
  font-size: 12px;
  padding: 0 4px 4px 0;
  box-sizing: border-box;
}

</style>
