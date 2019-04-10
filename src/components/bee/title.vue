<template>
  <div class="beeTitle">{{myConfig.text}}</div>
</template>

<script>

// myConfig数据格式
// {
//   id: undefined,
//   text: "默认文字",
//   x: 0,
//   y: 0,
//   width: 100,
//   height: 12,
//   color: "#000",
//   "font-size": 12,
//   align: "center"
// }


export default {
  name: "beeTitle",
  props: {
    myConfig: null
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss">
.beeTitle {
  color: #000;
}
</style>
