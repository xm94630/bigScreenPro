<template>
    <el-col :span="colSpan">
      <div class="blackBox">占位栏</div>
    </el-col>
</template>

<script>
export default {
  name: "beeBlank",
  props: {
    item:Object,
    labelPosition:null,
    colSpan:null,
  },
  data() {
    return {
      
    }
  },
  watch:{
  },
  methods:{
  },
  computed: {
  },
  mounted(){
  },
  updated(){
  }
};
</script>

<style lang="scss">
.blackBox{
  visibility:hidden;
}
</style>
