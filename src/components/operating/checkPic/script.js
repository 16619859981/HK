import VueUeditorWrap from 'vue-ueditor-wrap';
import { formatDate } from '../../../date';
import api from '../../api/index'
export default {
  components: { VueUeditorWrap },
  data() {
    return {
      ruleForm: {
        name: '活动名称',
        theme: '安全专题',
        time: '2018-09-09 至 2019-09-09',
        msg: '简介简介简介简介',
        imageUrl: '/static/logo.png',
        radio: '1',
        type:this.$route.query.type
   

      },
      rules: {
        user: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
        region: [
          { required: true, message: '请输入专辑标签', trigger: 'blur' }
        ],

        desc: [
          { required: true, message: '请填写专辑简介', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请上传封面', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      time: [],
      imageUrl: '',
      radio: '1',
      value1: '',
      //富文本编辑器
      msg:
        '请编辑内容',
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: 'http://api.demo.com/ueditor/upload',
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
          'fullscreen', 'source', '|', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage',

        ]],
        readonly: true,
        elementPathEnabled: false,
        enableAutoSave: false,
      },
      activityId:'',
      noPassId:'',
      reason:'',
      dialogVisiblePass:false,
      dialogVisiblenoPass:false,
      dialogVisibleReason:false




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
    renderList() {
      this.$http.post(api.getContent('/activity/audit'), { id: this.$route.query.id }).then(res => {

        
        if (res.data.status == 200) {
          if(res.data.data.data[0].activityItime==null) {
            res.data.data.data[0].activityItime="审核后立即发布"
          } else  {
            res.data.data.data[0].activityItime = formatDate(new Date(res.data.data.data[0].activityItime), 'yyyy-MM-dd hh:mm');
          }
          if(res.data.data.data[0].activityRadio==1) {
            res.data.data.data[0].activityRadio="是"
          }   else if (res.data.data.data[0].activityRadio==2) {
            res.data.data.data[0].activityRadio="否"
          }
          // alert(2)
          document.getElementById("main").innerHTML = res.data.data.data[0].activityIntro;
          res.data.data.data[0].activityStime = formatDate(new Date(res.data.data.data[0].activityStime), 'yyyy-MM-dd hh:mm');
          res.data.data.data[0].activityEtime = formatDate(new Date(res.data.data.data[0].activityEtime), 'yyyy-MM-dd hh:mm');
         

     

          this.ruleForm = res.data.data.data[0]

          
        }

      })
    },
    //通过按钮
    Pass(item) {

      this.activityId = item

      this.dialogVisiblePass = true


    },
    pass() {
      // alert(item)
      //0 是未审核 1 是通过 2 是不通过
      this.$http.post(api.getContent('/activity/audit/status'), { id: this.activityId, status: 1}).then(res => {
        if (res.data.status == 200) {

          this.$message({
            message: '审核成功',
            type: "success"
          })
          this.dialogVisiblePass = false
          
          this.ruleForm = []
          this.$router.push('/activeCheck')
          // this.renderList()
        } else {
          this.$message({
            message: '审核失败',
            type: "error"
          })
          this.$router.push('/activeCheck')
        }
      })
       this.dialogVisiblePass = false
      // this.albumReview()
    },
    //不通过
    nopass(item) {
      // alert(item)
      this.noPassId = item
      this.dialogVisiblenoPass = true
      // document.getElementById("media").pause();


    },
    noPassSubmit() {
      this.dialogVisibleReason = true


    },
    reasonSubmit() {
      if(String(this.reason).trim()=='')
      {
        this.$message.error('请填写原因')
        return false
      }
        this.$http.post(api.getContent('/activity/audit/status'), { id: this.noPassId, status: 2,reason:this.reason}).then(res => {
          if (res.data.status == 200) {
  
            this.$message({
              message: '审核成功',
              type: "success"
            })
            this.dialogVisibleReason = false
            this.dialogVisiblenoPass = false
            
            this.ruleForm = []
            this.$router.push('/activeCheck')
            // this.renderList()
          } else {
            this.$message({
              message: '审核失败',
              type: "error"
            })
            this.$router.push('/activeCheck')
          }
        })
         this.dialogVisibleReason = false
         this.dialogVisiblenoPass = false

    
    }




  },
  mounted() {
    this.renderList()
  }
}