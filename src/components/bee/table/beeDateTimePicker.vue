<template>
    <el-col :span="colSpan">
      <el-form  :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item :label="item.label">
          <el-date-picker
            v-model="formInline.user"
            type="datetime"
            :placeholder="item.placeholder"
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
      formInline: {
        user: this.item.defaultValue,
      }
    };
  },
  watch:{
    'item':function(v){
      this.formInline.myInput = v.defaultValue;
    }
  },
  methods:{
    handleChange(val){
      //let a = (new Date(val)).getTime();
      let a = val.getTime();
      this.$emit('sonChange', a, this.item);
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
