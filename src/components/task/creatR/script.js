import axios from 'axios'
import api from '../../api/index'
export default {
  data() {
    var Tel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话不能为空'));
      }
      setTimeout(() => {
        if (!Number(value)) {
          callback(new Error('请输入数字'));
        } else {
          if (!(/^((0\d{2,3}\d{7,8})|(1[23546789]\d{9}))$/.test(value))) {
            callback(new Error('请输入正确联系方式'));
          } else {
            callback();
          }
        }
      }, 0);
    };
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      dialogVisibleImg:false,
      from: {
        orgName: '',
        area: [],
        address: '',
        managerName: '',
        managerPhone: '',
        superiorId: '',
        intro: '',
        fileId: '',
        status: '',
        lowerList: [],
        type: 10,
      },
      positionList: {
        schoolArea: [],
        type: 2
      },
      positionList1: {
        schoolArea: [],
        type: 10
      },
      lowerList1: [],
      box2Text: '',
      box1: true,
      box2: false,
      imgUrl: '',
      superiorIdArr: [],
      lowerListArr: [],
      active: 2,
      rules: {
        positionName: [{
            required: true,
            message: '请输入基地名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        managerName: [{
            required: true,
            message: '请输入管理员名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        managerPhone: [{
          required: true,
          validator: Tel,
          trigger: 'blur'
        }],
        superOrgId: [{
          required: true,
          message: '请选择上级',
          trigger: 'change'
        }],
        positionStatus: [{
          required: true,
          message: '请选择状态',
          trigger: 'change'
        }],
        area: [{
          type: 'array',
          required: true,
          len: 3,
          message: '请选择地区',
          trigger: 'change'
        }, ]

      },
      dialogVisible: false,
      dialogVisibleDel: false,
      //地区
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      options1: [],
      options2: [],
      options3: [],
      areaArr: [],
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
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      name:"",
    };


  },
  methods: {

    //图片上传
    handleAvatarSuccess(res, file, fileList) {
      this.imgUrl = api.getUpload(res.data.realUrl)
      this.from.positionFileId = res.data.fileId
    },
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
        console.log(fd);
        this.$http.post(api.getUpload("/file/ihongka_files/upload"), fd)
          .then(
            res => {
              console.log(res);
              this.dialogVisibleImg = false;
              this.imgUrl = api.getUpload(res.data.data.realUrl)
              this.from.positionFileId = res.data.data.fileId

              // this.tableData.albumFileId = res.data.data.fileId;

              // this.imageUrl = api.getUpload(res.data.data.realUrl);

            },
            res => {
              console.log(res);
            }
          );
        return false;

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
      // var _this = this;
      // return new Promise(function (resolve, reject) {
      //   var reader = new FileReader();
      //   reader.onload = function (event) {
      //     var image = new Image();
      //     image.onload = function () {
      //       var width = this.width;
      //       var height = this.height;
      //       if (width != height) {
      //         _this.$message.error('图片宽高必须相等')
      //         reject();
      //       }
      //       resolve();
      //     };
      //     image.src = event.target.result;
      //   }
      //   reader.readAsDataURL(file);
      // });
    },

    handleList () {
      this.$http.post(api.getPlatform('/person/seeperson'), { positionId: this.$route.query.id}).then(res => {
        if (res.data.status == 200) {
          res.data.data.positionStatus = res.data.data.positionStatus+''
          res.data.data.superOrgId = res.data.data.superOrgId+''
          for (var i = 0; i < res.data.data.lowerList.length; i++) {
            this.lowerList1.push(res.data.data.lowerList[i].userid)
          }
          this.imgUrl = api.getUpload(res.data.data.positionUrl)
          res.data.data.lowerList = this.lowerList1
          this.from = res.data.data
          this.value1 = this.from.area[0] + ''
          this.value2 = this.from.area[1] + ''
          this.value3 = this.from.area[2] + ''
          this.value4 = this.value1
          this.value5 = this.value2
          this.value6 = this.value3
          this.valu1(this.value1)
          this.valu2(this.value2)
          this.valu3(this.value3)
        }
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.dialogVisible = true
          // console.log(this.from)
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },

    submit() {
      if (this.from.superiorId == '1') {
        this.from.superiorId = ''
      }

      this.$http.post(api.getPlatform('/person/editeAccount'), this.from).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          this.$message.success('编辑成功!')
          this.dialogVisible = false
          this.$router.push('/lookTeacherLT')
        } else {
          this.$message.error(res.data.msg)
          if (this.from.superiorId == '') {
            this.from.superiorId = '1'
          }
          this.dialogVisible = false
        }
      })

    },

    goSchoolManagement () {
      this.$router.push('/schoolManagement')
    },

    // 四级联动
    areaList() {
      // alert(2)
      this.$http.post(api.getPlatform('/area'), {
        areaCode: 1
      }).then(res => {
        // console.log(res.data.data)
        if (res.data.status == 200) {
          this.options1 = res.data.data
          // console.log(this.options1)
        }
      })
    },

    valu1(areaNumber) {
      this.areaArr = []
      this.areaArr.push(areaNumber)
      this.from.area = this.areaArr
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          if (areaNumber != this.value4) {
            this.from.lowerList = []
            this.value2 = ''
            this.options2 = ''
            this.value3 = ''
            this.options3 = ''
          }
          this.options2 = res.data.data
        }
      })
    },
    valu2(areaNumber) {
      if (this.areaArr.length == 2) {
        this.areaArr.pop()
      }
      if (this.areaArr.length == 3) {
        this.areaArr.pop()
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber)
      this.from.area = this.areaArr
      // console.log(this.from)
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          if (areaNumber != this.value5) {
            this.from.lowerList = []
            this.value3 = ''
            this.options3 = ''
          }
          this.options3 = res.data.data
        }
      })
    },
    valu3(areaNumber) {
      if (this.areaArr.length == 3) {
        this.areaArr.pop()
      }
      if (areaNumber != this.value6) {
        this.from.lowerList = []
      }
      this.areaArr.push(areaNumber)
      this.from.area = this.areaArr

      if (this.areaArr.length == 3) {
        this.positionList1.schoolArea = this.from.area
        this.$http.post(api.getPlatform('/position/positionList'), this.positionList1).then(res => {
          if (res.data.status == 200) {
            console.log(res)
            this.superiorIdArr = res.data.data.positionList
            console.log(this.superiorIdArr)
          }
        })
      }



    },
    valu4(areaNumber) {
      this.areaArr.push(areaNumber)
      this.from.area = this.areaArr
    },

    goLookTeacherLT () {
      this.$router.push('/lookTeacherLT')
    }
  },
  created() {
    this.handleList()
  },
  mounted () {
    this.areaList()
    
  }
}
