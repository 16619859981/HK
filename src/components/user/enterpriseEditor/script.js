import {
  formatDate
} from '../../../date'
import api from '../../api/index'
export default {
  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      ruleForm: {
        name: '',
        region: '',

        desc: ''
      },
      dialogVisible: false,
      dialogVisibleDel:false,
      value: 'shanghai',
      rules: {
        personName: [{
          required: true,
          message: '请输入身份名称',
          trigger: 'blur'
        }, ],
        personIntro: [{
          required: true,
          message: '请输入身份简介',
          trigger: 'blur'
        }],

        desc: [{
          required: true,
          message: '请输入身份简介',
          trigger: 'blur'
        }],
        img: [{
          required: true,
          message: '请上传封面',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入联系方式',
          trigger: 'blur'
        }],
        adminAccount: [{
          required: true,
          message: '请输入管理员账号',
          trigger: 'blur'
        }],
        adminPassword: [{
          required: true,
          message: '请输入管理员密码',
          trigger: 'blur'
        }],
      },
      imageUrl: ''
    };


  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.ruleForm.personFileId = res.data.fileId

      this.imageUrl = res.data.realUrl
      this.ruleForm.FIleUrl = this.imageUrl

    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },


    del() {
      this.$router.push('/enterprise')
    },


    handleList() {
      this.$http.post(api.getSchool('/person/seeperson'), {
        personId: this.$route.query.id
      }).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          // if (res.data.data[0].personSex == 0) {
          //   res.data.data[0].personSex = '男'
          // } else if (res.data.data[0].personSex == 1) {
          //   res.data.data[0].personSex = '女'
          // }
          res.data.data[0].personPhone = String(res.data.data[0].personPhone).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
          this.ruleForm = res.data.data[0]
        }
      })
    },
    sub() {
      // console.log(this.ruleForm)
      // for (var key in this.ruleForm) {
      //   if (String(this.ruleForm[key]).trim() == '') {
      //     this.$message({
      //       message: '请填写全部内容',
      //       type: 'error'
      //     })
      //     return false
      //   }
      // }
      this.dialogVisible = true
    },
    submitSchool() {

      this.$http.post(api.getSchool('/person/updateAccount'), this.ruleForm).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.$message.success('修改成功！')
          this.dialogVisible = false
          this.$router.push('/enterprise')
        }
      })
    }




  },
  mounted() {
    this.handleList()
  }
}
