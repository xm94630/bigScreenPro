<template>
  <div>
    <xuming :myData="haha" style="border:solid 2px rgba(55, 224, 255, 0.8);"></xuming>
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
