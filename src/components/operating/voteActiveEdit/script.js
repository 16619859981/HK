import VueUeditorWrap from 'vue-ueditor-wrap';
import api from '../../api/index'
export default {
  components: { VueUeditorWrap },
    data(){
        return {
          action:api.getUpload("/file/ihongka_files/upload"),
          ruleForm: {
            name: '专题的名称',
      
            
            // imageUrl: '/static/logo.png',
            msg:
      '对专辑的介绍介绍介绍截杀',
          },
          upTime:'',
          time: [new Date(2018, 10, 10, 10, 10), new Date(2019, 10, 11, 10, 10)],
          imageUrl:'',
            rules: {
              name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
         
              ],
              time: [
                { required: true, message: '请输入时间', trigger: 'blur' }
              ],
            
              desc: [
                { required: true, message: '请填写专辑简介', trigger: 'blur' }
              ],
              img: [
                { required: true, message: '请上传封面', trigger: 'blur' }
              ]
            },
            vote:{
          
              btn:'单选',
              option1:'这是又一个选项',
              option2:'这是一个选项',
           
              },
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
          elementPathEnabled:false,
          enableAutoSave: false,
        }
           
          


                 
          };


    },
    methods:{
 

        //图片上传
        handleAvatarSuccess(res, file) {
          this.ruleForm.fileId = res.data.fileId
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
            // const isJPG = file.type === 'image/jpeg'||'png';
            // const isLt1M = file.size / 1024 / 1024 < 1;
    
            // if (!isJPG) {
            //   this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // if (!isLt2M) {
            //   this.$message.error('上传头像图片大小不能超过 1MB!');
            // }
            // return isJPG && isLt1M;
          },
          upload(){
            this.dialogVisible=true
          },
          handleForm(form,form2){
       
          },
          renderList() {

            this.$http.post(api.getContent('/subject/query'), {id:this.$route.query.id}).then(res => {
     
              if (res.data.status == 200) {
                this.toatal = res.data.data.total
                res.data.data.data[0].subjectCtime
                  = formatDate(new Date(res.data.data.data[0].subjectCtime
                  ), 'yyyy-MM-dd hh:mm');
                res.data.data.data[0].subjectEtime
                  = formatDate(new Date(res.data.data.data[0].subjectEtime
                  ), 'yyyy-MM-dd hh:mm');
                this.time[0]= res.data.data.data[0].subjectCtime;
                this.time[1]=res.data.data.data[0].subjectEtime;
                this.imageUrl = res.data.data.data[0].subjectfileId
                this.upTime=res.data.data.data[0].subjectUptime
                this.tableData = res.data.data.data
              }
            })
          },
          //提交的时候的获取时间戳
          getTime(val) {
            this.ruleForm.subjectCtime = val[0];
            this.ruleForm.subjectEtime = val[1];
      
          },
        //提交
        submit() {
          this.dialogVisible = true

        },
        // 弹框确认提交
        submitData() {
 
          for (var key in this.ruleForm) {
            if(this.ruleForm[key]==''){
              this.$message.error('请填写全部内容')
            }
          }

          this.$http.post('',this.ruleForm).then(res=>{

            if(res.data.status==200) {
              this.$message.success('提交成功')
            }
          })

        },
        //取消
        cancel() {
          
        }


        
    

    },
    mounted() {
      this.renderList()
    }
}