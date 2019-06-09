<template>
  <div class="editorBox">
    <el-row :gutter="20">
      <!--左侧-->
      <el-col :span="8">
        <div class="leftBox">
          123
        </div>
      </el-col>
      
      <!--右侧-->
      <el-col :span="16">
        <div class="rightBox">

          <template v-for="(one,key) in widget">
            <div :key="key">

              <template v-if="bee.isObject(one)">
                
                <div class="_1thLine">{{key}}
                <template v-for="(one2,key2) in one">
                  <div :key="key2">

                    <template v-if="bee.isObject(one2)">
                      
                      <div class="_2thLine">{{key2}}
                      <template v-for="(one3,key3) in one2">
                        <div :key="key3">

                          <template v-if="bee.isObject(one3)">
                            
                            <div class="_3thLine">{{key3}}
                            <template v-for="(one4,key4) in one3">
                              <div :key="key4">

                                <template v-if="bee.isObject(one4)">
                                  配置数据不允许超过4个层级哦
                                </template>

                                <template v-else>
                                  <!-- 第4层级 -->
                                  <div class="_4thLine">{{key4}}:{{one4}}</div>
                                </template>

                              </div>
                            </template>
                            </div>

                          </template>
                          <template v-else>
                            <!-- 第3层级 -->
                            <div class="_3thLine">{{key3}}:{{one3}}</div>
                          </template>

                        </div>
                      </template>
                      </div>

                    </template>
                    <template v-else>
                      <!-- 第2层级 -->
                      <div class="_2thLine">{{key2}}:{{one2}}</div>
                    </template>

                  </div>
                </template>
                </div>

               </template>
              <template v-else>
                <!-- 第1层级 -->
                <div class="_1thLine">{{key}}:{{one}}</div>
              </template>

            </div>
          </template>

        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import bee from "@/src/tools/bee";
import widgetConfig from "./bee/widget.config"
let barWidgetConfig = widgetConfig['new_bar']

export default {
  name: 'editorBox',
  components: {
  },
  props: {
  },
  data(){
    return{
      widget:barWidgetConfig,
      bee:bee
    }
  },
  methods:{
  },
  mounted(){

  }
}
</script>

<style lang="scss">
.editorBox{
  background: #1b1e25;
  height:100%;
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
    background:red;
    margin-left:0px;
    border:solid 1px #000;
    line-height:40px;
  }
  ._2thLine{
    background:green;
    margin-left:10px;
    border:solid 1px #000;
  }
  ._3thLine{
    background:yellow;
    margin-left:10px;
    border:solid 1px #000;
  }
  ._4thLine{
    background:blue;
    margin-left:10px;
    border:solid 1px #000;
  }
}
</style>
