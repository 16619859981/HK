import VueUeditorWrap from 'vue-ueditor-wrap';
import { formatDate } from '../../../date'
import api from '../../api/index'

export default {
  components: { VueUeditorWrap },
  data() {
    return {
      ruleForm: {
        name: '活动名称',
        theme: '安全教育',
        time: '2019-09-09 至 2019-09-10',
        msg: '活动的简介简介简介简介简介',
        imageUrl: '/static/logo.png',
      },
      rules: {
        name: [
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
      vote: [{
        topics: '先有鸡还是先有蛋',
        btn: '单选',
        option1: '鸡',
        option2: '蛋',

      }],
      dialogVisible: false,
      //富文本编辑器

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
      activityId:"",
      dialogVisiblePass:false,
      dialogVisiblenoPass:false,
      dialogVisibleReason:false,
      reason:'',





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
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'png';
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJPG && isLt1M;
    },
    upload() {
      this.dialogVisible = true
    },
    handleForm(form, form2) {
 
    },
    renderList() {
      // alert(this.$route.query.id)
      this.$http.post(api.getContent('/activity/voter'), { activityId: this.$route.query.id }).then(res => {
 
        if (res.data.status == 200) {

          document.getElementById("main").innerHTML = res.data.data.activityIntro;
          res.data.data.activityCtime = formatDate(new Date(res.data.data.activityCtime), 'yyyy-MM-dd hh:mm');
          res.data.data.activityEtime = formatDate(new Date(res.data.data.activityEtime), 'yyyy-MM-dd hh:mm');

          this.ruleForm = res.data.data

          this.activityId = this.ruleForm.activityId
      
    
          for (var i = 0 ; i < res.data.data.arr.length ; i++) {
            if (res.data.data.arr[i].activityVoterIssingle==1) {
              res.data.data.arr[i].activityVoterIssingle="单选"
            }else if (res.data.data.arr[i].activityVoterIssingle==2) {
              res.data.data.arr[i].activityVoterIssingle="多选"
            }

          }
          this.vote = res.data.data.arr
   
 
    

        }

      })
    },



      //通过按钮
      Pass() {

        // this.activityId = item
  
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

      },
      //不通过
      nopass() {
  

        this.dialogVisiblenoPass = true

  
  
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
          this.$http.post(api.getContent('/activity/audit/status'), { id: this.activityId, status: 2,reason:this.reason}).then(res => {
            if (res.data.status == 200) {
    
              this.$message({
                message: '审核成功',
                type: "success"
              })
              this.dialogVisibleReason = false
              this.dialogVisiblenoPass = false
              
             
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
  mounted () {
    this.renderList()
  }
}