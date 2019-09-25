import api from '../../api/index'
import VueUeditorWrap from 'vue-ueditor-wrap';
import Vue from 'vue'
import datas from './areacode.json'
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      commitAble: false,
      commitNum: 0,
      ruleForm: {

        title: '',

        uploadArr: [{
          type: 'text',
          areaText: ''
        }, ],
      },
      dialogVisible: false,
      fileList: [],
      checkList: [],
      childrenPalaceRangeId: [],
      schoolRangeId: [],
      teacherRangeId: [],
      // 分割符号
      separate: ",",
      end_codes: [],

      rules: {
        title: [{
            required: true,
            message: '请输入通知标题',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],


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





      },

      checkMsg: {
        materialAlbumName: '',
        materialAlbumIntro: '',
        fileUrl: '',
      },
      dialogVisiblePass: false,
      dialogVisibleSub: false,
      dialogVisibleAbl: false,



      pickerOptions0: {
        disabledDate: (time) => {


          return time.getTime() < Date.now() - 8.64e7;


        }
      },
      bool:false,//判断是否有上传任务






    };


  },
  methods: {


    //自定义页面上传
    beforeAvatarUpload1(file) {
      this.bool=false
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
      this.bool=true
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

    //提交弹框

    subimt() {
      // if ( this.bool==false ) {
      //   this.$message.error('上传任务正在进行,请耐心等待');
      //   return false
      // }
      this.commitNum = 0
      if (String(this.ruleForm.title).trim().length < 1) {
        this.$message.error('请填写通知标题')
        return false
      }
      if (String(this.ruleForm.title).trim().length > 20) {
        this.$message.error('通知标题为1-20个字符')
        return false
      }
      if (this.checkList.length == 0) {
        this.$message.error('请选择发布范围')
        return false
      }
      for (var i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == '少年宫') {
          this.ruleForm['childrenPalace'] = '6'
          this.ruleForm['childrenPalaceRangeId'] = this.childrenPalaceRangeId
        } else if (this.checkList[i] == '学校') {
          this.ruleForm['school'] = '2'
          this.ruleForm['schoolRangeId'] = this.schoolRangeId
        } else if (this.checkList[i] == '中队辅导员') {
          this.ruleForm['teacher'] = '5'
          this.ruleForm['teacherRangeId'] = this.teacherRangeId
        } else if (this.checkList[i] == '红广号') {
          this.ruleForm['redMark'] = '7'
        }
      }
      // if(this.ruleForm.uploadArr.length>20) {
      //   this.$message.error('添加模块最多20个')
      //   return false
      // }
      for (var i = 0; i < this.ruleForm.uploadArr.length; i++) {
        if (this.ruleForm.uploadArr[i].type == "text") {
          if (String(this.ruleForm.uploadArr[i].areaText).trim().length < 1) {
            this.$message.error('请填写通知内容')
            return false
          }
        }
        if(this.ruleForm.uploadArr[i].type == 'img' ||this.ruleForm.uploadArr[i].type == 'mp3'||this.ruleForm.uploadArr[i].type == 'mp4') {
          if(this.bool==false) {
            this.$message.error('上传任务正在进行,请耐心等待');
            return false
          }
        }
      }
      // this.ruleForm.uploadArr = JSON.stringify(this.ruleForm.uploadArr)
      this.dialogVisibleSub = true
    },

    //弹框确认
    submitData() {
      this.commitNum++
      if (this.commitNum > 1) {
        return false
      }
      this.commitAble = true;

      this.$http.post(api.getPlatform('/message/message/newNotice'), this.ruleForm).then(res => {


        if (res.data.status == 200) {


          this.$message({
            message: '创建成功',
            type: 'success'

          })
          this.ruleForm = ''
          this.$router.push('/msgList')
          
          this.commitAble = false;


        }else {
          this.$message({
            message: res.data.msg,
            type: 'error'

          })
          this.commitAble = false;
        }
        this.dialogVisibleSub = false

      })

    },

    del() {
      this.$router.push('/msgList')
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
    //四级联动赋值

    this.end_codes = datas.datas
    this.end_codes = datas.datas

    this.end_codes = datas.datas


  }
}
