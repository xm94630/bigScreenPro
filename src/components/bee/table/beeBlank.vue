<template>
    <el-col :span="colSpan">
      <el-form 
      class="demo-form-inline blackBox" 
      :label-position="labelPosition" 
      :inline="true"
      :model="formInline"
      label-width="80px"
      >
        <el-form-item label="标签名字">
          <el-input v-model="formInline.myInput" placeholder=""></el-input>
        </el-form-item>
      </el-form>
    </el-col>
</template>

<script>
export default {
  name: "beeBlank",
  props: {
    item:Object,
    labelPosition:null,
    colSpan:null,
  },
  data() {
    return {
      formInline:{
        myInput:''
      }
    }
  },
  watch:{
  },
  methods:{
  },
  computed: {
  },
  mounted(){
  },
  updated(){
  }
};
</script>

<style lang="scss">
.blackBox{
  visibility:hidden;
}
</style>
