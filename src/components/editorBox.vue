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
          {{widget}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
      widget:barWidgetConfig
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
  }
}
</style>
