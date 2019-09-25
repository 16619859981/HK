import VueUeditorWrap from 'vue-ueditor-wrap';
import api from '../../api/index'
export default {
  // yinru
  components: { VueUeditorWrap },

  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      ruleForm: {
        name: '',
        coverId: '',
        beginTime: '',
        endTime: '',
        time:[],
        radio: '',
      },
      intro:"",
      time: [],
      upTime: '',
      rules: {
        name: [
          { required: true, message: '请输入专题名称', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }



        ],
        time: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],

        desc: [
          { required: true, message: '请填写专题简介', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请上传专题封面', trigger: 'blur' }
        ]
      },
      vote: {
        topics: '',
        btn: '',
        option1: '',
        option2: '',

      },
      dialogVisible: false,
      dialogVisibleDel:false,
      imageUrl: '',
      //富文本编辑器

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
        autoFloatEnabled:false,
        elementPathEnabled: false,
      
      },
      pickerOptions0: {
        disabledDate: (time) => {

      
          return time.getTime() < Date.now()-8.64e7;
     

        }
      }




    };


  },
  methods: {


    //图片上传
    handleAvatarSuccess(res, file) {


      this.ruleForm.coverId = res.data.fileId
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
            if (width != Number(height)*(5/2)) {
              _this.$message.error('图片宽高必须是5:2')
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
    upload() {
      this.dialogVisible = true
    },
    //获取时间
    getTime(val) {
      this.ruleForm.beginTime = val[0];
      this.ruleForm.endTime = val[1];


    },
    submit() {
      // alert(2)
    
      if (this.ruleForm.radio == 2) {
        this.ruleForm['upTime'] = this.upTime
      }
      if (this.ruleForm.radio == 1) {
        this.ruleForm['upTime'] = new Date().getTime()
      }

      

      for (var key in this.ruleForm) {
     
        
     
        
        if (this.ruleForm[key] == '') {
          this.$message.error('请填写全部内容')
          return false
        }
      }
      if (this.ruleForm.name.length > 20) {

        this.$message.error('专题名称在1-20个字符内')
        return false
      }

      
     
      if (String(this.ruleForm.name).trim().length==0) {

        this.$message.error('专题名称在1-20个字符内')
        return false
      }
      if (String(this.intro).trim().length==0) {

        this.$message.error('专题简介不能为空')
        return false
      }
      if (this.ruleForm.fileId== '') {

        this.$message.error('请上传封面')
        return false
      }
    

      if (this.ruleForm.upTime  == "") {
        this.$message.error('请选择发布时间')
        return false
      }
      if (this.ruleForm.upTime>this.ruleForm.beginTime) {
        this.$message.error("发布时间不得晚于开始时间")
        return false
      }
    
      this.dialogVisible = true
    },
    //提交
    handleForm() {

      var str=this.intro;
      this.ruleForm.intro=str.replace(/<img/g,'<img style="max-width:100%" ');
      console.log(this.ruleForm.intro)
      this.$http.post(api.getContent('/subject/insert'), this.ruleForm).then(res => {
     
        
        if (res.data.status == 200) {
          this.$message({
            type: 'success',
            message: '创建成功'
          })
          this.$router.push('/themeManagement')
          this.dialogVisible = false

        }
   

      })


    },
      // UE:Editor.prototype.getActionUrl = function(action) {
      //     //这里很重要，很重要，很重要，要和配置中的imageActionName值一样
      //     if (action == 'uploadimage') {
      //     //这里调用后端我们写的图片上传接口
      //     return 'http://localhost:8081/Test/fileUploadServlet';
      //     }else{
      //     return this._bkGetActionUrl.call(this, action);
      //     }
      // } 

      del() {
        this.$router.push('/themeManagement')
      }
     



  },
  mounted () {

  }
}