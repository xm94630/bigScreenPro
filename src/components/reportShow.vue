<template>
  <div>
    <template v-if="reportConfig==null">数据有误，无法渲染</template>
    <template v-else>
      <div class="myReportCanvas" :style="canvasStyle"></div>
    </template>
  </div>
</template>

<script>
import Vue from "vue";

function mountCmp(cmp, props, parent) {
  if (cmp.default) {
    cmp = cmp.default;
  }
  cmp = Vue.extend(cmp);
  let node = document.createElement("div");
  parent.appendChild(node);
  new cmp({
    // eslint-disable-line
    el: node,
    propsData: props,
    parent: this
  });
}

export default {
  name: "reportShow",
  props: {
    reportConfig: null
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    canvasStyle() {
      let str = "margin:0 auto;";
      str +=
        "background:" +
        this.reportConfig.canvas.background +
        ";" +
        "height:" +
        this.reportConfig.canvas.height +
        "px;" +
        "width:" +
        this.reportConfig.canvas.width +
        "px;";
      return str;
    }
  },
  updated() {
    //对配置的的全部组件进行渲染
    for (let key in this.reportConfig.components) {
      //渲染全部的“title”组件进行渲染
      if ("title" == key) {
        let titleData = this.reportConfig.components.title;
        let len = titleData.length;
        for (let i = 0; i < len; i++) {
          let title_propsConfig = {
            myConfig: titleData[i]
          };
          import("../components/bee/title.vue").then(cmp => {
            mountCmp(
              cmp,
              title_propsConfig,
              document.querySelector(".myReportCanvas")
            );
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.myReportCanvas {
  position: relative;
}
</style>
