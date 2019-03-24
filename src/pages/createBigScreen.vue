<template>

  <div>
    
    <div class="toolBar">
      <el-row :gutter="10">
        <el-col :span="6" >工具栏</el-col>
        <el-col :span="18">
          <span @click="newTitle">标题</span>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="10">
      <el-col :span="4" >
        <div class="grid-content bg-purple layerBarBox">
          图层管理
          <div class='layerBar'>饼图</div>
          <div class='layerBar'>标题</div>
          <div class='layerBar'>柱状图</div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple canvasBox">
          <div class="canvas">
            <beeTitle/>
          </div>
        </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    
  </div>

</template>

<script>
import Vue from 'vue'
import beeTitle from '../components/bee/beeTitle'

function mountCmp (cmp, props, parent) {
  if (cmp.default) {
    cmp = cmp.default
  }
  cmp = Vue.extend(cmp)
  let node = document.createElement('div')
  parent.appendChild(node)
  new cmp({ // eslint-disable-line
    el: node,
    propsData: props,
    parent: this
  })
}

export default {
  name: 'xm',
  components: {
    beeTitle
  },
  props: {
    msg: String
  },
  data(){
    return{
        xxx:'大屏展示'
    }
  },
  methods:{
    newTitle(){
      console.log('新建标题')
      import('../components/bee/beeTitle').then(cmp => {
        mountCmp.call(this, cmp, {title: 123456}, document.querySelector('.canvas'))
      })
    }
  }
}
</script>

<style scoped>
  .layerBar{
    background:#fff;
    margin:10px;
    border:dashed 2px lightseagreen;
  }
  .toolBar{
    background:lightseagreen;
    height:50px;
    line-height:50px;
    color:#fff;
  }
  .canvasBox{
    height:500px;
    position:relative;
  }
  .canvas{
    background:#555;
    position:absolute;
    top:50px;
    left:50px;
    width:80%;
    height:80%;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 0px;
  }
  .bg-purple {
    background: #ccc;
  }
  .grid-content {
    border-radius: 0px;
    min-height: 36px;
  }

  .layerBarBox{
    height:500px;
  }


  
</style>
