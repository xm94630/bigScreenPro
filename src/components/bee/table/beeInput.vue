<template>
    <el-col :span="colSpan">
      <el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item :label="item.label">
          <el-input v-model="formInline.myInput" :placeholder="item.placeholder" @change="handleChange"></el-input>
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
        myInput: this.item.defaultValue,
      }
    };
  },
  watch:{
    'item':function(v){
      this.formInline.myInput = v.defaultValue;
    }
  },
  methods:{
    handleChange(val){
      this.$emit('sonChange', val, this.item);
    }
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
