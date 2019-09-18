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
//     "finish": 80,
//     "unfinish": 120,
//     "type": "CYCLE"
//   },
//   {
//     "finish": 40,
//     "unfinish": 40,
//     "type": "WALKING"
//   },
//   {
//     "finish": 60,
//     "unfinish": 40,
//     "type": "JOGGING MAN"
//   }
// ]

// 提取数据格式为：
// let data_text = ["CYCLE","WALKING","JOGGING MAN"];
// let data_percent = [0.4,0.5,0.75];
// let data_finish = [80,40,60];
// let data_unfinish = [120,40,40];

// 进一步处理为：
// let data_total = [200,80,100];                     // data_finish + data_unfinish 总数
// let data_zoom = [2,0.8,1];                         // data_total/100 缩放系数
// let data_percent = [140,150,175];                  // 先求得完成百分比，然后100*(n+1) 目的是显示在纵坐标100点以上
// let data_finish = [40,50,60];                      // n/zoom 目的是无论数据多大，都缩放到100点的位置
// let data_unfinish = [60,50,40];                    // n/zoom 目的是无论数据多大，都缩放到100点的位置


// 这个是echart实例的默认配置
let defaultOption = {
  legend: {
    data:['Picked','To Pick','Completion Rate'],
    x: 'center', 
    y: 'bottom',
    textStyle:{
      color:"#fff",
      fontSize:20,
    }
  },
  grid: {bottom: "25%",left:"0",right:"0"}, //把图往上偏移
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
        fontSize : 14,
      },
      backgroundColor:'rgba(255,255,255,0.2)',
      padding:10,
      verticalAlign:'middle',
      margin:35,
      width:200, 
      interval:0, //关键设置，采用标签不重叠的策略间隔显示标签
    },
  },
  yAxis: {
    show : false,
    type: 'value',
  }, 
  color:['#fff'],
  series: [
    {
      name: 'Completion Rate',
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
      name: 'Picked',
      type: 'bar',
      data: [10, 30, 30, 30, 30, 30, 30],
      stack: '总量',//和下方的设置同一个值，实现堆叠图
      barWidth : 30,
      itemStyle : {
        normal : {
          color: '#fff',
          label: {
            formatter: '{c}',
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
      name: 'To Pick',
      type: 'bar',
      data: [40, 20, 20, 20, 20, 20, 20],
      stack: '总量',
      itemStyle : {
        normal : {
          color: 'rgba(255,255,255,0.2)',
          label: {
            formatter: '{c}',
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
 
  let data_text = _.map(apiData,"type");
  let data_finish = _.map(apiData,"finish");
  let data_unfinish = _.map(apiData,"unfinish");

  let data_total = _.unzipWith([data_finish,data_unfinish], _.add)
  let data_zoom = data_total.map(function(one){return Number((one/100).toFixed(4))})
  let data_percent = data_finish.map(function(one,index){
    return data_total[index]?Math.round(100*(one/data_total[index]+1)):100;
  })
  data_finish = data_finish.map(function(one,index){return Number((one/data_zoom[index]).toFixed(4)) })
  data_unfinish = data_unfinish.map(function(one,index){return Number((one/data_zoom[index]).toFixed(4)) })

  //使用数据
  defaultOption.xAxis.data = data_text;
  defaultOption.series[0].data = data_percent;
  defaultOption.series[1].data = data_finish;
  defaultOption.series[2].data = data_unfinish;

  defaultOption.series[0].itemStyle.normal.label.formatter =  function(params) {
    let a = (params.data-100)+'%';
    return a; 
  }
  defaultOption.series[1].itemStyle.normal.label.formatter =  function(params) {
    let zoom = data_zoom[params.dataIndex]
    let a = Math.round(params.data*zoom)==0?'':Math.round(params.data*zoom);//0的时候不显示，免得和x坐标重叠。
    return a; 
  }
  defaultOption.series[2].itemStyle.normal.label.formatter =  function(params) {
    let zoom = data_zoom[params.dataIndex]
    let a = Math.round(params.data*zoom);
    return a; 
  }
  
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



