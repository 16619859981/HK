import axios from 'axios'
import api from '../../api/index'
export default {
  data() {
    var Tel = (rule, value, callback) => {
      //          console.log(String(value).length)
      if (!value) {
        return callback(new Error('手机号/邮箱不能为空'));
      }
      setTimeout(() => {
        // if (!Number(value)) {
        //   callback(new Error('请输入数字'));
        // } else
        //  {
          if ((/^((0\d{2,3}\d{7,8})|(1[23546789]\d{9}))$/.test(value)) || (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value))) {
            callback();
    
          } else {
            callback(new Error('请输入正确手机号或者正确邮箱'));

          // }

        }
      }, 0);
    };
    return {
   
      from: {
        accouttype:"phone",
        orgName: '',
        area: [],
        address: '',
        managerName: '',
        managerPhone: '',
        pwd:"",
        superiorId: '',
        intro: '',
        fileId: '',
        status: '',
        lowerList: [],
        type: 7,
      },
      positionList: {
        schoolArea: [],
        type: 2
      },
      positionList1: {
        schoolArea: [],
        type: 10
      },
      box2Text: '',
      box1: true,
      box2: false,
      imgUrl: '',
      superiorIdArr: [],
      lowerListArr: [],
      active: 2,
      rules: {
        orgName: [{
            required: true,
            message: '请输入红广号名称',
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
        pwd:[{
          required: true,
          message: '请输入密码',
          trigger: 'change'
        }],
        superiorId: [{
          required: true,
          message: '请选择上级',
          trigger: 'change'
        }],
        status: [{
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
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      areaArr: [],
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
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], //页面显示的数组
   
      name: "",
    };


  },
  methods: {

   //图片上传前判断格式
   beforeAvatarUpload(file) {
    const isLt1M = file.size / 1024 / 1024 < 1;
    const type = file.name.split(".")
    if (
      type[type.length - 1] == 'jpg' ||
      type[type.length - 1] == 'jpeg' ||
      type[type.length - 1] == 'JPG' ||
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
  // 显示裁剪框
  changeUpload(file, fileList) {
    const isLt1M = file.size / 1024 / 1024 < 1;
    const type = file.name.split(".")
    if (
      type[type.length - 1] == 'jpg' ||
      type[type.length - 1] == 'jpeg' ||
      type[type.length - 1] == 'JPG' ||
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
      axios
        .post(

          api.getUpload("/file/ihongka_files/upload"),
          fd
        )
        .then(
          res => {
            console.log(res);
            this.dialogVisibleImg = false;
            console.log(res.data.data.realUrl)
            this.imgUrl = api.getUpload(res.data.data.realUrl)
            this.from.fileId = res.data.data.fileId;

          },
          res => {
            console.log(res);
          }
        );
      return false;

    });
  },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.dialogVisible = true
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
      if(this.from.accouttype=="email") {
        this.from.pwd = this.$md5(this.$md5(this.from.pwd) + 'hongka')
      }

      this.$http.post(api.getPlatform('/person/createAccount'), this.from).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          this.$message.success('创建成功!')
          this.box1 = false
          this.box2 = true
          this.active = 3
          this.dialogVisible = false
          this.box2Text = res.data.msg
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
      this.$router.push('/authentication')
    },
      //校验手机号或者邮箱
  check(val) {
    // console.log(val)
    this.from.pwd = ""
    var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var regPhone = /^((0\d{2,3}\d{7,8})|(1[23546789]\d{9}))$/;
    if(regPhone.test(val) ) {
      this.from.accouttype="phone"
    }else if (regEmail.test(val)){
      this.from.accouttype="email"
    }else if (val=="") {
      this.from.pwd = ""
    }

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
          this.options2 = []
          this.value2 = ''
          this.options3 = []
          this.value3 = ''
          this.options4 = []
          this.value4 = ''
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
          this.options3 = []
          this.value3 = ''
          this.options4 = []
          this.value4 = ''
          this.options3 = res.data.data
        }
      })
    },
    valu3(areaNumber) {
      if (this.areaArr.length == 3) {
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber)
      this.from.area = this.areaArr

      if (this.areaArr.length == 3) {
        this.positionList.schoolArea = this.areaArr
        this.$http.post(api.getPlatform('/position/positionList'), this.positionList).then(res => {
          if (res.data.status == 200) {
            // console.log(res)
            this.superiorIdArr = res.data.data.positionList
            console.log(this.superiorIdArr)
          }
        })
      }

      if (this.areaArr.length == 3) {
        this.positionList1.schoolArea = this.areaArr
        this.$http.post(api.getPlatform('/position/positionList'), this.positionList1).then(res => {
          if (res.data.status == 200) {
            // console.log(res)
            this.lowerListArr = res.data.data.positionList
            console.log(this.lowerListArr)
            console.log(res)            
          }
        })
      }


    },
    valu4(areaNumber) {
      this.areaArr.push(areaNumber)
      this.from.area = this.areaArr
    },
  },
  created() {
    this.areaList()
  },
}
