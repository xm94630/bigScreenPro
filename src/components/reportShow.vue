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

    
    //title组件的数据（单个）
    let titleData = this.reportConfig.components.title[0];

    let title_propsConfig = {
      myConfig:titleData
      // myConfig: {
      //   id: "componentId_00001",
      //   text: "上海会员物流拣货工作量",
      //   x: 100,
      //   y: 100,
      //   width: 400,
      //   height: 200,
      //   padding: 20,
      //   "font-size": 50,
      //   color: "red",
      //   border:"solid 1px red",
      //   background: "orange",
      //   "text-align": "center",
      // }
    };
    import("../components/bee/title.vue").then(cmp => {
      mountCmp(
        cmp,
        title_propsConfig,
        document.querySelector(".myReportCanvas")
      );
    });
  }
};
</script>

<style scoped>
.myReportCanvas {
  position: relative;
}
</style>
