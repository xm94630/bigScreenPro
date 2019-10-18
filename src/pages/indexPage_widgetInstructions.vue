<template>
  <div>
    组件使用指南
    <xuming :myConfig="haha"></xuming>
  </div>
</template>

<script>
import xuming from "@/src/components/xuming.vue";
import {getWidgetConfigExplain} from "@/src/components/bee/widget.config";

export default {
  components: {
    xuming
  },
  data() {
    return {
      haha:JSON.parse(JSON.stringify(getWidgetConfigExplain()))
    }
  }
}
</script>

<style scoped>
</style>
