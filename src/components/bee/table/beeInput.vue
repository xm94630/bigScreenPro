<template>
    <el-col :span="6">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="我是标签">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
</template>

<script>


export default {
  name: "beeInput",
  props: {
  },
  data() {
    return {
      formInline: {
        user: '',
      }
    };
  },
  computed: {
  }
};
</script>

<style lang="scss">
</style>
