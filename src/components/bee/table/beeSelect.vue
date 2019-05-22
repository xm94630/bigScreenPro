<template>
    <el-col :span="8">
      <el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">


        <el-form-item :label="item.label">
          
          <el-select filterable v-model="formInline.user" :placeholder="item.placeholder"  @change="handleChange">
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
  },
  data() {
    return {
      formInline: {
        user: this.item.defaultValue,
      },
    };
  },
  watch:{
    'item':function(v){
      this.formInline.myInput = v.defaultValue;
    }
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
  }
};
</script>

<style lang="scss">
</style>
