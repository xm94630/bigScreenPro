<template>

  <!-- 拖拽组件 -->
  <vue-draggable-resizable 
    :x="Number(myConfig.css.x)" :y="Number(myConfig.css.y)" :w="Number(myConfig.css.width)" :h="Number(myConfig.css.height)" 
    :grid="grid" :parent="false"
    v-on:dragging="onDrag" v-on:resizing="onResize" @activated="clickFun(myConfig.id)" 
    class="widgetBox" :style="myCss" :name="myConfig.id" @click="clickFun(myConfig.id)"
  >
    <!-- 组件内容区 -->
    <div class="widgetCon" :id="myConfig.id"></div>
    <!-- 选中框 -->
    <div :class="{selectBorder:myConfig.id===store.state.selectedWidgetId}"></div>
    <!-- 坐标提示框 -->
    <p class="infoBox" v-if= "myConfig.id===store.state.selectedWidgetId">x:{{x}} y:{{y}} w:{{width}} h:{{height}}</p>
  </vue-draggable-resizable>

</template>


<script>
import bee from '@/src/tools/bee.js';
import bus from '@/src/tools/bus.js';
import echarts from "echarts";
import _ from "lodash";
import axios from "axios";
import {baseUrl} from '@/bee.config';
import store from '@/src/store';
import { setTimeout } from 'timers';

//数据源的数据格式
// let apiData = [
//   {
//     "percent": 0.4,
//     "finish": 800,
//     "unfinish": 1200,
//     "type": "CYCLE"
//   },
//   {
//     "percent": 0.5,
//     "finish": 400,
//     "unfinish": 400,
//     "type": "WALKING"
//   },
//   {
//     "percent": 0.75,
//     "finish": 600,
//     "unfinish": 400,
//     "type": "JOGGING MAN"
//   }
// ]

// 提取数据格式为：
// let data1 = [0.4,0.5,0.75];
// let data2 = [800,400,600];
// let data3 = [1200,400,400];

// 进一步处理为：
// let data1 = [140,150,175]; // 100*(n+1) 目的是显示在纵坐标100点以上
// let data2 = [400,500,600]; // n*zoom 目的是无论数据多大，都缩放到100点的位置
// let data3 = [600,500,400]; // n*zoom 目的是无论数据多大，都缩放到100点的位置
// let zoom = [2,0.8,1];      // data1/data2 缩放比例


// 这个是echart实例的默认配置
let defaultOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine:{
      lineStyle:{
        color:'#fff',
        width:3, 
      },  
    } ,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',  
        fontSize : 30,
      },
      backgroundColor:'rgba(255,255,255,0.2)',
      padding:10,
      verticalAlign:'middle',
      margin:35,
      width:200, 
    },
  },
  yAxis: {
    show : false,
    type: 'value',
  }, 
  color:['#fff'],
  series: [
    {
      name: '折线图_百分比',
      type: 'line',
      data: [90, 80, 90, 64, 90, 70, 70],
      itemStyle : {
        normal : {
          color: '#fff',
          label: {
            formatter: '{c}%',
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff',
              fontSize:'24',
            }
          }
        }
      },
      lineStyle: {
        width: 5
      },
      symbol:'circle',
      symbolSize:20,  
    }, 

    {
      name: '柱状图_已完成',
      type: 'bar',
      data: [10, 30, 30, 30, 30, 30, 30],
      stack: '总量',//和下方的设置同一个值，实现堆叠图
      barWidth : 30,
      itemStyle : {
        normal : {
          color: '#fff',
          label: {
            formatter: '{c}%',
            show: true,
            position: 'left',
            textStyle: {
              color: '#fff',
              fontSize:'24',
            }
          }
        }
      },   
    },

    {
      name: '柱状图_未完成',
      type: 'bar',
      data: [40, 20, 20, 20, 20, 20, 20],
      stack: '总量',
      itemStyle : {
        normal : {
          color: 'rgba(255,255,255,0.2)',
          label: {
            formatter: '{c}%',
            show: true,
            position: 'left',
            textStyle: {
              color: '#fff',
              fontSize:'24',  
            }
          }
        }
      },
    }

  ]
};






// 结合数据源和默认echart数据，进行最新样式的组装。
function getNewOption(myConfig,apiData) {

  // 获取数据源数据，固定格式为：
  // [{"出库单":1,"sku":4,"type":"JIT"},
  //  {"出库单":2,"sku":5,"type":"B2C"},
  //  {"出库单":3,"sku":6,"type":"B2B"}]
  let data = myConfig;
  
  // 提取type的所有值为一个数组。例如["JIT"、"B2C"、"B2B"]
  let types = _.map(apiData,"type");
  
  // keys，例如['出库单','sku','type']
  let keys = _.keys(apiData && apiData[0]);
  
  // 有效的keys（排除type），例如['出库单','sku']
  let effectiveKeys = keys.slice(0);
  let index = effectiveKeys.indexOf('type');
  if (index > -1) {effectiveKeys.splice(index, 1)}

  // series 配置，例如 
  // [{name: '出库单',data: [1, 2, 3]},
  //  {name: 'sku',  data: [4, 5, 6]}]
  let series = []
  for(let i=0;i<effectiveKeys.length;i++){
    series.push({
      name:effectiveKeys[i],
      data:_.map(apiData,effectiveKeys[i]),
      type:"bar"
    })
  }
  // legend 配置
  let legend = Object.assign({},{"data":effectiveKeys},data.echartOption.legend)
  //将字符串转成布尔
  legend.show = legend.show==="false"?false:true;
  // xAxis、yAxis 配置
  let axisLabel = Object.assign({},data.echartOption.axisLabel);
  axisLabel.show = axisLabel.show==="false"?false:true //将字符串转成布尔
  let xAxis = {
    "axisLabel":axisLabel,
    "data":types
  }
  let yAxis = {
    "axisLabel":axisLabel,
    "type": "value"
  }

  // title 配置
  let title = data.echartOption.title;
  // color 配置
  let color = data.echartOption.color.split('|')

  // 最新的配置
  let newOption = JSON.parse(JSON.stringify(defaultOption));
  newOption.title = title;
  newOption.color = color;
  newOption.series = series;
  newOption.legend = legend;
  newOption.xAxis = xAxis;
  newOption.yAxis = yAxis;

  //return newOption;
  return defaultOption;
}


export default {
  name: "new_bar",
  props: {
    myConfig: Object,
    canvasConfig: Object,
  },
  data() {
    return {
      myEchart:null,
      diyCoreCode:'',
      apiData:[],
      store:store,

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
      return bee.objToCSS( bee.replaceKey(this.myConfig.css,map) );
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
    initWidget:function(myConfig){
      //组件基本样式数据
      let dataUrl = myConfig.dataUrl;
      let diyCoreCode = myConfig.diyCoreCode;
      this.diyCoreCode = diyCoreCode;
      let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
      //获取数据源
      axios.post(baseUrl + dataUrl,params).then(response => {
        let apiData = response.data.data;
        this.apiData = apiData;
        this.myEchart = echarts.init(document.getElementById(myConfig.id))
        this.myEchart.setOption(getNewOption(myConfig,apiData));
      });
    },
    updatedWidget:function(val){
      //组件基本样式数据
      let dataUrl = val.dataUrl;
      let diyCoreCode = val.diyCoreCode;
      //只有diyCoreCode发生改变的时候才调接口！
      if(this.diyCoreCode!==diyCoreCode){
        this.diyCoreCode=diyCoreCode
        let params = Object.assign({},{diyCoreCode:diyCoreCode},store.state.store_globalContion);
        //获取数据源
        axios.post(baseUrl + dataUrl,params).then(response => {
          let apiData = response.data.data;
          this.apiData = apiData;
          this.myEchart.setOption(getNewOption(val,apiData),true);//这个true参数很重要，否则会有残留数据
        });
      }else{
        this.myEchart.setOption(getNewOption(val,this.apiData));
      }

      //必须异步，随着外容器的改变，调整size
      setTimeout(()=>{
         this.myEchart.resize();
      },0)

    },
    clickFun(widgetId){
      //只有在编辑页面，这个点击才有效
      if(this.$el.parentElement.id==="editCanvas"){
        store.dispatch("setSelectWidgetId",widgetId);
        bus.$emit("widgetClick",widgetId);
      }
    }
  },
  // 最近坑有点多，什么使用watch，什么时候用updated呢，主要看，props传入的是个对象时，如果你不是直接在模板中使用属性的话，
  // 外界的更新是不会触发组件的update的（虽然组件的中的那个对象已经发生了改变）。这个时候使用watch就比较合适
  watch:{
    "myConfig":{
      //注意，watch对这个myConfig对象的属性，无法做newVal、oldVal的区分，两者是一样的。
      //watch只有对一开始就存在的属性才能有效。
      handler:function(newVal,oldVal){
        console.log('watched!')
        this.updatedWidget(newVal,oldVal)
      },
      deep: true
    },
    "canvasConfig.grid":function(v){
      this.grid=[v,v];
    }
  },
  mounted: function() {
    console.log('mounted!')
    this.initWidget(this.myConfig);
  },
  updated(){
  }
};

</script>


<style lang="scss">
.selectBorder{
  position: absolute;
  top:0px;
  left:0px;
  width: 100%;
  height:100%;
  background: rgba(0,231,255,0.11);
  border: solid 1px rgba(0,231,255,0.3);
}
.widgetBox {
  position: absolute;
  box-sizing: border-box;
  .widgetCon {
    width: 100%;
    height: 100%;
  }
  .infoBox{
    color:#4f8ff9;
    font-size:12px;
    margin-top: 5px;
  }
}
</style>



