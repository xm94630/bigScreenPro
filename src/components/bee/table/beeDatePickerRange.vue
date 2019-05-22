<template>
    <el-col :span="8">
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
      
      let a = (new Date(val[0])).valueOf();
      let b = (new Date(val[1])).valueOf();

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
