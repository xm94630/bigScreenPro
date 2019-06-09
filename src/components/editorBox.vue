<template>
  <div class="editorBox">
    <div class="toolBar">
      点击添加组件：
      <el-button size="mini" type="primary" round @click="createWidgetFun('new_bar')">bar</el-button>
      <el-button size="mini" type="primary" round>line</el-button>
      <el-button size="mini" type="primary" round>pie</el-button>
      <el-button size="mini" type="primary" round>title</el-button>
      <el-button size="mini" type="primary" round>table</el-button>
      <el-button size="mini" type="primary" round>card</el-button>
      <el-button size="mini" type="primary" round>textBar</el-button>
    </div>
    <el-row :gutter="20">
      <!--左侧-->
      <el-col :span="8">
        <div class="leftBox">
          
          <template v-for="(widgets,key) in json">
            <div :key="key" >
              <div>{{key}}</div>
              <template v-for="(widget) in widgets">
                <div :key="widget.id" >
                  <div @click="selectWidget(widget)">id_{{widget.id}}</div>
                </div>
              </template>
            </div>
          </template>
        
        </div>
      </el-col>
      
      <!--右侧-->
      <el-col :span="16">
        <div class="rightBox">

          <el-form ref="form" :model="widget" label-width="100px" :inline="true">
          <template v-for="(value,key) in widget">
            <div :key="key">

              <template v-if="bee.isObject(value)">
                
                <div class="_1thLine">
                <div class="title1">{{key}}</div>
                <template v-for="(value2,key2) in value">
                  <div :key="key2">

                    <template v-if="bee.isObject(value2)">
                      
                      <div class="_2thLine">
                      <div class="title2">{{key2}}</div>
                      <template v-for="(value3,key3) in value2">
                        <div :key="key3">

                          <template v-if="bee.isObject(value3)">
                            
                            <div class="_3thLine">
                            <div class="title3">{{key3}}</div>
                            <template v-for="(value4,key4) in value3">
                              <div :key="key4">

                                <template v-if="bee.isObject(value4)">
                                  配置数据不允许超过4个层级哦
                                </template>

                                <template v-else>
                                  <!-- 第4层级 -->
                                  <div class="_4thLine">
                                    <el-form-item :label="key4">
                                      <el-input v-model="value3[key4]"></el-input>  
                                    </el-form-item>   
                                  </div>
                                </template>

                              </div>
                            </template>
                            </div>

                          </template>
                          <template v-else>
                            <!-- 第3层级 -->
                            <div class="_3thLine">
                              <el-form-item :label="key3">
                                <el-input v-model="value2[key3]"></el-input>  
                              </el-form-item>    
                            </div>
                          </template>

                        </div>
                      </template>
                      </div>

                    </template>
                    <template v-else>
                      <!-- 第2层级 -->
                      <div class="_2thLine">                        
                        <el-form-item :label="key2">
                          <el-input v-model="value[key2]"></el-input>  
                        </el-form-item>    
                      </div>
                    </template>

                  </div>
                </template>
                </div>

               </template>
              <template v-else>
                <!-- 第1层级 -->
                <div class="_1thLine">
                  <el-form-item :label="key">
                    <el-input v-model="widget[key]"></el-input>  
                  </el-form-item>  
                </div>
              </template>

            </div>
          </template>
          </el-form>

        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import bee from "@/src/tools/bee";
import getWidgetConfig from "./bee/widget.config"
//let barWidgetConfig = widgetConfig['new_bar']

export default {
  name: 'editorBox',
  compvaluents: {
  },
  props: {
  },
  data(){
    return{
      json:{
        //"new_bar":[{id:"111"},{id:"222"}],"new_pie":[{id:"333"},{id:"444"}],
      },
      widget:{},
      bee:bee,
    }
  },
  watch:{
    "widget":{
      handler: function (v) {console.log(v)},
      deep: true
    }
  },
  methods:{
    createWidgetFun(name){
      let thisConfigTemplate =  JSON.parse(JSON.stringify(getWidgetConfig()[name]));
      console.log(this.json)
      if(this.json[name]){
        this.json[name].push(thisConfigTemplate);
      }else{
        this.$set(this.json,name,[thisConfigTemplate])
      }
    },
    selectWidget(widget){
      this.widget = widget;
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss">
.editorBox{
  background: #1b1e25;
  height:100%;
  .toolBar{
    padding:10px;
  }
  .el-row{ 
    height:100%;
    .el-col{
      height:100%;
    }
  }
  .leftBox{
    height:100%;
    background: #1b1e25;
  }
  .rightBox{
    height:100%;
    background: #1b1e25;
    overflow: auto;
  }
  ._1thLine{
    background:#333;
    margin-left:0px;
    cursor:pointer;
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
    padding:5px 0;
    .el-form-item__label{
      color:unset;
    }
  }
}
</style>
