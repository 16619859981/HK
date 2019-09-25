<template>
  <el-container class="container">
    <el-header class="header" style="height: 70px">
      <div class="header-box">
        <div class="header-box-left" >
        <img src="../../../static/images/logo2.png" alt="">
        </div>
        <div class="header-box-center" @click="homePage()">
          <div class="header-box-center-center">红广后台</div>
        </div>
        <!-- <AppBreadcrumb :list="[{ path: '', label: '内容管理' }, { label: '专辑列表' } ]" /> -->
        <div class="header-box-center2">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img
                :src="AdminImg"
                alt
                style="width:36px; height:36px;border-radius: 50%;"
              >
              {{ name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="editPsd()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogoOut()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- <p style="color:#B2B2B2;">{{ name }}</p> -->
        </div>
        <div class="center-center-1">
          <i class="new" v-if="newsNum!=0"></i>
          <img src="./msg.png" alt style="width: 20px; height: 20px;" @click="news()">
        </div>
        
        <!-- <div class="header-box-right">
        <el-button @click="handleLogoOut" size="mini">退出</el-button>
        </div>-->
      </div>
      </el-header>
    <el-container class="container">

     <el-aside class="aside" v-bind:style='{height:minHeight}'>
        <el-scrollbar style="height:100%">
      <el-menu
         :default-active="$route.path"
          class="nav-menu"
          :unique-opened="true"
          @open="handleOpen"
          @close="handleClose"
          @select="handleMenuSelect"
          background-color="#FFFFFF"
          text-color="#606266"
          active-text-color="#FFFFFF"
          :router="true"
        >
          <el-submenu :index="scpoed.rightId" id="item" v-for="(scpoed,index) in homeList" :key="index">
            <template slot="title">
              <i :class="scpoed.icon" style="margin-right:5px;"></i>
              <span class="item">{{scpoed.name}}</span>
            </template>
            <el-menu-item :index="row.path" v-for="(row,indexs) in scpoed.menuBo" :key="indexs">
              <span>{{row.name}}</span>
            </el-menu-item>
          </el-submenu>
           <el-submenu index="19" id="19" >
            <template slot="title">
              <i  style="margin-right:5px;"></i>
              <span class="item">qwqweqe</span>
            </template>
            <el-menu-item index="/albumManagement" >
              <span>sdfsfsf</span>
            </el-menu-item>
          </el-submenu>
  
        </el-menu>
        </el-scrollbar>
        <!-- active-text-color="#ffd04b" 点击子菜单选中的样式-->
     
      </el-aside>
  
 
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>

    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
      <span>确定要修改密码么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editStatUs()" style="padding: 12px 24px; font-size: 12px">确认</el-button>
        <el-button @click="dialogVisible = false" style="padding: 12px 24px; font-size: 12px">取消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogVisiblePsd" width="30%">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="请输入新密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edit()" style="padding: 12px 24px; font-size: 12px">确认</el-button>
        <el-button @click="dialogVisiblePsd = false" style="padding: 12px 24px; font-size: 12px">取消</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import api from "../api/index.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
        minHeight: window.innerHeight,
      name: window.sessionStorage.getItem("name"),
      userType: window.sessionStorage.getItem("userType"),
      AdminImg: '',
      dialogVisible: false,
      dialogVisiblePsd: false,
      ruleForm2: {
        pass: "",
        checkPass: ""
      },

      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      newsNum:"",
      homeList: [],
      breadcrumbs: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    AdminImg1 () {
      this.AdminImg = api.getUpload(window.sessionStorage.getItem('fileUrl'))
    },
    handleLogoOut() {
        var _that = this
      this.$confirm("确认退出吗?", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            _that.$http.post(api.getPlatform("/logout")).then(res => {
                if (res.data.status == 200) {
                  window.sessionStorage.removeItem("token");
                  window.sessionStorage.removeItem("orgType");
                  window.sessionStorage.removeItem("orgName");              
                  window.sessionStorage.removeItem("orgIntro");
                  window.sessionStorage.removeItem("id");
                  window.sessionStorage.removeItem("orgid");
                  window.sessionStorage.removeItem("name");
                  window.sessionStorage.removeItem("fileUrl");
                  window.sessionStorage.removeItem("mobile");
                  this.$router.push("/login");

                  this.$message({
                    type: "success",
                    message: "退出成功!"
                  });
                }
        });
        
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },

    editStatUs() {
      this.ruleForm2.checkPass = this.$md5(
        this.$md5(this.ruleForm2.checkPass) + "hongka"
      );
      this.$http
        .post(api.getPlatform("/updatePassword"), {
          password: this.ruleForm2.checkPass
        })
        .then(res => {
          if (res.data.status == 200) {
            this.$message.success("修改成功，请重新登录");
            this.dialogVisible = false;
            window.sessionStorage.removeItem("token");
            window.sessionStorage.removeItem("orgType");
            window.sessionStorage.removeItem("orgName");
            window.sessionStorage.removeItem("userType");
            window.sessionStorage.removeItem("orgIntro");
            window.sessionStorage.removeItem("id");
            window.sessionStorage.removeItem("orgid");
            window.sessionStorage.removeItem("name");
            window.sessionStorage.removeItem("fileUrl");
            window.sessionStorage.removeItem("mobile");
            this.$router.push("/login");
          }
        });
    },

    editPsd() {
      this.dialogVisiblePsd = true;
    },

    edit() {
      if (this.ruleForm2.pass == "" || this.ruleForm2.checkPass == "") {
        this.$message.error("请填写全部内容");
        return;
      }
      if (this.ruleForm2.pass != this.ruleForm2.checkPass) {
        this.$message.error("两次输入密码不一致");
        return;
      }
      this.dialogVisiblePsd = false;
      this.dialogVisible = true;
    },
    news() {
      this.$router.push({
        path: "/commentlist"
        // query: {
        //   id: row
        // }
      });
      this.newsNum=0;
    },
    handleNews() {
      this.$http
        .post(api.getPlatform("/message/notice/returnMessageNum"))
        .then(res => {
          if (res.data.status == 200) {
            this.newsNum = res.data.data.total;
          }
        });
    },
    handleMeun() {
      this.$http.post(api.getPlatform("/menu/menuList"), { id: window.sessionStorage.getItem('id') }).then(res => {
          if (res.data.status == 200) {
            // console.log(res.data.data)
       
            this.homeList = res.data.data
          }
        });
    },
    homePage() {
       this.$router.push({
        path: "/homePage"
     
      });
    },

    handleMenuSelect (index) {
      this.homeList.forEach(first => {
        const second = first.menuBo.find(second => second.path === index)
        if (second) {
          // console.log(first, second)
          this.breadcrumbs.push(first)
        }
      })
    }
    
  },
  created() {
    this.handleNews()
    this.handleMeun()
    this.AdminImg1()
        const that = this;
        window.onresize = () => {
      return (() => {

  that.minHeight=(window.innerHeight - 70) + 'px'
      })()
            
    }
},
   mounted () {


  },
};
</script>

<style scoped>
.header {
  line-height: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: rgb(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.5);
  position: fixed;
  z-index: 2000;
}
.header-box-left {
  /* background-color: #0e1429; */
}
.active {
  color: #fff;
}
.aside {
  margin-top: 70px;

  height:800px;
  width: 160px !important;

  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  z-index: 10;

}
.aside::-webkit-scrollbar {
    display: block;
}

.el-main {
  padding: 0px;
}
.main {
  margin-top: 70px;
  background-color: #f5f7fa;
  /* padding-top: 2px; */
  margin-left: 160px;
  /* border-left: 1px solid #ccc; */
  height: 100%;
}

.header-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.header-box .header-box-left {
  float: left;
   width: 35px;
    height:35px;
  text-align: center;
  /* box-sizing: border-box; */
  /* padding-left: 10px; */
  /* padding-right: 10px; */
}

.header-box .header-box-left img {
    width: 35px;
    height:35px;
  vertical-align: middle;
  margin-left: 20px;
    margin-top: 18px;
}

.header-box-center2 {
  float: right;
  line-height: 36px;
  text-align: center;
  margin-top: 17px;
  border-left: 1px solid #ededed;
  /* padding-top: 16px; */
  margin-left: 15px;
    margin-right: 15px;
}

.center-center-1 {
  width: 20px;
  float: right;
  position: relative;
  line-height: 20px;
  text-align: center;
  margin-top: 25px;
  /* border-left: 1px solid #EDEDED; */
}

.header-box-center2 span {
  font-size: 16px;
  line-height: 36px;
  display: block;
  height: 36px;
  color: rgba(37, 38, 43);
  /* border-right: 1px solid #ccc; */
  cursor: pointer;
}

.header-box .header-box-right {
  width: 66px;
  float: right;
}

.header-box-center {
  float: left;
  /* margin-left: -2px; */
  width: 140px;
  height: 70px;
  /* padding-top: 10px; */
  /* padding-bottom: 10px; */
  box-sizing: border-box;
  cursor: pointer;
}

.header-box-center-center {
  width: 100%;
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 20px;
  /* background: rgba(247, 249, 252, 1); */
  color: rgba(37, 38, 43);
  padding-left: 5px;
}

span {
  font-size: 14px;
  /* color:#fff; */
}

.el-submenu .el-menu-item {
  min-width: 140px;
}
.el-button:visited {
  background-color: #578cfc;
  border: none;
  color: #fff;
}

.el-button:hover {
  color: #fff;
  border-color: none;
  background-color: #578cfc;
}
.el-button:active {
  background-color: #578cfc;
  border: none;
  color: #fff;
}
.shou {
  padding: 0px !important;
  padding-left: 15px !important;
}
.new {
  width: 10px;
  height: 10px;
  display: block;
  background-color: red;
  border-radius: 5px;
  position: absolute;
  right: -5px;
  top: -3px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-container {

    background: #fff;
}
</style>

