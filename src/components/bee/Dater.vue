<template>
  <div class="Dater">{{str}}</div>
</template>


<script>
import moment from "moment";

export default {
  name: "Dater",
  data() {
    return {
      str: moment().format("YYYY-MM-DD HH:mm:ss")
    };
  },
  mounted: function() {
    setInterval(() => {
      this.str = moment().format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
  }
};
</script>


<style scoped>
.Dater {
  font-size: 25px;
}
</style>



