<template>
  <div>
    <img src="../assets/logo.png">
    <hierarchyTable :myData="myData" :myConfig="myConfig" style="border:solid 2px gray;"></hierarchyTable>
  </div>
</template>

<script>
import hierarchyTable from "@/src/components/hierarchyTable.vue";
import {getWidgetConfigExplain} from "@/src/components/bee/widget.config";

export default {
  components: {
    hierarchyTable
  },
  data() {
    return {
      myData:JSON.parse(JSON.stringify(getWidgetConfigExplain())),
      myConfig:{
        tableBg:"#25292d",
        titleWidth:"200px",
        border:"solid 1px gray",
        titleCss:{
          "color":"#1c5492",
          "font-size":"12px",
          "font-weight":"bold",
        },
        textCss:{
          "color":"gray",
          "font-size":"12px",
          "font-weight":"normal",
        },
      }
    }
  }
}
</script>

<style scoped>
</style>
