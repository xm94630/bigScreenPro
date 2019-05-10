<template>

  <div class="conditionBox">
    <el-row>
      <component
      v-for="(item, index) in items"
      :key="index"
      :is="item.type"
      :item="item"
      :ref="item.keyName"
      @sonChange = "sonChangeHandle"
      ></component>
    </el-row>
    <div class="funBox">
      <el-button @click="resetForm('ruleForm')">重置</el-button>

      <template v-for="(one,index) in searchBtns">
        <el-button :key="index" type="primary" :diyCoreCode="one.diyCoreCode" @click="submitForm(one.diyCoreCode)">{{one.text}}</el-button>
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
    return {
      conditionData:{}, //这个用来保存查询条件的最后结果
    };
  },
  methods:{
    //初始化查询条件的值
    initConditionData(arr){
      let newArr={};
      for(let i=0;i<arr.length;i++){
        newArr[arr[i].keyName] = (arr[i].defaultValue);
      }
      console.log('条件搜索初始数据===>')
      console.log(newArr)
      return newArr;
    },
    submitForm(v){
      console.log("条件查询最终数据")
      console.log(this.conditionData);
    },
    resetForm(v){
      alert('reset')
    },
    //接受子组件中值的变化，更新数据
    sonChangeHandle(v,item){
      this.conditionData[item.keyName] = v;
    }
  },
  computed: {
  },
  components:{
    beeInput,
    beeDatePicker,
    beeSelect,
  },
  mounted(){
    //console.log(this.items)
    //console.log(this.searchBtns)
  },
  updated(){
    //初始化查询条件的值
    this.conditionData = this.initConditionData(this.items);
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
