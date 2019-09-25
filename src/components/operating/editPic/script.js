import VueUeditorWrap from 'vue-ueditor-wrap';
import api from '../../api/index'
import {
  replaceHtmlStyle
} from '../../../replaceHtmlStyle'

export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      activityUserName :this.$route.query.activityUserName,
      ruleForm: {
        name: '',

        msg: '',

        subjectId: '',
        fileId: '',
        startTime: '',
        endTime: '',
        upTime: '',
        radio: '',
        type: 3,
        time: [],
        area: [],

      },
      activityDayStartTimeNum: 0,
      activityDayEndTimeNum: 0,
      sTime: 0,
      releaseTime: 0,
      activityRadioNum: 0,
      vote: [],
      activityAreaNum: 0,
      activityArea: [],
      loading: false,
      msg: '',
      per: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      imageUrl: '',
      time: [],
      rules: {
        activityName: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        },

        {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }


        ],
        activityStime: [{
          required: true,
          message: '请选择活动开始时间',
          trigger: 'blur'
        },

        ],
        activityItime: [{
          required: true,
          message: '请选择活动发布时间',
          trigger: 'blur'
        },

        ],
        activityEtime: [{
          required: true,
          message: '请选择活动结束时间',
          trigger: 'blur'
        },

        ],

        sub: [{
          required: true,
          message: '请选择活动专题',
          trigger: 'blur'
        }],

        activityIntro: [{
          required: true,
          message: '请填写活动简介',
          trigger: 'blur'
        }],
        img: [{
          required: true,
          message: '请上传封面',
          trigger: 'blur'
        }],
        area: [{
          required: true,
          message: '请选择地区',
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: '请填写选题',
          trigger: 'blur'
        }],
        domain: [{
          required: true,
          message: '请填写选项',
          trigger: 'blur'
        }],
        radio: [{
          required: true,
          message: '请选择发布时间',
          trigger: 'blur'
        }],

        activityRadio: [{
          required: true,
          message: '请选择是否推送红卡设备',
          trigger: 'blur'
        }],

        activityDayStartTime: [{
          required: true,
          message: '请选择评论开始时间',
          trigger: 'blur'
        }],

        activityDayEndTime: [{
          required: true,
          message: '请选择评论结束时间',
          trigger: 'blur'
        }],

        activityLimitType: [{
          required: true,
          message: '请选择评论类型',
          trigger: 'blur'
        }],


      },
      vote: {
        topics: '',
        btn: '',
        option1: '',
        option2: '',

      },

      dialogVisible: false,
      dialogVisibleDel: false,
      //富文本编辑器
      msg: '',
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址

        serverUrl: '/file/ihongka_files/uploadUeditor',
        // http://139.199.132.174:9092/file/ihongka_files/uploadUeditor?action=config&callback=bd__editor__kdxzza
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: '../../../static/UEditor/utf8-jsp/',
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 200,
        // 初始容器宽度
        // initialFrameWidth: '50%',
        // 关闭自动保存
        enableAutoSave: false,
        toolbars: [
          [
            'undo', 'redo',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc',

            'customstyle', 'paragraph', 'fontfamily', 'fontsize', 'simpleupload'
          ]
        ],
        autoFloatEnabled: false,
        elementPathEnabled: false,

      },

      dynamicValidateForm: {
        lists: [{
          domains: [{
            value: ''
          },
          {
            value: ''
          }
          ],
          title: '',
          radio: '',
        }]
      },
      options: [],
      pickerOptions0: {
        disabledDate: (time) => {


          return time.getTime() < Date.now() - 8.64e7;


        }
      },





    };


  },

  methods: {

    //选择的省份获取
    val1(per) {
      console.log(per)
      this.ruleForm.activityArea1 = per
    },
    //获取选择的市区


    createPic() {
      this.$router.push('/createPic')
    },
    createVoice() {
      this.$router.push('/createVoice')
    },
    createVote() {
      this.$router.push('/createVote')
    },

    //图片上传
    handleAvatarSuccess(res, file) {
      this.ruleForm.activityFileId = res.data.fileId
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
      // console.log(file)
      // console.log(file.name.split("."))

      const isLt1M = file.size / 1024 / 1024 < 1;



      const type = file.name.split(".")
      // console.log(type[type.length - 1])
      if (type[type.length - 1] == 'bmp' || type[type.length - 1] == 'dib' || type[type.length - 1] == 'jpg' || type[type.length - 1] == 'tif' || type[type.length - 1] == 'png' || type[type.length - 1] == 'tga' || type[type.length - 1] == 'pic' || type[type.length - 1] == 'jpeg' || type[type.length - 1] == 'BMP' || type[type.length - 1] == 'DIP' || type[type.length - 1] == 'JPG' || type[type.length - 1] == 'TIF' || type[type.length - 1] == 'PNG' || type[type.length - 1] == 'TGA' || type[type.length - 1] == 'PIC' || type[type.length - 1] == 'JPEG') {

      } else {
        this.$message.error('上传封面只能是图片格式!');
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
            if (width != Number(height) * (800 / 500)) {
              _this.$message.error('图片宽高必须是8:5')
              reject();
            }

            resolve();
          };
          image.src = event.target.result;
        }
        reader.readAsDataURL(file);
      });

    },
    upload() {
      this.dialogVisible = true
    },



    //添加选项
    addDomain(i) {

      if (this.dynamicValidateForm.lists[i].domains.length < 4) {
        this.dynamicValidateForm.lists[i].domains.push({
          value: '',
          key: Date.now()
        });

      } else {
        this.$message.error('最多添加4个选项')
        return false

      }


    },
    //移除选项
    removeDomain(item, bigIndex, smallIndex) {



      if (this.dynamicValidateForm.lists[bigIndex].domains.length > 2) {
        this.dynamicValidateForm.lists[bigIndex].domains.splice(smallIndex, 1)
      } else {
        this.$message.error('至少填两个选项')
        return false

      }



    },
    //添加选题
    add() {
      if (this.dynamicValidateForm.lists.length > 9) {
        this.$message.error('最多添加10个选题')
        return false


      }
      this.dynamicValidateForm.lists.push({
        domains: [{
          value: '',

        },
        {
          value: '',
        }
        ],
        title: '',
        key: Date.now()

      })


    },
    //移除选题
    removeTile(index) {

      if (this.dynamicValidateForm.lists.length < 2) {

        this.$message.error('至少有一个选题')
        return false

      } else {
        this.dynamicValidateForm.lists.splice(index, 1)

      }

    },
    //渲染专题
    getTheme() {
      this.$http.post(api.getContent('/subject/name')).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.options = res.data.data

        }
      })
    },
    //获取时间   时间戳
    getTime(val) {


      this.ruleForm.startTime = val[0];
      this.ruleForm.endTime = val[1];

    },
    //表单提交的弹框
    submit() {

      // if (this.ruleForm.radio == 1) {
      //   this.ruleForm.upTime = new Date().getTime()
      // }


      if (this.ruleForm.activityName.length > 20) {

        this.$message.error('活动名称在1-20个字符内')
        return false
      }


      if (String(this.ruleForm.activityName).trim().length == 0) {

        this.$message.error('活动名称在1-20个字符内')
        return false
      }
      if (this.ruleForm.activityStime == '' || this.ruleForm.activityEtime == '') {

        this.$message.error('请选择活动时间')
        return false
      }

      if (String(this.activityIntro).trim().length == 0) {

        this.$message.error('活动简介不能为空')
        return false
      }

      if (this.ruleForm.fileId == '') {

        this.$message.error('请上传封面')
        return false
      }
      if (this.ruleForm.activityItime == "") {
        this.$message.error('请选择发布时间')
        return false
      }
      // if (this.ruleForm.upTime>this.ruleForm.startTime) {
      //   this.$message.error("发布时间不得晚于开始时间")
      //   return false
      // }



      // this.ruleForm['arr'] = this.dynamicValidateForm.lists
      // for (var i = 0; i < this.ruleForm.arr.length; i++) {
      //   if (this.ruleForm.arr[i].radio == '') {
      //     this.$message.error('请选择投票模式')
      //     return false
      //   }
      //   if (this.ruleForm.arr[i].title == '') {
      //     this.$message.error('请填写选题和选项')
      //     return false
      //   }

      //   for (var i = 0; i < this.ruleForm.arr.length; i++) {
      //     for (var j = 0; j < this.ruleForm.arr[i].domains.length; j++) {
      //       if (this.ruleForm.arr[i].domains[j].value == "") {
      //         this.$message.error('请填写选项')
      //         return false
      //       }
      //     }


      //   }
      // }




      // if (String(this.dynamicValidateForm.lists[0].domains[0].value).trim() == '' || String(this.dynamicValidateForm.lists[0].domains[1].value).trim() == '') {
      //   this.$message.error('至少填两个选项')
      //   return false
      // }

      if (this.ruleForm.activityIssingle == 1) {
        this.ruleForm.activityDayStartTime = null
        this.ruleForm.activityDayEndTime = null
      }
      // console.log (this.ruleForm) 
      // this.ruleForm.arr =   this.activityArea
      // console.log(this.ruleForm.arr)
      // console.log( this.activityArea)
      // console.log(this.ruleForm.activityArea)
      // for (var i = 0 ;i <this.ruleForm.activityArea.length;i++ ) {
      //   if (this.ruleForm.activityArea[i]!="") {
      //     this.ruleForm.arr.push(this.ruleForm.activityArea[i])
      //   }
      // } 


      this.dialogVisible = true
      console.log(this.ruleForm)

    },
    handleForm() {

      this.loading = true

      this.ruleForm.activityIntro = replaceHtmlStyle(this.ruleForm.activityIntro)




      this.$http.post(api.getContent('/activity/update'), this.ruleForm).then(res => {
        // console.log(res)
        this.loading = false
        if (res.data.status == 200) {
          this.$message.success('提交成功')
          this.$router.push('/activeManagement')
          this.dialogVisible = false
        } else {
          this.dialogVisible = false

        }
      })
    },
    cancel() {
      this.$router.push('/createActive')
    },
    //渲染发布对象
    handelper() {
      this.$http.post(api.getContent('/activity/activity/pubObject')).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          this.per = res.data.data
        }
      })

    },
    clear() {
      this.ruleForm.activitySubjectId = ''
    },


    renderVoteList() {
      this.$http.post(api.getContent('/activity/'), {
        id: this.$route.query.id
      }).then(res => {
        if (res.data.status == 200) {
          console.log(res.data.data.data[0])
          this.activityUserName =1;
          // if (res.data.data.data[0].activityArea == "9999" || res.data.data.data[0].activityArea == "9999,") {
          //   res.data.data.data[0].activityAreaName = "全国"
          //   res.data.data.data[0].activityArea = res.data.data.data[0].activityArea + ',' + res.data.data.data[0].activityArea
          //   res.data.data.data[0].activityArea = res.data.data.data[0].activityArea.split(',')
          //   res.data.data.data[0].activityArea = res.data.data.data[0].activityArea.splice(1, 1)
          //   //增加发布对象的按钮隐藏
          //   this.activityAreaNum = 3;
          // } else 
          
          if (res.data.data.data[0].activityArea.length > 21) {
            res.data.data.data[0].activityArea = res.data.data.data[0].activityArea.split(',')
          } else {
            res.data.data.data[0].activityArea = res.data.data.data[0].activityArea + ',' + res.data.data.data[0].activityArea
            res.data.data.data[0].activityArea = res.data.data.data[0].activityArea.split(',')
            res.data.data.data[0].activityArea = res.data.data.data[0].activityArea.splice(1, 1)
          }
          //是否推送红卡设备
          if (res.data.data.data[0].activityRadio == 1) {
            res.data.data.data[0].activityRadio = "1"
            this.activityRadioNum = 1
          } else {
            res.data.data.data[0].activityRadio = "2"
            this.activityRadioNum = 0
          }
          res.data.data.data[0].activityLimitType = res.data.data.data[0].activityLimitType + ''
          if (res.data.data.data[0].activityIssingle != '') {
            res.data.data.data[0].activityIssingle = res.data.data.data[0].activityIssingle + ''
          } else {
            res.data.data.data[0].activityIssingle = ''
          }

          if (res.data.data.data[0].activityDayStartTime != null) {
            if (res.data.data.data[0].activityDayStartTime < new Date().getTime()) {
              this.activityDayStartTimeNum = 1
            } else {
              this.activityDayStartTimeNum = 0
            }
          } else {
            this.activityDayStartTimeNum = 0
          }


          if (res.data.data.data[0].activityDayEndTime != null) {
            if (res.data.data.data[0].activityDayEndTime < new Date().getTime()) {
              this.activityDayEndTimeNum = 1
            } else {
              this.activityDayEndTimeNum = 0
            }
          } else {
            this.activityDayEndTimeNum = 0
          }

          res.data.data.data[0].activityArea1 = []


          this.imageUrl = res.data.data.data[0].activityFileUrl
          this.ruleForm = res.data.data.data[0]

        }

      })
    },


    more() {
      this.activityAreaNum = 1
      for (var i = 0; i < this.per.length; i++) {
        for (var j = 0; j < this.ruleForm.activityArea.length; j++) {
          if (this.per[i].id == this.ruleForm.activityArea[j]) {
            this.per.splice(i, 1)
            i--
          }
        }
      }
    },

    noMore() {
      this.activityAreaNum = 0
      this.activityArea = []
    }




  },
  mounted() {
    this.handelper()
    this.getTheme()
    this.renderVoteList()
  }
}
