<template>
  <div>
    <div>一个递归的组件案例案例</div>
    <list :list="list"></list>
  </div>
</template>

<script>
import List from "../components/itermList";
export default {
  name: 'dashbord',
  components: { List },
  props: {
    msg: String
  },
  data(){
    return{
      list: [{
          name: "王者荣耀",
          children: [{
              name: "蓝队",
              children: [{
                  name: "孙悟空"
                },
                {
                  name: "猪八戒"
                }]
            },{
              name: "红队",
              children: [{
                  name: "程咬金"
                },
                {
                  name: "兰陵王"
                }]
            }]
        }]
    }
  },
}


</script>

<style scoped>

</style>
