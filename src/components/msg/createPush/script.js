import api from '../../api/index'
export default {
  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      commitAble: false,
      commitNum: 0,
      ruleForm: {
        // type: 1,
        title: '',
        content: '',
        range: '',
        // ptime: '',
        // status: '',
        linkUrl: '',
        linkType: '',
        // publishType: '',
        userID: '',
        uploadArr: [{
          type: 'text',
          areaText: ''
        }, ],

      },
      loading: false,
      content: '发送验证码',
      totalTime: 60,
      canClick: true,

      rules: {
        title: [{
          required: true,
          message: '请输入push标题',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }
        ],
        codeId: [{
          required: true,
          message: '请输入手机验证码',
          trigger: 'blur'
        }],


        linkType: [{
          required: true,
          message: '请输入链接类型',
          trigger: 'blur'
        }],
        range: [{
          required: true,
          message: '请选择发布对象',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入通知内容',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 80,
          message: '长度在 1 到 80 个字符',
          trigger: 'blur'
        }
        ],
        publishType: [{
          required: true,
          message: '请选择发布时间',
          trigger: 'blur'
        }],
        userID: [{
          required: true,
          message: '请输入用户ID',
          trigger: 'blur'
        }],





      },
      options: [],

      dialogVisiblePass: false,
      dialogVisibleSub: false,
      dialogVisibleAbl: false,
      dialogVisiblePhone: false,
      dialogVisibleDel: false,
      dialogVisiblePhoneCode: false,
      dialogVisible:false,
      dialogVisibleDIY:false,
      fileList: [],
      codeId: '',
      number: '',
      //发布对象
      per: [
        //   {
        //   value: '1',
        //   label: '全部'
        // }, 
        // {
        //   value: '1',
        //   label: '全部'
        // }, {
        //   value: '2',
        //   label: '教师'
        // }, 
        {
          value: '3',
          label: '学生和家长'
        }
      ],
      value: '',
      pickerOptions0: {
        disabledDate: (time) => {


          return time.getTime() < Date.now() - 8.64e7;


        }
      },
      //预览信息
      checkMsg: {},
      //push手机预览
      title: '',
      con: '',




    };


  },
  methods: {
    //自定义页面上传
    beforeAvatarUpload1(file) {
      console.log(file)
      const type = file.name.split(".")
      console.log(type)
      if (type[type.length - 1] == 'jpg' ||
        type[type.length - 1] == 'png' ||
        type[type.length - 1] == 'jpeg' ||
        type[type.length - 1] == 'JPG' ||
        type[type.length - 1] == 'PNG' ||
        type[type.length - 1] == 'JPEG') {
        const isLt1M = file.size / 1024 / 1024 < 1;
        const type = file.name.split(".")
        if (
          type[type.length - 1] == 'jpg' ||
          type[type.length - 1] == 'png' ||
          type[type.length - 1] == 'jpeg' ||
          type[type.length - 1] == 'JPG' ||
          type[type.length - 1] == 'PNG' ||
          type[type.length - 1] == 'JPEG'
        ) {} else {
          this.$message.error('图片格式不支持!');
          return false
        }
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 1MB!');
          return false
        }
        this.ruleForm.uploadArr.push({
          type: 'img',
          imgSrc: '',
          imgId: ''
        })
      } else if (type[type.length - 1] == 'mp4') {
        this.ruleForm.uploadArr.push({
          type: 'mp4',
          mp4Url: '',
          mp4Id: ''
        })
      } else if (type[type.length - 1] == 'mp3') {
        this.ruleForm.uploadArr.push({
          type: 'mp3',
          mp3Url: '',
          mp3Id: ''
        })
      }else {
        this.$message.error('不支持该格式文件!');
        return false
      }






      // var _this = this;
      // return new Promise(function (resolve, reject) {
      //   var reader = new FileReader();
      //   reader.onload = function (event) {
      //     var image = new Image();
      //     image.onload = function () {
      //       var width = this.width;
      //       var height = this.height;
      //       if (width / height != 8 / 5) {
      //         _this.$message.error('图片宽高必须为8：5')
      //         reject();
      //       }
      //       resolve();
      //     };
      //     image.src = event.target.result;
      //   }
      //   reader.readAsDataURL(file);
      // });
    },
    handleAvatarSuccess1(res, file, fileList) {
      // console.log(res)
      // console.log(file)
      // console.log(res)
      // this.ruleForm[this.uploadDataIndex]['medalTaskFileId'] = res.data.fileId
      // this.imgSRC = res.data.realUrl
      const typeT = res.data.realUrl.split(".")
      if (typeT[typeT.length - 1] == 'jpg' ||
        typeT[typeT.length - 1] == 'png' ||
        typeT[typeT.length - 1] == 'jpeg' ||
        typeT[typeT.length - 1] == 'JPG' ||
        typeT[typeT.length - 1] == 'PNG' ||
        typeT[typeT.length - 1] == 'JPEG') {
        this.ruleForm.uploadArr[this.ruleForm.uploadArr.length - 1].imgSrc = api.getUpload(res.data.realUrl)
        this.ruleForm.uploadArr[this.ruleForm.uploadArr.length - 1].imgId = res.data.fileId
        console.log(this.ruleForm.uploadArr[this.ruleForm.uploadArr.length - 1])
      } else if (typeT[typeT.length - 1] == 'mp4') {
        this.ruleForm.uploadArr[this.ruleForm.uploadArr.length - 1].mp4Url = api.getUpload(res.data.realUrl)
        this.ruleForm.uploadArr[this.ruleForm.uploadArr.length - 1].mp4Id = res.data.fileId
      } else if (typeT[typeT.length - 1] == 'mp3') {
        this.ruleForm.uploadArr[this.ruleForm.uploadArr.length - 1].mp3Url = api.getUpload(res.data.realUrl)
        this.ruleForm.uploadArr[this.ruleForm.uploadArr.length - 1].mp3Id = res.data.fileId
      }

    
    },

    //排序
    divDel(index) {
      console.log(index)
      if (this.ruleForm.uploadArr.length == 1) {
        this.$message.error('最少要有一个有效元素！');
        return false
      }
      this.ruleForm.uploadArr.splice(index, 1)
    },

    divTop(index) {
      console.log(index)
      if (index == 0) {
        this.$message.error('已经是第一位了！');
        return false
      }
      this.ruleForm.uploadArr[index] = this.ruleForm.uploadArr.splice(index - 1, 1, this.ruleForm.uploadArr[index])[0]
    },

    divBottom(index) {
      console.log(index)
      if (index == this.ruleForm.uploadArr.length - 1) {
        this.$message.error('已经是最后一位了！');
        return false
      }
      this.ruleForm.uploadArr[index] = this.ruleForm.uploadArr.splice(index + 1, 1, this.ruleForm.uploadArr[index])[0]
    },
       //弹窗
       uploadImg() {
        console.log(this.ruleForm.uploadArr.length)
        if(this.ruleForm.uploadArr.length<20) {
          this.dialogVisible = true
          this.fileList = []
        }else {
          this.$message.error('最多只能添加二十个内容!')
        }
        
      },
  
      uploadText() {
        console.log(this.ruleForm.uploadArr.length)
        if(this.ruleForm.uploadArr.length<20) {
          this.ruleForm.uploadArr.push({
            type: 'text',
            areaText: ''
          })
        }else {
          this.$message.error('最多只能添加二十个内容!')
        }
        
      },
  

    //选择类型
    changeType(val) {
      // console.log(val)
      this.ruleForm.linkUrl = ""
     if (val == 2) {

        document.getElementById('placeholder').placeholder = "请输入专辑编号"
      } else if (val == 3) {

        document.getElementById('placeholder').placeholder = "请输入活动ID"
      } else if (val == 4) {
        document.getElementById('placeholder').placeholder = "请输入少年宫ID"
      } else if (val == 5) {
        document.getElementById('placeholder').placeholder = "请输入学校ID"
      } else if (val == 6) {
        document.getElementById('placeholder').placeholder = "请输入红广号ID"
      } else if (val == 7) {
        document.getElementById('placeholder').placeholder = "请输入链接"
      } 
    },




    //提交弹框

    subimt() {



      // if (this.ruleForm.range == 5) {
      //   // console.log(typeof this.ruleForm.userID) 
      //   if (this.ruleForm.userID == '' || this.ruleForm.userID == undefined) {
      //     this.$message.error('请填写用户ID')
      //     return false
      //   }
      // }

      this.commitNum = 0
      if (String(this.ruleForm.title).trim().length > 20) {
        this.$message.error('push标题为1-20个字符')
        return false
      }
      if (this.ruleForm.linkType == '') {
        this.$message.error('请选择跳转类型')
        return false
      } else if ( this.ruleForm.linkType == 8 && this.ruleForm.uploadArr[0].areaText == '') {
        this.$message.error('请输入自定义页面信息')
        return false
      }else
       if ( this.ruleForm.linkType != 1 && this.ruleForm.linkUrl == ''&&this.ruleForm.linkType != 8) {
        this.$message.error('请输入跳转链接')
        return false
      }
      if (this.ruleForm.range == '') {
        this.$message.error('请选择发布对象')
        return false
      }
      if (String(this.ruleForm.content).trim().length < 1) {
        this.$message.error('请填写push内容')
        return false
      }
      if (String(this.ruleForm.content).trim().length > 80) {
        this.$message.error('通知内容为1-80个字符')
        return false
      }
      // if(this.ruleForm.uploadArr.length>20) {
      //   this.$message.error('添加模块最多20个')
      //   return false
      // }
      if (this.ruleForm.linkType == 8 ) {
        for (var i = 0; i < this.ruleForm.uploadArr.length; i++) {
      
          if (this.ruleForm.uploadArr[i].type == "text") {
            console.log(this.ruleForm.uploadArr[i].type)
            if (String(this.ruleForm.uploadArr[i].areaText).trim().length < 1) {
              this.$message.error('请输入自定义页面信息')
              return false
            }
          }
  
        }
      }
      

      // if (this.ruleForm.publishType == '') {
      //   this.$message.error('请选择发布时间')
      //   return false
      // } else if (this.ruleForm.publishType == 1) {
      //   this.ruleForm.ptime = new Date().getTime()
      // } else if (this.ruleForm.publishType == 2 && this.ruleForm.ptime == "") {
      //   this.$message.error('请选择发布时间')
      //   return false
      // }

      // if (this.ruleForm.range == 5) {
      //   this.ruleForm.range = this.ruleForm.userID

      // }

      delete this.ruleForm.userID

      this.ruleForm.title = String(this.ruleForm.title).trim()



      // console.log(this.ruleForm)



      this.dialogVisibleSub = true
    },
    //获取验证码 
    huoquyzm() {
      if (this.content == '重新发送验证码' || this.content == '发送验证码') {
        var account =window.sessionStorage.getItem("account")
        this.$http.post(api.getPlatform('/message/message/sendCode'),{account:account}).then(res => {
          console.log(res)
          if (res.data.status == 200) {
            this.getCode()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }

    },
    submitCode() {
      this.dialogVisiblePhoneCode = true
      this.content = "发送验证码"
      this.codeId=""
      this.totalTime = 60
      this.huoquyzm()
    },
    //验证码内容
    getCode() {
      if (!this.canClick) return
      this.canClick = false
  

      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) { //当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true
        }
      }, 1000)
      // this.huoquyzm()
    },

    //弹框确认
    submitData() {

      this.loading = true
      if (this.codeId == "") {
        this.$message.error('请输入验证码')
        return false

      }
      this.commitNum++
      if (this.commitNum > 1) {
        return false
      }
      this.commitAble = true;
      this.ruleForm.codeId = this.$md5(this.$md5(this.codeId) + 'hongka')
      this.ruleForm["account"]= window.sessionStorage.getItem("account")
      this.$http.post(api.getPlatform('/message/message/pushNew'), this.ruleForm).then(res => {
        this.loading = false

        if (res.data.status == 200) {


          this.$message({
            message: '创建成功',
            type: 'success'

          })
          this.ruleForm = ''
          this.commitAble = false;
          this.dialogVisiblePhoneCode = false
          this.dialogVisibleSub = false
          this.$router.push('/APPPush')

        } else {

          this.$message({
            message: res.data.msg,
            type: 'error'

          })
          this.commitAble = false;
          this.dialogVisiblePhoneCode = false
          this.dialogVisibleSub = false
 
        }


      })

    },
    //取消按钮
    cancleData() {
      this.dialogVisiblePhoneCode = false
      this.dialogVisibleSub = true
     
    },

    del() {
      this.$router.push('/APPPush')
    },



    //预览
    preview() {

      if(this.ruleForm.linkType!=8) {
        this.$http.post(api.getPlatform('/message/getBannerInfo'), {
          type: this.ruleForm.linkType,
          id: this.ruleForm.linkUrl
        }).then(res => {
  
  
          if (res.data.status == 200) {
            this.checkMsg = res.data.data
            this.checkMsg.fileUrl = api.getUpload(this.checkMsg.fileUrl)
            this.dialogVisiblePass = true 
          } else if (res.data.status == 30005) {
            this.dialogVisibleAbl = true
  
          }
        })
      }else if (this.ruleForm.linkType==8){
        //自定义页面预览
        this.dialogVisibleDIY = true
      }
    


    },
    preview2() {
      if (String(this.ruleForm.title).trim().length > 20) {
        this.$message.error('push标题为1-20个字符')
        return false
      }
      if (String(this.ruleForm.content).trim().length > 80) {
        this.$message.error('通知内容为1-80个字符')
        return false
      }
      this.title = this.ruleForm.title
      this.con = this.ruleForm.content

      this.dialogVisiblePhone = true
    },
        //阻止同时播放
        playaudio(src) {
          let audioAll = document.getElementsByTagName('audio')
          let videoAll = document.getElementsByTagName('video')
    
          for(var i = 0 ; i < audioAll.length;i++) {
            if (src != audioAll[i].src) {
              audioAll[i].pause()
            }
          }
          for(var i = 0 ; i < videoAll.length;i++) {
            videoAll[i].pause()      
          }
        },
        playvideo(src) {
          let audioAll = document.getElementsByTagName('audio')
          let videoAll = document.getElementsByTagName('video')
    
          for(var i = 0 ; i < videoAll.length;i++) {
            if (src != videoAll[i].src) {
              videoAll[i].pause()
            }
          }
          for(var i = 0 ; i < audioAll.length;i++) {
            audioAll[i].pause()      
          }
        }
    






  },
  mounted() {


  }
}
