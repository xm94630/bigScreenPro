<template>
    <el-col :span="8">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item :label="item.label">
          
          <!-- 日期区间选择 -->
          <el-date-picker style="max-width:300px;"
            v-model="formInline.date"
            type="daterange"
            range-separator="至"
            :start-placeholder="myItem.placeholder[0]"
            :end-placeholder="myItem.placeholder[1]"
            @change="handleChange"
            value-format="yyyy-MM-dd"
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
      //分两次分发
      this.$emit('sonChange', val[0], {
        keyName:this.keyNames[0]
      });
      this.$emit('sonChange', val[1], {
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
