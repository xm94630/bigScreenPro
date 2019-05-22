<template>
    <el-col :span="colSpan">
      <el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item :label="item.label">

           <el-input class="inputRange" type="number" v-model="formInline.myInput1" :placeholder="item.placeholder" @change="handleChange"></el-input>
           -
           <el-input class="inputRange" type="number" v-model="formInline.myInput2" :placeholder="item.placeholder" @change="handleChange"></el-input>

        </el-form-item>
      </el-form>
    </el-col>
</template>

<script>


export default {
  name: "beeInputRange",
  props: {
    item:Object,
    labelPosition:null,
    colSpan:null,
  },
  data() {
    return {
      formInline: {
        myInput1: this.item.defaultValue.split('-')[0],
        myInput2: this.item.defaultValue.split('-')[1],
      }
    };
  },
  watch:{
    'item':function(v){
      this.formInline.myInput1 = v.defaultValue.split('-')[0];
      this.formInline.myInput2 = v.defaultValue.split('-')[1];
    }
  },
  methods:{
    handleChange(){
      let str = (this.formInline.myInput1||'') + '-' + (this.formInline.myInput2||'')
      this.$emit('sonChange', str, this.item);
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
.demo-form-inline .inputRange{
  width:100px;
}
</style>
