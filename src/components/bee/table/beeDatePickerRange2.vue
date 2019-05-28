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
        date: '',
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
      let val2='';
      if(val){
        val2 = val.map(function(one){
          return one.getTime();
        }).join('-');
      }

      //分发默认时间区间
      this.$emit('sonChange', val2, {
        keyName:this.keyNames
      });
            
    }
  },
  computed: {
  },
  mounted(){
    //设置初始值
    let defaultValue = this.item.defaultValue;
    this.formInline.date = defaultValue;
  },
  updated(){
  }
};
</script>

<style lang="scss">
</style>
