<template>
  <div>
    <template v-if="reportConfig==null">数据有误，无法渲染</template>
    <template v-else>
      <div :style="canvasStyle">123</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "reportShow",
  props: {
    reportConfig: null
  },
  data() {
    return {
      
    };
  },
  computed: {
    canvasStyle() {
      let str='margin:0 auto;'
      str += 
        "background:" + this.reportConfig.canvas.background + ";" +
        "height:"+ this.reportConfig.canvas.height + "px;" + 
        "width:" + this.reportConfig.canvas.width + "px;"
      return str;
    }
  }
};
</script>

<style scoped>
</style>
