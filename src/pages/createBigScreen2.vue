<template>
  <div class="createPage">
    <el-row :gutter="20">
      <!--即时视图-->
      <el-col :span="12">
        即时视图
      </el-col>
      
      <!--新增编辑区-->
      <el-col :span="12">
        <editorBox />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import editorBox from "../components/editorBox"


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
}
</style>
