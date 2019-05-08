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
      <el-button>重置</el-button>

      <template v-for="(one,index) in searchBtns">
        <el-button :key="index" type="primary" :diyCoreCode="one.diyCoreCode" @click="submitForm('ruleForm')">{{one.text}}</el-button>
      </template>
    </div>
  </div>
</template>

<script>


import beeInput from './beeInput.vue';
import beeDatePicker from './beeDatePicker.vue';
import beeSelect from './beeSelect.vue';

export default {
  name: "beeTitle",
  props: {
    items:Array,
    searchBtns:null,
  },
  data() {
    return {};
  },
  computed: {
  },
  components:{
    beeInput,
    beeDatePicker,
    beeSelect,
  },
  mounted(){
    console.log(this.items)
    console.log(this.searchBtns)
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
