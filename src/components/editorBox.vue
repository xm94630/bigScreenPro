
<template>
  <div class="editorBox">
    <div class="toolBar">
      点击添加组件：

      <template v-for="(one,key) in widgetBtn">
        <el-button :key="key" size="mini" type="primary" round @click="createWidgetFun(key)">{{one.alias}}</el-button>
      </template>

    </div>
    <el-row :gutter="0">
      <!--左侧-->
      <el-col :span="8">

        <div class="leftBox">
          
          <!--画布按钮-->
          <div class="canvasBtn" @click="selectCanvas">画布</div>

          <!--组件菜单列表-->
          <el-menu
            background-color="#333"
            text-color="#999"
            active-text-color="#409EFF"
            :default-openeds ="defaultOpeneds"
            class="el-menu-vertical-demo"
            @select="selectFun"
          >
            <template v-for="(widgets,key) in json">

              <el-submenu :index="key" :key="key">
                <template slot="title">{{key}}</template>

                <template v-for="(myWidget) in widgets">
                  <el-menu-item :key="myWidget.id" :index="myWidget.id" @click="selectWidget(myWidget)" :ref="myWidget.id">
                    id_{{myWidget.id}}
                    <!-- 组件操作按钮 -->
                    <span class="widgetOperateBtn">
                      <span 
                        v-if="widget.id===myWidget.id"
                        @click="cloneWidgetFun(myWidget.id,myWidget.type,myWidget)">
                        <i class="el-icon-star-on"></i>
                      </span>
                      <span 
                        v-if="widget.id===myWidget.id"
                        @click="deleteWidgetFun(myWidget.id,myWidget.type,myWidget)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </el-menu-item>
                </template>
              </el-submenu>
            
            </template>
          </el-menu>

          <!-- 自己写的，不用el-submenu -->
          <!-- <template v-for="(widgets,key) in json">
            <div :key="key">
              <div class="typeName">{{key}}</div>
              <template v-for="(widget) in widgets">
                <div :key="widget.id" >
                  <div @click="selectWidget(widget)">id_{{widget.id}}</div>
                </div>
              </template>
            </div>
          </template> -->
          
        </div>
      </el-col>
      
      <!--右侧-->
      <el-col :span="16">
        <div class="rightBox">
          
          <!--配置部分1：针对key/value的配置-->
          <el-form ref="form" :model="widget" label-width="100px" :inline="true">
          
            <!-- 递归 -->
            <list :widget="widget" :widgetConfigExplain="widgetConfigExplain" :index="0" @moreConfigFun="configPlusFun"></list>
          
          </el-form>

          <!--高级配置-->
          <getMultipleTemplate 
            v-if="widget.type==='beeTable'"
            title="conditionColumnList 高级配置"
            :templateAllData="widgetPartConfig" 
            :templateName="templateName"
            defaultOptionValue="10"
            :defaultList="widget.conditionColumnList"
            @changeData = "changeDataFun"
          />
           <getMultipleTemplate 
            v-if="widget.type==='beeTable'"
            title="searchBtns 高级配置"
            :templateAllData="widgetPartConfig" 
            :templateName="templateName2"
            defaultOptionValue="10"
            :defaultList="widget.searchBtns"
            @changeData = "changeDataFun2"
          />

        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
// <template v-for="(value,key) in widget">
//               <div :key="key">

//                 <template v-if="bee.isObject(value)">
                  
//                   <div class="_1thLine">
//                   <div class="title1">{{key}}</div>
//                   <template v-for="(value2,key2) in value">
//                     <div :key="key2">

//                       <template v-if="bee.isObject(value2)">
                        
//                         <div class="_2thLine">
//                         <div class="title2">{{key2}}</div>
//                         <template v-for="(value3,key3) in value2">
//                           <div :key="key3">

//                             <template v-if="bee.isObject(value3)">
                              
//                               <div class="_3thLine">
//                               <div class="title3">{{key3}}</div>
//                               <template v-for="(value4,key4) in value3">
//                                 <div :key="key4">

//                                   <template v-if="bee.isObject(value4)">
//                                     配置数据不允许超过4个层级哦
//                                   </template>

//                                   <template v-else>
//                                     <!-- 第4层级 -->
//                                     <div class="_4thLine">
//                                       <el-form-item :label="key4">
//                                         <el-input v-model="value3[key4]"></el-input>  
//                                       </el-form-item>   
//                                     </div>
//                                   </template>

//                                 </div>
//                               </template>
//                               </div>

//                             </template>
//                             <template v-else>
//                               <!-- 第3层级 -->
//                               <div class="_3thLine">
//                                 <el-form-item :label="key3">
//                                   <el-input v-model="value2[key3]"></el-input>  
//                                 </el-form-item>    
//                               </div>
//                             </template>

//                           </div>
//                         </template>
//                         </div>

//                       </template>
//                       <template v-else>
//                         <!-- 第2层级 -->
//                         <div class="_2thLine">                        
//                           <el-form-item :label="key2">
//                             <el-input v-model="value[key2]" :disabled="key2==='conditionColumnList'"></el-input>  
//                           </el-form-item>    
//                           <span class="textBtn" v-if="key2==='conditionColumnList'" @click="configPlusFun">请在高级配置中完成此配置</span>
//                         </div>
//                       </template>

//                     </div>
//                   </template>
//                   </div>

//                 </template>
//                 <template v-else>
//                   <!-- 第1层级 -->
//                   <div class="_1thLine">
//                     <el-form-item :label="key">
//                       <el-input v-model="widget[key]" :disabled="key==='searchBtns'"></el-input>  
//                     </el-form-item>  
//                     <span class="textBtn" v-if="key==='searchBtns'" @click="configPlusFun">请在高级配置中完成此配置</span>
//                   </div>
//                 </template>

//               </div>
//             </template>
import bee from "@/src/tools/bee";
import bus from "@/src/tools/bus";
import {getWidgetConfig,getWidgetConfigExplain} from "./bee/widget.config"
import getWidgetPartConfig from "./bee/widgetPart.config"
import store from '@/src/store';
import getMultipleTemplate from "./getMultipleTemplate"
//let barWidgetConfig = widgetConfig['new_bar']

import list from "./itermList";

export default {
  name: 'editorBox',
  components: {
    getMultipleTemplate,
    list,
  },
  props: {
  },
  data(){
    return{
      "canvas":{
        "width": 1200,
        "height": 800,
        "background": "#142a41",
        "zoom-type":0,
        "grid":10,
        "refreshTime":"600000",
        "linkScreen":{
          "linkScreenCode":"",
          "waitTime":-1,
          "eventWidgetName":""
        },
        "formFormat":{
          "labelPosition":"top",
          "colSpan":8
        }
      },
      json:{
        //"new_bar":[{id:"111"},{id:"222"}],"new_pie":[{id:"333"},{id:"444"}],
      },
      widget:{},
      widgetConfigExplain:{},
      bee:bee,
      //动态打开标签的控制。数组形式，可以支持多个一起打开。
      //这个被坑了很久，文档中居然没有这个！！有个比较混淆的default-active，这个似乎不支持动态控制！
      defaultOpeneds:[], 
      widgetPartConfig:getWidgetPartConfig(), //配置（针对于数组类型的组件）
      templateName:'conditionInput', //配置的名字（针对于数组类型的组件）
      templateName2:'searchBtns', //配置的名字（针对于数组类型的组件）

      widgetBtn:getWidgetConfig(), //用于显示工具栏的按钮
    }
  },
  watch:{
  },
  methods:{
    cloneWidgetFun(id,type,widget){
      let cloneWidget = JSON.parse(JSON.stringify(widget));
      cloneWidget.id = bee.guidGenerator();
      cloneWidget.css["z-index"] = Number(cloneWidget.css["z-index"]) + 1;
      cloneWidget.css["x"] = Number(cloneWidget.css["x"]) + 100;
      this.json[type].push(cloneWidget)
      this.$emit('getWidgetConfig',cloneWidget)
      //并且菜单选中那个新增的
      store.dispatch("setSelectWidgetId",cloneWidget.id);
      bus.$emit("widgetClick",cloneWidget.id);
    },
    deleteWidgetFun(id,type){
      this.$confirm('确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            
          //删除逻辑
          let arr = this.json[type].filter(function(widget){
            return widget.id !== id;
          });
          if(arr.length===0){
            this.$delete(this.json,type); 
          }else{
            this.json[type] = arr;
          }
          //删除选中（配置面板清空）
          this.widget={};
          //发布事件
          this.$emit('deleteWidgetElementFun',id,type);

        }).catch(() => {
       
        });
    },
    createWidgetFun(name){
      let thisConfigTemplate =  JSON.parse(JSON.stringify(getWidgetConfig()[name]));
      if(this.json[name]){
        this.json[name].push(thisConfigTemplate);
      }else{
        this.$set(this.json,name,[thisConfigTemplate])
      }
      let widgetId = thisConfigTemplate.id
      //打开对应的菜单，提升用户体验
      this.defaultOpeneds = [name,widgetId]
      //并且菜单选中那个新增的
      store.dispatch("setSelectWidgetId",widgetId);
      bus.$emit("widgetClick",widgetId);
      //事件
      this.$emit('getWidgetConfig',thisConfigTemplate)
    },
    //子菜单的点击
    selectWidget(widget){
      //获取该组件对应的解释词条
      this.widgetConfigExplain = JSON.parse(JSON.stringify(getWidgetConfigExplain()[widget.type]||{}));
      console.log(this.widgetConfigExplain)
      
      this.widget = widget;
      //全局保存选中的那个组件id
      store.dispatch("setSelectWidgetId",widget.id );
    },
    //父菜单中处理select事件，控制菜单的展开收拢
    selectFun(index,indexPath){
      this.defaultOpeneds = indexPath;
    },
    selectCanvas(){
      this.selectWidget(this.canvas);
      this.defaultOpeneds=[];
    },
    //二次模板数据更改
    changeDataFun(data){
      this.widget.conditionColumnList=JSON.stringify(data)
    },
    changeDataFun2(data){
      this.widget.searchBtns=JSON.stringify(data)
    },
    configPlusFun(){
      console.log('点击了')
    }
  },
  mounted(){

    //看看是不是编辑页面
    let modCode = this.$route.query.modCode;
    if(modCode){
      let list = JSON.parse(localStorage.getItem('screenList'));
      //直接导入数据
      this.canvas = list[modCode].json.canvas;
      this.json = list[modCode].json.components;
      //并触发创建组件
      this.$emit('getCanvasConfig',this.canvas)
      for(let types in this.json){
        for(let i=0;i<this.json[types].length;i++){
          this.$emit('getWidgetConfig',this.json[types][i]);
        }
      }
    }else{
      //一开始就把canvas对象抛出，用来渲染画布。
      this.$emit('getCanvasConfig',this.canvas)
    }

  }
}
</script>

<style lang="scss">
.createPage{
  overflow: hidden;
  .editorBox{
    background: #1b1e25;
    height:100%;
    .toolBar{
      padding:10px;
      white-space: nowrap;
      overflow: auto;
      button{
        display: inline-block;
      }
    }
    .el-row{ 
      height:calc(100% - 48px);
      .el-col{
        height:100%;
      }
    }
    .leftBox{
      height:100%;
      background: #1a1d21;
      overflow: auto;
      position: relative;
      border-right:solid 1px #333; 
      .typeName{
        height:50px;
        background:rebeccapurple;
      }
      .canvasBtn{
        height:50px;
        line-height: 50px;
        padding-left: 20px;
        color: rgb(153, 153, 153);
        background-color: rgb(51, 51, 51);
        border-right:solid 1px #e6e6e6;
        cursor: pointer;
        &:hover{
          background-color:#2d2d2d;
          transition: background-color .3s;
        }
      }
      .widgetOperateBtn{
        display: inline-block;
        height:100%;
        color:#ccc;
        padding:0 10px;
        position: absolute;
        right:0px;
      }
    }
    .rightBox{
      height:100%;
      background: #1b1e25;
      overflow: auto;
      .textBtn{
        line-height: 50px;
        cursor:pointer;
      }
    }
    ._1thLine{
      background:#333;
      margin-left:0px;
    }
    ._2thLine{
      background:#444;
      margin-left:10px;
    }
    ._3thLine{
      background:#555;
      margin-left:10px;
    }
    ._4thLine{
      background:#666;
      margin-left:10px;
    }

    .title1,.title2,.title3,.title4{
      height:52px;
      line-height:52px;
      width:100px;
      box-sizing: border-box;
      padding-right:10px;
      text-align: right;
    }

    .el-form-item {
      margin-bottom:0px;
      padding:0;
      .el-form-item__label{
        color:unset;
      }
      .el-input{
        width: inherit;
      }
    }
  }
}
</style>
