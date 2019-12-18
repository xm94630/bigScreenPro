<template>
  <el-col :span="colSpan">
    <el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
      <el-form-item :label="item.label">          
        <el-select clearable filterable  v-model="formInline.user" :placeholder="item.placeholder"  @change="handleChange">
          <el-option
            v-for="item in options"
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
//采用 beeSelect.vue 为原型改的。
//本组件也是下拉的一种，只是下拉的内容是静态的（本地写死的），而不是从远程获取

import axios from "axios";

export default {
  name: "beeSelect",
  props: {
    item:Object,
    labelPosition:null,
    colSpan:null,
  },
  data() {
    return {
      options:[],
      formInline: {
        user: this.item.defaultValue,
      },
    };
  },
  computed: {
  },
  methods:{
    handleChange(val){
      this.$emit('sonChange', val, this.item);
    },
    //设置下拉关联数据
    setOptions(){

      let data=[] ;
      try{
        data = JSON.parse(this.item.staticData);
      }catch(e){
        alert('请检查下拉框的数据源的格式，JSON格式哦，检查下双引号啥的')
      }


      let option = [];
      for(let i=0;i<data.length;i++){
        option.push({
          value:data[i][this.item.referenceColumn],
          label:data[i][this.item.referenceDisplayColumn]
        })
      }
      this.options = option;


    }
  },
  watch:{
    "item":{
      handler:function(){
        this.setOptions();
      },
      deep:true
    }
  },
  mounted(){
    this.setOptions();
  }
};
</script>

<style lang="scss">
</style>
