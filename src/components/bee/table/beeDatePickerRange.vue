<template>
    <el-col :span="colSpan">
      <el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item :label="item.label">
          
          <!-- 日期区间选择 -->
          <el-date-picker style="max-width:300px;"
            v-model="formInline.date"
            type="daterange"
            range-separator="至"
            :start-placeholder="myItem.placeholder[0]"
            :end-placeholder="myItem.placeholder[1]"
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
      myItem:this.item,
      keyNames:this.item.keyName,
      formInline: {
        date: '',
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

      alert(val[0],val[1])

      let a,b;
      
      //如果时间输入框有值，就使用现成选择的值
      if(val){
        a = val[0].getTime();
        b = val[1].getTime();
      }else{
        //如果清空时间选择，我们可以提供当天的时间。
        console.log('默认使用当天的时间区间');
        a = new Date(new Date().toLocaleDateString()).getTime(); //今天0点开始的时间
        b = new Date().getTime() //当前时间
      }

      //分两次分发
      this.$emit('sonChange', a, {
        keyName:this.keyNames[0]
      });
      this.$emit('sonChange', b, {
        keyName:this.keyNames[1]
      });  
            
    }
  },
  computed: {
  },
  mounted(){

    //初始设置 在不配置的情况下，默认设置成当日
    let dateArr = this.item.defaultValue;
    let a = new Date(new Date().toLocaleDateString()).getTime();
    let b = new Date().getTime()
    if(dateArr && dateArr[0] && dateArr[1]){
      this.formInline.date = [
        new Date(dateArr[0]).getTime(),
        new Date(dateArr[1]).getTime()
      ];
    }else{
      this.formInline.date = [a,b];
    }
    //在分两次分发
    this.$emit('sonChange', this.formInline.date[0], {
      keyName:this.keyNames[0]
    });
    this.$emit('sonChange', this.formInline.date[1], {
      keyName:this.keyNames[1]
    });  

  },
  updated(){
  }
};
</script>

<style lang="scss">
</style>
