<template>

  <!-- 二维表组件 条件搜索 -->
  <div class="conditionBox">   
    <el-row :gutter="10">
      <component
      v-for="(item, index) in items"
      :key="index"
      :is="item.typeName"
      :item="item"
      :ref="item.keyName"
      :labelPosition="store.state.store_labelPosition"
      :colSpan="store.state.store_colSpan"
      @sonChange = "sonChangeHandle"
      ></component>
    </el-row>

    <div class="funBox">
      <el-button 
        @click="resetForm('ruleForm')" 
        :disabled="resetBtnDisabled"
      >
        {{resetBtnText}}
      </el-button>

      <template v-for="(one,index) in searchBtns">
        <el-button 
        ref = "searchBrn"
        :key= "index" 
        type= "primary" 
        :diyCoreCode= "one.diyCoreCode" 
        @click="submitForm(one.diyCoreCode,one.dataUrl,one.resultColumnList)"
        >
          {{one.text}}
        </el-button>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from '@/src/store';
import bee from '@/src/tools/bee.js';
import beeBlank from './beeBlank.vue';
import beeInput from './beeInput.vue';
import beeInputRange from './beeInputRange.vue';
import beeDatePicker from './beeDatePicker.vue';
import beeDatePickerRange from './beeDatePickerRange.vue';
import beeSelect from './beeSelect.vue';
import beeSelectSearch from './beeSelectSearch.vue';
import beeDateTimePickerRange from './beeDateTimePickerRange.vue';
import beeDateTimePicker from './beeDateTimePicker.vue';
import { setTimeout } from 'timers';

export default {
  name: "beeTitle",
  props: {
    items:Array,
    searchBtns:null,
    resetBtnText:null,
    currentPage:null,
    pageSize:null,
    showPage:null,
    autoSearch:null, //默认进来是查询的
  },
  data() {
    return {
      store,
      conditionData:{},      //这个用来保存查询条件的最后结果
      resetBtnDisabled:true, //默认一开始不让使用reset，只有一定延时后才能用。
    };
  },
  methods:{
    //初始化查询条件的值
    //这是对this.items中默认值做格式的处理。比如传进来的是日期格式，我要转成时间戳
    initConditionData(arr){

      //深度拷贝。否者原对象会被改变。
      arr = JSON.parse(JSON.stringify(arr))

      let newArr={};
      for(let i=0;i<arr.length;i++){

        //对时间范围的组件的默认值做处理
        let defaultValue = arr[i].defaultValue;
        if(arr[i].type==='beeDatePickerRange' && defaultValue){
          //如果默认值存在
          if(Array.isArray(defaultValue)){
            let a = defaultValue.map(function(one){
              return new Date(one).getTime();
            }).join('-');

            arr[i].defaultValue =a;
          }
        }

        //不为空的时候才添加，否则就会查询为空字符串的情况
        if(arr[i].defaultValue){
          newArr[arr[i].keyName] = (arr[i].defaultValue);
        }
      }
      //console.log('条件搜索初始数据===>')
      //console.log(newArr)
      return newArr;
    },

    submitForm(code,url,resultColumnList){
      //console.log("条件查询最终数据")
      //console.log(this.conditionData);
      // console.log(code)
      // console.log(url)
      // console.log(this.currentPage)
      // console.log(this.pageSize)

      let abc = bee.effectiveKeys(this.conditionData);
      let body = Object.assign({diyCoreCode:code},abc);

      //如果需要显示分页，要带上这两个参数
      if(this.showPage){
        body.currentPage = store.state.store_currentPage || this.currentPage;
        body.pageSize = this.pageSize
        //获取数据源
        axios.post(url,body).then(response => {
          let tableData = response.data.data.recordList;
          let totalPage = response.data.data.recordCount;
          this.$emit('tableDataOK', tableData, this.conditionData,code,url,totalPage,resultColumnList); 
        });
      }else{
        //通知出现进度条
        this.$emit('showLoadingBox');
        //获取数据源
        axios.post(url,body).then(response => {
          let tableData = response.data.data;
          let totalPage = -1;
          this.$emit('tableDataOK', tableData, this.conditionData,code,url,totalPage,resultColumnList); 
          //通知隐藏进度条
          this.$emit('hideLoadingBox');
        });
      }
    },
    resetForm(){
      this.$emit('reset');
    },
    //接受子组件中值的变化，更新数据
    sonChangeHandle(v,item){
      this.conditionData[item.keyName] = v;
    },
  },
  computed: {
  },
  components:{
    beeBlank,
    beeInput,
    beeInputRange,
    beeDatePicker,
    beeSelect,
    beeSelectSearch,
    beeDatePickerRange,
    beeDateTimePickerRange,
    beeDateTimePicker
  },
  mounted(){
    console.log("---------------------===>")
    //console.log(this.items)
    //console.log(this.searchBtns)
    //console.log(this.$refs['searchBrn'][0])
    
    //延时处理，等查询条件完成渲染。再模拟点击
    if(this.autoSearch){
      setTimeout(()=>{
        this.$refs['searchBrn'][0].$el.click();
      },1000)
    }

    setTimeout(()=>{
      this.resetBtnDisabled = false;
    },1000)
  },
  //这个一定要加，否者”重置“的时候，就会出现查询条件没有带上的bug
  created(){
    //初始化查询条件的值
    this.conditionData = this.initConditionData(this.items);
  },
  updated(){
    //初始化查询条件的值
    this.conditionData = this.initConditionData(this.items);
  }
  
};
</script>

<style lang="scss">
.conditionBox{
  position: relative;
  .funBox{
    text-align:right; 
  }
}
</style>
