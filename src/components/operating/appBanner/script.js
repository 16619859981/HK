import api from '../../api/index'

export default {
  data() {
    return {
      ruleForm: {
        activeUrl: '',
        endTime: '',
        hdfl: '',
        nAme: '',
        textarea: '',
      },
      uploadArr: [
        { type: 'text', areaText: '' },
      ],
      value1: '',
      value2: '',
      dialogVisible: false,
      imgSRC: '',
      options1: [],
      options2: [],
      areaArr: [],
      active: 4,
      fileList: [],
      rules: {
        nAme: [{
          required: true,
          message: '请填写活动标题',
          trigger: 'blur'
        }],
        endTime: [{
          required: true,
          message: '请选择结束日期',
          trigger: 'blur'
        }],
        hdfl: [{
          required: true,
          message: '请选择活动分类',
          trigger: 'blur'
        }],
        fw: [{
          required: true,
          message: '请选择参与范围',
          trigger: 'blur'
        }],

      },
    }
  },
  methods: {
    next() {
      // this.$router.push({ path: '/appBanner', query: { fl: this.ruleForm.fl, time: this.ruleForm.time,  timer: this.ruleForm.timer } }); 
      // console.log(this.ruleForm.timer)
      this.ruleForm.timer1 = this.ruleForm.timer[0]
      this.ruleForm.timer2 = this.ruleForm.timer[1]
      this.$router.push({
        path: '/appBanner',
        query: {
          fl: this.ruleForm.fl,
          time: this.ruleForm.time,
          timer1: this.ruleForm.timer1,
          timer2: this.ruleForm.timer2
        }
      });

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
    handleAvatarSuccess(res, file, fileList) {
      // this.ruleForm[this.uploadDataIndex]['medalTaskFileId'] = res.data.fileId
      this.ruleForm.activeUrl = res.data.realUrl
    },
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
        this.uploadArr.push({ type: 'img', imgSrc: '', imgId: '' })
      } else if (type[type.length - 1] == 'mp4') {
        this.uploadArr.push({ type: 'mp4', mp4Url: '', mp4Id: '' })
      } else if (type[type.length - 1] == 'mp3') {
        this.uploadArr.push({ type: 'mp3', mp3Url: '', mp3Id: '' })
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
        this.uploadArr[this.uploadArr.length-1].imgSrc = res.data.realUrl
        this.uploadArr[this.uploadArr.length-1].imgId = res.data.fileId
        console.log(this.uploadArr[this.uploadArr.length-1])
      } else if (typeT[typeT.length - 1] == 'mp4') {
        this.uploadArr[this.uploadArr.length-1].mp4Url = res.data.realUrl
        this.uploadArr[this.uploadArr.length-1].mp4Id = res.data.realUrl
      } else if (typeT[typeT.length - 1] == 'mp3') {
        this.uploadArr[this.uploadArr.length-1].mp3Url = res.data.realUrl
        this.uploadArr[this.uploadArr.length-1].mp3Id = res.data.realUrl
      }
    },
    areaList() {
      this.$http.post(api.getContent('/area'), {
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
      this.from.areaid = this.areaArr
      this.$http.post(api.getContent('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options2 = []
          this.value2 = ''
          this.options2 = res.data.data
        }
      })
    },

    uploadImg() {
      this.dialogVisible = true
      this.fileList = []
    },

    uploadText () {
      this.uploadArr.push({ type: 'text', areaText: '' })
    },

    divDel (index) {
      console.log(index)
      if (this.uploadArr.length == 1) {
        this.$message.error('最少要有一个有效元素！');
        return false 
      }
      this.uploadArr.splice(index, 1)
    },

    divTop(index) {
      console.log(index)
      if (index == 0) {
        this.$message.error('已经是第一位了！');
        return false
      }
      this.uploadArr[index] = this.uploadArr.splice(index - 1, 1, this.uploadArr[index])[0]
    },

    divBottom(index) {
      console.log(index)
      if (index == this.uploadArr.length - 1) {
        this.$message.error('已经是最后一位了！');
        return false
      }
      this.uploadArr[index] = this.uploadArr.splice(index + 1, 1, this.uploadArr[index])[0]
    }
  },
  created() {
    this.areaList()
  }
}
