<template>
  <!-- 拖拽组件 -->
  <vue-draggable-resizable 
    :x="Number(myConfig.css.x)" :y="Number(myConfig.css.y)" :w="Number(myConfig.css.width)" :h="Number(myConfig.css.height)" 
    :grid="grid" :parent="false"
    v-on:dragging="onDrag" v-on:resizing="onResize" @activated="clickFun(myConfig.id)" 
    class="widgetBox" :style="myCss" :name="myConfig.id" @click="clickFun(myConfig.id)"
  >
    <!-- 组件内容区 -->
    <div class="widgetCon">

      <template v-for="(one,index) in apiData">
        <div class="myLine" :key="index">
          <div class="mybox mybox1">{{one[options[0]]}}</div>
          <div class="mybox mybox2">
            <div class="miniBox myboxL"><div class="juzhong1">总量</div></div>
            <div class="miniBox myboxR">
              <div class="flexBox">
                <div class="flexBoxS">
                  <div class="flexBoxCon flexBoxConL"><div class="juzhong2">{{options[1]}}</div></div>
                  <div class="flexBoxCon flexBoxConR"><div class="juzhong2">{{one[options[1]]}}</div></div>
                </div>
                <div class="flexBoxS">
                  <div class="flexBoxCon flexBoxConL"><div class="juzhong2">{{options[2]}}</div></div>
                  <div class="flexBoxCon flexBoxConR"><div class="juzhong2">{{one[options[2]]}}</div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mybox mybox3">
            <div class="miniBox myboxL"><div class="juzhong1">缺货等待</div></div>
            <div class="miniBox myboxR">
              <div class="flexBox">
                <div class="flexBoxS">
                  <div class="flexBoxCon flexBoxConL"><div class="juzhong2">{{options[3]}}</div></div>
                  <div class="flexBoxCon flexBoxConR"><div class="juzhong2">{{one[options[3]]}}</div></div>
                </div>
                <div class="flexBoxS">
                  <div class="flexBoxCon flexBoxConL"><div class="juzhong2">{{options[4]}}</div></div>
                  <div class="flexBoxCon flexBoxConR"><div class="juzhong2">{{one[options[4]]}}</div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mybox mybox4">
            <div class="miniBox myboxL"><div class="juzhong1">未上架</div></div>
            <div class="miniBox myboxR">
              <div class="flexBox">
                <div class="flexBoxS">
                  <div class="flexBoxCon flexBoxConL"><div class="juzhong2">{{options[5]}}</div></div>
                  <div class="flexBoxCon flexBoxConR"><div class="juzhong2">{{one[options[5]]}}</div></div>
                </div>
                <div class="flexBoxS">
                  <div class="flexBoxCon flexBoxConL"><div class="juzhong2">{{options[6]}}</div></div>
                  <div class="flexBoxCon flexBoxConR"><div class="juzhong2">{{one[options[6]]}}</div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mybox mybox5">
            <div class="miniBox myboxL"><div class="juzhong1">拣货中</div></div>
            <div class="miniBox myboxR">
              <div class="flexBox">
                <div class="flexBoxS">
                  <div class="flexBoxCon flexBoxConL"><div class="juzhong2">{{options[7]}}</div></div>
                  <div class="flexBoxCon flexBoxConR"><div class="juzhong2">{{one[options[7]]}}</div></div>
                </div>
                <div class="flexBoxS">
                  <div class="flexBoxCon flexBoxConL"><div class="juzhong2">{{options[8]}}</div></div>
                  <div class="flexBoxCon flexBoxConR"><div class="juzhong2">{{one[options[8]]}}</div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mybox mybox6">
            <div class="miniBox myboxL"><div class="juzhong1">拣货完成</div></div>
            <div class="miniBox myboxR">
              <div class="flexBox">
                <div class="flexBoxS">
                  <div class="flexBoxCon flexBoxConL"><div class="juzhong2">{{options[9]}}</div></div>
                  <div class="flexBoxCon flexBoxConR"><div class="juzhong2">{{one[options[9]]}}</div></div>
                </div>
                <div class="flexBoxS">
                  <div class="flexBoxCon flexBoxConL"><div class="juzhong2">{{options[10]}}</div></div>
                  <div class="flexBoxCon flexBoxConR"><div class="juzhong2">{{one[options[10]]}}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

    </div>
    <!-- 选中框 -->
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
  </vue-draggable-resizable>
</template>

<script>
import bee from '@/src/tools/bee.js';
import axios from "axios";
import {baseUrl} from '@/bee.config';
import bus from '@/src/tools/bus.js';
import store from '@/src/store';

export default {
  name: "DSV_lines",
  props: {
    myConfig: null,
  },
  data() {
    return {
      options:{},
      apiData:[],
      store,

      //用于控制拖拽组件的初始定位
      x: this.myConfig.css.x,
      y: this.myConfig.css.y,
      width: this.myConfig.css.width,
      height: this.myConfig.css.height,
      //初始的栅格
      grid:(this.canvasConfig&&this.canvasConfig.grid)?[this.canvasConfig.grid,this.canvasConfig.grid]:[1,1]
    };
  },
  computed: {
    myCss() {
      let map = {"x":"left","y":"top"};
      return bee.objToCSS(bee.replaceKey(this.myConfig.css,map));
    }
  },
  methods:{
    onResize: function (x, y, width, height) {
      this.myConfig.css.x = this.x = x
      this.myConfig.css.y = this.y = y
      this.myConfig.css.width =this.width = width
      this.myConfig.css.height = this.height = height
    },
    onDrag: function (x, y) {
      this.myConfig.css.x = this.x = x
      this.myConfig.css.y = this.y = y   
    },
    clickFun(widgetId){
      //只有在编辑页面，这个点击才有效
      if(this.$el.parentElement.id==="editCanvas"){
        store.dispatch("setSelectWidgetId",widgetId);
        bus.$emit("widgetClick",widgetId);
      }
    },

    initWidget:function(myConfig){
      try{
        this.options = JSON.parse(myConfig.options);
      }catch(e){
        alert('[DSV_lines 组件]options配置格式有误')
      }
    
      let dataUrl = myConfig.dataUrl;
      let diyCoreCode = myConfig.diyCoreCode;
      this.diyCoreCode = diyCoreCode;
      let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
      //获取数据源
      axios.post(baseUrl + dataUrl,params).then(response => {
        let apiData = response.data.data;
        this.apiData = apiData.sort(function(x,y){
          if(x.index<y.index){
            return -1;
          }else if(x.index>y.index){
            return 1;
          }else{
            return 0;
          }
        });
      });
    },
    updatedWidget:function(val){
      try{
        this.options = JSON.parse(val.options);
      }catch(e){
        alert('[DSV_lines 组件]:options配置格式有误')
      }

      let diyCoreCode = val.diyCoreCode;
      //只有diyCoreCode发生改变的时候才调接口！
      if(this.diyCoreCode!==diyCoreCode){
        let dataUrl = val.dataUrl;
        this.diyCoreCode=diyCoreCode;
        let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
        //获取数据源
        axios.post(baseUrl + dataUrl,params).then(response => {
          let apiData = response.data.data;
          this.apiData = apiData.sort(function(x,y){
            if(x.index<y.index){
              return -1;
            }else if(x.index>y.index){
              return 1;
            }else{
              return 0;
            }
          });
        });
      }


    },
  },
  watch:{
    "myConfig":{
      handler:function(newVal,oldVal){
        this.updatedWidget(newVal,oldVal)
      },
      deep: true
    },
    
  },
  mounted: function() {
    this.initWidget(this.myConfig);
  },
  updated(){
  }
};
</script>

<style lang="scss" scoped>
.widgetBox {
  position: absolute;
  box-sizing: border-box;
  .widgetCon {
    width: 100%;
    height: 100%;
  }
}

.myLine{
  border:solid 3px #fff;
  border-radius: 15px;
  height:110px;
  margin-bottom: 20px;
  .mybox{
    display: inline-block;
    box-sizing: border-box;
    padding:0 10px;
    height: 100%;
    //border: solid 1px red;
    vertical-align: middle;
    .miniBox{
      display: inline-block;
      vertical-align: middle;
    }
    .myboxL{
      width: 16px;
      height:100%;
      //border: solid 1px red;
      .juzhong1{
        width: 100%;
        height:100%;
        display: flex;
        flex-direction: column;
        justify-content:center;
      }
    }
    .myboxR{
      width: calc(100% - 30px);
      height:100%;
      //border: solid 1px red;
      box-sizing: border-box;
      padding-left: 20px;
      .flexBox{
        width: 100%;
        height:100%;
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        .flexBoxS{
          height: 55px;
        }
        .flexBoxCon{
          display: inline-block;
          width:45%;
          height:100%;
          text-align:left;
          position: relative;
          .juzhong2{
            position:absolute;
            top:0;
            //border:solid 1px green;
            width: 100%;
            height:100%;
            display: flex;
            flex-direction: column;
            justify-content:center;
          }
        }
        .flexBoxConR{
          box-sizing: border-box;
          padding-left:20px;
        }
      }
    }
  }
  .mybox1{
    width: 10%;
    font-size: 30px;
  }
  .mybox2{
    width: 18%;
  }
  .mybox3{
    width: 18%;
  }
  .mybox4{
    width: 18%;
  }
  .mybox5{
    width: 18%;
  }
  .mybox6{
    width: 18%;
  }
}

</style>
