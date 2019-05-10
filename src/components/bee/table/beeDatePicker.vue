<template>
    <el-col :span="8">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item :label="item.label">
          <el-date-picker
            v-model="formInline.user"
            type="date"
            :placeholder="item.placeholder">
          </el-date-picker>
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
        user: this.item.defaultValue,
      }
    };
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
</style>
