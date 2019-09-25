import axios from 'axios'
import api from '../../api/index'


export default {

  data() {
    return {
      ruleForm: {
        albumName: '',

        albumType: this.$route.query.type,
        intro: '',
        fileUrl: '', //封面Id改成url
        albumFileId: '',
        orgId: window.sessionStorage.getItem('orgid')

      },
      loading:false,
      options: [],
      selectedOptions3: [],
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      bool: true,

      rules: {
        albumName: [{
            required: true,
            message: '请输入专辑名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }



        ],
        labels: [{
            required: true,
            message: '请输入专辑标签',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 4,
            message: '长度在 2 到 4个字符',
            trigger: 'blur'
          }
        ],

        intro: [{
            required: true,
            message: '请填写专辑简介',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 500,
            message: '长度在 3 到 500 个字符',
            trigger: 'blur'
          }
        ],
        img: [{
          required: true,
          message: '请上传封面',
          trigger: 'blur'
        }]
      },
      imageUrl: '',
      dialogVisible: false,
      dialogVisibleDel:false,
      categoryId: '',
      label: '',
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
  created() {
    // this.getParams()

  },

  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      if (this.dynamicTags.length < 5) {
        this.bool = true
      }
    },

    showInput() {



      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    showDiv() {

      // if(this.dynamicTags.length>4) { 
      //   return false
      //  }

    },

    handleInputConfirm() {

      let inputValue = this.inputValue;
      if (inputValue.length == 0) {

        return false
      }
      var hash = {}
      for (var i = 0; i < inputValue.length; i++) {　　　　　　
        if (inputValue.charCodeAt(i) > 255) {
          // this.dynamicTags.push(inputValue);
        }　　　　　　　　　　　　　　
        else {
          this.$message.error('标签为纯中文')
          return false
        }　　　　　　　　　　　　
      }
      // if (this.dynamicTags.length > 4) {
      //   // this.$message.error('只能输入5个标签')
      //   this.dynamicTags.length = 5
      //   this.bool = false
      //   this.inputVisible = false;
      //   this.inputValue = '';
      //   return false
      // }

      for (var i = 0; i < this.dynamicTags.length; i++) {


        if (this.dynamicTags[i] == inputValue) {
          this.$message.error('标签不能重复')
          this.inputValue = ''
          return false
        }
      }

      if (inputValue.length > 1 && inputValue.length < 5) {
        this.dynamicTags.push(inputValue);

        if (this.dynamicTags.length == 5) {


          this.$message.error('只能输入5个标签')
          this.dynamicTags.length = 5
          this.bool = false
          this.inputVisible = false;
          this.inputValue = '';
          return false

        }
      } else {
        this.$message.error('标签的长度只能为2-4位，请重新输入')
      }

      this.inputVisible = false;
      this.inputValue = '';
    },
    keyupEnt() {

      // this.handleInputConfirm()
      let inputValue = this.inputValue;
      if (inputValue.length == 0) {

        return false
      }



      　
      for (var i = 0; i < inputValue.length; i++)　　　　 {　　　　　　
        if (inputValue.charCodeAt(i) > 255) {
          // this.dynamicTags.push(inputValue);
        }　　　　　　　　　　　　　　
        else {
          this.$message.error('标签为纯中文')
          return false
        }　　　　　　　　　　　　
      }

      for (var i = 0; i < this.dynamicTags.length; i++) {

        if (this.dynamicTags[i] == inputValue) {
          this.$message.error('标签不能重复')
          this.inputValue = '';
          return false
        }
      }
      if (inputValue.length > 1 && inputValue.length < 5) {
        this.dynamicTags.push(inputValue);
      } else {
        this.$message.error('标签的长度只能为2-4位，请重新输入')

        // this.inputVisible = false;
        this.inputValue = '';
      }
      if (this.dynamicTags.length > 4) {
        this.dynamicTags.length = 5

        this.bool = false
        this.inputValue = '';
        return false

      }
      // this.inputVisible = false;
      this.inputValue = '';

    },
    cate() {
      this.$http.post(api.getPlatform('/album/getComCategory')).then(res => {

        if (res.data.status == 200) {
          this.options = res.data.data

        }
      })
    },

    //图片上传前判断格式
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const type = file.name.split(".")
      if (
        type[type.length - 1] == 'jpg' || 
        type[type.length - 1] == 'jpeg'||
        type[type.length - 1] == 'JPG' || 
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
        type[type.length - 1] == 'jpeg'||
        type[type.length - 1] == 'JPG' || 
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
      var event = event || window.event;
      console.log(event)
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) { 
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
        axios.post(api.getUpload("/file/ihongka_files/upload"),fd)
          .then(
            res => {
              console.log(res);
              this.dialogVisibleImg = false;
              console.log(res.data.data.realUrl)
              this.ruleForm.fileUrl = api.getUpload(res.data.data.realUrl)
              this.ruleForm.albumFileId = res.data.data.fileId;
             
            },
            res => {
              console.log(res);
            }
          );
        return false;

      });
    },
    //校验重名
    checkRep(name) {
      if (name.length > 20) {
        this.$message.error('长度在 1 到 20 个字符')

      }


      axios.post(api.getPlatform('/album/check_name'), {
        name: name

      }).then(res => {


        if (res.data.status == 100003) {

          this.rules.albumName = [{
            required: true,
            message: '名称已存在,请重新输入专辑名称',
            trigger: 'change'
          }]
       //   this.$message.error('名称已存在,请重新输入专辑名称')
          this.ruleForm.albumName = ''
          return
        }
      })
    },
    //提交按钮

    submit(form) {

      this.ruleForm['albumLabel'] = this.dynamicTags.join(',')
      this.ruleForm['albumCategoryId'] = this.selectedOptions3

      if (this.ruleForm.albumName.trim().length > 20 || this.ruleForm.albumName.trim().length == 0 || this.ruleForm.intro.trim().length == 0 || this.ruleForm.fileUrl.length == 0 || !this.ruleForm.albumCategoryId) {
        this.$message({
          message: '请填写正确全部内容',
          type: 'error'
        })
        this.dialogVisible = false
        return false
      } else {
        this.loading = true
        axios({
          method: 'post',
          url: api.getPlatform('/album/add'),
          data: this.ruleForm
        }).then(res => {
        this.loading = false
          if (res.data.status == 200) {
            this.$message({
              message: '提交成功',
              type: 'success'

            })
            this.dynamicTags = []
            this.selectedOptions3 = []
            this.dialogVisible = false
            this.$refs['ruleForm'].resetFields()
            this.ruleForm.fileUrl = ''
            this.$router.push('/albumManagement')

          }
        })





      }


    },
    //取消按钮
    cancel() {
      this.$router.push('/createAlbum')
    },

    a() {
      this.$router.push('/albumManagement')
    },

    b() {
      this.$router.push('/createAlbum')
    }





  },
  mounted() {

    this.cate()

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }

}
