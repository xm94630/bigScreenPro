<template>
  <div class="createPage">
    <el-row :gutter="20">
      <!--即时视图-->
      <el-col :span="12">
        <div class="myReportCanvas"></div>
        <div class="bottomBar">
          <el-button @click="saveScreenFun" type="primary"  size="mini" icon="el-icon-star-on" class="saveBtn">保存大屏视图 </el-button>
        </div>
      </el-col>
      
      <!--新增编辑区-->
      <el-col :span="12">
        <editorBox ref="editorBox" @getWidgetConfig="getWidgetConfig"/>
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
    },
    saveScreenFun(){
      console.log("获取子组件中配置完毕的json数据：")
      console.log(JSON.stringify(this.$refs.editorBox.json))
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
      position: relative;
      .bottomBar{
        width:100%;
        box-sizing: border-box;
        padding:0 10px;
        height:40px;
        border-top:solid 1px #292a2c;
        background: #1d2125;
        position: absolute;
        bottom:0px;
        display: flex;
        align-items:center;
        .saveBtn{
          background: #4a555b;
          border:none;
        }
      }
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
