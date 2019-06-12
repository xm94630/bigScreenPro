<template>
  <div class="createPage">
    <el-row :gutter="20">
      <!--即时视图-->
      <el-col :span="12">

        <div class="myReportCanvas" :style="style"></div>
        
        <div class="bottomBar">
          <el-button @click="openSaveWindowFun" type="primary"  size="mini" icon="el-icon-star-on" class="saveBtn">
            保存大屏视图
          </el-button>
        </div>
      </el-col>
      
      <!--新增编辑区-->
      <el-col :span="12">
        <editorBox ref = "editorBox"
          @getWidgetConfig = "getWidgetConfig"
          @getCanvasConfig = "getCanvasConfig"
        />
      </el-col>
    </el-row>

    <el-dialog title="保存大屏视图" :visible.sync="dialogFormVisible" width="400px">
      <el-form ref="myForm" :model="myForm" :rules="rules">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="myForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Code" prop="code" :label-width="formLabelWidth">
          <el-input v-model="myForm.code" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveScreenFun">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import Vue from "vue";
import editorBox from "../components/editorBox"
import bee from "@/src/tools/bee";


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
      canvasConfig:{},
      dialogFormVisible: false,
      myForm: {
        name: '',
        code: '',
      },
      formLabelWidth:'80px',
      rules: {
        name: [{ required: true, message: '请输入大屏名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入大屏code（任意字符串皆可，确保唯一性，以后会用此code获取大屏的内容）', trigger: 'blur' }]
      }
    }
  },
  computed:{
    "style":function(){
      let str ="width:"+this.canvasConfig.width+"px;"
      str+="height:"+this.canvasConfig.height+"px;"
      str+="background:"+this.canvasConfig.background+";"
      return str;
    }
  },
  watch:{
  },
  methods:{
    getWidgetConfig(wigetConfig){
      this.wigetConfig = wigetConfig;
      this.randerWidget(wigetConfig);
    },
    getCanvasConfig(canvasConfig){
      this.canvasConfig = canvasConfig;
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
    openSaveWindowFun(){
      this.myForm.code = 'screen-'+bee.guidGenerator(); 
      this.dialogFormVisible = true;
    },    
    saveScreenFun(){

        this.$refs["myForm"].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            let ScreenConfig = {
              json:{
                "canvas":JSON.stringify(this.$refs.editorBox.canvas),
                "components":JSON.stringify(this.$refs.editorBox.json)
              },
              name:this.myForm.name,
              code:this.myForm.code,
            }
            let ScreenConfigStr = JSON.stringify(ScreenConfig)

            //保存到本地储存（未来改成接口）
            if(localStorage.getItem("screenList")){
              let screenList = JSON.parse(localStorage.getItem('screenList'))
              screenList[this.myForm.code] = ScreenConfigStr
              localStorage.setItem("screenList",JSON.stringify(screenList))
            }else{
              let screenList = {}
              screenList[this.myForm.code] = ScreenConfigStr
              localStorage.setItem("screenList",JSON.stringify(screenList));
            }




          } else {
            return false;
          }
        });

    },
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
    // width:600px;
    // height:400px;
    // background: #142a41;
    margin:20px 0 0 20px;
    box-shadow: rgba(0,0,0,.5) 0 0 30px 0;
  }
}

</style>
