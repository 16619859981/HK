import api from '../../api/index'
import VueUeditorWrap from 'vue-ueditor-wrap';
export default {
  components: { VueUeditorWrap },
  data() {
    return {
      ruleForm: {
        radio:'1',
        // messagePublishType:1
      },
               //发布对象
               per: [{
                value: '1',
                label: '全部'
              }, {
                value: '2',
                label: '家长(有孩子)'
              }, {
                value: '3',
                label: '家长(没孩子)'
              }, {
                value: '4',
                label: '教师'
              }, {
                value: '5',
                label: '学校'
              }],
              value: '',
              rules: {
                title: [
                  { required: true, message: '请输入通知标题', trigger: 'blur' },
                  { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
        
        
                linkType: [
                  { required: true, message: '请输入链接类型', trigger: 'blur' }
                ],
                range: [
                  { required: true, message: '请选择发布对象', trigger: 'blur' }
                ],
                content: [
                  { required: true, message: '请输入通知内容', trigger: 'blur' },
                  { min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur' }
                ],
                publishType: [
                  { required: true, message: '请选择发布时间', trigger: 'blur' }
                ],
                
        
        
        
        
              },
    
      checkMsg: {
        materialAlbumName: '',
        materialAlbumIntro: '',
        fileUrl: '',
      },
      dialogVisiblePass: false,
      dialogVisibleSub: false,
      dialogVisibleAbl: false,


   
      pickerOptions0: {
        disabledDate: (time) => {

      
                return time.getTime() < Date.now()-8.64e7;
     

        }
      },
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




    };


  },
  methods: {
  //渲染页面数据
   
  handleMsg() {
    this.$http.post(api.getContent('/message/inform/id'),{messageId:this.$route.query.id}).then(res=>{
      console.log(res)
      if (res.data.status==200) {
       this.ruleForm=res.data.data

      }
    })
  },


  
    //提交弹框

    subimt() {
      console.log(this.ruleForm)
      
      if(String(this.ruleForm.title).trim().length<1) {
        this.$message.error('请填写通知标题')
        return false
      }
      if (String(this.ruleForm.title).trim().length>20) {
        this.$message.error('通知标题为1-20个字符')
        return false
      }
   
      if (this.ruleForm.range=='') {
        this.$message.error('请选择发布对象')
        return false
      }
      if(String(this.ruleForm.content).trim().length<1) {
        this.$message.error('请填写通知内容')
        return false
      }
     
      if (this.ruleForm.publishType=='') {
        this.$message.error('请选择发布时间')
        return false
      } else if (this.ruleForm.publishType==1) {
        this.ruleForm.ptime = new Date().getTime()
      } else if (this.ruleForm.publishType==2 && this.ruleForm.ptime =="") {
        this.$message.error('请选择发布时间')
        return false
      }



      this.dialogVisibleSub = true
    },

    //弹框确认
    submitData() {
     
      
      this.$http.post(api.getContent('/message/inform/update'), this.ruleForm).then(res => {
    
        
        if (res.data.status==200) {

          
          this.$message({
            message: '修改成功',
            type: 'success'

          })
          this.ruleForm=''
          this.$router.push('/msgList')
          
          
        }
        this.dialogVisibleSub = false
       
      })

    },

    del() {
      this.$router.push('/msgList')
    },






  },
  mounted() {
    this.handleMsg()
  }
}