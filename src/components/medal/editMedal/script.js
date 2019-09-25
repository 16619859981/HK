import axios from 'axios'
import api from '../../api/index'

export default {

  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      ruleForm: [{
        fileUrl: "",
        medalName: "",
        fileId: "",
      }],
      medalName: "",
      medalType: "",
      //获取图片上传的index
      index: "",
      dialogVisible: false,
      dialogVisibleDel: false,
      num: 0,
      loading: false,
      businessId: this.$route.query.id,
    };


  },
  created() {
    // this.getParams()

  },

  methods: {
    //查看渲染数据
    // 渲染列表
    renderList() {
      this.$http.post(api.getPlatform('/medal/meMedal/medalList'), {
        businessId: this.businessId
      }).then(res => {
        if (res.data.status == 200) {
          console.log(res.data.data) //组织类型
          if (res.data.data.medal.userType == 1) {
            res.data.data.medal.userType = "平台/中少红卡"
          } else if (res.data.data.medal.userType == 2) {
            res.data.data.medal.userType = "学校"
          } else
          if (res.data.data.medal.userType == 3) {
            res.data.data.medal.userType = "班级 "
          } else if (res.data.data.medal.userType == 7) {
            res.data.data.medal.userType = "红广号/大咖"
          } else
          if (res.data.data.medal.userType == 10) {
            res.data.data.medal.userType = "基地/少年宫"
          }
          if (res.data.data.medalImage.length > 1) {
            this.num = 1

          }
          for (var i = 0; i < res.data.data.medalImage.length; i++) {

            res.data.data.medalImage[i].fileUrl = api.getUpload(res.data.data.medalImage[i].fileUrl)
          }
          this.ruleForm = res.data.data.medalImage
          console.log(this.ruleForm)
          console.log(res.data.data.medalImage.length)

          this.medalName = res.data.data.medal.medalName
          this.medalType = res.data.data.medal.medalType
          console.log(this.medalName)
          console.log(this.medalType)



        }
      })
    },

    //获取图片idnex
    getindex(idx) {
      this.index = idx;
      console.log(idx)


    },

    //图片上传
    handleAvatarSuccess(res, file, fileList) {
      this.ruleForm[this.index].fileId = res.data.fileId;
      console.log(this.ruleForm[this.index].fileId)
      this.ruleForm[this.index].fileUrl = api.getUpload(res.data.realUrl);
    },

    beforeAvatarUpload(file) {

      const isLt1M = file.size / 1024 / 1024 < 1;


      const type = file.name.split(".")

      if (
        type[type.length - 1] == 'png' ||
        type[type.length - 1] == 'PNG'
      ) {

      } else {
        this.$message.error('上传封面只能是png格式!');
        return false
      }


      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
        return false

      }

      var _this = this;
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var image = new Image();
          image.onload = function () {
            var width = this.width;
            var height = this.height;
            if (width != height) {
              _this.$message.error('图片宽高必须相等')
              reject();
            }
            // if (height != 360) { 
            //     _this.$message.error('图片宽高必须是360*360')

            //     reject(); 
            // } 
            resolve();
          };
          image.src = event.target.result;
        }
        reader.readAsDataURL(file);
      });

    },
    //增加奖章
    addMedal() {
      this.num = 1
      this.ruleForm.push({
        fileUrl: "",
        medalLevel: "",
        fileId: "",
      })
    },

    //提交按钮
    submit1() {
      this.dialogVisible = true
    },
    submit() {

      if (String(this.medalName).trim().length == 0) {
        this.$message.error('奖章名称不得为空')
        this.dialogVisible = false
        return false
      } else if (String(this.medalName).trim().length > 6) {
        this.$message.error('奖章名称最多6个字')
        this.dialogVisible = false
        return false
      }
      if (this.num == 1 && this.medalType == "") {
        this.$message.error('请选择发放步骤')
        this.dialogVisible = false
        return false
      }
      for (var i = 0; i < this.ruleForm.length; i++) {

        if (this.ruleForm[i].fileId == "") {
          this.$message.error('请上传奖章')
          this.dialogVisible = false
          return false
        }
        if (this.num == 1 && this.ruleForm[i].medalName == "") {
          this.$message.error('请填写奖章级别')
          this.dialogVisible = false
          return false
        }

      }

      this.loading = true
      this.$http.post(api.getPlatform('/medal/meMedalGroup/medalUpdate'), {
        medalType: this.medalType,
        medalName: this.medalName,
        ruleForm: this.ruleForm,
        businessId: this.businessId

      }).then(res => {
        this.loading = false
        if (res.data.status == 200) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })

        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
        this.dialogVisible = false
        this.$router.push({
          path: '/medalList',

        });
      })



    },






  },
  mounted() {

    this.renderList()

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }

}
