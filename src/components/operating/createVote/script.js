import api from '../../api/index'
import {
  formatDate
} from '../../../date'
export default {
  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      ruleForm: {
        timer: [1550592000000, 1550678399000],
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
        activityType: 1,
        activityMedalId: '',
        medalList: [{
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
      activityCategoryOption: [{
          label: '实践',
          value: '0'
        },
        {
          label: '体育',
          value: '1'
        },
        {
          label: '公益',
          value: '2'
        },
        {
          label: '亲子',
          value: '3'
        },
        {
          label: '周末',
          value: '4'
        },
        {
          label: '户外',
          value: '5'
        },
        {
          label: '环保',
          value: '6'
        },
        {
          label: '科技',
          value: '7'
        },
        {
          label: '体验',
          value: '8'
        },
        {
          label: '探究',
          value: '9'
        },
        {
          label: '动手',
          value: '10'
        },
        {
          label: '文化',
          value: '11'
        },
        {
          label: '才艺\技能',
          value: '12'
        },
        {
          label: '读书',
          value: '13'
        },
        {
          label: '传统文化',
          value: '14'
        },
        {
          label: '安全',
          value: '15'
        },
        {
          label: '成长',
          value: '16'
        },
        {
          label: '展览\戏剧演出',
          value: '17'
        },
        {
          label: '益智',
          value: '18'
        },
        {
          label: '心理',
          value: '19'
        },
        {
          label: '课程',
          value: '20'
        },
      ],
      timer1: '',
      timer2: '',
      value1: '',
      value2: '',
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
      bool: false, //判断是否有上传任务
    }
  },
  methods: {
    next() {
      // console.log(this.ruleForm)

      // if (this.ruleForm.medalList[0].activityPattern == '') {
      //   this.$message.error('模式选择不可为空！');
      //   return false
      // }
      // if (this.ruleForm.medalList[0].continuousDay == '') {
      //   this.$message.error('打卡连续天数不可为空！');
      //   return false
      // }
      // if (this.ruleForm.timer == '' || this.ruleForm.timer == null) {
      //   this.$message.error('限时打卡时间不可为空！');
      //   return false
      // }
      // console.log(this.ruleForm.timer)
      // document.getElementsByClassName('box-box-box')[0].style.display = "block"
      // document.getElementsByClassName('box-box')[0].style.display = "none"
      // document.getElementsByClassName('box-box-box-box-box')[0].style.display = "none"
      // document.getElementsByClassName('box-box-box-box')[0].style.display = "none"
      // this.active = 3
    },
    nextNext() {
      // if(this.bool==false) {
      //   this.$message.error('上传任务正在进行,请耐心等待');
      //   return false
      // }
      // console.log(this.ruleForm)
      if (this.ruleForm.medalList[0].activityPattern == '') {
        this.$message.error('模式选择不可为空！');
        return false
      }
      if (this.ruleForm.medalList[0].continuousDay == '') {
        this.$message.error('打卡连续天数不可为空！');
        return false
      }
      if (this.ruleForm.timer == '' || this.ruleForm.timer == null) {
        this.$message.error('限时打卡时间不可为空！');
        return false
      }
      this.ruleForm.activityRange = this.areaArr

      if (this.ruleForm.activityCoverId == '') {
        this.$message.error('活动封面不可为空！');
        return false
      }
      if (this.ruleForm.activityTitle == '') {
        this.$message.error('活动标题不可为空！');
        return false
      }
      if (this.ruleForm.activityCategory == '') {
        this.$message.error('活动分类不可为空！');
        return false
      }
      if (this.ruleForm.endTime == '' || this.ruleForm.endTime == null) {
        this.$message.error('活动结束时间不可为空！');
        return false
      }

      if (this.ruleForm.endTime < new Date().getTime()) {
        this.$message.error('活动结束时间选择错误！');
        return false
      }

      // if (this.ruleForm.activityRange == '' || this.ruleForm.activityRange.length == 0) {
      //   this.$message.error('活动参与范围不可为空！');
      //   return false
      // }

      for (var i = 0; i < this.ruleForm.activityIntro.length; i++) {
        if (this.ruleForm.activityIntro[i].areaText == '') {
          this.$message.error('活动文字不可为空！');
          return false
        }
        if (this.ruleForm.activityIntro[i].type == 'img' || this.ruleForm.activityIntro[i].type == 'mp3' || this.ruleForm.activityIntro[i].type == 'mp4') {
          if (this.bool == false) {
            this.$message.error('上传任务正在进行,请耐心等待');
            return false
          }
        }

      }
      console.log(document.getElementsByClassName('box-box-box')[0].style)
      console.log(document.getElementsByClassName('box-box-box-box')[0].style)

      document.getElementsByClassName('box-box-box')[0].style.display = "none"
      // document.getElementsByClassName('box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box')[0].style.display = "block"
      document.getElementsByClassName('box-box-box-box-box')[0].style.display = "none"
      this.active = 4
      this.uploadForm = this.ruleForm
      this.uploadForm.medalList[0].dayStartTime = this.ruleForm.timer[0]
      this.uploadForm.medalList[0].dayEndTime = this.ruleForm.timer[1]
      console.log(this.uploadForm)
    },
    nextNextNext() {
      // console.log(this.uploadForm)
      this.uploadForm.activityMedalId = this.ruleForm.activityMedalId
      // console.log(this.uploadForm)
      this.nowTime = new Date().getTime()
      this.nowTime = formatDate(new Date(Number(this.nowTime)), 'yyyy-MM-dd hh:mm');
      this.endTimeText = formatDate(new Date(Number(this.ruleForm.endTime)), 'yyyy-MM-dd hh:mm');
      this.timer1 = formatDate(new Date(Number(this.ruleForm.timer[0])), 'hh:mm');
      this.timer2 = formatDate(new Date(Number(this.ruleForm.timer[1])), 'hh:mm');

      if (this.activityMedalId != '') {
        for (var i = 0; i < this.meadlArr.length; i++) {
          if (this.ruleForm.activityMedalId == this.meadlArr[i].medalId) {
            this.ruleForm.medalUrl = this.meadlArr[i].fileUrl
            this.ruleForm.medalName = this.meadlArr[i].medalName
          }
        }
        // console.log(this.ruleForm)
      }
      if (this.ruleForm.activityCategory == 0) {
        this.text2 = '实践'
      } else if (this.ruleForm.activityCategory == 1) {
        this.text2 = '体育'
      } else if (this.ruleForm.activityCategory == 2) {
        this.text2 = '公益'
      } else if (this.ruleForm.activityCategory == 3) {
        this.text2 = '亲子'
      } else if (this.ruleForm.activityCategory == 4) {
        this.text2 = '周末'
      } else if (this.ruleForm.activityCategory == 5) {
        this.text2 = '户外'
      } else if (this.ruleForm.activityCategory == 6) {
        this.text2 = '环保'
      } else if (this.ruleForm.activityCategory == 7) {
        this.text2 = '科技'
      } else if (this.ruleForm.activityCategory == 8) {
        this.text2 = '体验'
      } else if (this.ruleForm.activityCategory == 9) {
        this.text2 = '探究'
      } else if (this.ruleForm.activityCategory == 10) {
        this.text2 = '动手'
      } else if (this.ruleForm.activityCategory == 11) {
        this.text2 = '文化'
      } else if (this.ruleForm.activityCategory == 12) {
        this.text2 = '才艺\技能'
      } else if (this.ruleForm.activityCategory == 13) {
        this.text2 = '读书'
      } else if (this.ruleForm.activityCategory == 14) {
        this.text2 = '传统文化'
      } else if (this.ruleForm.activityCategory == 15) {
        this.text2 = '安全'
      } else if (this.ruleForm.activityCategory == 16) {
        this.text2 = '成长'
      } else if (this.ruleForm.activityCategory == 17) {
        this.text2 = '展览\戏剧演出'
      } else if (this.ruleForm.activityCategory == 18) {
        this.text2 = '益智'
      } else if (this.ruleForm.activityCategory == 19) {
        this.text2 = '心理'
      } else if (this.ruleForm.activityCategory == 20) {
        this.text2 = '课程'
      }


      if (this.ruleForm.medalList[0].activityPattern == 0) {
        this.text1 = '不限'
      } else if (this.ruleForm.medalList[0].activityPattern == 1) {
        this.text1 = '纯文字'
      } else if (this.ruleForm.medalList[0].activityPattern == 2) {
        this.text1 = '必须包含图片'
      } else if (this.ruleForm.medalList[0].activityPattern == 3) {
        this.text1 = '必须包含音频'
      } else if (this.ruleForm.medalList[0].activityPattern == 4) {
        this.text1 = '必须包含视频'
      }

      document.getElementsByClassName('box-box-box')[0].style.display = "none"
      // document.getElementsByClassName('box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box-box')[0].style.display = "block"
      this.active = 5
      // console.log(this.ruleForm)
      console.log(this.uploadForm)
    },
    // theThird() {
    //   document.getElementsByClassName('box-box-box-box')[0].style.display = "none"
    //   document.getElementsByClassName('box-box-box-box-box')[0].style.display = "none"
    //   document.getElementsByClassName('box-box-box')[0].style.display = "none"
    //   // document.getElementsByClassName('box-box')[0].style.display = "block"
    //   this.active = 2
    //   console.log(1)
    // },
    theFourth() {
      if (this.ruleForm.medalList[0].activityPattern == '') {
        this.$message.error('模式选择不可为空！');
        return false
      }
      if (this.ruleForm.medalList[0].continuousDay == '') {
        this.$message.error('打卡连续天数不可为空！');
        return false
      }
      if (this.ruleForm.timer == '' || this.ruleForm.timer == null) {
        this.$message.error('限时打卡时间不可为空！');
        return false
      }
      document.getElementsByClassName('box-box-box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box')[0].style.display = "block"
      // document.getElementsByClassName('box-box')[0].style.display = "none"
      this.active = 3
      console.log(1)
    },
    theFifth() {
      this.ruleForm.activityRange = this.areaArr
      if (this.ruleForm.medalList[0].activityPattern == '') {
        this.$message.error('模式选择不可为空！');
        return false
      }
      if (this.ruleForm.medalList[0].continuousDay == '') {
        this.$message.error('打卡连续天数不可为空！');
        return false
      }
      if (this.ruleForm.timer == '' || this.ruleForm.timer == null) {
        this.$message.error('限时打卡时间不可为空！');
        return false
      }
      if (this.ruleForm.activityCoverId == '') {
        this.$message.error('活动封面不可为空！');
        return false
      }
      if (this.ruleForm.activityTitle == '') {
        this.$message.error('活动标题不可为空！');
        return false
      }
      if (this.ruleForm.activityCategory == '') {
        this.$message.error('活动分类不可为空！');
        return false
      }
      if (this.ruleForm.endTime == '' || this.ruleForm.endTime == null) {
        this.$message.error('活动结束时间不可为空！');
        return false
      }
      // if (this.ruleForm.activityRange == '' || this.ruleForm.activityRange.length == 0) {
      //   this.$message.error('活动参与范围不可为空！');
      //   return false
      // }

      for (var i = 0; i < this.ruleForm.activityIntro.length; i++) {
        if (this.ruleForm.activityIntro[i].areaText == '') {
          this.$message.error('活动文字不可为空！');
          return false
        }
        if (this.ruleForm.activityIntro[i].areaText.length > 10000) {
          this.$message.error('活动文字最多只可输入10000字！');
          return false
        }
      }
      document.getElementsByClassName('box-box-box')[0].style.display = "none"
      // document.getElementsByClassName('box-box')[0].style.display = "none"
      document.getElementsByClassName('box-box-box-box')[0].style.display = "block"
      document.getElementsByClassName('box-box-box-box-box')[0].style.display = "none"
      this.active = 5
    },
    thesixth() {
      this.ruleForm.activityRange = this.areaArr
      if (this.ruleForm.medalList[0].activityPattern == '') {
        this.$message.error('模式选择不可为空！');
        return false
      }
      if (this.ruleForm.medalList[0].continuousDay == '') {
        this.$message.error('打卡连续天数不可为空！');
        return false
      }
      if (this.ruleForm.timer == '' || this.ruleForm.timer == null) {
        this.$message.error('限时打卡时间不可为空！');
        return false
      }
      if (this.ruleForm.activityCoverId == '') {
        this.$message.error('活动封面不可为空！');
        return false
      }
      if (this.ruleForm.activityTitle == '') {
        this.$message.error('活动标题不可为空！');
        return false
      }
      if (this.ruleForm.activityCategory == '') {
        this.$message.error('活动分类不可为空！');
        return false
      }
      if (this.ruleForm.endTime == '' || this.ruleForm.endTime == null) {
        this.$message.error('活动结束时间不可为空！');
        return false
      }
      // if (this.ruleForm.activityRange == '' || this.ruleForm.activityRange.length == 0) {
      //   this.$message.error('活动参与范围不可为空！');
      //   return false
      // }

      for (var i = 0; i < this.ruleForm.activityIntro.length; i++) {
        if (this.ruleForm.activityIntro[i].areaText == '') {
          this.$message.error('活动文字不可为空！');
          return false
        }
        if (this.ruleForm.activityIntro[i].areaText.length > 10000) {
          this.$message.error('活动文字最多只可输入10000字！');
          return false
        }
      }
      document.getElementsByClassName('box-box-box')[0].style.display = "none"
      // document.getElementsByClassName('box-box')[0].style.display = "none"
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
      // console.log(this.name)
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

              this.ruleForm.activeUrl = api.getUpload(res.data.data.realUrl)
              this.ruleForm.activityCoverId = res.data.data.fileId;

            },
            res => {
              console.log(res);
            }
          );
        return false;

      });
    },
    beforeAvatarUpload1(file) {
      this.bool = false
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
        this.ruleForm.activityIntro.push({
          type: 'img',
          imgSrc: '',
          imgId: '',
          sort: '',
        })
      } else if (type[type.length - 1] == 'mp4') {
        this.ruleForm.activityIntro.push({
          type: 'mp4',
          mp4Url: '',
          mp4Id: '',
          mp4Name: '',
          sort: '',
          duration: '',
        })
      } else if (type[type.length - 1] == 'mp3') {
        this.ruleForm.activityIntro.push({
          type: 'mp3',
          mp3Url: '',
          mp3Id: '',
          mp3Name: '',
          sort: '',
          duration: '',
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
      this.bool = true
      console.log(res)
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
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].imgSrc = api.getUpload(res.data.realUrl)
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].imgId = res.data.fileId
        this.dialogVisible = false
      } else if (typeT[typeT.length - 1] == 'mp4') {
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].mp4Url = api.getUpload(res.data.realUrl)
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].mp4Id = res.data.fileId
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].mp4Name = res.data.fileName
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].duration = res.data.duration
        this.dialogVisible = false
      } else if (typeT[typeT.length - 1] == 'mp3') {
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].mp3Url = api.getUpload(res.data.realUrl)
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].mp3Id = res.data.fileId
        this.ruleForm.activityIntro[this.ruleForm.activityIntro.length - 1].mp3Name = res.data.fileName
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
      this.areaArr = []
      this.areaArr.push(areaNumber)
      // this.from.areaid = this.areaArr
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options2 = []
          this.value2 = ''
          this.options2 = res.data.data
        }
      })
    },

    valu2(areaNumber) {
      if (this.areaArr.length == 2) {
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber)
      // this.from.areaid = this.areaArr
      // console.log(this.from)
    },


    uploadImg() {
      if (this.ruleForm.activityIntro.length == 20) {
        this.$message.error('最多只能添加二十个内容!')
        return false
      }
      this.dialogVisible = true
      this.fileList = []
    },

    uploadText() {
      if (this.ruleForm.activityIntro.length < 20) {
        this.ruleForm.activityIntro.push({
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
      if (this.ruleForm.activityIntro.length == 1) {
        this.$message.error('最少要有一个有效元素！');
        return false
      }
      this.ruleForm.activityIntro.splice(index, 1)
    },

    divTop(index) {
      console.log(index)
      if (index == 0) {
        this.$message.error('已经是第一位了！');
        return false
      }
      this.ruleForm.activityIntro[index] = this.ruleForm.activityIntro.splice(index - 1, 1, this.ruleForm.activityIntro[index])[0]
    },

    divBottom(index) {
      console.log(index)
      if (index == this.ruleForm.activityIntro.length - 1) {
        this.$message.error('已经是最后一位了！');
        return false
      }
      this.ruleForm.activityIntro[index] = this.ruleForm.activityIntro.splice(index + 1, 1, this.ruleForm.activityIntro[index])[0]
    },

    changeCount() {
      //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
      var re = /^[0-9]+.?[0-9]*$/;
      if (!re.test(this.ruleForm.medalList[0].continuousDay)) {
        this.$message.error('请输入数字');
        this.ruleForm.medalList[0].continuousDay = ''
        return false;
      }
      if (this.ruleForm.endTime=="") {
        this.$message.error('请先填写结束时间');
        this.ruleForm.medalList[0].continuousDay = ''
        return false;
      }
      //判断天数的合法性    
      let nowTime = new Date().getTime() 
      let DifferenceTime = (this.ruleForm.endTime - nowTime)/86400000
      if (DifferenceTime<this.ruleForm.medalList[0].continuousDay) {
        this.$message.error('请填写合理的连续天数');
        this.ruleForm.medalList[0].continuousDay = ''
        return false;
      }
      


    },

    nextNextNextNext() {
      console.log(this.uploadForm)
      for (var i = 0; i < this.ruleForm.activityIntro.length; i++) {
        this.ruleForm.activityIntro[i].sort = i + 1
      }
      this.$http.post(api.getPlatform('/activity/add'), this.uploadForm).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          this.$message.success('活动创建成功！')
          this.$router.push('/activeManagement')
        }
      })
    },

    getMedalList() {
      this.$http.post(api.getPlatform('/medal/meMedal/selectMedalGroup')).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].fileUrl = api.getUpload(res.data.data[i].fileUrl)
          }
          this.meadlArr = res.data.data
          console.log(this.meadlArr)
        }
      })
    },

    playaudio(src) {
      let audioAll = document.getElementsByTagName('audio')
      let videoAll = document.getElementsByTagName('video')

      for (var i = 0; i < audioAll.length; i++) {
        if (src != audioAll[i].src) {
          audioAll[i].pause()
        }
      }
      for (var i = 0; i < videoAll.length; i++) {
        videoAll[i].pause()
      }
    },

    playvideo(src) {
      let audioAll = document.getElementsByTagName('audio')
      let videoAll = document.getElementsByTagName('video')

      for (var i = 0; i < videoAll.length; i++) {
        if (src != videoAll[i].src) {
          videoAll[i].pause()
        }
      }
      for (var i = 0; i < audioAll.length; i++) {
        audioAll[i].pause()
      }
    },
    clickitem (e) {

      e === this.ruleForm.activityMedalId ? this.ruleForm.activityMedalId= '' : this.ruleForm.activityMedalId = e
    }    
  },
  created() {
    this.next()
    this.areaList()
    this.getMedalList()
  }
}
