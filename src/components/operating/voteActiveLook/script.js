import VueUeditorWrap from 'vue-ueditor-wrap';
import { formatDate } from '../../../date'
import api from '../../api/index'
export default {
  components: { VueUeditorWrap },
  data() {
    return {
      ruleForm: {
        name: '专题的名称',

        time: '2018-09-09 至 2019-09-09',
        imageUrl: '/static/logo.png',
        msg:
          '对专辑的介绍介绍介绍截杀',
      },
      // upTime:'',
      id: this.$route.query.id,
      vote: {

        btn: '单选',
        option1: '这是又一个选项',
        option2: '这是一个选项',

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
        elementPathEnabled: false,
        enableAutoSave: false,
        readonly : true
      },
      dialogVisible: false,





    };


  },
  methods: {


    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'png'|| 'jpg' || 'JPG' || 'JPEG' || 'PNG';
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJPG && isLt1M;
    },
    renderList() {
    
      this.$http.post(api.getContent('/subject/query'), {id:this.id}).then(res => {

        if (res.data.status == 200) {

          res.data.data.data[0].subjectCtime
            = formatDate(new Date(res.data.data.data[0].subjectCtime
            ), 'yyyy-MM-dd hh:mm');
          res.data.data.data[0].subjectEtime
            = formatDate(new Date(res.data.data.data[0].subjectEtime
            ), 'yyyy-MM-dd hh:mm');
            // this.upTime = res.data.data.data[0].subjectUptime
            if (res.data.data.data[0].subjectUptime != null) {
              res.data.data.data[0].subjectUptime = formatDate(new Date(res.data.data.data[0].subjectUptime), 'yyyy-MM-dd hh:mm');
            } else {
              res.data.data.data[0].subjectUptime = "未审核"
            }
            document.getElementById("main").innerHTML = res.data.data.data[0].subjectLabel;
          this.ruleForm = res.data.data.data[0]
        }
      })
    },





  },
  mounted() {
    this.renderList()
  }
}