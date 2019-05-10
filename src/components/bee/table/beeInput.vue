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
import { setTimeout } from 'timers';


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
  watch:{
    'item':function(v){
      this.formInline.myInput = v.defaultValue;
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
