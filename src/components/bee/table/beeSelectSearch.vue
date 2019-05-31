<template>
    <el-col :span="colSpan">
      <el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">


        <el-form-item :label="item.label">
          
          <el-select 
            filterable
            remote
            clearable 
            :remote-method="remoteMethod"
            :loading="loading"
            v-model="formInline.user" 
            :placeholder="item.placeholder"  
            @change="handleChange">
            <el-option
              v-for="item in myItem.options"
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
  name: "beeInput",
  props: {
    item:Object,
    labelPosition:null,
    colSpan:null,
  },
  data() {
    return {
      myItem:this.item,
      referenceUrl:this.item.referenceUrl,
      referenceColumn:this.item.referenceColumn,
      referenceDisplayColumn:this.item.referenceDisplayColumn,
      
      loading:false,
      formInline: {
        user: this.item.defaultValue,
      },
      states: [{ value: 'a', label: 'a' }]
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
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let url = this.referenceUrl + query;
        axios.get(url).then( async (response) => {
          this.loading = false;
          let d = response.data.data;
          let options = [];
          for(let i=0;i<d.length;i++){
            options.push({
              value:d[i][this.referenceColumn],
              label:d[i][this.referenceDisplayColumn]
            })
          }
          this.myItem.options = options;
        })

      } else {
        this.options = [];
      }
    }
  },
  mounted(){
    console.log(this.item)
   
  },
  updated(){
  }
};
</script>

<style lang="scss">
</style>
