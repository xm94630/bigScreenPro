<template>
  <!------------------------- 大屏全局搜索 --------------------------->
  <div class="reportConditionBox">
 
    <!-- 内容区 -->
    <div  class="reportConditionCon">
            
      <!-- 复用二维表条件查询 -->
      <div class="reportConditionConBox">
        <h1 class="MB20">请选择全局查询条件</h1>
        <el-row>
          <component
          v-for="(item, index) in items"
          :key="index"
          :is="item.type"
          :item="item"
          :ref="item.keyName"
          :labelPosition="store.state.store_labelPosition"
          :colSpan="store.state.store_colSpan"
          @sonChange = "sonChangeHandle"
          ></component>
        </el-row>
        <div class="goRight">
          <el-button class="btn" ref="searchBtn" type= "primary" @click="OkFun">确定</el-button>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import beeInput from './bee/table/beeInput.vue';
import beeInputRange from './bee/table/beeInputRange.vue';
import beeDatePicker from './bee/table/beeDatePicker.vue';
import beeDatePickerRangePlus from './bee/table/beeDatePickerRangePlus.vue';
import beeSelect from './bee/table/beeSelect.vue';
import store from '@/src/store';

export default {
  name: 'xm',
  props: {
    msg: String,
    globalContion:Array,  //来自json的配置
  },
  watch:{
  },
  data(){
    return{
      store,
      conditionData:{},  //这里是存放的是大屏整体的条件查询
      items:[]
    }
  },
  components:{
    beeInput,
    beeInputRange,
    beeDatePicker,
    beeSelect,
    beeDatePickerRangePlus,
  },
  methods:{
    //接受子组件中值的变化，更新数据
    sonChangeHandle(v,item){
      this.conditionData[item.keyName] = v;
    },
    OkFun(){
      console.log('全局的条件选择')
      console.log(this.conditionData)
      //存到全局
      store.dispatch("setGlobalContion",this.conditionData);
      //通知
      this.$emit('globalConditionUpdate');
      //提示
      this.$message({
          message: '设置成功！',
          type: 'success'
      });
    }
  },
  mounted(){
    let arr = this.globalContion;
    let items = [];
    for(let i=0;i<arr.length;i++){
      let one = arr[i];
      let dataType = one.dataType;
      let item = {}
      if(dataType===3){
        item.label = one.label;
        item.keyName = one.keyName;
        item.type = "beeDatePicker";
        item.placeholder = one.placeholder;
        item.defaultValue = one.defaultValue;
        item.rule = {};
        item.queryIndex= one.queryIndex;
      }else if(dataType===997788){
        item.label = one.label;
        item.keyName = one.keyName;
        item.type = "beeDatePickerRangePlus";
        item.placeholder = one.placeholder;
        item.defaultValue = one.defaultValue;
        item.rule = {};
        item.queryIndex= one.queryIndex;
      }else{
        //其他
        item = {
          label: "XXXX11",
          keyName: 'XXXX22',
          type: 'beeInput',
          placeholder: 'XXXX33',
          defaultValue: '',
          rule: {},
          queryIndex: one.queryIndex
        }

      }
      items.push(item);

    }
    this.items=items;
  }
}
</script>

<style scoped='scss'>
.reportConditionBox{
  position: absolute;
  top:0;
  left:0;
  z-index:99;
  width: 100%;
  height: 100%;
}
.reportConditionCon{
  width: 100%;
  height:100%;
  background-color:rgba(0, 0, 0, 0.9);
  position: absolute;
  top:0;
}
.reportConditionConBox{
  background: #fff;
  width:1200px;
  margin: 0 auto;
  padding:20px;
  min-height:200px;
  margin-top:100px;
}
.reportConditionConBox.MB20{margin-bottom: 20px;}
.reportConditionConBox .goRight{text-align: right}
.reportConditionConBox .btn{width: 100px;}
</style>
