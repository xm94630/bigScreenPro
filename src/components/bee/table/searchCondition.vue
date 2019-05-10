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
        <el-button :key="index" type="primary" :diyCoreCode="one.diyCoreCode" @click="submitForm(one.diyCoreCode,one.dataUrl)">{{one.text}}</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import beeInput from './beeInput.vue';
import beeDatePicker from './beeDatePicker.vue';
import beeSelect from './beeSelect.vue';

export default {
  name: "beeTitle",
  props: {
    items:Array,
    searchBtns:null,
    currentPage:null,
    pageSize:null,
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
    submitForm(code,url){
      //console.log("条件查询最终数据")
      //console.log(this.conditionData);
      
      // console.log(code)
      // console.log(url)
      // console.log(this.currentPage)
      // console.log(this.pageSize)

      const body = {
        diyCoreCode:code,
        abc:this.conditionData,
        currentPage:this.currentPage,
        pageSize:this.pageSize,
      }

      //获取数据源
      axios.post(url,body).then(response => {
        // console.log('表格数据===>')
        // console.log(response.data.data)
        let tableData = response.data.data;
        this.$emit('tableDataOK', tableData, this.conditionData,code,url);
      });

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
