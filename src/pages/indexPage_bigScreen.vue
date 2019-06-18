<template>
  <div clas="">

    <template v-for="(one) in reportList">
      <router-link :to="'/myReport?diyViewCode='+one.diyViewCode" :key="one.diyViewCode">
        <div class="myReport">{{one.viewName}}</div>
      </router-link>
    </template>

    <template v-for="(one) in reportList2">
      <router-link :to="'/myReport?diyViewCode='+one.code" :key="one.code" ref="one.code">
        <div class="myReport2">
          {{one.name}}
          <div class="editScreenBtn">
            <router-link :to="'/createBigScreen2?modCode='+one.code">
              <i class="el-icon-edit"></i>
            </router-link>
            <a @click.prevent="copyScreenFun(one.code)"><i class="el-icon-star-on"></i></a>
            <a @click.prevent="deleteScreenFun(one.code)"><i class="el-icon-delete"></i></a>
          </div>
        </div>
      </router-link>
    </template>

    <!-- <router-link to="/createBigScreen">
      <add-btn></add-btn>
    </router-link> -->
    <router-link to="/createBigScreen2">
      <add-btn></add-btn>
    </router-link>

    <!-- 复制大屏弹框 -->
    <el-dialog title="复制大屏视图" :visible.sync="dialogFormVisible" width="400px">
      <el-form ref="myForm" :model="myForm" :rules="rules">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="myForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Code" prop="code" :label-width="formLabelWidth">
          <el-input v-model="myForm.code" autocomplete="off" :disabled="codeInputDisabled"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCloneScreenFun">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import {baseUrl,path} from '@/bee.config';
import addBtn from "../components/addBtn.vue";
import bee from "@/src/tools/bee";


export default {
  name: "app",
  components: {
    addBtn
  },
  data() {
    return {
      isCollapse: true,
      reportList: [],
      reportList2: [],

      dialogFormVisible: false,
      myForm: {
        name: '',
        code: '',
      },
      formLabelWidth:'80px',
      rules: {
        name: [{ required: true, message: '请输入大屏名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入大屏code（任意字符串皆可，确保唯一性，以后会用此code获取大屏的内容）', trigger: 'blur' }]
      },
      codeInputDisabled:true,

      codeForClone:'',

    };
  },
  methods: {
    deleteScreenFun(code){

      this.$confirm('确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除逻辑
          let screenList = JSON.parse(localStorage.getItem('screenList'));
          delete screenList[code]
          localStorage.setItem("screenList",JSON.stringify(screenList))
          this.reportList2 = screenList;
          //提示
          this.$message({type: 'success',message: '删除成功!'});
        }).catch(() => {
          this.$message({type: 'info',message: '已取消删除'});          
        });
    },
    copyScreenFun(code){
      this.myForm.code = 'screen-'+bee.guidGenerator();
      this.codeForClone = code;
      this.dialogFormVisible = true;
      let screenList = JSON.parse(localStorage.getItem('screenList'))[code].name + "_拷贝"
      this.myForm.name = screenList
    },
    saveCloneScreenFun(){
      let code = this.codeForClone;

      this.dialogFormVisible = false;
      //复制逻辑
      let screenList = JSON.parse(localStorage.getItem('screenList'));
      screenList[this.myForm.code] = JSON.parse(JSON.stringify(screenList[code]));
      screenList[this.myForm.code].name = this.myForm.name;
      screenList[this.myForm.code].code = this.myForm.code;
      localStorage.setItem("screenList",JSON.stringify(screenList));
      this.reportList2 = screenList;
    },
  },
  mounted: function() {
    //获取已经存在的数据
    axios.get(baseUrl + path + "/api_v1/diy/view/template/list").then(response => {
      this.reportList = response.data.data;
    });

    //从本地储存中获取
    let list = JSON.parse(localStorage.getItem('screenList'));
    this.reportList2 = list;
  },
  computed:{
  }
};
</script>

<style lang="scss">

  .myReport2{
    position: relative;
    .editScreenBtn{
      width: 25px;
      // height:25px;
      // background: red;
      position: absolute;
      top:0px;
      right:0px;
      cursor: pointer;
      font-size: 20px;
      color:#fff;
    }
  }


</style>
