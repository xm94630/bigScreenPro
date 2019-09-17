<template>
  <el-col :span="colSpan">
    <el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
      <el-form-item :label="item.label">
        <el-select 
          filterable
          remote
          clearable 
          :remote-method="setOptions"
          :loading="loading"
          v-model="formInline.user" 
          :placeholder="item.placeholder"  
          @change="handleChange">
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
import axios from "axios";

export default {
  name: "beeSelectSearch",
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
      loading:false,
    };
  },
  watch:{
  },
  computed: {
  },
  methods:{
    handleChange(val){
      this.$emit('sonChange', val, this.item);
    },
    //设置下拉关联数据
    setOptions(query) {
      if (query !== '') {
        this.loading = true;
        //获取关联数据
        axios.get(this.item.referenceUrl + query).then((response) => {
          this.loading = false;
          let data = response.data.data;
          let options = [];
          for(let i=0;i<data.length;i++){
            options.push({
              value:data[i][this.item.referenceColumn],
              label:data[i][this.item.referenceDisplayColumn]
            })
          }
          this.options = options;
        })
      } else {
        this.options = [];
      }
    }
  },
  mounted(){   
  },
  updated(){
  }
};
</script>

<style lang="scss">
</style>
