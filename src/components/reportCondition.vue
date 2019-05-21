<template>
  <div class="reportConditionBox">
 
    <div class="reportConditionBtn" @click="clickFun">
      <i class="el-icon-edit"></i>
    </div>

    <div v-if="showCon" class="reportConditionCon">
      <div class="reportConditionBtn" @click="clickFun2">
        <i class="el-icon-close"></i>
      </div>
      
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
import beeSelect from './bee/table/beeSelect.vue';

export default {
  name: 'xm',
  props: {
    msg: String
  },
  data(){
    return{
      showCon:true,
      conditionData:{},
      items:[{
        span: 12,
        label: "姓名",
        keyName: '这个是用来绑定的',
        type: 'beeInput',
        placeholder: '请输入',
        value: '',
        rule: {},
      },{
        span: 12,
        label: "喜爱",
        keyName: '这个是用来绑定的',
        type: 'beeSelect',
        placeholder: '请输入',
        value: '',
        rule: {},
      },{
        span: 12,
        label: "选择日期",
        keyName: '这个是用来绑定的',
        type: 'beeDatePicker',
        placeholder: '日期选择',
        value: '',
        rule: {},
      },],
    }
  },
  components:{
    beeInput,
    beeInputRange,
    beeDatePicker,
    beeSelect,
  },
  methods:{
    clickFun(){
      this.showCon = true;
    },
    clickFun2(){
      this.showCon = false;
    },
    //接受子组件中值的变化，更新数据
    sonChangeHandle(v,item){
      this.conditionData[item.keyName] = v;
    },
    OkFun(){
      alert(123);
    }
  }
}
</script>

<style scoped='scss'>
.reportConditionBox{
  position: absolute;
  top:0;
  left:0;
  z-index:1;
  width: 100%;
  height: 100%;
}
.reportConditionBtn{
  width: 50px;
  height:50px;
  line-height:50px;
  text-align: center;
  background: #db8460;
  cursor: pointer;
  color:#fff;
  font-size: 30px;
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
  width:1000px;
  margin: 0 auto;
  padding:20px;
  min-height:200px;
}
.reportConditionConBox.MB20{margin-bottom: 20px;}
.reportConditionConBox .goRight{text-align: right}
.reportConditionConBox .btn{width: 100px;}
</style>
