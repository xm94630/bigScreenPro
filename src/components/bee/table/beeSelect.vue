<template>
    <el-col :span="colSpan">
      <el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">


        <el-form-item :label="item.label">
          
          <el-select clearable filterable  v-model="formInline.user" :placeholder="item.placeholder"  @change="handleChange">
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
    labelPosition:null,
    colSpan:null,
  },
  data() {
    return {
      formInline: {
        user: this.item.defaultValue,
      },
    };
  },
  watch:{
  },
  computed: {
  },
  methods:{
    handleChange(val){
      this.$emit('sonChange', val, this.item);
    }
  },
  mounted(){
   
  },
  updated(){
    //props的改变会更新组件，但不会刷新 data 中的数据。
    this.formInline.user = this.item.defaultValue; 
  }
};
</script>

<style lang="scss">
</style>
