<template>
    <el-col :span="colSpan">
      <el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item :label="item.label">
          
          <!-- 日期区间选择 -->
          <el-date-picker style="max-width:300px;"
            v-model="formInline.date"
            type="daterange"
            range-separator="至"
            :start-placeholder="myItem.placeholder[0]"
            :end-placeholder="myItem.placeholder[1]"
            @change="handleChange"
          >
          </el-date-picker>

        </el-form-item>
      </el-form>
    </el-col>
</template>

<script>

import bee from "@/src/tools/bee"

export default {
  name: "beeInput",
  props: {
    item:Object,
    labelPosition:null,
    colSpan:null,
  },
  data() {
    return {
      myItem:this.item,
      keyNames:this.item.keyName,
      formInline: {
        date: this.item.defaultValue,
      }
    };
  },
  watch:{
    'item':function(v){
      this.formInline.date = v.defaultValue;
    }
  },
  methods:{
    handleChange(val){

      let a,b;
      
      //如果时间输入框有值，就使用现成选择的值
      if(val){
        a = (new Date(val[0])).valueOf();
        b = (new Date(val[1])).valueOf(); 
      }else{
        //如果清空时间选择，我们可以提供当天的时间。
        console.log('默认使用当天的时间区间');
        a = new Date(new Date().toLocaleDateString()).getTime();
        b = new Date().getTime()
      }

      //分两次分发
      this.$emit('sonChange', a, {
        keyName:this.keyNames[0]
      });
      this.$emit('sonChange', b, {
        keyName:this.keyNames[1]
      });  
            
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
