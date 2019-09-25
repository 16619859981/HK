import api from '../../api/index'
import {
  formatDate
} from '../../../date'
export default {
  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      ruleForm: {
        timer: '',
        activeUrl: '',
        medalUrl: '',
        medalName: '',

        activityCoverId: '',
        activityTitle: '',
        activityCategory: '',
        endTime: '',
        activityRange: [],
        activityIntro: [{
          type: 'text',
          areaText: '',
          sort: '',
        }],
        activityCover1: '',
        activityType: 1,
        activityMedalId: '',
        medalList: [
          {
            activityPattern: '',
            continuousDay: '',
            dayStartTime: '',
            dayEndTime: '',
            restriction: '',
            extraRestriction: '',
            extraRestrictionType: '',
            details: '',
            medalType: 1,
            typeRestriction: '',
            questionArray: [{
                questionString: '',
                optionString: '',
                answerString: ''
              }]
          }]
      },
      lookForm: {
        timer:[],
      },
      aaa: {
        activityCoverId: '',
        activityTitle: '',
        activityCategory: '',
        endTime: '',
        activityRange: '',
        activityIntro: '',
        activityType: '',
        activityId: '',
      },
      daysDays: '',
      activityCategoryOption: [
        {label: '实践', value: '0'},
        {label: '体育', value: '1'},
        {label: '公益', value: '2'},
        {label: '亲子', value: '3'},
        {label: '周末', value: '4'},
        {label: '户外', value: '5'},
        {label: '环保', value: '6'},
        {label: '科技', value: '7'},
        {label: '体验', value: '8'},
        {label: '探究', value: '9'},
        {label: '动手', value: '10'},
        {label: '文化', value: '11'},
        {label: '才艺\技能', value: '12'},
        {label: '读书', value: '13'},
        {label: '传统文化', value: '14'},
        {label: '安全', value: '15'},
        {label: '成长', value: '16'},
        {label: '展览\戏剧演出', value: '17'},
        {label: '益智', value: '18'},
        {label: '心理', value: '19'},
        {label: '课程', value: '20'},
      ],
      timer1: '',
      timer2: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      text1: '',
      text2: '',
      endTimeText: '',
      dialogVisible: false,
      uploadForm: {},
      imgSRC: '',
      options1: [],
      options2: [],
      areaArr: [],
      fileList: [],
      active: 3,
      creatName: window.sessionStorage.getItem('name'),
      nowTime: '',
      meadlArr: [],

      rules: {
        activityTitle: [{
          required: true,
          message: '请填写活动标题',
          trigger: 'blur'
        }],
        endTime: [{
          required: true,
          message: '请选择结束日期',
          trigger: 'blur'
        }],
        activityCategory: [{
          required: true,
          message: '请选择活动分类',
          trigger: 'blur'
        }],
        activityRange: [{
          required: true,
          message: '请选择参与范围',
          trigger: 'blur'
        }],

      },
      dialogVisibleImg: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [8, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], //页面显示的数组

      name: "",
    }
  },
  methods: {

    handeleList() {
      this.$http.post(api.getPlatform('/activity/common'), { activityId: this.$route.query.id }).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          if (res.data.data.activityAuthorType == 1) {
            res.data.data.activityAuthorType = '红广平台'
          } else if (res.data.data.activityAuthorType == 2) {
            res.data.data.activityAuthorType = '学校'
          } else if (res.data.data.activityAuthorType == 3) {
            res.data.data.activityAuthorType = '班级'
          } else if (res.data.data.activityAuthorType == 7) {
            res.data.data.activityAuthorType = '红广号'
          } else if (res.data.data.activityAuthorType == 10) {
            res.data.data.activityAuthorType = '基地'
          }
          this.imgSRC = api.getUpload(res.data.data.activityCover)
          if (res.data.data.showRangeId.length==2) {
            this.value1 = res.data.data.showRangeId[0] + ''
            this.value2 = res.data.data.showRangeId[1] + ''
          }else {
            this.value1 = res.data.data.showRangeId[0] + ''
            this.value2 =''
          }
          res.data.data.activityTaskSubJoins[0].type = String(res.data.data.activityTaskSubJoins[0].type )
          this.value3 = this.value1
          this.value4 = this.value2
          this.lookForm = res.data.data

          // this.lookForm["timer"] = []
          // this.lookForm["timer"][0] = res.data.data.activityTaskSubJoins[0].dayStartTime
          // this.lookForm["timer"][1] = res.data.data.activityTaskSubJoins[0].dayEndTime
          // console.log(this.lookForm.timer)

          // this.valu1(this.value1)
          // this.valu2(this.value2)
          // this.getMedalListOne()
        }
      })
    },
    
    nextNext() {
      console.log(this.areaArr)
      console.log(this.lookForm.activityTaskSubJoins[0].continuousDay)
      this.lookForm.activityRange = this.areaArr
      // console.log(this.lookForm)
      if (this.lookForm.activityCoverId == '') {
        this.$message.error('活动封面不可为空！');
        return false
      }
      if (this.lookForm.activityName == '') {
        this.$message.error('活动标题不可为空！');
        return false
      }
      if (this.lookForm.category == '') {
        this.$message.error('活动分类不可为空！');
        return false
      }
      if (this.lookForm.activityEtime == '' || this.lookForm.activityEtime == null) {
        this.$message.error('活动结束时间不可为空！');
        return false
      }
      if (String(this.lookForm.activityTaskSubJoins[0].continuousDay) == '') {
        this.$message.error('活动连续天数不可为空！');
        return false
      }
      if(this.lookForm.activityTaskSubJoins[0].timer==[] ||this.lookForm.activityTaskSubJoins[0].timer == '' || this.lookForm.activityTaskSubJoins[0].timer == null) {
        this.$message.error('限时打卡时间不可为空！');
        return false
      }
      if (this.lookForm.showRangeId == [] || this.lookForm.showRangeId.length == 0) {
        this.$message.error('活动参与范围不可为空！');
        return false
      }

      for (var i = 0; i < this.lookForm.activityIntro.length; i++) {
        if (this.lookForm.activityIntro[i].areaText == '') {
          this.$message.error('活动文字不可为空！');
          return false
        }

      }

      document.getElementsByClassName('box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box')[0].style.display = "block"
      document.getElementsByClassName('box-box-box-box-box')[0].style.display = "none"
      this.active = 4
      this.uploadForm = this.lookForm
      console.log(this.uploadForm)
    },
    nextNextNext() {
  
      this.uploadForm.medalId = this.lookForm.medalId
  
      this.nowTime = new Date().getTime()
      this.nowTime = formatDate(new Date(Number(this.lookForm.activityCtime)), 'yyyy-MM-dd hh:mm');
      this.endTimeText = formatDate(new Date(Number(this.lookForm.activityEtime)), 'yyyy-MM-dd hh:mm');
    
      this.timer1 = formatDate(new Date(Number(this.lookForm.activityTaskSubJoins[0].timer[0])), 'hh:mm');
      this.timer2 = formatDate(new Date(Number(this.lookForm.activityTaskSubJoins[0].timer[1])), 'hh:mm');
      this.daysDays = this.lookForm.activityTaskSubJoins[0].continuousDay

      // medalList
      if (this.lookForm.medalId != '') {
        for (var i = 0; i < this.meadlArr.length; i++) {
          if (this.lookForm.medalId == this.meadlArr[i].medalId) {
            this.lookForm.medalUrl = this.meadlArr[i].fileUrl
            this.lookForm.medalName = this.meadlArr[i].medalName
          }
        }
      }
      if (this.lookForm.category == 0) {
        this.text2 = '实践'
      } else if (this.lookForm.category == 1) {
        this.text2 = '体育'
      } else if (this.lookForm.category == 2) {
        this.text2 = '公益'
      } else if (this.lookForm.category == 3) {
        this.text2 = '亲子'
      } else if (this.lookForm.category == 4) {
        this.text2 = '周末'
      } else if (this.lookForm.category == 5) {
        this.text2 = '户外'
      } else if (this.lookForm.category == 6) {
        this.text2 = '环保'
      } else if (this.lookForm.category == 7) {
        this.text2 = '科技'
      } else if (this.lookForm.category == 8) {
        this.text2 = '体验'
      } else if (this.lookForm.category == 9) {
        this.text2 = '探究'
      } else if (this.lookForm.category == 10) {
        this.text2 = '动手'
      } else if (this.lookForm.category == 11) {
        this.text2 = '文化'
      } else if (this.lookForm.category == 12) {
        this.text2 = '才艺\技能'
      } else if (this.lookForm.category == 13) {
        this.text2 = '读书'
      } else if (this.lookForm.category == 14) {
        this.text2 = '传统文化'
      } else if (this.lookForm.category == 15) {
        this.text2 = '安全'
      } else if (this.lookForm.category == 16) {
        this.text2 = '成长'
      } else if (this.lookForm.category == 17) {
        this.text2 = '展览\戏剧演出'
      } else if (this.lookForm.category == 18) {
        this.text2 = '益智'
      } else if (this.lookForm.category == 19) {
        this.text2 = '心理'
      } else if (this.lookForm.category == 20) {
        this.text2 = '课程'
      }


      if (this.lookForm.activityType == 0) {
        this.text1 = '不限'
      } else if (this.lookForm.activityType == 1) {
        this.text1 = '纯文字'
      } else if (this.lookForm.activityType == 2) {
        this.text1 = '必须包含图片'
      } else if (this.lookForm.activityType == 3) {
        this.text1 = '必须包含音频'
      } else if (this.lookForm.activityType == 4) {
        this.text1 = '必须包含视频'
      }

      document.getElementsByClassName('box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box-box')[0].style.display = "block"
      this.active = 5
      console.log(this.uploadForm)
    },
    theThird() {
      document.getElementsByClassName('box-box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box')[0].style.display = "block"
      this.active = 2
      console.log(1)
    },
    theFourth() {
      document.getElementsByClassName('box-box-box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box')[0].style.display = "block"
      this.active = 3
      console.log(1)
    },
    theFifth() {
      if (this.lookForm.activityCoverId == '') {
        this.$message.error('活动封面不可为空！');
        return false
      }
      if (this.lookForm.activityName == '') {
        this.$message.error('活动标题不可为空！');
        return false
      }
      if (this.lookForm.category == '') {
        this.$message.error('活动分类不可为空！');
        return false
      }
      if (this.lookForm.activityEtime == '' || this.lookForm.activityEtime == null) {
        this.$message.error('活动结束时间不可为空！');
        return false
      }
      if (this.lookForm.showRangeId == '' || this.lookForm.showRangeId.length == 0) {
        this.$message.error('活动参与范围不可为空！');
        return false
      }

      for (var i = 0; i < this.lookForm.activityIntro.length; i++) {
        if (this.lookForm.activityIntro[i].areaText == '') {
          this.$message.error('活动文字不可为空！');
          return false
        }
        if (this.lookForm.activityIntro[i].areaText.length > 10000) {
          this.$message.error('活动文字最多只可输入10000字！');
          return false
        }
      }
      document.getElementsByClassName('box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box')[0].style.display = "block"
      document.getElementsByClassName('box-box-box-box-box')[0].style.display = "none"
      this.active = 4
    },
    thesixth() {
      if (this.lookForm.activityCoverId == '') {
        this.$message.error('活动封面不可为空！');
        return false
      }
      if (this.lookForm.activityName == '') {
        this.$message.error('活动标题不可为空！');
        return false
      }
      if (this.lookForm.category == '') {
        this.$message.error('活动分类不可为空！');
        return false
      }
      if (this.lookForm.activityEtime == '' || this.lookForm.activityEtime == null) {
        this.$message.error('活动结束时间不可为空！');
        return false
      }
      if (this.lookForm.showRangeId == '' || this.lookForm.showRangeId.length == 0) {
        this.$message.error('活动参与范围不可为空！');
        return false
      }

      for (var i = 0; i < this.lookForm.activityIntro.length; i++) {
        if (this.lookForm.activityIntro[i].areaText == '') {
          this.$message.error('活动文字不可为空！');
          return false
        }
        if (this.lookForm.activityIntro[i].areaText.length > 10000) {
          this.$message.error('活动文字最多只可输入10000字！');
          return false
        }
      }
      document.getElementsByClassName('box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box-box')[0].style.display = "block"
      this.active = 5
    },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const type = file.name.split(".")
      if (
        type[type.length - 1] == 'bmp' ||
        type[type.length - 1] == 'dib' ||
        type[type.length - 1] == 'jpg' ||
        type[type.length - 1] == 'tif' ||
        type[type.length - 1] == 'png' ||
        type[type.length - 1] == 'tga' ||
        type[type.length - 1] == 'pic' ||
        type[type.length - 1] == 'jpeg' ||
        type[type.length - 1] == 'BMP' ||
        type[type.length - 1] == 'DIP' ||
        type[type.length - 1] == 'JPG' ||
        type[type.length - 1] == 'TIF' ||
        type[type.length - 1] == 'PNG' ||
        type[type.length - 1] == 'TGA' ||
        type[type.length - 1] == 'PIC' ||
        type[type.length - 1] == 'JPEG'
      ) {} else {
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
            if (width / height != 8 / 5) {
              _this.$message.error('图片宽高必须为8：5')
              reject();
            }
            resolve();
          };
          image.src = event.target.result;
        }
        reader.readAsDataURL(file);
      });
    },
    // 显示裁剪框
    changeUpload(file, fileList) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const type = file.name.split(".")
      if (
        type[type.length - 1] == 'bmp' ||
        type[type.length - 1] == 'dib' ||
        type[type.length - 1] == 'jpg' ||
        type[type.length - 1] == 'tif' ||
        type[type.length - 1] == 'png' ||
        type[type.length - 1] == 'tga' ||
        type[type.length - 1] == 'pic' ||
        type[type.length - 1] == 'jpeg' ||
        type[type.length - 1] == 'BMP' ||
        type[type.length - 1] == 'DIP' ||
        type[type.length - 1] == 'JPG' ||
        type[type.length - 1] == 'TIF' ||
        type[type.length - 1] == 'PNG' ||
        type[type.length - 1] == 'TGA' ||
        type[type.length - 1] == 'PIC' ||
        type[type.length - 1] == 'JPEG'
      ) {} else {
        this.$message.error('上传封面只能是图片格式!');
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
        return false
      }
      var _this = this;
      var event = event || window.event;
      console.log(event)
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function (e) {
        _this.option.img = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
      _this.dialogVisibleImg = true;
      this.name = file.name;
    },
    // 点击裁剪,上传
    finish() {
     
      this.$refs.cropper.getCropBlob(data => {
        let fd = new FormData();
        fd.append("file", data, this.name);

        this.$http.post(api.getUpload("/file/ihongka_files/upload"), fd)
          .then(
            res => {
     
              this.dialogVisibleImg = false;
       
              this.lookForm.activeUrl = api.getUpload(res.data.data.realUrl)
              this.lookForm.activityCoverId = res.data.data.fileId;
       
              this.imgSRC = api.getUpload(res.data.data.realUrl)
        

            },
            res => {
              console.log(res);
            }
          );
        return false;

      });
    },
    // handleAvatarSuccess(res, file, fileList) {
    //   this.lookForm.activeUrl = api.getUpload(res.data.realUrl)
    //   this.lookForm.activityCoverId = res.data.fileId
    //   this.imgSRC = api.getUpload(this.lookForm.activityCoverId)

    // },
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
        this.lookForm.activityIntro.push({
          type: 'img',
          imgSrc: '',
          imgId: '',
          sort: '',
        })
      } else if (type[type.length - 1] == 'mp4') {
        this.lookForm.activityIntro.push({
          type: 'mp4',
          mp4Url: '',
          mp4Id: '',
          sort: '',
          duration: '',
        })
      } else if (type[type.length - 1] == 'mp3') {
        this.lookForm.activityIntro.push({
          type: 'mp3',
          mp3Url: '',
          mp3Id: '',
          sort: '',
          duration: ''
        })
      } else {
        this.$message.error('不支持该格式的文件!')
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
      const typeT = res.data.realUrl.split(".")
      if (typeT[typeT.length - 1] == 'jpg' ||
        typeT[typeT.length - 1] == 'png' ||
        typeT[typeT.length - 1] == 'jpeg' ||
        typeT[typeT.length - 1] == 'JPG' ||
        typeT[typeT.length - 1] == 'PNG' ||
        typeT[typeT.length - 1] == 'JPEG') {
        this.lookForm.activityIntro[this.lookForm.activityIntro.length - 1].imgSrc = api.getUpload(res.data.realUrl)
        this.lookForm.activityIntro[this.lookForm.activityIntro.length - 1].imgId = res.data.fileId
        this.dialogVisible = false
        console.log(this.lookForm.activityIntro[this.lookForm.activityIntro.length - 1])
      } else if (typeT[typeT.length - 1] == 'mp4') {
        this.lookForm.activityIntro[this.lookForm.activityIntro.length - 1].mp4Url = api.getUpload(res.data.realUrl)
        this.lookForm.activityIntro[this.lookForm.activityIntro.length - 1].mp4Id = res.data.fileId
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].duration = res.data.duration
        this.dialogVisible = false
      } else if (typeT[typeT.length - 1] == 'mp3') {
        this.lookForm.activityIntro[this.lookForm.activityIntro.length - 1].mp3Url = api.getUpload(res.data.realUrl)
        this.lookForm.activityIntro[this.lookForm.activityIntro.length - 1].mp3Id = res.data.fileId
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].duration = res.data.duration
        this.dialogVisible = false
      }
    },
    areaList() {
      this.$http.post(api.getPlatform('/area'), {
        areaCode: 1
      }).then(res => {
        if (res.data.status == 200) {
          this.options1 = res.data.data
        }
      })
    },

    valu1(areaNumber) {
      this.lookForm.showRangeId = []
      this.lookForm.showRangeId.push(areaNumber)
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          if (areaNumber != this.value3) {
            this.value2 = ''
            this.options2 = ''
          }
          this.options2 = res.data.data
        }
      })
    },

    valu2(areaNumber) {
      if (this.lookForm.showRangeId.length == 2) {
        this.areaArr.pop()
      }
      this.lookForm.showRangeId.push(areaNumber)
    },


    uploadImg() {
      if (this.lookForm.activityIntro.length == 20) {
        this.$message.error('最多只能添加二十个内容!')
        return false        
      }
      this.dialogVisible = true
      this.fileList = []
    },

    uploadText() {
      if (this.lookForm.activityIntro.length < 20) {
        this.lookForm.activityIntro.push({
          type: 'text',
          areaText: '',
          sort: '',
        })
      } else {
        this.$message.error('最多只能添加二十个内容!')
      }
    },

    divDel(index) {
      console.log(index)
      if (this.lookForm.activityIntro.length == 1) {
        this.$message.error('最少要有一个有效元素！');
        return false
      }
      this.lookForm.activityIntro.splice(index, 1)
    },

    divTop(index) {
      console.log(index)
      if (index == 0) {
        this.$message.error('已经是第一位了！');
        return false
      }
      this.lookForm.activityIntro[index] = this.lookForm.activityIntro.splice(index - 1, 1, this.lookForm.activityIntro[index])[0]
    },

    divBottom(index) {
      console.log(index)
      if (index == this.lookForm.activityIntro.length - 1) {
        this.$message.error('已经是最后一位了！');
        return false
      }
      this.lookForm.activityIntro[index] = this.lookForm.activityIntro.splice(index + 1, 1, this.lookForm.activityIntro[index])[0]
    },


    nextNextNextNext() {
      console.log(this.lookForm.timer)
       this.uploadForm.activityTaskSubJoins[0].dayStartTime = this.uploadForm.activityTaskSubJoins[0].timer[0]
      this.uploadForm.activityTaskSubJoins[0].dayEndTime=this.uploadForm.activityTaskSubJoins[0].timer[1]

      console.log(this.uploadForm)
      for (var i = 0; i < this.uploadForm.activityIntro.length; i++) {
        this.uploadForm.activityIntro[i].sort = i + 1
      }
      this.aaa.activityCoverId = this.uploadForm.activityCoverId
      this.aaa.activityTitle = this.uploadForm.activityName
      this.aaa.activityCategory = this.uploadForm.category
      this.aaa.endTime = this.uploadForm.activityEtime
      this.aaa.activityRange =this.uploadForm.showRangeId
      this.aaa.activityIntro = this.uploadForm.activityIntro
      this.aaa.activityType = this.uploadForm.activityType
      this.aaa.activityId = this.uploadForm.activityId
      this.aaa.medalId = this.uploadForm.medalId
      this.aaa.medalList = this.uploadForm.activityTaskSubJoins
      console.log(this.aaa)


      this.$http.post(api.getPlatform('/activity/update'), this.aaa).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          this.$message.success('活动修改成功！')
          this.$router.push('/activeManagement')
        }
      })
    },

    goActiveManagement () {
      this.$router.push('/activeManagement')
    },

    getMedalList() {
      this.$http.post(api.getPlatform('/medal/meMedal/selectMedalGroup')).then(res => {
        if (res.data.status == 200) {
          // console.log(res)
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].fileUrl = api.getUpload(res.data.data[i].fileUrl)
          }
          this.meadlArr = res.data.data
          // console.log(this.meadlArr)
        }
      })
    },


    getMedalListOne () {
      if (this.lookForm.medalId == '') {
        return false 
      }
      this.$http.post(api.getPlatform('/medal/meMedal/selectMedal'), { medalId: this.lookForm.medalId }).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          
        }
      })
    },



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
    },
    changeCount() {
      //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
      var re = /^[0-9]+.?[0-9]*$/;
      if (!re.test(this.lookForm.activityTaskSubJoins[0].continuousDay)) {
        this.$message.error('请输入数字');
        this.lookForm.activityTaskSubJoins[0].continuousDay = ''
        return false;
      }
      if (this.lookForm.activityEtime=="") {
        this.$message.error('请先填写结束时间');
        this.lookForm.activityTaskSubJoins[0].continuousDay = ''
        return false;
      }
      //判断天数的合法性    
      // let nowTime = new Date().getTime() 
      let DifferenceTime = (this.lookForm.activityEtime - this.lookForm.activityCtime)/86400000
      if (DifferenceTime<this.lookForm.activityTaskSubJoins[0].continuousDay) {
        this.$message.error('请填写合理的连续天数');
        this.lookForm.activityTaskSubJoins[0].continuousDay = ''
        return false;
      }
      


    },
  },
  created() {
    this.areaList()
    this.getMedalList()
    this.handeleList()
  }
}
