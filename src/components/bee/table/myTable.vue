<template>
  <div class="myTableBox">
    <div v-if="tableData.length">

      <!-- 导出按钮 -->
      <div class="exportBar" v-if="exportBtnShow">
        <el-button type= "primary" @click="exportFun">{{exportBtnText}}</el-button>
      </div>

      <!-- 表格 -->
      <el-table :data="myTableData" style="width: 100%">
        <template v-for="(one,index) in resultColumnList">
          <el-table-column
            :key = "index"
            :prop = one.columnName 
            :label= one.displayName
            :width= "tableColumnWidth"
          >
          </el-table-column>
        </template>

        <el-table-column
          v-if = "downloadColumnShow"
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="downLoadFun(scope.row)" type="text" size="small">{{downloadColumnText}}</el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-if="showPage"
        background
        layout = "prev, pager, next"
        :total = "totalPage"
        :current-page = "currentPage"
        :page-size = "pageSize"
        @current-change = pageChangeFun
      >
      </el-pagination>

    </div>    
    <div v-else>
      {{noDataInfo}}
    </div>


  </div>
</template>

<script>
import axios from "axios";
import {baseUrl,path} from '@/bee.config';
import store from '@/src/store';

export default {
  name: "myTable",
  props: {
    "resultColumnList":null,   //表头数据
    "tableData":null,          //表体数据
    
    "currentSearchOptions":null,
    "currentUseCode":null,
    "currentUseUrl":null,
    
    "currentPage":null,
    "pageSize":null,
    "showPage":null,
    "totalPage":null,

    "tableColumnWidth":null,

    "myConfig":null,
  },
  data() {
    return {
      store:store,
      myTableData:this.tableData,
      myCurrentPage:this.currentPage,

      exportBtnText:'',      //导出按钮 文字
      exportBtnShow:'',      //导出按钮 是否显示
      
      downloadColumnShow:'', //每行下载文字 是否显示
      downloadUrlKey:'',     //每行下载url的key设置（即：二维表数据中哪个key是控制下载连接的，需要指出来）
      downloadColumnText:'', //每行下载文字 文本

      noDataInfo:'',  //没有数据时 默认文本

      showIndexColumn:'', //是否显示“序列”列
    };
  },
  watch:{
    "tableData":function(newData){
      this.myTableData = newData;
      // console.log('表格组件接受数据===>更新')
      // console.log(this.tableData)
      // console.log(this.currentSearchOptions)
      // console.log(this.currentUseCode)
      // console.log(this.currentUseUrl)
    },
    "myConfig":{
      handler:function(newConfig){this.dealWithMyConfig(newConfig)},
      deep:true,
    }
  },
  methods:{
    dealWithMyConfig(newConfig){
      this.exportBtnShow = newConfig.exportBtn.show == 'true';
      this.exportBtnText = newConfig.exportBtn.text;
      this.downloadColumnShow = newConfig.downloadColumn.show == 'true';
      this.downloadUrlKey = newConfig.downloadColumn.downloadUrlKey;
      this.downloadColumnText = newConfig.downloadColumn.downloadColumnText;
      this.noDataInfo = newConfig.noDataInfo || "数据不存在";
      this.showIndexColumn = newConfig.showIndexColumn == 'true';

      console.log('===--->')
      console.log(this.tableData)
    },
    //导出
    exportFun(){
      let exportUrl = baseUrl+path+'/api_v1/diy/view/excel/export?';
      exportUrl += "diyCoreCode=" + this.currentUseCode;
      
      //不需要这个参数
      //exportUrl += "&pageSize=" + this.pageSize;
      //exportUrl += "&currentPage=" + this.myCurrentPage;

      for(let key in this.currentSearchOptions){
        if (key!==''){
          exportUrl += "&"+key+"=" + this.currentSearchOptions[key];
        }
      }

      window.open(exportUrl);
    },
    pageChangeFun(thisPage){
      let that = this;

      //更新分页
      this.myCurrentPage = thisPage;

      //把当前分页，记录在store，和查询条件共享
      store.dispatch("setCurrentPage",thisPage);

      // const body = {
      //   diyCoreCode:this.currentUseCode,
      //   abc:this.currentSearchOptions,
      // }

      let abc = this.currentSearchOptions;
      let body = Object.assign({diyCoreCode:this.currentUseCode},abc);

      let myTableData;

      //如果需要显示分页，要带上这两个参数
      if(this.showPage){
        body.currentPage = this.myCurrentPage;
        body.pageSize = this.pageSize
        //根据点击分页，更新数据
        axios.post(this.currentUseUrl,body).then(response => {
          myTableData = response.data.data.recordList;
          //增加一列ID的数据
          for(let i=0;i<myTableData.length;i++){
            myTableData[i].bee_number = i+1;
          }
        });
      }else{
        //根据点击分页，更新数据
        axios.post(this.currentUseUrl,body).then(response => {
          myTableData = response.data.data;
          //增加一列ID的数据
          for(let i=0;i<myTableData.length;i++){
            myTableData[i].bee_number = i+1;
          }
        });
      }


      


    },
    downLoadFun(rowData){
      let url = rowData[this.downloadUrlKey];
      window.open(url);
    }
  },
  computed: {
   
  },
  mounted(){

    console.log('--')
    console.log(this.tableData)

    this.dealWithMyConfig(this.myConfig);

    //console.log('表格组件接受数据===>')
    //console.log(this.tableData)
    //console.log(this.resultColumnList)
    // console.log(this.currentSearchOptions)
    // console.log(this.currentUseCode)
    // console.log(this.currentUseUrl)
  },

};
</script>


<style lang="scss">
.exportBar{
  text-align: right;
}
.myTableBox{
  .el-table .cell{
    word-break: break-word;
  }
}
</style>
