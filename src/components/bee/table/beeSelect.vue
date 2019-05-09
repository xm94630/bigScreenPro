<template>
    <el-col :span="8">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">


        <el-form-item :label="item.label">
          
          <el-select v-model="value" :placeholder="item.placeholder">
            <el-option
              v-for="item in item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

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
      },
      value: this.item.value
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
