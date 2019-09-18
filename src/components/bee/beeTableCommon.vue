<template>
  <!-- 拖拽组件 -->
  <vue-draggable-resizable 
    :x="Number(myConfig.css.x)" :y="Number(myConfig.css.y)" :w="Number(myConfig.css.width)" :h="Number(myConfig.css.height)" 
    :grid="grid" :parent="false"
    v-on:dragging="onDrag" v-on:resizing="onResize" @activated="clickFun(myConfig.id)" 
    class="widgetBox" :style="myCss" :name="myConfig.id" @click="clickFun(myConfig.id)"
  >
    <!-- 组件内容区 -->
    <div class="widgetCon">
      <el-table
        border
        :data="apiData"
        class="tableClass"
        style="background:rgba(255,0,0,0);"
        :height="myConfig.css.height"
      >
        <template v-for="(value,key) in options">
          <el-table-column
            :key = "key"
            :prop = "value"
            :label="key"
          >
            <!-- 自定义模板 -->
            <template slot-scope="scope">
              <template v-if="scope.row[key]<65">
                <span class="red">{{ scope.row[key] }}</span>
              </template>
              <template v-else-if="scope.row[key]<=100 && scope.row[key]>=65">
                <span class="yellow">{{ scope.row[key] }}</span>
              </template>
              <template v-else-if="scope.row[key]>100">
                <span class="green">{{ scope.row[key] }}</span>
              </template>
              <template v-else>
                <span class="">{{ scope.row[key] }}</span>
              </template>
              
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <!-- 选中框 -->
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
  </vue-draggable-resizable>
</template>

<script>
import bee from '@/src/tools/bee.js';
import axios from "axios";
import {baseUrl} from '@/bee.config';
import bus from '@/src/tools/bus.js';
import store from '@/src/store';

export default {
  name: "beeTableCommon",
  props: {
    myConfig: null,
  },
  data() {
    return {
      options:{},
      apiData:[],
      store,

      //用于控制拖拽组件的初始定位
      x: this.myConfig.css.x,
      y: this.myConfig.css.y,
      width: this.myConfig.css.width,
      height: this.myConfig.css.height,
      //初始的栅格
      grid:(this.canvasConfig&&this.canvasConfig.grid)?[this.canvasConfig.grid,this.canvasConfig.grid]:[1,1]
    };
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      return bee.objToCSS(bee.replaceKey(this.myConfig.css,map));
    }
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
    clickFun(widgetId){
      //只有在编辑页面，这个点击才有效
      if(this.$el.parentElement.id==="editCanvas"){
        store.dispatch("setSelectWidgetId",widgetId);
        bus.$emit("widgetClick",widgetId);
      }
    },

    initWidget:function(myConfig){
      try{
        this.options = JSON.parse(myConfig.options);
      }catch(e){
        alert('[beeTableCommon组件]options配置格式有误')
      }
    
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
      try{
        this.options = JSON.parse(val.options);
      }catch(e){
        alert('[beeTableCommon组件]:options配置格式有误')
      }

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
.widgetBox {
  position: absolute;
  box-sizing: border-box;
  .widgetCon {
    width: 100%;
    height: 100%;
  }
}

.tableClass{
  width: 100%;
  &.el-table th{
    background:rgba(255, 0, 0, 0); 
    color: #fff;
    padding:0px;
  }
  &.el-table tr {
    background:rgba(255, 0, 0, 0); 
    color: #fff;
  }
  &.el-table td {
    background:rgba(255, 0, 0, 0); 
    color: #fff;
    padding:0px;
  }
}
//table hover样式
.tableClass.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #142a41 !important;
}

.tableClass.el-table td .red {
  color: red;
  font-weight: bold;
}
.tableClass.el-table td .yellow {
  color: yellow;
  font-weight: bold;
}
.tableClass.el-table td .green {
  color: #4caf50;
  font-weight: bold;
}
</style>
