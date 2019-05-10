<template>
    <el-col :span="8">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item :label="item.label">
          <el-input v-model="formInline.myInput" :placeholder="item.placeholder"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
</template>

<script>


export default {
  name: "beeInput",
  props: {
    item:Object,
  },
  data() {
    return {
      formInline: {
        myInput: this.item.defaultValue,
      }
    };
  },
  computed: {
  },
  mounted(){
  },
  updated(){
    this.formInline.myInput = this.item.defaultValue;
  }
};
</script>

<style lang="scss">
</style>
