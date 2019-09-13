<template>
  <div class="mainCon">

    <!-- 文本框/大屏code复制区 -->
    <div class="myTextarea" v-if="showTextarea">
      <div class="info">
        【{{screenName}}】josn配置文件，请复制后放置到数据库对应的表中
        <span @click="closeFun">关闭</span>
        <span @click="copyFun">复制</span>
      </div>
      <el-input
        ref="xxx"
        type="textarea"
        :rows="10"
        v-model="textarea">
      </el-input>
    </div>


    <!-- 所有大屏的列表 -->
    <div class="listBox">

      <!-- 大屏列表（来自接口） -->
      <template v-for="(one) in reportList">
        <router-link :to="'/myReport?diyViewCode='+one.diyViewCode" :key="one.diyViewCode">
          <div class="myReport">{{one.viewName}}</div>
        </router-link>
      </template>

      <!-- 大屏列表（来自本地存储） -->
      <template v-for="(one) in reportList2">
        <router-link :to="'/myReport?diyViewCode='+one.code" :key="one.code" ref="one.code">
          <div class="myReport2">
            {{one.name}}
            <div class="editScreenBtn">
              <a @click.prevent="showConfigFun(one.code)"><i class="el-icon-edit-outline"></i></a>
              <router-link :to="'/createBigScreen2?modCode='+one.code">
                <i class="el-icon-edit"></i>
              </router-link>
              <a @click.prevent="copyScreenFun(one.code)"><i class="el-icon-star-on"></i></a>
              <a @click.prevent="deleteScreenFun(one.code)"><i class="el-icon-delete"></i></a>
            </div>
          </div>
        </router-link>
      </template>

      <!-- <router-link to="/createBigScreen" class="addBtn">+ 新建可视化</router-link> -->
      <router-link to="/createBigScreen2" class="addBtn">+ 新建可视化</router-link>
    </div>

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

    <!-- 导入大屏弹框 -->
    <el-dialog title="导入大屏" :visible.sync="loadScreenBoxVisible" width="400px">
      <el-form ref="loadForm" :model="loadForm" :rules="rules2">
        <el-form-item label="起个名儿" prop="name" :label-width="formLabelWidth">
          <el-input v-model="loadForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置文件" prop="configCode" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="loadForm.configCode"></el-input>
        </el-form-item>
        <el-form-item label="Code" prop="code" :label-width="formLabelWidth">
          <el-input v-model="loadForm.code" autocomplete="off" :disabled="codeInputDisabled"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loadScreenBoxVisible = false">取 消</el-button>
        <el-button type="primary" @click="loadScreenCodeFun('loadForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 导入 -->
    <div class="loadOneBtn">
      <div class="loadBtn" @click="open">+ 导入大屏</div>
    </div>
      

  </div>
</template>

<script>
import axios from "axios";
import {baseUrl,path} from '@/bee.config';
import bee from "@/src/tools/bee";


export default {
  name: "app",
  components: {
  },
  data() {
    return {
      showTextarea:false,
      screenName:'',
      textarea:'',

      isCollapse: true,
      reportList: [],
      reportList2: [],

      dialogFormVisible: false,
      loadScreenBoxVisible: false,
      
      myForm: {
        name: '',
        code: '',
      },
      rules: {
        name: [{ required: true, message: '请输入大屏名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入大屏code（任意字符串皆可，确保唯一性，以后会用此code获取大屏的内容）', trigger: 'blur' }]
      },
      formLabelWidth:'80px',
      codeInputDisabled:true,

      loadForm: {
        name: '',
        conifgCode: '',
        code: '',
      },
      rules2: {
        name: [{ required: true, message: '请为需要导入的大屏起个新的名称', trigger: 'blur' }],
        configCode: [{ required: true, message: '请复制要导入大屏的配置（json格式）', trigger: 'blur' }],
        code: [{ required: true, message: '请输入大屏code（任意字符串皆可，确保唯一性，以后会用此code获取大屏的内容）', trigger: 'blur' }]
      },

      codeForClone:'',

    };
  },
  methods: {
    //复制配置代码
    copyFun(){
      this.$refs.xxx.$el.firstChild.select();
      document.execCommand("Copy"); 
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
    //关闭 文本框
    closeFun(){
      this.showTextarea = false;
    },
    //显示 文本框
    showConfigFun(code){
      let config = JSON.parse(localStorage.getItem('screenList'))[code];
      this.textarea = JSON.stringify(config.json);
      this.screenName = config.name;
      this.showTextarea = true;
    },
    //删除大屏
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

    //复制大屏 弹层打开
    copyScreenFun(code){
      this.dialogFormVisible = true;
      this.myForm.code = 'screen-'+bee.guidGenerator();
      this.codeForClone = code;
      let screenList = JSON.parse(localStorage.getItem('screenList'))[code].name + "_拷贝"
      this.myForm.name = screenList;
    },
    //复制大屏 具体逻辑
    saveCloneScreenFun(){
      let code = this.codeForClone;
      this.dialogFormVisible = true;
      //复制逻辑
      let screenList = JSON.parse(localStorage.getItem('screenList'));
      screenList[this.myForm.code] = JSON.parse(JSON.stringify(screenList[code]));
      screenList[this.myForm.code].name = this.myForm.name;
      screenList[this.myForm.code].code = this.myForm.code;
      localStorage.setItem("screenList",JSON.stringify(screenList));
      this.reportList2 = screenList;
    },

    //导入大屏 弹层打开
    open() {
      this.loadScreenBoxVisible = true;
      this.loadForm.code = 'screen-'+bee.guidGenerator();
      this.$refs['loadForm'] && this.$refs['loadForm'].resetFields();
    },
    //导入大屏 具体逻辑
    loadScreenCodeFun(formName){
      //验证表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("==>");
          // let code = this.codeForClone;
          // this.loadScreenBoxVisible = true;
          // //复制逻辑
          // let screenList = JSON.parse(localStorage.getItem('screenList'));
          // screenList[this.myForm.code] = JSON.parse(JSON.stringify(screenList[code]));
          // screenList[this.myForm.code].name = this.myForm.name;
          // screenList[this.myForm.code].code = this.myForm.code;
          // localStorage.setItem("screenList",JSON.stringify(screenList));
          // this.reportList2 = screenList;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

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

<style lang="scss" scoped>



.mainCon{
  .listBox{
    .myReport2{
      position: relative;
      .editScreenBtn{
        width: 25px;
        position: absolute;
        bottom:0px;
        right:0px;
        cursor: pointer;
        font-size: 20px;
        color:#fff;
      }
    }
    .addBtn{
      width:150px;
      height:150px;
      line-height:150px;
      text-align:center;
      border:dashed 2px lightseagreen;
      display:inline-block;
      vertical-align: middle;
      box-sizing: border-box;
      margin-right: 20px;
      margin-bottom: 20px;
    }    
  }
  .loadOneBtn{
    position: absolute;
    right:20px;
    bottom:20px;
    .loadBtn{
      background: #555;
      padding: 5px 10px;
      border-radius: 5px;
      color:#ccc;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.myTextarea{
  color:#888;
  margin-bottom: 20px;
  .info{
    margin-bottom: 10px;
    span{
      color: #00baff;
      margin-left:20px;
      float: right;
      cursor:pointer;
    }
  }
  .el-textarea__inner{
    border:solid 1px #00baff;
    background: #333;
    color:#888;
  }
  
  ::selection {
    background:rgba(0, 222, 255, 0.39) 0; 
    color:#fff;
  }
}
</style>
