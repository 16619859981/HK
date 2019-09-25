import VueUeditorWrap from 'vue-ueditor-wrap';
export default {
  components: { VueUeditorWrap },
    data(){
        return {
            ruleForm: {
              name:'活动名称',
              theme:'安全专题',
              time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
              msg:'简介简介简介简介',
              imageUrl:'/static/logo.png',
              radio:'1',
              // value1:'2019-09-09'
           
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
              elementPathEnabled:false,
              enableAutoSave: false,
            }
     


                 
          };


    },
    methods:{
      createPic(){
        this.$router.push('/createPic')
      },
      createVoice(){
        this.$router.push('/createVoice')
      },
      createVote(){
        this.$router.push('/createVote')
      },

        //图片上传
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'||'png';
            const isLt1M = file.size / 1024 / 1024 < 1;
    
            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isJPG && isLt1M;
          },
          upload(){
            this.dialogVisible=true
          }

        
    

    }
}