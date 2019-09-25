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
        itype: '',
        isAllDay: '',
        radio2: '',
        upTime: '',
        intro: "",
        fileId: "", // 封面id
        area: [],
        type: 1,
        dayStart: '',
        dayEnd: '',
        score: '',
        limitType: '',
        //1=图文；2=语音；
        // area: ""// 先写死  后期改 
      },
      loading: false,
      intro: "",
      //地区
      value1: "",
      value2: '',
      options1: [
        {
          // areaNumber: "11000000",
          // areaName: "北京市"
        },
      ],
      options2: [
        {
          // areaNumber: "11000000",
          // areaName: "北京市"
        },
      ],
      imageUrl: '',
      options: [],
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
        startTime: [
          { required: true, message: '请选择活动开始时间', trigger: 'blur' },

        ],
        endTime: [
          { required: true, message: '请选择活动结束时间', trigger: 'blur' },

        ],

        dayStart: [
          { required: true, message: '请选择评论开始时间', trigger: 'blur' },

        ],

        dayEnd: [
          { required: true, message: '请选择评论结束时间', trigger: 'blur' },

        ],

        intro: [
          { required: true, message: '请填写活动简介', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请上传封面', trigger: 'blur' }
        ],
        itype: [
          { required: true, message: '请选择发布时间', trigger: 'blur' }
        ],
        limitType: [
          { required: true, message: '请选择活动评论类型', trigger: 'blur' }
        ],
        radio2: [
          { required: true, message: '请选择是否', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择活动地区', trigger: 'blur' }
        ]

      },
      ue: null,
      dialogVisible: false,
      dialogVisibleDel: false,

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


          return time.getTime() < Date.now() - 8.64e7;


        }
      }




    };


  },

  methods: {



    //选择地区
    areaList2() {
      // alert(2)
      this.$http.post(api.getContent('/area'), { areaCode: 1 }).then(res => {


        if (res.data.status == 200) {
          this.options1 = res.data.data



        }
      })
    },
    //选择的省份获取
    val1(per) {
      // alert(per)
      this.ruleForm.area = []
      this.ruleForm.area.push(per)
      this.$http.post(api.getContent('/area'), { areaCode: per }).then(res => {


        if (res.data.status == 200) {
          this.options2 = []
          this.value2 = ''
          this.options2 = res.data.data

        }
      })
    },
    //获取选择的市区
    val2(city) {
      if (this.ruleForm.area.length == 2) {
        this.ruleForm.area.length.pop()
      }
      this.ruleForm.area.push(city)
      // alert(city)
    },


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
            if (width != Number(height) * (400 / 250)) {
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
    //渲染专题‘
    getTheme() {
      this.$http.post(api.getContent('/subject/name')).then(res => {


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
    submit() {
      // alert(2)
      // if (this.ruleForm.radio == 2) {
      //   this.ruleForm.upTime = this.ruleForm.upTime
      // }
      // console.log(this.ruleForm.intro)
      // if () 


      if (this.ruleForm.itype == 1) {
        this.ruleForm.upTime = new Date().getTime()
      }



      if (this.ruleForm.name.length > 20) {

        this.$message.error('活动名称在1-20个字符内')
        return false
      }



      if (String(this.ruleForm.name).trim().length == 0) {

        this.$message.error('活动名称在1-20个字符内')
        return false
      }

      // if (this.ruleForm.subjectId== '') {

      //   this.$message.error('请选择归属专题')
      //   return false
      // }
      if (this.ruleForm.area.length == 0) {

        this.$message.error('请选择活动城市')
        return false
      }
      if (this.ruleForm.startTime == '' || this.ruleForm.endTime == '') {

        this.$message.error('请选择活动时间')
        return false
      }
      if (String(this.intro).trim().length == 0) {

        this.$message.error('活动简介不能为空')
        return false
      }
      if (this.ruleForm.fileId == '') {

        this.$message.error('请上传封面')
        return false
      }

      if (this.ruleForm.radio2 == "") {
        this.$message.error('请选择是否推送红卡设备')
        return false
      }
      if (this.ruleForm.upTime == "") {
        this.$message.error('请选择发布时间')
        return false
      }

      if (this.ruleForm.isAllDay == 1) {
        this.ruleForm.dayStart = null
        this.ruleForm.dayEnd = null
      }
      // if (this.ruleForm.upTime>this.ruleForm.startTime) {
      //   this.$message.error("发布时间不得晚于开始时间")
      //   return false
      // }





      this.dialogVisible = true
      return false
    },
    handleForm() {

      //另一个富文本编辑器的获取内容
      //  this.ruleForm.intro = this.ue.body.innerHTML
      this.loading = true
      var str = this.intro;
      this.ruleForm.intro = str.replace(/<img/g, '<img style="max-width:100%" ');


      // alert(2)
      this.$http.post(api.getContent('/activity/add'), this.ruleForm).then(res => {

        this.loading = false
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
    //取消按钮
    cancel() {
      this.$router.push('/createActive')
    },


    clear() {
      this.ruleForm.subjectId = ''
    }





  },
  mounted() {
    this.areaList2()
    this.getTheme()


  },

}