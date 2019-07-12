<template>
  <div class="createPage">
    <el-row :gutter="20">
      <!--即时视图-->
      <el-col :span="12">

        <div class="myReportCanvasBox">
          <div class="myReportCanvas" :style="style" ref="myReportCanvas" id="editCanvas">

            <!-- 各个组件渲染 -->
            <template v-for="(arr, key) in allwidgets">
              <template v-for="(item) in arr">
                <component
                  :key = "item.id"
                  :is = "key"
                  :myConfig= "item"
                  :canvasConfig = "canvasConfig"
                ></component>
              </template>
            </template>

          </div>
        </div>
        
        <div class="bottomBar">
          <el-button @click="openSaveWindowFun" type="primary"  size="mini" icon="el-icon-star-on" class="bottomBatBtn">保存大屏视图</el-button>
          <el-button @click="zoomInFun" type="primary"  size="mini" icon="el-icon-zoom-in" class="bottomBatBtn" circle></el-button>
          <el-button @click="zoomOutFun" type="primary"  size="mini" icon="el-icon-zoom-out" class="bottomBatBtn" circle></el-button>
          <div class="zoomBar">
            <el-slider v-model="zoom" :min="20" :max="200" :step="10" :show-tooltip="false"></el-slider>
          </div>
          <span>缩放x{{zoom/100}} </span>
        </div>
      </el-col>
      
      <!--新增编辑区-->
      <el-col :span="12">
        <editorBox ref = "editorBox"
          @getWidgetConfig = "getWidgetConfig"
          @getCanvasConfig = "getCanvasConfig"
          @deleteWidgetElementFun = "deleteWidgetElementFun"
        />
      </el-col>
    </el-row>

    <el-dialog title="保存大屏视图" :visible.sync="dialogFormVisible" width="400px">
      <el-form ref="myForm" :model="myForm" :rules="rules">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="myForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Code" prop="code" :label-width="formLabelWidth">
          <el-input v-model="myForm.code" autocomplete="off" :disabled="codeInputDisabled"></el-input>
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
import bus from "@/src/tools/bus";
import echarts from "echarts";
import store from '@/src/store';

//加载全部可用组件
import beeX from '../components/bee/beeX.vue';
import dater from '../components/bee/dater.vue';
import new_bar from '../components/bee/new_bar.vue';
import new_card from '../components/bee/new_card.vue';
import beeCard from '../components/bee/beeCard.vue';
import new_cardGroup from '../components/bee/new_cardGroup.vue';
import new_info from '../components/bee/new_info.vue';
import new_line from '../components/bee/new_line.vue';
import new_pie_1 from '../components/bee/new_pie_1.vue';
import new_pie_2 from '../components/bee/new_pie_2.vue';
import beeTable from '../components/bee/beeTable.vue';
import textBar from '../components/bee/textBar.vue';
import beeTitle from '../components/bee/beeTitle.vue';


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
    editorBox,
    
    beeX,
    dater,
    new_bar,
    new_card,
    beeCard,
    new_cardGroup,
    new_info,
    new_line,
    new_pie_1,
    new_pie_2,
    beeTable,
    textBar,
    beeTitle,
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
      zoom:100,
      rules: {
        name: [{ required: true, message: '请输入大屏名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入大屏code（任意字符串皆可，确保唯一性，以后会用此code获取大屏的内容）', trigger: 'blur' }]
      },
      codeInputDisabled:false,
      allwidgets:{},
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
    "zoom":function(){
      this.$refs.myReportCanvas.style.transform = "scale("+this.zoom/100+")"
    }
  },
  methods:{
    getWidgetConfig(wigetConfig){
      this.wigetConfig = wigetConfig;
      this.randerWidget(wigetConfig);
    },
    getCanvasConfig(canvasConfig){
      this.canvasConfig = canvasConfig;
    },
    //在画布上渲染组件
    randerWidget(wigetConfig){
      if(Object.keys(this.allwidgets).indexOf(wigetConfig.type)===-1){
        this.allwidgets[wigetConfig.type] = [];
      }
      this.allwidgets[wigetConfig.type].push(wigetConfig);
      this.$forceUpdate()
    },
    openSaveWindowFun(){
      let modCode = this.$route.query.modCode;
      if(modCode){
        this.myForm.name =JSON.parse(localStorage.getItem('screenList'))[modCode].name;
        this.myForm.code = modCode; 
        this.codeInputDisabled = true;
      }else{
        this.myForm.code = 'screen-'+bee.guidGenerator(); 
      }
      this.dialogFormVisible = true;
    },    
    saveScreenFun(){

        this.$refs["myForm"].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            let ScreenConfig = {
              json:{
                "canvas":this.$refs.editorBox.canvas,
                "components":this.$refs.editorBox.json
              },
              name:this.myForm.name,
              code:this.myForm.code,
              zoom:this.zoom
            }
            let ScreenConfigStr = ScreenConfig

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
    zoomInFun(){
      if(this.zoom<200){this.zoom = this.zoom +10}
      this.$refs.myReportCanvas.style.transform = "scale("+this.zoom/100+")"
    },
    zoomOutFun(){
      if(this.zoom>20){this.zoom = this.zoom -10}
      this.$refs.myReportCanvas.style.transform = "scale("+this.zoom/100+")"
    },
    //删除画布上的组件
    deleteWidgetElementFun(widgetId,widgetType){
      let category = this.allwidgets[widgetType];
      let newCategory = category.filter((one)=>{
        if(one.id!==widgetId){
          return one;
        }
      })
      if(newCategory.length===0){
        this.$delete(this.allwidgets,widgetType);
      }else{
        this.allwidgets[widgetType]= newCategory;
      }
      this.$forceUpdate();
    }
  },
  mounted(){
    //看看是不是编辑页面，载入缩放
    let modCode = this.$route.query.modCode;
    if(modCode){
      let list = JSON.parse(localStorage.getItem('screenList'));
      this.zoom = (list[modCode] && list[modCode].zoom) || 100;
    }


    //订阅事件：当被编辑的组件选中的时候，菜单中也跟着选中。
    bus.$on('widgetClick', (widgetId)=> {  

      let n=0;
      let holder = window.setInterval(()=>{
        n = n+1;
        //console.log('循环获取')
        let editorBoxEle = this.$refs.editorBox
        if(editorBoxEle && editorBoxEle.$refs[widgetId]){
          //选择编辑页面中的子菜单中对应的按钮，并点击
          editorBoxEle.$refs[widgetId][0].$el.click()
          clearInterval(holder)
        }else{
          if(n>100){clearInterval(holder)}
        }
      },50)



      
    }); 
  },
  destroyed(){
    //记得关闭，不关闭的话，在别的页面中也会触发这个事件。
    bus.$off('widgetClick');
    //退出编辑页面的时候，要把它清空。
    store.dispatch("setSelectWidgetId",'');
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
        .bottomBatBtn{
          background: #4a555b;
          border:none;
        }
        span{
          margin-left:10px;
        }
        .zoomBar{
          width: 100px;
          margin-left: 10px;
        }
      }
    }
  }
  .myReportCanvasBox{
    height:100%;
    overflow: auto;
    .myReportCanvas{
      // width:600px;
      // height:400px;
      // background: #142a41;
      margin:20px 0px 0px 20px;
      box-shadow: rgba(0,0,0,.5) 0 0 30px 0;
      transform-origin:0 0;
    }
  }
}

</style>
