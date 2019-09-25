import api from '../../api/index'
export default {
  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      ruleForm: {
        number: '',

        type: '',

        bannerName: '',

        id: window.sessionStorage.getItem('id'),
        fileId: '',
        // area: [],
       
      },
      loading:false,
      rules: {
        bannerName: [
          { required: true, message: '请输入banner标题', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],


        type: [
          { required: true, message: '请输入链接类型', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择地区', trigger: 'blur' }
        ],
        img: [
          { required: true, meaasge: '请上传图片', trigger: 'blur' }
        ]




      },
      options: [],

      code: '',
      imageUrl: '',
      checkMsg: {
        materialAlbumName: '',
        materialAlbumIntro: '',
        fileUrl: '',
      },
      dialogVisiblePass: false,
      dialogVisibleSub: false,
      dialogVisibleAbl: false,
      dialogVisibleDel:false,


      number:'',
      //地区
      value3: "",
      value4: '',
      options3: [
        {
          // areaNumber: "11000000",
          // areaName: "北京市"
        },
      ],
      options4: [
        {
          // areaNumber: "11000000",
          // areaName: "北京市"
        },
      ],



    };


  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.ruleForm.fileId = res.data.fileId
      this.imageUrl = URL.createObjectURL(file.raw);
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
        type[type.length - 1] == 'jpeg'||
        type[type.length - 1] == 'BMP' || 
        type[type.length - 1] == 'DIP' || 
        type[type.length - 1] == 'JPG' || 
        type[type.length - 1] == 'TIF' || 
        type[type.length - 1] == 'PNG' || 
        type[type.length - 1] == 'TGA' || 
        type[type.length - 1] == 'PIC' || 
        type[type.length - 1] == 'JPEG'
      ) {

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
            if (width != Number(height)*2) {
              _this.$message.error('图片宽高必须是2:1')
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
    //banner 类型的链接选择
    bannerType() {
      this.$http.post(api.getOperate('/findBannerType')).then(res => {
  
        
        if (res.data.status == 200) {
          this.options = res.data.data

        }
      })
    },

    //选择类型
    changeType(val) {

      if (val ==1) {
        document.getElementById('placeholder').placeholder ="请输入链接"
      }else  if (val ==2) {
        document.getElementById('placeholder').placeholder ="请输入专辑编号"
      }else  if (val ==3) {
        document.getElementById('placeholder').placeholder ="请输入链接"
      } else  if (val ==4) {
        document.getElementById('placeholder').placeholder ="请输入少年宫编号"
      } else  if (val ==5) {
        document.getElementById('placeholder').placeholder ="请输入学校编号/学校名称"
      } else  if (val ==6) {
        document.getElementById('placeholder').placeholder ="请输入Id或手机号"
      } else  if (val ==7) {
        document.getElementById('placeholder').placeholder ="请输入Id或手机号"
      } else  if (val ==8) {
        document.getElementById('placeholder').placeholder ="请输入Id或手机号"
      } 
    },
    //预览
    preview() {
      // console.log(this.ruleForm)
      
      this.$http.post(api.getOperate('/getBannerInfo'), { type:this.ruleForm.type, id: this.ruleForm.number }).then(res => {
    
        
        if (res.data.status == 200) {
          this.checkMsg = res.data.data
          this.dialogVisiblePass = true
        } else if (res.data.status == 30005) {
          this.dialogVisibleAbl = true


        }
      })


    },
    



    // //选择地区
    // areaList() {
    //   // alert(2)
    //   this.$http.post(api.getContent('/area'), { areaCode: 1 }).then(res => {
   
        
    //     if (res.data.status == 200) {
    //       this.options3 = res.data.data
     

          
    //     }
    //   })
    // },
    // //选择的省份获取
    // valu1(per) {
    //   // alert(per)
    //   this.ruleForm.area = []
    //   this.ruleForm.area.push(per)
    //   // console.log(this.ruleForm.area)

    //   this.$http.post(api.getContent('/area'), { areaCode: per }).then(res => {

    //     if (res.data.status == 200) {
    //       this.options4 = []
    //       this.value4 = ''
    //       this.options4 = res.data.data

    //     }
    //   })
    // },
    // //获取选择的市区
    // valu2(city) {
    //   if (this.ruleForm.area.length == 2) {
    //     this.ruleForm.area.pop()
    //   }
    //   this.ruleForm.area.push(city)
    //   // console.log(this.ruleForm.area)


    // },
    //提交弹框

    subimt() {
      for (var key in this.ruleForm) {
       
        if (this.ruleForm[key]=='') {
          this.$message.error('请填写全部内容')
          return false

        }
        if(String(this.ruleForm.bannerName).trim().length<1) {
          this.$message.error('请填写banner')
          return false
        }
        if (String(this.ruleForm.bannerName).trim().length>10) {
          this.$message.error('banner名称为1-10个字符')
          return false
        }
      

      }


      this.dialogVisibleSub = true
    },

    //弹框确认
    submitData() {
     
      this.loading=true

      this.$http.post(api.getOperate('/creatBanner'), this.ruleForm).then(res => {
        this.loading=false
    
        
        if (res.data.status==200) {

          
          this.$message({
            message: '创建成功',
            type: 'success'

          })
          this.$router.push('/appBanner')
          
          
        }
        this.dialogVisibleSub = false
       
      })

    },

    del() {
      this.$router.push('/appBanner')
    },






  },
  mounted() {
    this.bannerType()
    // this.areaList()
  }
}