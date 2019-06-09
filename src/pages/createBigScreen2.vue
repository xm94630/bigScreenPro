<template>
  <div class="createPage">
    <el-row :gutter="20">
      <!--即时视图-->
      <el-col :span="12">
        即时视图
        <div class="myReportCanvas"></div>
      </el-col>
      
      <!--新增编辑区-->
      <el-col :span="12">
        <editorBox @getWidgetConfig="getWidgetConfig"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import editorBox from "../components/editorBox"
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';

function mountCmp(cmp, props, parent) {
  if (cmp.default) {
    cmp = cmp.default;
  }
  cmp = Vue.extend(cmp);
  let node = document.createElement("div");
  parent.appendChild(node);
  new cmp({
    // eslint-disable-line
    el: node,
    propsData: props,
    parent: this
  });
}

export default {
  name: 'xm',
  components: {
    editorBox
  },
  props: {
  },
  data(){
    return{
    }
  },
  methods:{
    getWidgetConfig(wigetConfig){
      this.randerWidget(wigetConfig);
    },
    randerWidget(wigetConfig){
      console.log(wigetConfig)
      let data = wigetConfig

      //组件基本样式数据
      let propsConfig = {
        myConfig: data
      };
      let dataUrl = data.dataUrl;
      let diyCoreCode = data.diyCoreCode;

      //把参数都带上（包括store中的全局搜索条件）
      let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);

      //获取数据源
      axios.post(baseUrl + dataUrl,params).then(response => {

        //propsConfig.myConfig.xAxis = response.data.data.xAxis;
        //propsConfig.myConfig.series = response.data.data.series;
        //propsConfig.myConfig.legend = response.data.data.legend;
        propsConfig.myConfig.apiData = response.data.data;
        
        //构建组件
        import("../components/bee/new_bar.vue").then(cmp => {
          mountCmp(
            cmp,
            propsConfig,
            document.querySelector(".myReportCanvas")
          );
        });
      });

    }
  },
  mounted(){

  }
}
</script>

<style lang="scss">
.createPage{
  height: 100%;
  background:#2b2e33;
  color:#afbcc6;
  .el-row{
    height:100%;
    .el-col{
      height:100%;
    }
  }
  .myReportCanvas{
    width:500px;
    height:500px;
    background: #999;
  }
}

</style>
