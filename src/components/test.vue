<template>
    <div>
        <div class="list-item" v-for="(item, index) in list" :key="index">
            <div class="item-name">
                <span>{{item.name}}</span>
            </div>
            <div v-if="item.children" class="children-item">
                <list :list="item.children"></list>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: "List",
  props: {
    list: Array
  }
};
</script>

<style scoped>
.list-item{
  border:solid 1px #666;
  margin-left:20px;
}
</style>
