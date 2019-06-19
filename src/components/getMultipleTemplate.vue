<template>
  <div class="fishBox">

    <div>条件查询的组件配置</div>
    <el-select v-model="templateId" placeholder="请选择">
      <el-option
        v-for="item in templateData"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-plus" circle @click="addTemplateFun(templateId)"></el-button>

    <el-form ref="form" v-model="json" label-width="160px" :inline="true">
      <template v-for="(templ) in json">

        <div class="box" :key="templ.id">
          <template v-for="(value,key) in templ">
            <el-form-item :key="key" :label="key">
              <el-input v-model="templ[key]"></el-input>  
            </el-form-item>  
          </template>
        </div>

      </template>
    </el-form>


  </div>
</template>

<script>
//import bee from "@/src/tools/bee";

export default {
  name: 'getMultipleTemplate',
  props: {
    templateAllData:null,
    templateName:String,
    defaultValue:String,
  },
  data(){
    return{
      templateId:this.defaultValue,
      json:[],  //[{"type": "10","label": "普通输入框"},{"type": "11","label": "范围输入框"}]
      xxx:{},
    }
  },
  computed:{
    "templateData":function(){
      let obj = this.templateAllData[this.templateName];
      let option = [];
      for(let key in obj){
        option.push({
          value:key,
          label:obj[key].label,
        })
      }
      return option;
    }
  },
  methods:{
    addTemplateFun(id){
      let template = JSON.parse(JSON.stringify(this.templateAllData[this.templateName][id].template));
      this.json.push(template);
    }
  },
  mounted(){
    console.log(this.templateAllData[this.templateName])
  },
  watch:{
    "json":{
      handler:function(val){
        console.log(val)
        this.$emit("changeData",val);
      },
      deep:true,
    }
  }
}
</script>

<style lang="scss">
.fishBox{
  .box{
    background: #333;
    margin-top: 10px;
  }
}
</style>
