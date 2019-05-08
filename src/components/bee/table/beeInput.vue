<template>
    <el-col :span="6">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item :label="item.label">
          <el-input v-model="formInline.user" :placeholder="item.placeholder"></el-input>
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
        user: '',
      }
    };
  },
  computed: {
  },
  mounted(){
  }
};
</script>

<style lang="scss">
</style>
