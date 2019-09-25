// import axios from 'axios'
import VueUeditorWrap from 'vue-ueditor-wrap';
import api from '../../api/index'
// import '../static/UEditor/utf8-jsp/ueditor.config'
// import '../../../../static/UEditor/utf8-jsp/ueditor.config'

// import '../../../../static/UEditor/utf8-jsp/ueditor.all'
// import '../../../../static/UEditor/utf8-jsp/lang/zh-cn/zh-cn'
// import '../../../../static/UEditor/utf8-jsp/ueditor.parse'
export default {
  components: { VueUeditorWrap },
  data() {
    // define(['ZeroClipboard'],function(ZeroClipboard){
    //   window['ZeroClipboard']=ZeroClipboard;

    //   });

    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      ruleForm: {
        name: '',
        time: [],
        startTime: '',
        endTime: '',
        // imageUrl: '',
        subjectId: '',
        //定时发布的时间
        radio: '',
        upTime: 0,
        intro: "",
        fileId: 1, // 封面id

        type:2, //1=图文；2=语音；
        // area: ""// 先写死  后期改 
      },
      imageUrl: '',
      options:[],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }

        ],
        sub: [
          { required: true, message: '请选择活动所属专题', trigger: 'blur' },

        ],
        time: [
          { required: true, message: '请选择活动时间', trigger: 'blur' },

        ],


        intro: [
          { required: true, message: '请填写活动简介', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请上传封面', trigger: 'blur' }
        ],
        radio: [
          { required: true, message: '请选择发布时间', trigger: 'blur' }
        ]

      },
      ue: null,
      dialogVisible: false,
      radio: false,

      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: '/file/ihongka_files/upload',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: '../../../static/utf8-jsp/',
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 200,
        // 初始容器宽度
        // initialFrameWidth: '50%',
        // 关闭自动保存
        enableAutoSave: false,
        toolbars: [[
          'source', 'undo', 'redo',
          'bold', 'italic', 'underline', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'cleardoc',

          'insertimage'
        ]],
        autoFloatEnabled:false,
        elementPathEnabled: false,
    
      },
      // toolbars: [
      //   [
      //     'undo', 'redo',
      //     'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc',

      //     'customstyle', 'paragraph', 'fontfamily', 'fontsize', ,
      //     'emotion'
      //   ]
      // ],
      pickerOptions0: {
        disabledDate: (time) => {

      
          return time.getTime() < Date.now()-8.64e7;
     

        }
      }




    };


  },
  methods: {
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
      // this.imageUrl = URL.createObjectURL(file.raw);
      // this.ruleForm.fileUrl = res.data.realUrl;
      this.ruleForm.fileId = res.data.fileId;


      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {

    
      
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
      if (file.length >= 10) {
        this.$message.error('最多上传10个文件');
        return false
      }

    },
    upload() {
      this.dialogVisible = true
    },
    //渲染专题‘
    getTheme(){
      this.$http.post(api.getContent('/subject/name')).then(res=>{

        
        if (res.data.status ==200) {
          this.options = res.data.data

        }
      })
    },
    //获取时间   时间戳
    getTime(val) {

      
      this.ruleForm.startTime = val[0];
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

      

     
      
      if (this.ruleForm.name.length > 20) {

        this.$message.error('活动名称在1-20个字符内')
        return false
      }

      
     
      if (String(this.ruleForm.name).trim().length==0) {

        this.$message.error('活动名称在1-20个字符内')
        return false
      }
      if (String(this.ruleForm.intro).trim().length==0) {

        this.$message.error('活动简介不能为空')
        return false
      }
      if (this.ruleForm.subjectId== '') {

        this.$message.error('请选择归属专题')
        return false
      }
      if (this.ruleForm.fileId== '') {

        this.$message.error('请上传封面')
        return false
      }
      if (this.ruleForm.startTime==''||this.ruleForm.endTime=='') {

        this.$message.error('请选择活动时间')
        return false
      }

  
    
  
    
      this.dialogVisible = true
    },
    handleForm() {

      //另一个富文本编辑器的获取内容
      //  this.ruleForm.intro = this.ue.body.innerHTML

      

 
      // alert(2)
      this.$http.post(api.getContent('/activity/add'), this.ruleForm).then(res => {
 
        
        if (res.data.status == 200) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.$router.push('/activeManagement')
        }
      })


    },
    // initUeditor() {

    //   this.ue = UE.getEditor('container',
    //     {
    //       UEDITOR_HOME_URL: '../../../static/utf8-jsp/',
    //       initialFrameWidth: 800, //
    //       initialFrameHeight: 300,
    //       isShow: true,
    //       initialContent: '请输入文字',
    //       toolbars: this.toolbars,
    //       'fontfamily': [{
    //         label: '',
    //         name: 'songti',
    //         val: '宋体,SimSun'
    //       },
    //       {
    //         label: '',
    //         name: 'kaiti',
    //         val: '楷体,楷体_GB2312, SimKai'
    //       }
    //       ],
    //       //段间距 值和显示的名字相同
    //       'rowspacingtop': ['10'],
    //       'lineheight': ['1.75'],
    //       'customstyle': [{
    //         tag: 'h1',
    //         name: 'tc',
    //         label: '',
    //         style: 'border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;'
    //       },
    //       {
    //         tag: 'span',
    //         name: 'im',
    //         label: '',
    //         style: 'font-style:italic;font-weight:bold ;color:red'
    //       },

    //       ],
    //       elementPathEnabled: false,
    //       enableAutoSave: false,
    //       maximumWords: 300

    //     }





    //   );

    // }
    cancel() {
      this.$router.push('/createActive')
    }





  },
  mounted() {
    // this.initUeditor();

      // this.ue = UE.getEditor('container',
      //   {
      //     UEDITOR_HOME_URL: '../../../static/utf8-jsp/',
      //     initialFrameWidth: 800, //
      //     initialFrameHeight: 300,
      //     isShow: true,
      //     initialContent: '请输入文字',
      //     toolbars: this.toolbars,
      //     'fontfamily': [{
      //       label: '',
      //       name: 'songti',
      //       val: '宋体,SimSun'
      //     },
      //     {
      //       label: '',
      //       name: 'kaiti',
      //       val: '楷体,楷体_GB2312, SimKai'
      //     }
      //     ],
      //     //段间距 值和显示的名字相同
      //     'rowspacingtop': ['10'],
      //     'lineheight': ['1.75'],
      //     'customstyle': [{
      //       tag: 'h1',
      //       name: 'tc',
      //       label: '',
      //       style: 'border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;'
      //     },
      //     {
      //       tag: 'span',
      //       name: 'im',
      //       label: '',
      //       style: 'font-style:italic;font-weight:bold ;color:red'
      //     },

      //     ],
      //     elementPathEnabled: false,
      //     enableAutoSave: false,
      //     maximumWords: 300

      //   }





      // );
      this.getTheme()


  },

}