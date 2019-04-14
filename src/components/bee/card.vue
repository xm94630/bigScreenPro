<template>
  <div class="cardBox" v-bind:class="classObject" :style="'width:'+width+'px;height:'+height+'px;top:'+y+'px;left:'+x+'px;'">
    <div class="cardBoxT">{{title}}</div>
    <div class="cardBoxM">
      <div>{{(cardData&&cardData[0]&&cardData[0].value) || data1 || 0}}</div>
      <div>{{(cardData&&cardData[1]&&cardData[1].value) || data2 || 0}}</div>
    </div>
    <div class="cardBoxB">
      <div>{{(cardData&&cardData[0]&&cardData[0].name) || text1}}</div>
      <div>{{(cardData&&cardData[0]&&cardData[0].name) || text2}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    chartData: null
  },
  data: function() {
    return {
      title: this.chartData.title,
      text1: this.chartData.text1,
      text2: this.chartData.text2,
      data1: this.chartData.data1,
      data2: this.chartData.data2,
      state: this.chartData.state,
      cardData: this.chartData,

      width: this.chartData.width,
      height: this.chartData.height,
      x: this.chartData.x,
      y: this.chartData.y,

    };
  },
  computed:{
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
  background: #fff;
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
  .cardBoxM {
    display: flex;
    justify-content: space-around;
    height: 50%;
    font-size: 30px;
    font-weight: bold;
    color: #000000;
  }
  .cardBoxB {
    display: flex;
    justify-content: space-around;
    height: 30%;
    color: #666666;
    font-size: 16px;
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