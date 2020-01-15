<template>
  <div class="fishBox">

    <div class="title">{{title}}</div>
    
    <el-form ref="form" v-model="json" label-width="160px" :inline="true">
        <template v-for="(templ) in json">
          <div class="box" :key="templ.id">
            <template v-for="(value,key) in templ">
              <el-form-item :key="key" :label="key" v-if="['id','type'].indexOf(key)===-1"> 
                <template v-if="key==='eventFunction'">
                  <el-input type="textarea"  :rows="5" size="mini" v-model="templ[key]"></el-input>
                </template>
                <template v-else-if="key==='eventName'">
                  <div>{{templ[key]}}</div>
                </template>
              </el-form-item>  
            </template>
            <div class="removeBtn" @click="removeFun(templ.id)"><i class="el-icon-close"></i></div>
          </div>
        </template>
    </el-form>

    <div class="selectBox">
      <el-select size="mini" v-model="templateTypeId" placeholder="请选择">
        <el-option
          v-for="item in templateData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" circle @click="addTemplateFun(templateTypeId)"></el-button>
    </div>




  </div>
</template>

<script>
import bee from "@/src/tools/bee";

export default {
  name: 'eventBox',
  props: {
    title:String,
    templateAllData:null,
    templateName:String,
    defaultOptionValue:String,
    defaultList:null,
    widget:null,
  },
  data(){
    return{
      templateTypeId:this.defaultOptionValue, //下拉的默认值
      json:typeof(this.defaultList)==="string" && this.defaultList!==''?JSON.parse(this.defaultList):[],//[{"type": "10","label": "普通输入框","id":"xxxx-xxxx"},{"type": "11","label": "范围输入框","id":"xxxx-xxxx"}]
    }
  },
  computed:{
    "templateData":function(){
      let obj = this.templateAllData[this.templateName];
      obj = Object.assign(obj,this.widget.customEventForUse)
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
    addTemplateFun(templateTypeId){
      let template = JSON.parse(JSON.stringify(this.templateAllData[this.templateName][templateTypeId].template));
      template.id = bee.guidGenerator()
      this.json.push(template);
    },
    removeFun(removeId){
      this.json = this.json.filter(function(one){
        return one.id!==removeId;
      })
    }
  },
  mounted(){
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
  padding:0px 0px 10px 0px;
  box-sizing: border-box;
  border:solid 1px #409EFF;
  color:#fff;
  .title{
    background: #409EFF;
    line-height: 24px;
    padding:0px 10px;
    text-align: center;
  }
  .selectBox{
    padding:10px;
    .el-select{
      margin-right: 10px;
    }
  }
  .box{
    background: #333;
    margin-top: 10px;
    position: relative;
    .removeBtn{
      position: absolute;
      left:0px;
      top:0px;
      width:30px;
      height:30px;
      line-height: 30px;
      color:#fff;
      font-size: 30px;
      background: #000;
      cursor: pointer;
    }
  }
}
</style>
