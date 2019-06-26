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
          v-if = "myConfig.downloadColumn.show"
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="downLoadFun(scope.row)" type="text" size="small">下载</el-button>
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
      {{noDataInfo2}}
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
    "tableData":null,
    "currentSearchOptions":null,
    "currentUseCode":null,
    "currentUseUrl":null,
    
    "currentPage":null,
    "pageSize":null,
    "showPage":null,
    "totalPage":null,

    "tableColumnWidth":null,

    "resultColumnList":null,   //表头数据
    "noDataInfo":null,         //没有数据的时候的提示文字

    "myConfig":null,
  },
  data() {
    return {
      store:store,
      myTableData:this.tableData,
      myCurrentPage:this.currentPage,

      "exportBtnText":this.myConfig.exportBtn.text,
      "exportBtnShow":this.myConfig.exportBtn.show,

      "noDataInfo2":this.noDataInfo || "数据不存在"
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
  },
  methods:{
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

      //如果需要显示分页，要带上这两个参数
      if(this.showPage){
        body.currentPage = this.myCurrentPage;
        body.pageSize = this.pageSize
        //根据点击分页，更新数据
        axios.post(this.currentUseUrl,body).then(response => {
          let myTableData = response.data.data.recordList;
          //增加一列ID的数据
          for(let i=0;i<myTableData.length;i++){
            myTableData[i].ID = i+1;
          }
          this.myTableData =  myTableData;
        });
      }else{
        //根据点击分页，更新数据
        axios.post(this.currentUseUrl,body).then(response => {
          let myTableData = response.data.data;
          //增加一列ID的数据
          for(let i=0;i<myTableData.length;i++){
            myTableData[i].ID = i+1;
          }
          this.myTableData =  myTableData;
        });
      }


    },
    downLoadFun(rowData){
      window.open(rowData[this.myConfig.downloadColumn.columnKey])
    }
  },
  computed: {
   
  },
  mounted(){
    console.log('表格组件接受数据===>')
    console.log(this.tableData)
    console.log(this.resultColumnList)
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
