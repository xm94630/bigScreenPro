<template>
  <div class="createPage">
    <el-row :gutter="20">
      <!--即时视图-->
      <el-col :span="12">
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
      wigetConfig:null,
    }
  },
  watch:{
    "wigetConfig.diyCoreCode":{
      handler: function (newCode) {
        //更新数据
        // let dataUrl = this.wigetConfig.dataUrl;
        // let params = Object.assign({},{diyCoreCode:newCode},store.state.store_globalContion);
        // axios.post(baseUrl + dataUrl,params).then(response => {
        //   this.wigetConfig.apiData = JSON.stringify(response.data.data);
        // });
      },
      deep: true
    }
  },
  methods:{
    getWidgetConfig(wigetConfig){
      this.wigetConfig = wigetConfig;
      this.randerWidget(wigetConfig);
    },
    randerWidget(wigetConfig){
      //构建组件
      import("../components/bee/new_bar.vue").then(cmp => {
        mountCmp(
          cmp,
          {myConfig: wigetConfig},
          document.querySelector(".myReportCanvas")
        );
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
  background: url("../assets/bgImg.png") repeat;
  user-select: none;
  .el-row{
    height:100%;
    .el-col{
      height:100%;
    }
  }
  .myReportCanvas{
    width:600px;
    height:400px;
    background: #142a41;
    margin:20px 0 0 20px;
    box-shadow: rgba(0,0,0,.5) 0 0 30px 0;
  }
}

</style>
