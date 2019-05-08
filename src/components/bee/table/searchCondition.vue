<template>

  <div class="conditionBox">
    <el-row>
      <component
      v-for="(item, index) in items"
      :key="index"
      :is="item.type"
      :item="item"
      :ref="item.name"
      ></component>
    </el-row>
    <div class="funBox">
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </div>
  </div>
</template>

<script>


import beeInput from './beeInput.vue';
import beeDatePicker from './beeDatePicker.vue';

export default {
  name: "beeTitle",
  props: {
    items:Array,
  },
  data() {
    return {};
  },
  computed: {
  },
  components:{
    beeInput,
    beeDatePicker,
  },
  mounted(){
    console.log(this.items)
  }
  
};
</script>

<style lang="scss">
.conditionBox{
  .funBox{
    text-align:right; 
  }
}
</style>
