<template>
  <div class="cardBox" v-bind:class="classObject" :style="myCss">
    <div class="cardBoxT">{{title}}</div>
    <div class="dataBox">
      <template v-for="(one,key) in data">
        <div :key="key">
          <div class="top">{{one}}</div>
          <div class="bottom">{{key}}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import bee from '@/src/tools/bee.js';

export default {
  name: "card",
  props: {
    chartData: null
  },
  data: function() {
    return {
      title: this.chartData.title,
      state: this.chartData.state,
      cardData: this.chartData,
      data:this.orderFun(this.chartData.data),
    };
  },
  methods:{
    //对数据进行排序，排序的顺序可以在json中配置。
    //这个方法还不是很完美，先这样子实现。
    orderFun(data){
      let keyOrder = this.chartData.keyOrder;
      let orderData = {};
      if(keyOrder){
        keyOrder.forEach(function(key){
          orderData[key] = data[key]
        })
        return orderData;
      }else{
        return data;
      }
    }
  },
  computed:{
    myCss() {
      let map = {"x":"left","y":"top"};
      let cssObj = bee.replaceKey(this.chartData.css,map);
      let cssStr = bee.objToCSS(cssObj,"position:absolute;box-sizing:border-box;")
      return cssStr;
    },
    classObject:function(){
      return {
        green: this.state == 1 ? true : false,
        orange: this.state == 2 ? true : false,
        red: this.state == 3 ? true : false
      }
    }
  },
  mounted: function() {
   
  }
};
</script>

<style lang="scss">
//卡片的全部样式
.cardBox {
  position:absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  box-sizing: border-box;
  padding: 5px;
  //background: #fff;
  border-radius: 5px;
  border: solid 1px #c0c0c0;
  overflow: hidden;
  .cardBoxT {
    height: 30%;
    font-size: 16px;
    font-weight: normal;
    text-align: left;
    margin-left: 18px;
  }


  .dataBox{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .top{
      font-size: 20px;
    }
    .bottom{
      font-size: 12px;
    }
  }

}


.cardBox.green {
  border: solid 1px #1a9d14;
  .cardBoxT {
    color: #1a9d14;
  }
}
.cardBox.orange {
  border: solid 1px #ff7200;
  .cardBoxT {
    color: #ff7200;
  }
}
.cardBox.red {
  border: solid 1px #e42525;
  .cardBoxT {
    color: #e42525;
  }
}

</style>